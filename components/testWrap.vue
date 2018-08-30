<template>
  <div>
    TestComp lower
    <testComp>
      <p>123</p>
    </testComp>
  </div>
</template>

<script>
import testComp from '../components/testComp.vue';

export default {
  components: {
    testComp
  }
}
</script>
