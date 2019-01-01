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
          />
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            :type="'password'"
            label="Password"
            class="password"
            validate-on-blur
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
            <v-btn @click="clear">clear</v-btn>
            <v-spacer/>
          </v-card-actions>
        </v-form>
      </v-card>
      <div class="footer">
        Already have an account ?&nbsp;<RouterLink url="login" text="Login!"/>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
// import axios from 'axios';
import { auth } from "@/services/fireinit.js"
import RouterLink from "../components/RouterLink"

export default {
  components: {
    RouterLink
  },
  data: () => ({
    valid: false,
    email: "",
    text: "submit",
    isLoading: false,
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
        // Native form submission is not yet supported
        // axios.post('/api/submit', {
        //   name: this.name,
        //   email: this.email,
        //   select: this.select,
        //   checkbox: this.checkbox
        // })
        auth
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(wrap => {
            wrap.user
              .sendEmailVerification()
              .then(
                function() {
                  console.log(wrap)
                  // auth.onAuthStateChanged(user => {
                  //   console.log(user)
                  //   // if (user) {
                  //   //   // setTimeout(function () {
                  //   //   store.dispatch("user/setUser", user)
                  //   //   store.commit("sidebar/authChanged", user)
                  //   //   // }, 10000);
                  //   // }
                  //   // return resolve()
                  // })
                  this.$router.push("/verification")
                }.bind(this)
              )
              .catch(function(error) {
                console.log(error)
              })
          })
          .catch(function(error) {
            alert(`oops! ${error}`)
          })
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
.v-text-field__slot {
  letter-spacing: -6px;
}
.footer {
  display: flex;
}
</style>
