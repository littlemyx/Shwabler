<template>
  <div class="wrapper">
    <div class="contentWrapper">
      <WelcomeSlogan class="sloganWrapper"/>
    </div>
    <div class="registerWrapper">
      <div><p class="header">{{ $t("signup") }}</p></div>
      <RegisterForm class="form"/>
      <span>{{ $t("orLogin") | uppercase }}</span>
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
      <div class="footer">
        {{ $t("already_have_account_question") | capitalize }} ?&nbsp;<RouterLink
          :text="$t('login') | capitalize"
          url="login"
        />
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
import RegisterForm from "@/components/RegisterForm"
import WelcomeSlogan from "@/components/WelcomeSlogan"
import RouterLink from "@/components/RouterLink"

export default {
  components: { RegisterForm, WelcomeSlogan, RouterLink },
  data() {
    return {
      message: ""
    }
  },
  methods: {
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
    }
  }
}
</script>

<style scoped>
.wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
}

.sloganWrapper {
  padding: 16px;
  height: 100%;
}

.contentWrapper {
  flex-grow: 4;
}

.registerWrapper {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  box-sizing: content-box;
  border-left: 1px solid #dcdcdc;
}

.header {
  font-size: 20px;
  color: #842552;
}

.form {
  width: 100%;
}

.footer {
  padding-top: 16px;
}
.facebookText {
  font-family: Helvetica, Arial, sans-serif;
  color: white;
  margin-left: 10px;
  text-transform: none;
}
</style>
