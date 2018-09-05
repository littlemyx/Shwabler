<template>
  <v-layout>
    <div class="dialogWrapper" v-bind:class="['darken-2', color]">
      <Message
        :key="i"
        v-for="(message, i) in messages"
        v-bind:author="message.author" 
        v-bind:text="message.text"
        v-bind:color="color"
      />
    </div>
  </v-layout>
</template>

<script>
import Message from './Message.vue';

export default {
  props: {
    messages: {
      type: Array,
      required: false
    },
    color: {
      type: String,
      required: false
    }
  },
  components: {
    Message
  }
}
</script>

<style scoped>
.dialogWrapper{
  padding: 5px 12px;
  overflow: scroll;
  overflow-x: hidden;
  width: 100%;
  display: block;
  max-height: 40vh;
  min-height: 20vh;
  border-radius: 3px;
}
</style>
