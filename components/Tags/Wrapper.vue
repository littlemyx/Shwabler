<template>
  <div class="body">
    <slot name="left"/>
    <TagList 
      :incoming_items="incoming_items"
      :preselected_tags="preselected_tags" 
      :placeholder="placeholder" 
      :editable="editable" 
      :addable="addable" 
      :init_value="init_value" 
      @selectTag="selectTag" 
      @tagAdd="tagAdd" 
      @deleteTag="deleteTag"
      @blurred="blurred"
      @valueChanged="valueChanged"
    />
    <slot name="right"/>
  </div>
</template>

<script>
import TagList from "./TagList"
export default {
  components: { TagList },
  props: {
    incoming_items: {
      type: Object,
      required: false,
      default: () => ({})
    },
    preselected_tags: {
      type: Object,
      required: false,
      default: () => ({})
    },
    placeholder: { type: String, required: false, default: () => "" },
    init_value: { type: String, required: false, default: () => "" },
    addable: { type: Boolean, default: true },
    editable: { type: Boolean, default: true }
  },
  data() {
    return {
      items: this.incoming_items
    }
  },
  methods: {
    selectTag(event) {
      this.$emit("selectTag", event)
    },
    tagAdd(event) {
      this.$emit("tagAdd", event)
    },
    deleteTag(event) {
      this.$emit("deleteTag", event)
    },
    blurred(event) {
      this.$emit("blurred", event)
    },
    valueChanged(event) {
      this.$emit("valueChanged", event)
    }
  }
}
</script>

<style scoped>
.body {
  width: 100%;
  display: flex;
}
</style>
