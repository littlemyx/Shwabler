<template>
  <v-layout>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-textarea
          ref="textarea"
          v-model="message"
          :append-outer-icon="'send'"
          :placeholder="$t('dialog_placeholder')"
          class="Input"
          solo
          multi-line
          auto-grow
          rows="1"
          v-on="on"
          @keydown.enter.exact.prevent
          @keyup.enter.exact="sendMessage"
          @keydown.shift.enter.exact.prevent
          @keyup.shift.enter.exact="addNewLine"
          @click:append-outer="sendMessage"
        />
      </template>
      <span>
        <p v-html="$t('input_tooltip_first_row')"/>
        <p v-html="$t('input_tooltip_second_row')"/>
      </span>
    </v-tooltip>
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
      if (this.message.length) {
        this.$emit("sendMessage", this.message)
        this.message = ""
        this.$nextTick(function() {
          this.$refs.textarea.calculateInputHeight()
        })
      }
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
>>> .v-icon--link,
>>> .v-icon--link.primary--text {
  color: #eb529b !important;
}

>>> textarea {
  margin-top: 0px !important;
}
</style>
