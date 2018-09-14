<template>
  <v-layout>
    <v-textarea
      v-bind:dark="dark"
      v-bind:color="color"
      name="input-7-1"
      v-bind:label="label"
      auto-grow
      v-bind:counter="counter"
      v-bind:value="value"
      @input="input"
      @change="change"
    ></v-textarea>
  </v-layout>
</template>

<script>
export default {
  props: {
    dark: {
      type: Boolean,
      required: false,
      default: true
    },
    label: {
      type: String,
      required: false,
      default: ''
    },
    color: {
      type: String,
      required: false,
      default: 'white'
    },
    counter: {
      type: Number,
      required: false,
      default: 100
    },
    value: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {

    }
  },
  methods: {
    change (val) {
      // console.log(val);
    },
    input (val) {
      this.$emit('input', val);
    }
  }
}
</script>
