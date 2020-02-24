const functions = require("firebase-functions")
const admin = require("firebase-admin")
const { sendEmail } = require("./mailer")

exports.sendNotification = db =>
  functions.firestore
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
                        return sendEmail(
                          email,
                          "service@shwabler.com",
                          "You have a new message!",
                          "test"
                        )
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
