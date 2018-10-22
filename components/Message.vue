<template>
  <div :class="classObject">
    <div :class="['messageContent', 'darken-1', color]">
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: false,
      default: "black"
    }
  },
  computed: {
    classObject() {
      return {
        messageWrapper: true,
        messageAuthor: this.author === this.$store.getters["user/activeUser"]
      }
    }
  }
}
</script>

<style scoped>
.messageWrapper {
  display: flex;
  width: 100%;
}
.messageAuthor {
  justify-content: flex-end;
}
.messageContent {
  margin-bottom: 3px;
  padding: 5px;
  display: block;
  background-color: peru;
  border-radius: 5px;
}
</style>
