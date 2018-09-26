<template>
  <v-layout>
    <v-flex v-bind:xs12="layoutedtStyle" v-bind:sm6="layoutedtStyle" v-bind:offset-sm3="layoutedtStyle">
      <v-slide-y-transition>
        <v-card v-bind:color="color" class="white--text darken-3 card">
          <slot name="controlItems"></slot>
          
          <v-card-title primary-title>
            <slot name="header" v-bind:value="newCardValues" v-on:input="headerInput"></slot>
          </v-card-title>

          <v-slide-y-transition>
            <v-card-text>
              <slot v-bind:value="newCardValues" v-on:input="textInput"></slot>
            </v-card-text>
          </v-slide-y-transition>

          <v-card-actions>
            <slot name="footer"></slot>
          </v-card-actions>

        </v-card>
      </v-slide-y-transition>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    layoutedtStyle: {
      type: Boolean,
      required: false,
      default: true
    },
    color: {
      type: String,
      required: false,
      validator: function (value) {
        return true;
      }
    },
    newCardValues: {
      type: Object,
      required: false,
      validator: function (value) {
        return true;
      }
    }
  },
  data () {
    return {
    };
  },
  methods: {
    headerInput ($event) {
      this.newCardValues.title = $event.target.value;
    },
    bodyInput ($event) {
      this.newCardValues.text = $event.target.text;
    }
  }
}
</script>
