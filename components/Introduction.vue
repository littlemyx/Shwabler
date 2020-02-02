<template>
  <v-layout align-center justify-center column fill-height>
    <div class="carousel">
      <WelcomeCarousel />
    </div>
  </v-layout>
</template>

<script>
import WelcomeCarousel from "./WelcomeCarousel"
export default {
  components: {
    WelcomeCarousel
  },
  middleware: "index",
  layout: "centerLayout"
}
</script>

<style scoped>
.carousel {
  position: relative;
  width: 90%;
  max-width: 500px;
}
</style>
>
