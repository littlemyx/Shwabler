<template>
  <!-- <v-flex xs12 sm6 offset-sm3> -->
  <v-container fluid>
    <v-layout align-center justify-center column fill-height>
      <v-card class="wrapper_card">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email"
            color="dark-shwabler"
            validate-on-blur
            @keyup.enter.exact="submit"
          />
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            :type="'password'"
            color="dark-shwabler"
            label="Password"
            class="password"
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
            <v-btn @click="clear">clear</v-btn>
            <v-spacer/>
          </v-card-actions>
        </v-form>
      </v-card>
      <v-flex pt-3>
        <div class="footer">
          Already have an account ?&nbsp;<RouterLink url="login" text="Login!"/>
        </div>
      </v-flex>
    </v-layout>
    <NotificationsList :offset="{'top':'10px'}" top right/>
  </v-container>
</template>

<script>
// import axios from 'axios';
import { auth } from "@/services/fireinit.js"
import RouterLink from "../components/RouterLink"
import NotificationsList from "../components/NotificationsList"

export default {
  components: {
    RouterLink,
    NotificationsList
  },
  data: () => ({
    valid: true,
    email: "",
    text: "submit",
    isLoading: false,
    emailRules: [
      v =>
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v.trim()
        ) ||
        !v.trim() ||
        "E-mail must be valid"
    ],
    password: "",
    passwordRules: [
      v =>
        v.trim().length >= 6 ||
        !v.trim() ||
        "Password is required and must be longer then 6 symbols"
    ]
  }),

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.isLoading = true
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
            wrap.user.sendEmailVerification().then(
              function() {
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
          })
          .catch(
            function(error) {
              this.resetLoading()
              this.$store.commit("notifications/updateNotificationsList", [
                {
                  type: "error",
                  text: error.message,
                  id: error.code + new Date().getTime()
                }
              ])
            }.bind(this)
          )

        // this.$store.dispatch('user/signInWithGoogle').then(() => {
        //   console.log('inside then statement on login');
        // }).catch((e) => {
        //   console.log(e.message);
        // })
      }
    },

    resetLoading() {
      this.isLoading = false
    },
    clear() {
      // this.$refs.form.reset()
      this.$store.dispatch("user/signOut")
    }
  },
  layout: "centerLayout"
}
</script>

<style scoped>
.wrapper_card {
  width: 100%;
  max-width: 400px;
  padding: 10px;
}
.v-text-field__slot {
  letter-spacing: -6px;
}
.footer {
  display: flex;
}
</style>
