<template>
  <v-layout align-center justify-center column fill-height>
    <div class="logoWrapper">
      <p>{{ $t("selling_text") }}</p>
    </div>
    
  </v-layout >
</template>

<script>
import RouterLink from "../components/RouterLink"
export default {
  components: {
    RouterLink
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
