<template>
  <div>
    <v-progress-circular
      v-if="isLoading"
      :size="20"
      :width="3"
      color="purple"
      indeterminate
    />
    <div v-else>
      <div class="title">
        {{ $t("settings.settings_name") | capitalize }}
      </div>
      <div>
        <v-switch v-model="notifications" :label="`${$t('notification_setting_label')}` | capitalize" ripple flat color="shwabler"/>
      </div>
      <div>
        <v-btn :loading="isSaving" depressed dark small color="shwabler" @click="save">{{ $t("save")|uppercase }}</v-btn>
      </div>
    </div>
  </div>
</template>

<router lang="yaml">
    path: /settings
</router>

<script>
export default {
  computed: {
    notifications: {
      get() {
        return this.$store.getters["settings/notifications"]
      },
      set(value) {
        this.$store.commit("settings/setSettings", { notifications: value })
      }
    },
    isLoading() {
      return this.$store.getters["settings/isLoading"]
    },

    isSaving() {
      return this.$store.getters["settings/isSaving"]
    }
  },
  methods: {
    save() {
      this.$store.dispatch("settings/set", {
        notifications: this.notifications
      })
    }
  },
  layout: "AppLayout"
}
</script>

<style scoped>
.title {
  font-size: 48px;
}
</style>
