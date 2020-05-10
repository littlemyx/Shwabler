<template>

  <div class="container">
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <nuxt-link to="/">Home page</nuxt-link>
    <p>error message - {{ error.message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: false,
      default: () => ({ message: "Some error has occured" })
    }
  },
  layout: "error_default" // you can set a custom layout for the error page
}
</script>
