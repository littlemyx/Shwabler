const routeStoreMap = {
  waterfall: "waterfall/initFetch",
  cave: "cave/initFetch",
  wardrobe: "userList/initFetch",
  settings: "settings/initFetch"
}

export default route => {
  return routeStoreMap[route] || ""
}
