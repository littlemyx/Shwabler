<template>
  <router-link :to="url" :color="color" class="link"> {{ text }} </router-link>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: false,
      default: "indigo darken-3"
    }
  }
}
</script>

<style>
.link {
  text-decoration: none;
  color: #a01259;
}
.link:hover {
  color: #a01259;
}
</style>
