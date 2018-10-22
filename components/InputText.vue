<template>
  <v-layout>
    <v-textarea
      :dark="dark"
      :color="color"
      :label="label"
      :error="error"
      :counter="counter"
      :value="value"
      name="input-7-1"
      auto-grow
      @input="input"
    />
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
    error: {
      type: Boolean,
      required: false,
      default: false
    },
    label: {
      type: String,
      required: false,
      default: ""
    },
    color: {
      type: String,
      required: false,
      default: "white"
    },
    counter: {
      type: Number,
      required: false,
      default: null
    },
    value: {
      type: String,
      required: false,
      default: ""
    }
  },
  data() {
    return {}
  },
  methods: {
    input(val) {
      this.$emit("input", val)
    }
  }
}
</script>
