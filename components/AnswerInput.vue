<template>
  <v-layout>
    <v-textarea
      ref="textarea" 
      v-model="message"
      :append-outer-icon="'send'"
      class="Input"
      placeholder="Place your answer here"
      solo
      auto-grow
      row-height="8"
      @keyup.shift.enter="sendMessage"
      @click:append-outer="sendMessage"
    />
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      message: ""
    }
  },
  methods: {
    sendMessage() {
      this.$emit("sendMessage", this.message)
      this.message = ""
      this.$refs.textarea.clearableCallback()
    }
  }
}
</script>

<style scoped>
.Input {
  padding-top: 10px;
}
</style>
