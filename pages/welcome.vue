<template>
  <v-layout align-center justify-center column fill-height>
    <ScroollingPages :count="2" >
      <template v-slot:page0><Welcome /></template>
      <template v-slot:page1><Indroduction /></template>
    </ScroollingPages>
  </v-layout>
</template>

<script>
import ScroollingPages from "../components/ScroollingPages"
import Welcome from "../components/Welcome"
import Indroduction from "../components/Indroduction"
export default {
  components: {
    ScroollingPages,
    Welcome,
    Indroduction
  },
  methods: {
    logScroll() {
      this.$emit("scroll", "down")
    }
  },
  middleware: "index",
  layout: "centerLayout"
}
</script>

<style scoped>
.logoWrapper {
  position: relative;
}

.beta {
  position: absolute;
  top: 0;
  right: -26px;
}
</style>
>
