<template>
  <div class="body">
    <TagList 
      :incoming_items="incoming_items" 
      :preselected_tags="preselected_tags" 
      :placeholder="placeholder" 
      :editable="editable" 
      :addable="addable" 
      @selectTag="selectTag" 
      @deleteTag="deleteTag"
      @blurred="blurred"
    />
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
    deleteTag(event) {
      this.$emit("deleteTag", event)
    },
    blurred(event) {
      this.$emit("blurred", event)
    }
  }
}
</script>

<style scoped>
.body {
  width: 100%;
}
</style>
