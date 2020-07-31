<template>
  <v-dialog
    v-model="model"
    persistent
    width="500"
    max-width="90vw"
  >
      
    <v-card>
      <v-card-title
        class="headline shwabler darken-3 welcomeTitle"
        primary-title
      >
        {{ $t("welcome_to") | capitalize }} Shwabler!
      </v-card-title>

      <v-card-text>
        {{ $t("welcome_text") }}
      </v-card-text>

      <v-divider/>

      <v-card-actions>
        <v-btn
          color="shwabler"
          flat
          @click="closeClickHandler"
        >
          {{ $t("no_thank_you") }}
        </v-btn>
        <v-btn
          color="shwabler"
          flat
          @click="showClickHandler"
        >
          {{ $t("show_me") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
export default {
  props: {
    model: {
      type: Boolean,
      required: true
    },
    close: {
      type: Function,
      required: true
    }
  },
  methods: {
    showClickHandler() {
      this.$store.dispatch("settings/setSettingsAsync", { isFirstTime: false })
      // this.$store.dispatch("settings/set")
      this.$router.push("/app/tutorial/feed")
    },
    closeClickHandler() {
      this.$store.dispatch("settings/setSettingsAsync", { isFirstTime: false })
      this.close()
    }
  }
}
</script>

<style scoped>
.welcomeTitle {
  color: #fff;
}
</style>
