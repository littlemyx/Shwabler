const routeStoreMap = {
  waterfall: "waterfall/initFetch",
  cave: "cave/initFetch",
  wardrobe: "userList/initFetch"
}

export default route => {
  return routeStoreMap[route] || ""
}
