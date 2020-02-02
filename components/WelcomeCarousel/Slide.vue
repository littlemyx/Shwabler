<template>
  <div class="wrapper">
    <div v-if="top" class="textWrapper start"><p class="topText">{{ $t(top) }}</p></div>
    <div v-if="image" class="imageWrapper"><v-img :src="image" contain/></div>
    <div v-if="bottom" class="textWrapper end"><p class="bottomText">{{ $t(bottom) }}</p></div>
    <div v-if="link" class="linkWrapper"><RouterLink :text="`${$t('signup')}!`" url="signup"/></div>
  </div>
</template>

<script>
import RouterLink from "../RouterLink"

export default {
  components: {
    RouterLink
  },
  props: {
    top: {
      type: String,
      required: false,
      default: ""
    },
    image: {
      type: String,
      required: false,
      default: ""
    },
    bottom: {
      type: String,
      required: false,
      default: ""
    },
    link: {
      type: String,
      required: false,
      default: ""
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.topText {
  color: #333;
  flex-shrink: 0;
}
.imageWrapper {
  flex-grow: 1;
}
.bottomText {
  color: #333;
  flex-shrink: 0;
}
.textWrapper {
  display: flex;

  padding: 0px 15px;
  box-sizing: border-box;
}
.start {
  justify-content: flex-start;
}
.end {
  justify-content: flex-end;
}
.linkWrapper {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: 65%;
}
</style>
