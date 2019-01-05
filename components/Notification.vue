<template>
  <div :class="classObject" class="notification" @click="close">
    <div class="text">
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      message: ""
    }
  },
  computed: {
    classObject() {
      return { [this.type]: true }
    }
  },
  methods: {
    close() {
      this.$emit("close", this.id)
    }
  }
}
</script>

<style scoped>
.notification {
  border-radius: 3px;
  cursor: pointer;
  user-select: none;
  padding: 10px;
}
.text {
  color: white;
}
</style>
