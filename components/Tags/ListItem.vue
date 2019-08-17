<template>
  <div class="listItemWrapper" @click="clickHandler">
    <slot name="item" />  
  </div>
</template>


<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  methods: {
    clickHandler() {
      this.$emit("itemClicked", this.id)
    }
  }
}
</script>

<style scoped>
.listItemWrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
