<template>
  <div 
    :class="classObject" 
    @click="clickHandler"
  >
    <span class="text">{{ text | hashtagged }}</span>
    <v-icon v-if="deletable" class="cross" @click="crossClickHandler" v-html="close_icon"/>
  </div>
</template>

<script>
const { colors } = require("@/assets/data/colors.json")

export default {
  props: {
    text: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    event: {
      type: String,
      default: null
    },
    deletable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      close_icon: "close",
      colors
    }
  },
  computed: {
    classObject() {
      return ["tag", this.backgroundColor, "lightten-3"]
    },
    backgroundColor() {
      const codeAt1 = this.text.charCodeAt(0)
      const codeAt2 = this.text.charCodeAt(this.text.length - 1) || 1
      const code = (codeAt1 * codeAt2) % (this.colors.length - 1)
      return colors[code]
      // return { "background-color": `${colors[code - 1]} lighten-3` }
    }
  },
  methods: {
    clickHandler() {
      this.$emit("tagClicked", this.id)
    },
    crossClickHandler() {
      this.$emit("tagDeleted", this.id)
    }
  }
}
</script>

<style scoped>
.cross {
  cursor: pointer;
  font-size: 16px;
  margin: 4px;
  color: #fff;
}
.text {
  margin: 4px;
  padding: 0 12px;
}
.tag {
  height: 32px;
  border-radius: 2px;
  color: #fff;
  margin: 4px;
  align-items: center;
  display: inline-flex;
  vertical-align: middle;
  width: auto;
  outline: none;
}
</style>
