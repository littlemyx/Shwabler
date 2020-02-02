<template>
  <v-layout align-center justify-center column fill-height>
    <div class="languageSelector"><LanguageSelector /></div>
    <ScroollingPages :count="2" >
      <template v-slot:page0><Welcome /></template>
      <template v-slot:page1><Introduction /></template>
    </ScroollingPages>
  </v-layout>
</template>

<script>
import ScroollingPages from "../components/ScroollingPages"
import Welcome from "../components/Welcome"
import Introduction from "../components/Introduction"
import LanguageSelector from "@/components/LanguageSelector"

export default {
  components: {
    ScroollingPages,
    Welcome,
    Introduction,
    LanguageSelector
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

.languageSelector {
  z-index: 10;
  position: fixed;
  top: 10px;
}
</style>
>
