<template>
  <div class="wrapper">
    <div class="contentWrapper">
      <WelcomeSlogan class="sloganWrapper"/>
    </div>
    <div class="registerWrapper">
      <div><p class="header">{{ $t("signup") }}</p></div>
      <RegisterForm class="form"/>
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
  methods: {}
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
</style>
