<template>
    <div>
        <TestCard v-bind:colorProp="color"></TestCard>
        <button @click="goBack">
          Back
        </button>
    </div>
</template>

<script>
import TestCard from '../components/TestCard.vue';
const {colors} = require('../assets/data/colors.json');

export default {
  methods: {
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/');
    }
  },
  computed: {
    color: function () {
      const length = colors.length;
      const ret = colors[Math.round(-0.5 + Math.random() * (length))] + ' darken-3';
      return ret;
    }
  },
  components: {
    TestCard
  }
}
</script>