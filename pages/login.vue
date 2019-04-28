<template>
  <v-container fluid>
    <v-layout align-center justify-center column fill-height>
      <v-card class="wrapper_card">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            color="dark-shwabler"
            label="Email"
            validate-on-blur
            @keyup.enter.exact="submit"
          />
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            :type="'password'"
            color="dark-shwabler"
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
      <v-flex pt-3>
        <div class="footer">
          Don't have an account yet ?&nbsp;<RouterLink url="signup" text="Sign up!"/>
        </div>
      </v-flex>
    </v-layout>
    <NotificationsList :offset="{'top':'10px'}" top right/>
    
  </v-container>
</template>

<script>
// import axios from 'axios';
import firebase from "firebase"
import RouterLink from "../components/RouterLink"
import NotificationsList from "../components/NotificationsList"

export default {
  components: {
    RouterLink,
    NotificationsList
  },
  data: () => ({
    valid: true,
    text: "login",
    isLoading: false,
    email: "",
    emailRules: [
      v =>
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v.trim()
        ) ||
        !v ||
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
  // beforeRouteLeave(to, from, next) {
  //   console.log(to, from, next)
  //   this.$store.dispatch(storeInitialize(to))
  //   next()
  // },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        // <!-- TODO блокировать когда идёт загрузка -->
        this.isLoading = true
        const resetLoading = this.resetLoading
        const store = this.$store
        firebase
          .auth()
          .signInWithEmailAndPassword(
            this.email.toLowerCase().trim(),
            this.password
          )
          .then(
            () => {
              resetLoading()
              this.$router.push("/feed")
            },
            function(error) {
              resetLoading()
              store.commit("notifications/updateNotificationsList", [
                {
                  type: "error",
                  text: error.message,
                  id: error.code + new Date().getTime()
                }
              ])
            }
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
.footer {
  display: flex;
}
</style>
