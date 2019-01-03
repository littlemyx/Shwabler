<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card class="wrapper_card">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email"
            validate-on-blur
            @keyup.enter.exact="submit"
          />
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            :type="'password'"
            label="Password"
            validate-on-blur
            @keyup.enter.exact="submit"
          />

          <v-card-actions>
            <v-spacer/>
            <v-btn
              :disabled="!valid"
              @click="submit"
            >
              
              <v-progress-circular
                v-if="isLoading"
                :size="20"
                :width="3"
                color="purple"
                indeterminate
              />
              <span v-else>{{ text }}</span>
            </v-btn>
            <v-spacer/>
          </v-card-actions>
        </v-form>
      </v-card>
      <div class="footer">
        Don't have an account yet ?&nbsp;<RouterLink url="signup" text="Sign up!"/>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
// import axios from 'axios';
import firebase from "firebase"
import RouterLink from "../components/RouterLink"

export default {
  components: {
    RouterLink
  },
  data: () => ({
    valid: false,
    text: "login",
    isLoading: false,
    email: "",
    emailRules: [
      v =>
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) ||
        !v ||
        "E-mail must be valid"
    ],
    password: "",
    passwordRules: [
      v =>
        v.length >= 6 ||
        !v ||
        "Password is required and must be longer then 6 symbols"
    ]
  }),

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        // <!-- TODO блокировать когда идёт загрузка -->
        this.isLoading = true
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(
            user => {
              this.isLoading = true
              console.log(user)
              this.$router.push("/waterfall")
            },
            function(error) {
              this.isLoading = true
              alert(`oops! ${error}`)
            }
          )
        // this.$store.dispatch('user/signInWithGoogle').then(() => {
        //   console.log('inside then statement on login');
        // }).catch((e) => {
        //   console.log(e.message);
        // })
      }
    },
    clear() {
      // this.$refs.form.reset()
      this.$store.dispatch("user/signOut")
    }
  }
}
</script>

<style scoped>
.wrapper_card {
  padding: 10px;
}
.footer {
  display: flex;
}
</style>
