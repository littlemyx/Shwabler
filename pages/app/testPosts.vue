<template>
  <div>
    <TestCard :color-prop="color"/>
    <button @click="goBack">
      Back
    </button>
  </div>
</template>

<script>
import TestCard from "@/components/TestCard.vue"
const { colors } = require("@/assets/data/colors.json")

export default {
  components: {
    TestCard
  },
  computed: {
    color: function() {
      const length = colors.length
      const ret =
        colors[Math.round(-0.5 + Math.random() * length)] + " darken-3"
      return ret
    }
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/")
    }
  }
}
</script>
