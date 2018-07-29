export default function (context) {
  context.userAgent = context.isServer ? context.req.headers['user-agent'] : navigator.userAgent;
  // this.$router.push('/login');
  console.log('index');
  // If the user is not authenticated
  // if (!store.state.authenticated) {
  // return redirect('/login')
}
