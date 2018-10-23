<template>
  <v-layout>
    <v-flex :xs12="layoutedtStyle" :sm6="layoutedtStyle" :offset-sm3="layoutedtStyle">
      <v-slide-y-transition>
        <v-card :color="color" class="white--text darken-3 card">
          <div class="controlWrapper">
            <slot name="controlItems"/>
            <slot name="chips" />
          </div>
          
          <v-card-title primary-title>
            <slot :value="newCardValues" name="header" @input="headerInput"/>
          </v-card-title>

          <v-slide-y-transition>
            <v-card-text>
              <slot :value="newCardValues" @input="textInput"/>
            </v-card-text>
          </v-slide-y-transition>

          <v-card-actions>
            <slot name="footer"/>
          </v-card-actions>

        </v-card>
      </v-slide-y-transition>
    </v-flex>
  </v-layout>
</template>

<script>
import Chips from "./Chips"

export default {
  components: {
    Chips
  },
  props: {
    layoutedtStyle: {
      type: Boolean,
      required: false,
      default: true
    },
    color: {
      type: String,
      required: false,
      validator: function() {
        return true
      },
      default: "black"
    },
    newCardValues: {
      type: Object,
      required: false,
      validator: function() {
        return true
      },
      default: () => {}
    }
  },
  data() {
    return {
      chips: {}
    }
  },
  methods: {
    headerInput($event) {
      this.newCardValues.title = $event.target.value
    },
    bodyInput($event) {
      this.newCardValues.text = $event.target.text
    }
  }
}
</script>

<style scoped>
.controlWrapper {
  display: flex;
  flex-direction: row-reverse;
}
</style>
