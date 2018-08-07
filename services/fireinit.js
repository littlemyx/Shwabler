import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

var config = {
  apiKey: 'AIzaSyB5W8VjQpE3JscGwx0W5Px-r_ehNdY2cwM',
  authDomain: 'shwabler0.firebaseapp.com',
  databaseURL: 'https://shwabler0.firebaseio.com',
  projectId: 'shwabler0',
  storageBucket: 'shwabler0.appspot.com',
  messagingSenderId: '388257651056'
};

firebase.initializeApp(config);

const auth = firebase.auth();

// auth.onAuthStateChanged(user => {
//   if (user) {
//     return true// resolve(store.commit('user/setUser', user));
//   }
//   return resolve();
// })

export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
export { auth };
export const DB = firebase.database();
export default firebase;
