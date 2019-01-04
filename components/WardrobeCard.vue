<template>
  <v-layout>
    <Card :color="color">
      <v-btn slot="controlItems" flat icon color="black" class="deleteIcon" @click="deleteCard">
        <v-icon medium dark>clear</v-icon>
      </v-btn >

      <Chips v-if="tags.length" slot="chips" :list="tags" :id="id" :disabled="true"/>

      <div slot="header">
        <h3 class="headline mb-0">{{ title }}</h3>
        <div>{{ cardText }}</div>
      </div>

      <Chips v-if="tags.length" slot="chips" :list="tags" :disabled="true"/>

      <div v-if="isMessagesShow" class="messagesWrapper">
        <v-progress-circular
          v-if="isMessagesLoading"
          :size="60"
          :width="7"
          color="white"
          indeterminate
        />
        <DialogBody v-else :id="messagesId" :messages="messages" :color="color" :is-loading="isMessagesLoading" @sendMessage="sendMessage"/>
      </div>

      <v-btn slot="footer" :color="color" dark class="lighten-1" block @click="toggleDialogVisibility">
        {{ buttonText }}
      </v-btn>
    </Card>
  </v-layout>
</template>

<script>
import Card from "./Card.vue"
import Chips from "./Chips.vue"
import DialogBody from "./DialogBody.vue"
const { colors } = require("../assets/data/colors.json")

export default {
  components: {
    DialogBody,
    Card,
    Chips
  },
  props: {
    id: {
      type: String,
      required: true,
      validator: function() {
        return true
      }
    },
    title: {
      type: String,
      required: true,
      validator: function() {
        return true
      }
    },
    cardText: {
      type: String,
      required: true,
      validator: function() {
        return true
      }
    },
    messages: {
      type: Array,
      required: false,
      default: () => []
    },
    tags: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data() {
    return {
      isMessagesShow: false,
      isLike: false,
      buttonText: "Show Dialog"
    }
  },
  computed: {
    color: (function() {
      const length = colors.length
      return function() {
        let seed = this.cardText.slice(0, 5)
        seed = seed.split("").map(x => {
          return x.charCodeAt(0)
        })
        seed = seed.reduce((x, y) => {
          return x + y
        }, 6)
        seed %= length
        return colors[seed]
      }
    })(),
    isMessagesLoading() {
      return this.$store.getters["messages/isLoading"](
        this.$store.getters["userList/messagesId"](this.id)
      )
    },
    messagesId() {
      return this.$store.getters["userList/messagesId"](this.id)
    }
  },
  methods: {
    toggleDialogVisibility() {
      this.isMessagesShow = !this.isMessagesShow
      this.buttonText = this.isMessagesShow ? "Hide Dialog" : "Show Dialog"
      if (this.isMessagesShow) {
        this.$store.dispatch("messages/fetchMessagesAsync", {
          id: this.messagesId
        })
      } else {
        this.$store.dispatch("messages/unsubscribeListenerAsync", {
          id: this.messagesId
        })
      }
    },
    sendMessage(message) {
      this.$store.dispatch("messages/updateMessagesAsync", {
        id: this.messagesId,
        message: {
          author_id: this.$store.getters["user/userId"],
          text: message
        }
      })
      this.$nextTick(function() {
        const container = this.$el.querySelector(`#dialog_${this.messagesId}`)
        container.scrollTop = container.scrollHeight // нужно протестировать
      })
    },
    deleteCard() {
      this.$emit("deleteItem", this.id)
    }
  }
}
</script>


<style>
.messagesWrapper {
  display: flex;
  justify-content: center;
}
</style>
