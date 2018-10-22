<template>
  <div>
    <v-chip v-for="(value, key) in chipsList" :key="key" v-model="chipsList[key]" close outline small>{{ key }}</v-chip>
  </div>
</template>

<script>
export default {
  props: {
    existed: {
      type: Object,
      required: false,
      default: () => {}
    },
    list: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data() {
    return {
      chipsList: {
        monday: true,
        friday: true,
        sunday: true
      }
    }
  },
  computed: {
    existedList() {
      return this.$store.state.chips.chipsList
    }
  },
  methods: {
    close: () => {
      let x = 5
      x = x + 4
      return x
    }
  }
}
</script>
