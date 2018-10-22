<template>
  <v-layout>
    <div class="Wrapper">
      <div :class="['darken-2', color]" class="DialogWrapper">
        <Message
          v-for="(message, i) in messages"
          :key="i"
          :author="message.author" 
          :text="message.text"
          :color="color"
        />
      </div>
      <AnswerInput />
    </div>
  </v-layout>
</template>

<script>
import Message from "./Message.vue"
import AnswerInput from "./AnswerInput.vue"

export default {
  components: {
    Message,
    AnswerInput
  },
  props: {
    messages: {
      type: Array,
      required: false,
      default: () => []
    },
    color: {
      type: String,
      required: false,
      default: "black"
    }
  }
}
</script>

<style scoped>
.DialogWrapper {
  padding: 5px 12px;
  overflow: scroll;
  overflow-x: hidden;
  width: 100%;
  display: block;
  max-height: 40vh;
  min-height: 20vh;
  border-radius: 3px;
}
.Wrapper {
  width: 100%;
  display: block;
}
.Input {
  padding-top: 10px;
}
</style>
