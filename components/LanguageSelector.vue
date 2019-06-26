<template>
  <div class="languages">
    <span class="selectLanguage">{{ $t('select_language') | capitalize }}:</span>
    <div
      v-for="el in locales"
      :key="el.code"
      :class="{ active: (el.code === locale) }"
      class="language"
      @click="switchLanguage(el.code)"
    >
      <span>{{ el.name }}</span>
    </div>
  </div>
</template>


<script>
export default {
  computed: {
    locales() {
      return this.$store.state.locales
    },
    locale() {
      return this.$store.state.locale
    }
  },
  methods: {
    switchLanguage(localeCode) {
      // document.cookie = `locale=${localeCode}`
      // location.reload()
      this.$store.commit("SET_LANG", localeCode)
      document.cookie = `locale=${localeCode}`
      this._i18n.locale = this.$store.state.locale
    }
  }
}
</script>


<style scoped>
.languages {
  display: flex;
}
.selectLanguage {
  margin-right: 5px;
}

.language {
  margin-right: 5px;
  cursor: pointer;
}
.language.active {
  text-decoration: underline;
}
</style>
