<template>
  <v-layout>
    <Card :color="color">
      <div slot="header">
        <h3 class="headline mb-0">{{ title }}</h3>
        <div>{{ cardText }}</div>
      </div>

      <Chips v-if="tags.length" slot="chips" :list="tags" :disabled="true"/>

      <DialogBody v-show="isShow" :messages="messages" :color="color"/>

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
  methods: {
    toggleDialogVisibility() {
      this.isShow = !this.isShow
      this.buttonText = this.isShow ? "Hide Dialog" : "Show Dialog"
    },
    dismiss() {
      console.log("dismiss")
      this.isShow = false
      this.isLike = false
      this.$store.commit("waterfall/changeCard")
    }
  }
}
</script>
