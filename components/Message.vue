<template>
  <div>
    {{this.text}}
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
    }
  }
}
</script>
