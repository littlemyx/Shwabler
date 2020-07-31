<template>
  <Card color="dark-shwabler">
    <div slot="header" style="width:100%; text-align: center;">
      <h1>{{ text }}</h1>
    </div>
  </Card>
</template>

<script>
// import axios from 'axios';
import Card from "@/components/Card.vue"

export default {
  components: { Card },
  data() {
    return {
      text: "Check your email, we have send you a verification letter"
    }
  },
  layout: "AppLayout"
}
</script>
