<template>
  <v-container
    id="input-usage"
    grid-list-xl
    fluid
  >
    <v-layout wrap>
      <v-flex xs12>
        <v-input>
          <v-text-field
            label="Regular"
          ></v-text-field>
        </v-input>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        text: ''
      }
    },
    methods: {
      appendIconCallback () {},
      prependIconCallback () {}
    }
  }
</script>
