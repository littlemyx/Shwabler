<template>
  <!-- <v-flex xs12 sm6 offset-sm3> -->
  <v-container fluid>
    <v-layout align-center justify-center column fill-height>
      <v-card class="wrapper_card">
        <RegisterForm />
      </v-card>
      <v-flex pt-3>
        <div class="footer">
          {{ $t("already_have_account_question") | capitalize }} ?&nbsp;<RouterLink
            :text="$t('login') | capitalize"
            url="login"
          />
        </div>
      </v-flex>
    </v-layout>
    <NotificationsList :offset="{ top: '10px' }" top right />
  </v-container>
</template>

<script>
import RouterLink from "../components/RouterLink"
import NotificationsList from "@/components/NotificationsList"
import RegisterForm from "@/components/RegisterForm"

export default {
  components: {
    RouterLink,
    NotificationsList,
    RegisterForm
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
