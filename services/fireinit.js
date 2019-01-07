import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"
import "firebase/firestore"

var config = {
  apiKey: "AIzaSyB5W8VjQpE3JscGwx0W5Px-r_ehNdY2cwM",
  authDomain: "shwabler0.firebaseapp.com",
  databaseURL: "https://shwabler0.firebaseio.com",
  projectId: "shwabler0",
  storageBucket: "shwabler0.appspot.com",
  messagingSenderId: "388257651056"
}

firebase.initializeApp(config)

const auth = firebase.auth()
const database = firebase.database()
const firestore = firebase.firestore()
const timestamp = firebase.firestore.Timestamp
const fieldvalue = firebase.firestore.FieldValue
const settings = { timestampsInSnapshots: true }
firestore.settings(settings)

// auth.onAuthStateChanged(user => {
//   if (user) {
//     return true// resolve(store.commit('user/setUser', user));
//   }
//   return resolve();
// })

export const GoogleProvider = new firebase.auth.GoogleAuthProvider()
export { auth }
export { database }
export { firestore }
export { timestamp }
export { fieldvalue }
export default firebase
