<template>
  <div class="wrapper">
    <div v-for="pageNumber in pages" :key="pageNumber" class="page">
      <slot :name="`page${pageNumber}`">
        slot name: {{ `page${pageNumber}` }}
      </slot>
    </div>
  </div>
</template>

<script>
import scrollSmooth from "@/services/smooth-scroll.js"
export default {
  props: {
    count: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      pageNumber: 0,
      topOffset: 0,
      isScrolling: false
    }
  },
  computed: {
    pages() {
      return [...Array(this.count).keys()]
    }
  },

  mounted() {
    this.$el.addEventListener("scroll", this.handleScroll)
  },

  created() {},
  destroyed() {
    this.$el.removeEventListener("scroll", this.handleScroll)
  },
  methods: {
    handleScroll() {
      if (
        !this.isScrolling &&
        Math.abs(this.$el.scrollTop - this.topOffset) > 60
      ) {
        this.isScrolling = true

        const delta = this.$el.scrollTop - this.topOffset
        if (delta > 0) {
          this.scrollToNextPage().then(() => {
            this.isScrolling = false
            this.topOffset = this.$el.scrollTop
          })
        } else {
          this.scrollTopreviousPage().then(() => {
            this.isScrolling = false
            this.topOffset = this.$el.scrollTop
          })
        }
      }
    },
    scrollToNextPage() {
      this.pageNumber += 1
      return scrollSmooth(this.$el.clientHeight * this.pageNumber, {
        element: this.$el
      })
    },
    scrollTopreviousPage() {
      this.pageNumber -= 1
      return scrollSmooth(this.$el.clientHeight * this.pageNumber, {
        element: this.$el
      })
    }
  }
}
</script>

<style scoped>
.page {
  width: 100%;
  height: 100%;
}
.wrapper {
  overflow-y: scroll;
  width: 100%;
  height: 100vh;
}
.wrapper::-webkit-scrollbar {
  width: 0 !important;
}
</style>
