<template>
  <div class="wrapper" >
    <div v-for="pageNumber in pages" :key="pageNumber" class="page">
      <slot :name="`page${pageNumber}`" >
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
    synteticScrollHandler(direction) {
      if (direction === "down") {
        this.scrollToNextPage()
      } else {
        this.scrollTopreviousPage()
      }
    },
    handleScroll() {
      if (
        !this.isScrolling &&
        Math.abs(this.$el.scrollTop - this.topOffset) > 60
      ) {
        const delta = this.$el.scrollTop - this.topOffset
        if (delta > 0) {
          this.scrollToNextPage()
        } else {
          this.scrollTopreviousPage()
        }
      }
    },
    scrollToNextPage() {
      this.pageNumber += 1
      this.isScrolling = true
      return scrollSmooth(this.$el.clientHeight * this.pageNumber, {
        element: this.$el
      }).then(() => {
        this.isScrolling = false
        this.topOffset = this.$el.scrollTop
      })
    },
    scrollTopreviousPage() {
      this.pageNumber -= 1
      this.isScrolling = true
      return scrollSmooth(this.$el.clientHeight * this.pageNumber, {
        element: this.$el
      }).then(() => {
        this.isScrolling = false
        this.topOffset = this.$el.scrollTop
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
