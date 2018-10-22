<template>
  <v-layout>
    <v-text-field
      v-model="message"
      :append-outer-icon="'send'"
      class="Input"
      placeholder="Place your answer here"
      solo
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
    }
  }
}
</script>

<style scoped>
.Input {
  padding-top: 10px;
}
</style>
