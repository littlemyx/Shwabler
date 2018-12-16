<template>
  <v-layout>
    <Card :color="color">
      <div slot="header">
        <h3 class="headline mb-0">{{ title }}</h3>
        <div>{{ cardText }}</div>
      </div>

      <Chips v-if="tags.length" slot="chips" :list="tags" :disabled="true"/>

      <DialogBody v-show="isShow" :id="id" :messages="messages" :color="color" @sendMessage="sendMessage"/>

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
      type: Number,
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
      isShow: false,
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
    })()
  },
  mounted: function() {},
  methods: {
    toggleDialogVisibility() {
      this.isShow = !this.isShow
      this.buttonText = this.isShow ? "Hide Dialog" : "Show Dialog"
      this.$nextTick(function() {
        const container = this.$el.querySelector(`#dialog_${this.id}`)
        container.scrollTop = container.scrollHeight
      })
    },
    sendMessage(message) {
      this.$store.dispatch("userList/updateCardMessageListAsync", {
        id: this.id,
        author: this.$store.getters["user/activeUser"],
        text: message
      })
      this.$nextTick(function() {
        const container = this.$el.querySelector(`#dialog_${this.id}`)
        container.scrollTop = container.scrollHeight
      })
    }
  }
}
</script>
