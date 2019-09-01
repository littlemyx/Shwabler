import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"
import "firebase/firestore"

import struct from "firebaseConfig"

var config = struct

firebase.initializeApp(config)

const auth = firebase.auth()
const database = firebase.database()
const firestore = firebase.firestore()
const timestamp = firebase.firestore.Timestamp
const fieldvalue = firebase.firestore.FieldValue
// const settings = { timestampsInSnapshots: true } // release note said so
// firestore.settings(settings)

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
