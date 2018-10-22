<template>
  <v-layout>
    <Card :color="color">
      <div slot="header">
        <h3 class="headline mb-0">{{ title }}</h3>
        <div>{{ cardText }}</div>
      </div>

      <InputText 
        v-show="isShow"
        :error="inputError"
        :counter="count"
        :value="inputTextValue"
        :label="inputLabel"
        @input="input"
      />

      <div slot="footer" class="footer">
        <v-btn :color="color" fab dark class="darken-1 ml-3" @click="answer">
          <v-icon medium dark>{{ isLike ? 'done' : 'favorite' }}</v-icon>
        </v-btn>
        <v-spacer/>
        <v-btn :color="color" fab dark class="darken-1 mr-3" @click="dismiss">
          <v-icon medium dark>clear</v-icon>
        </v-btn>
      </div>
    </Card>
  </v-layout>
</template>

<script>
import InputText from "./InputText.vue"
import Card from "./Card.vue"
const { colors } = require("../assets/data/colors.json")

export default {
  components: {
    InputText,
    Card
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
    }
  },
  data() {
    return {
      inputTextValue: "",
      count: null,
      inputLabel: "",
      inputError: false,
      isShow: false,
      isLike: false,
      buttonText: "Show Dialog"
    }
  },
  computed: {
    color: function() {
      let seed = this.cardText.slice(0, 5)
      seed = seed.split("").map(x => {
        return x.charCodeAt(0)
      })
      seed = seed.reduce((x, y) => {
        return x + y
      }, 6)
      seed %= colors.length
      return colors[seed]
    }
  },
  methods: {
    answer() {
      if (this.isLike) {
        if (!this.inputTextValue.length) {
          this.inputError = true
          this.inputLabel = "Too short message!"
          return
        } else {
          let card = {
            title: this.title,
            text: this.cardText,
            messages: [
              {
                author: this.$store.getters["user/activeUser"],
                text: this.inputTextValue
              }
            ]
          }
          this.$emit("accept", card)
          this.inputTextValue = ""
        }
      }
      this.isShow = !this.isShow
      this.isLike = !this.isLike
    },
    dismiss() {
      console.log("dismiss")
      this.isShow = false
      this.isLike = false
      this.$emit("dismiss")
    },
    input(value) {
      this.inputError = false
      this.inputLabel = ""
      this.inputTextValue = value
    }
  }
}
</script>

<style scoped>
.footer {
  width: 100%;
  display: flex;
}
</style>
