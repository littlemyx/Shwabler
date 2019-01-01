<template>
  <v-layout>
    <router-link :to="url" class="link"> {{ text }} </router-link>
  </v-layout>
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
    }
  }
}
</script>

<style>
.link {
  text-decoration: none;
}
.link:hover {
  color: red;
}
</style>
