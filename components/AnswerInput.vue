<template>
  <v-layout>
    <v-textarea
      ref="textarea" 
      v-model="message"
      :append-outer-icon="'send'"
      class="Input"
      placeholder="Place your answer here"
      solo
      multi-line
      auto-grow
      rows="1"
      @keydown.enter.exact.prevent
      @keyup.enter.exact="sendMessage"
      @keydown.shift.enter.exact.prevent
      @keyup.shift.enter.exact="addNewLine"
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
      this.$nextTick(function() {
        this.$refs.textarea.calculateInputHeight()
      })
    },
    addNewLine() {
      this.message = this.message + "\n"
      this.$nextTick(function() {
        this.$refs.textarea.calculateInputHeight()
      })
    }
  }
}
</script>

<style scoped>
.Input {
  padding-top: 10px;
}
</style>
