<template>
  <v-container fluid>
    <v-layout align-center justify-center column fill-height>
      <v-card class="wrapper_card">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            :label="$t('email') | capitalize"
            color="dark-shwabler"
            validate-on-blur
            @keyup.enter.exact="submit"
          />
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            :type="'password'"
            :label="$t('password') | capitalize"
            color="dark-shwabler"
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
              <span v-else>{{ $t("login") }}</span>
            </v-btn>
            <v-spacer/>
          </v-card-actions>
        </v-form>
      </v-card>
      <v-flex pt-3>
        <div class="footer">
          {{ $t("have_no_account_question") | capitalize }} ?&nbsp;<RouterLink :text="`${$t('signup')}!`" url="signup"/>
        </div>
      </v-flex>
      <span>{{ $t("orLogin") | uppercase }}</span>
      <v-flex>
        <v-btn color="#4267b2" @click="facebookAuth">
          <v-layout align-center justify-center row fill-height>
            <div class="facebookIcon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 216 216" class="_5h0m" color="#FFFFFF"><path fill="#FFFFFF" d="
          M204.1 0H11.9C5.3 0 0 5.3 0 11.9v192.2c0 6.6 5.3 11.9 11.9
          11.9h103.5v-83.6H87.2V99.8h28.1v-24c0-27.9 17-43.1 41.9-43.1
          11.9 0 22.2.9 25.2 1.3v29.2h-17.3c-13.5 0-16.2 6.4-16.2
          15.9v20.8h32.3l-4.2 32.6h-28V216h55c6.6 0 11.9-5.3
          11.9-11.9V11.9C216 5.3 210.7 0 204.1 0z"/></svg>
            </div>
            <div class="facebookText">
              {{ $t("continue_with_facebook") | capitalize }}
            </div>
          </v-layout>
        </v-btn>
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
                  id: error.code + new Date().getTime(),
                  autoClose: true
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
    facebookAuth() {
      const provider = new firebase.auth.FacebookAuthProvider()
      const router = this.$router
      const dispatch = this.$store.dispatch
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          console.log(result)
          if (result.additionalUserInfo.isNewUser) {
            dispatch("user/setUser", result.user, { root: "user" }).then(() => {
              dispatch("ban/addNewUser", {}, { root: "ban" })
              dispatch("settings/addNewUser", {}, { root: "settings" })
              dispatch(
                "messagesNotification/addNewUser",
                {},
                { root: "messagesNotification" }
              )
            })
          }
          router.push("/feed")
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          // var token = result.credential.accessToken
          // The signed-in user info.
          // var user = result.user
          // ...
        })
        .catch(function(error) {
          console.log(error)
          // Handle Errors here.
          // var errorCode = error.code
          // var errorMessage = error.message
          // // The email of the user's account used.
          // var email = error.email
          // // The firebase.auth.AuthCredential type that was used.
          // var credential = error.credential
          // ...
        })
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
.facebookIcon {
  display: flex;
}
.facebookText {
  font-family: Helvetica, Arial, sans-serif;
  color: white;
  margin-left: 10px;
  text-transform: none;
}
</style>
