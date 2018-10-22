<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <div :class="color">
        some shitty text {{ colorProp }}
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import MessageCard from "../components/MessageCard.vue"

export default {
  components: {
    MessageCard
  },
  data() {
    return {
      card_text:
        "Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat."
    }
  },
  computed: {
    color: function() {
      return this.colorProp
    }
  }
}
</script>

<style>
.red {
  background-color: tomato;
}
.pink {
  background-color: violet;
}
.purple {
  background-color: purple;
}
.indigo {
  background-color: indigo;
}
.green {
  background-color: green;
}
</style>
