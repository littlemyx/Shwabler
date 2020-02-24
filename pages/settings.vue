<template>
  <div>
    <div>
      Settings
    </div>
    <div>
      <v-switch v-model="notifications" :label="`Switch 1: ${notifications.toString()}`" ripple flat color="shwabler"/>
    </div>
  </div>
</template>

<router lang="yaml">
    path: /settings
</router>

<script>
export default {
  data() {
    return {
      notifications: true
    }
  },

  layout: "AppLayout"
}
</script>
