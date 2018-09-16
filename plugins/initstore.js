export default function ({ app, store }) {
  const list = require('../assets/data/caveList.json');
  store.commit('cave/setCaveList', list);
  const posts = require('../assets/data/posts.json');
  store.commit('posts/updateCardList', posts);
  // store.commit('posts/updateCardList', posts);
  const userList = require('../assets/data/userList.json');
  store.commit('userList/updateUserList', userList);
}
