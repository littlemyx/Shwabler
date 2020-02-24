// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions")

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin")

const { sendEmail } = require("./mailer")

admin.initializeApp()

const db = admin.firestore()

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const original = req.query.text
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  return admin
    .database()
    .ref("/test")
    .push({ original: original })
    .then(snapshot => {
      console.log("addMessage")
      // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
      return res.redirect(303, snapshot.ref.toString())
    })
})

exports.counterUpper = functions.firestore
  .document("/test/{documentId}")
  .onUpdate(change => {
    const ref = change.after.ref
    const data = change.after.data()
    if (data.count === 0) {
      return ref.delete()
    }
    if (data.original) {
      const uppercase = data.original.toUpperCase()
      return ref.set({ uppercase }, { merge: true })
    }
  })

exports.messagesCounterUpdater = functions.firestore
  .document("/messages/{documentId}")
  .onUpdate((change, { params: { documentId } }) => {
    // const ref = change.after.ref
    const data = change.after.data()
    const author_id = data.messages[data.messages.length - 1].author_id
    return db
      .collection("matches")
      .where("messages_id", "==", documentId)
      .get()
      .then(querySnapshot => {
        let retValue
        if (querySnapshot.docs.length) {
          querySnapshot.forEach(doc => {
            const data = doc.data()
            const docId = doc.id
            if (data) {
              const pairIds = data.members.filter(
                memberId => memberId !== author_id
              )
              retValue = new Promise((resolve, reject) => {
                const sets = pairIds.map(pair =>
                  db
                    .collection("messagesNotifications")
                    .doc(pair)
                    .update({
                      updated: admin.firestore.FieldValue.arrayUnion(docId)
                    })
                )
                Promise.all(sets)
                  .then(() => resolve())
                  .catch(error => reject(error))
              })
            } else {
              return new Error("Invalid messages_id")
            }
          })
          return retValue
        } else {
          return new Error("Invalid messages_id")
        }
      })
      .catch(error => {
        console.log(error)
      })
  })

exports.tagSnitizer = functions.firestore // тут ошибка в имени
  .document("/tags/{documentId}")
  .onUpdate(change => {
    const ref = change.after.ref
    const after = change.after.data()
    const before = change.before.data()
    const count = change.after.data().count
    if (after.posts.length === before.posts.length) {
      return 0
    }
    if (after.posts.length > before.posts.length) {
      return ref.set({ count: count + 1 }, { merge: true })
    } else {
      const newCount = count - 1
      if (newCount === 0) {
        return ref.delete()
      }
      return ref.set({ count: newCount }, { merge: true })
    }
  })

exports.tagCreateSearchIndex = functions.firestore
  .document("/tags/{documentId}")
  .onCreate(snap => {
    const data = snap.data()
    const searchIndex = []
    data.text.split("").reduce((akk, value) => {
      const newVal = akk + value
      searchIndex.push(newVal)
      return newVal
    }, "")
    return snap.ref.set({ searchIndex }, { merge: true })
  })

exports.sendNotification = exports.sendNotification = functions.firestore
  .document("/messages/{documentId}")
  .onUpdate((change, { params: { documentId } }) => {
    const data = change.after.data()
    const author_id = data.messages[data.messages.length - 1].author_id
    return db
      .collection("matches")
      .where("messages_id", "==", documentId)
      .get()
      .then(querySnapshot => {
        let retValue
        if (querySnapshot.docs.length) {
          querySnapshot.forEach(doc => {
            const data = doc.data()
            if (data) {
              const pairIds = data.members.filter(
                memberId => memberId !== author_id
              )
              retValue = new Promise((resolve, reject) => {
                const sets = pairIds.map(pair =>
                  admin
                    .auth()
                    .getUser(pair)
                    .then(user => {
                      const { email } = user
                      return sendEmail({
                        to: email,
                        from: "shwabler.com@gmail.com",
                        subject: "You have a new message!",
                        html:
                          "<a href='https://shwabler.com/dialogs'>Go check it!</a>"
                      })
                    })
                )
                Promise.all(sets)
                  .then(() => resolve())
                  .catch(error => reject(error))
              })
            } else {
              return new Error("Invalid messages_id")
            }
          })
          return retValue
        } else {
          return new Error("Invalid messages_id")
        }
      })
      .catch(error => {
        console.log(error)
      })
  })
