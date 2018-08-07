import { auth } from '@/services/fireinit.js';

export default context => {
  const { store } = context;

  return new Promise((resolve, reject) => {
    // resolve(true);
    auth.onAuthStateChanged(user => {
      console.log('fireauth');
      if (user) {
        // setTimeout(function () {
        store.dispatch('user/setUser', user);
        // }, 10000);
      }
      return resolve();
    })
  })
}
