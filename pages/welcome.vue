<template>
  <v-layout align-center justify-center column fill-height>
    <div v-if="$device.isMobile" class="mobileWrapper">
      <div class="mobileLanguageSelector"><LanguageSelector /></div>
      <ScroollingPages :count="2" >
        <template v-slot:page0><Welcome /></template>
        <template v-slot:page1><Introduction /></template>
      </ScroollingPages>
    </div>
    <div v-if="$device.isDesktop" class="desktopWrapper">
      <div class="desktopLanguageSelector"><LanguageSelector /></div>
      <DesktopWelcome/>
    </div>

  </v-layout>
</template>

<script>
import ScroollingPages from "../components/ScroollingPages"
import Welcome from "../components/Welcome"
import Introduction from "../components/Introduction"
import LanguageSelector from "@/components/LanguageSelector"
import DesktopWelcome from "@/components/DesktopWelcome"

export default {
  components: {
    ScroollingPages,
    Welcome,
    Introduction,
    LanguageSelector,
    DesktopWelcome
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

.desktopWrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.desktopLanguageSelector {
  display: flex;
  justify-content: center;
}

.mobileLanguageSelector {
  z-index: 10;
  position: fixed;
  top: 10px;
}
</style>
>
