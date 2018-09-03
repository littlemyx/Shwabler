<template>
  <v-layout>
    <Message
      :key="i"
      class="message"
      v-for="(message, i) in messages"
      v-bind:author="message.author" 
      v-bind:text="message.text"
    />
  </v-layout>
</template>

<script>
import Message from './Message.vue';

export default {
  props: {
    messages: {
      type: Array,
      required: false
    }
  },
  components: {
    Message
  }
}
</script>
