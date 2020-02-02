<template>
  <v-carousel
    v-model="model"
    :show-arrows="true"
    :cycle="false"
    :hide-delimiters="true"
    :continuous="false"
    light
  >
    <v-carousel-item v-for="({topText, bottomText, image, link}, i) in slides" :key="i">
      <v-sheet color="transparent" height="100%" tile>
        <!-- <v-row class="fill-height" align="center" justify="center"> -->
        <Slide :top="topText" :bottom="bottomText" :image="image" :link="link" class="display-3"/>
        <!-- </v-row> -->
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import Slide from "./Slide"
export default {
  components: { Slide },
  data() {
    return {
      // colors: ["primary", "secondary", "yellow darken-2", "red", "orange"],
      slides: [
        {
          topText: "createWord",
          image: "/create.png"
        },
        {
          topText: "likeWord",
          bottomText: "dislikeWord",
          image: "/answer.png"
        },
        {
          topText: "answerWord",
          image: "/start.png"
        },
        {
          topText: "discussWord",
          image: "/discuss.png"
        },
        {
          link: "/signup"
        }
      ],
      model: 0,
      showArrows: true,
      hideDelimiters: false,
      cycle: false
    }
  }
}
</script>

<style scoped>
.logoWrapper {
  position: relative;
}
.v-carousel__controls {
  background: transparent;
}
</style>
>
