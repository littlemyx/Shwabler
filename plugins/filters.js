import Vue from "vue"

Vue.filter("capitalize", function(value) {
  if (!value) return ""
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter("uppercase", function(value) {
  if (!value) return ""
  value = value.toString()
  return value.toUpperCase()
})

Vue.filter("hashtagged", function(value) {
  if (!value) return ""
  value = value.toString()
  return `#${value}`
})
