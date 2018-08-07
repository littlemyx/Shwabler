export default function ({ store, redirect, route }) {
  if (store.state.user.user !== null && route.name === 'login') {
    redirect('/posts');
    console.log('auth');
  }
  if (store.state.user.user === null && route.name !== 'login') {
    redirect('/login');
    console.log('no auth');
  }
}
