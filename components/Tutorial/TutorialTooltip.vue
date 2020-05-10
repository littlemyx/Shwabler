<template>
  <div :class="{ big: isOpen, small: !isOpen}" class="tutorialTooltip">
    <div class="controlWrapper" @click="toggle">
      <v-icon medium dark>{{ isOpen ? "keyboard_arrow_down": "keyboard_arrow_up" }}</v-icon>
    </div>
    <div class="wrapper">
      <div class="textWrapper">
        <p :class="{ oneLine: !isOpen}" class="text">{{ $t(text) }}</p>
      </div>
      <div v-if="isOpen" class="buttonWrapper">
        <v-btn flat small dark @click="previousClickHandler">{{ $t("tutorial.tooltip.previous_button_text") }}</v-btn>
        <v-btn flat small dark @click="nextClickHandler">{{ $t(buttonNextText) }}</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: true
    }
  },
  computed: {
    step() {
      return this.$store.getters["tutorial/step"]
    },
    text() {
      return this.$store.getters["tutorial/text"]
    },
    buttonNextText() {
      return this.$store.getters["tutorial/isLastStep"]
        ? "tutorial.tooltip.close_button"
        : "tutorial.tooltip.next_button_text"
    }
  },
  methods: {
    previousClickHandler() {
      this.$store.commit("tutorial/decreaseStep")
    },
    nextClickHandler() {
      if (this.$store.getters["tutorial/isLastStep"]) {
        this.$router.push("/feed")
      } else {
        this.$store.commit("tutorial/increaseStep")
      }
    },
    toggle() {
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style scoped>
.tutorialTooltip {
  min-width: 200px;
  background-color: #611439;
  max-width: 40vw;
  margin-left: 50%;
  z-index: 1000;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: translate(-50%);
  transition: height 0.4s linear;
  transition: bottom 0.1s linear;
}

.tutorialTooltip.big {
  bottom: 10vh;
}

.tutorialTooltip.small {
  bottom: 5vh;
}

.oneLine {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.controlWrapper {
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.wrapper {
  width: 100%;
  color: #fff;
  padding: 10px;
}

.buttonWrapper {
  display: flex;
  justify-content: center;
}
</style>
