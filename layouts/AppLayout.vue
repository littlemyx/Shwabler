<template>
  <v-app id="inspire">
    <v-navigation-drawer
      :mini-variant.sync="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title v-text="user" />
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon
              class="closeArrow"
              @click.stop="drawer = !drawer"
              v-html="arrow_left"
            />
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile
          v-for="(item, i) in items"
          :to="item.to"
          :key="i"
          class="list"
          router
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon" />
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-if="item.to !== '/dialogs'" v-text="item.title.toUpperCase()"/>
            <div v-else >{{ item.title.toUpperCase() }}{{ unreadCount }}</div>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="exit">
          <v-list-tile-action>
            <v-icon v-html="exit_icon" />
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ $t("exit") | uppercase }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <LanguageSelector />
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile class="feedback">
          <v-list-tile-content>
            <v-list-tile-title>
              {{ $t("send_feedback") | capitalize }}
              <a class="feedbackEmail" href="mailto:feedback@shwabler.com">
                feedback@shwabler.com
              </a>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo-purple" dark fixed app>
      <v-toolbar-side-icon v-if="!drawer" @click.stop="drawer = !drawer" />
      <v-toolbar-title>SHWABLER</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
      <NotificationsList :offset="{ top: '56px' }" top right />
    </v-content>
    <v-footer color="grey" class="appFooter" app>
      <div class="logo">
        <span class="white--text">&copy;&nbsp;</span>
        <span class="white--text digitalText">
          <a class="teamLink" href="http://631am.com/" target="_blabk">
            6
            <span class="blinking">
              :
            </span>
            31 AM
          </a>
        </span>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import NotificationsList from "@/components/NotificationsList"
import LanguageSelector from "@/components/LanguageSelector"

export default {
  components: {
    NotificationsList,
    LanguageSelector
  },
  props: {
    source: {
      type: String,
      default: "black"
    }
  },
  data() {
    return {
      exit_icon: "exit_to_app",
      arrow_left: "arrow_left",
      clipped: false,
      drawer: null,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false
    }
  },
  computed: {
    unreadCount() {
      const count = this.$store.getters["messagesNotification/newMessagesCount"]
      return count ? `: ${count}` : ""
    },
    items() {
      return [
        { icon: "email", title: this.$t("feed"), to: "/feed", isAuth: true },
        {
          icon: "list",
          title: this.$t("my_cards"),
          to: "/cards",
          isAuth: true
        },
        {
          icon: "chat",
          title: this.$t("dialogs"),
          to: "/dialogs",
          isAuth: true
        },
        { icon: "apps", title: this.$t("login"), to: "/login", isAuth: false },
        {
          icon: "apps",
          title: this.$t("signup"),
          to: "/signup",
          isAuth: false
        },
        {
          icon: "settings",
          title: this.$t("settings"),
          to: "/settings",
          isAuth: true
        }
      ].filter(item => item.isAuth === !!this.$store.state.user.user)
    },
    user() {
      return this.$store.getters["user/activeUser"]
    },
    locales() {
      return this.$store.state.locales
    },
    locale() {
      return this.$store.state.locale
    }
  },
  methods: {
    exit() {
      this.$store.dispatch("user/signOut").then(() => {
        this.$store.dispatch("resetStore")
        this.$router.push("/login")
        console.log("exit applayout")
      })
    },
    generateMenuItem(item) {
      if (item.to === "/dialogs") {
        const count = this.$store.getters["messages/newMessagesCount"]
        return `${item.title.toUpperCase()}${count ? `: ${count}` : ""}`
      } else {
        return item.title.toUpperCase()
      }
    },
    switchLanguage(localeCode) {
      // document.cookie = `locale=${localeCode}`
      // location.reload()
      this.$store.commit("SET_LANG", localeCode)
      this._i18n.locale = this.$store.state.locale
    }
  }
}
</script>

<style>
@font-face {
  font-family: DS;
  src: url(/assets/fonts/DS-Digital.otf);
  src: url("../assets/fonts/DS-Digital.eot?#iefix&v=4.4.0")
      format("embedded-opentype"),
    url("../assets/fonts/DS-Digital.woff2?v=4.4.0") format("woff2"),
    url("../assets/fonts/DS-Digital.woff?v=4.4.0") format("woff"),
    url("../assets/fonts/DS-Digital.ttf?v=4.4.0") format("truetype"),
    url("../assets/fonts/DS-Digital.svg?v=4.4.0#futuranewbook") format("svg");
}

.feedback {
  position: absolute;
  bottom: 0;
}

.feedbackEmail {
  color: #a01259;
  text-decoration: none;
}

.closeArrow:hover {
  color: #842552;
}

.blinking {
  animation: blink 1s infinite;
}

.teamLink {
  color: inherit;
  text-decoration: none;
}

.digitalText {
  font-family: DS;
}

.appFooter {
  background-color: #45062e !important;
}

.logo {
  margin-left: 10px;
}

.list .v-list__tile--active {
  color: #a01259 !important;
}

@keyframes blink {
  0% {
    opacity: 1;
  }

  70% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>
>
