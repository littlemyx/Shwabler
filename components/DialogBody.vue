<template>
  <v-layout>
    <div class="Wrapper">
      <div :id="identify" :class="['darken-2', color]" class="DialogWrapper">
        <Message
          v-for="message in messages"
          :key="`${message.date.seconds}_${message.date.nanoseconds}_${message.text}`"
          :author="message.author_id" 
          :text="message.text"
          :color="color"
        />
      </div>
      <AnswerInput @sendMessage="sendMessage" @focus="focusHandler"/>
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
    color: {
      type: String,
      required: false,
      default: "black"
    },
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      identify: `dialog_${this.id}`
    }
  },

  computed: {
    messages() {
      return this.$store.getters["messages/messages"](this.id)
    }
  },
  mounted() {
    this.$nextTick(function() {
      const container = this.$el.querySelector(`#dialog_${this.id}`)
      container.scrollTop = container.scrollHeight
    })
  },
  updated() {
    this.$nextTick(function() {
      const container = this.$el.querySelector(`#dialog_${this.id}`)
      container.scrollTop = container.scrollHeight // нужно протестировать
    })
  },
  methods: {
    sendMessage(message) {
      this.$emit("sendMessage", message)
    },
    focusHandler() {
      this.$store.dispatch("messagesNotification/setMessagesCountAsync", {
        id: this.id
      })
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
