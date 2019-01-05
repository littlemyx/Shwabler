<template>
  <div :class="classObject" :style="offset" >
    <Notification 
      v-for="notification in notifications" 
      :key="notification.id" 
      :type="notification.type"
      :id="notification.id"
      :text="notification.text"
      class="notification" 
      title="close"
      @close="close"
    />
  </div>
</template>

<script>
import Notification from "./Notification"

export default {
  components: {
    Notification
  },
  props: {
    top: {
      type: Boolean,
      required: false,
      default: false
    },
    right: {
      type: Boolean,
      required: false,
      default: false
    },
    bottom: {
      type: Boolean,
      required: false,
      default: false
    },
    left: {
      type: Boolean,
      required: false,
      default: false
    },
    offset: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  data() {
    return {
      message: ""
    }
  },
  computed: {
    notifications() {
      return this.$store.state.notifications.notificationsList
    },
    classObject() {
      return {
        notificationsWrapper: true,
        top: this.top,
        right: this.right,
        bottom: this.bottom,
        left: this.left
      }
    }
  },
  methods: {
    close(id) {
      this.$store.commit("notifications/deleteNotification", id)
    }
  }
}
</script>

<style scoped>
.notificationsWrapper {
  position: fixed;
  width: 200px;
  top: 0;
  right: 0;
}
.notification {
  margin-bottom: 5px;
}
.notificationsWrapper.top {
  margin-top: 10px;
}
.notificationsWrapper.right {
  margin-right: 10px;
}
.notificationsWrapper.bottom {
  margin-bottom: 10px;
}
.notificationsWrapper.left {
  margin-left: 10px;
}
</style>
