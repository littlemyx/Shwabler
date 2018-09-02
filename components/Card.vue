<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-slide-y-transition>
        <v-card v-bind:color="color" class="white--text darken-3 card">
          <v-card-title primary-title>
            <slot name="header"></slot>
          </v-card-title>

          <v-slide-y-transition>
            <v-card-text>
              <slot></slot>
            </v-card-text>
          </v-slide-y-transition>

          <v-card-actions>
            <slot name="footer"></slot>
          </v-card-actions>

        </v-card>
      </v-slide-y-transition>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: false,
      validator: function (value) {
        return true;
      }
    }
  },
  data () {
    return {
    };
  }
}
</script>
