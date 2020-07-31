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
          :id="item.id"
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
        <v-list-tile id="exit" @click="exit">
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
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo-purple" dark fixed app>
      <v-toolbar-side-icon v-if="!drawer" @click.stop="drawer = !drawer" />
      <v-toolbar-title>SHWABLER</v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items>
        <v-btn flat @click="exitTutorialHandler">{{ $t("exit_tutorial") }}</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
      <NotificationsList :offset="{ top: '56px' }" top right />
    </v-content>
    <v-footer color="grey" class="appFooter" app>
      <div class="logo">
        <span class="white--text">Made by</span>
        &nbsp;
        <span class="white--text digitalText">
          <a class="teamLink" href="http://631am.com/" target="_blank">
            6
            <span class="blinking">
              :
            </span>
            31 AM
          </a>
        </span>
      </div>
    </v-footer>
    <TutorialTooltip/>

    <v-dialog
      v-model="closeTutorialModel"
      width="500"
      max-width="90vw"
    >
      
      <v-card>
        <v-card-title
          class="headline shwabler darken-3 exitTitle"
          primary-title
        >
          {{ $t("exit_tutorial_title") }}
        </v-card-title>

        <v-card-text>
          {{ $t("exit_tutorial_text") }}
        </v-card-text>

        <v-divider/>

        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="shwabler"
            flat
            @click="dislineExit"
          >
            {{ $t("continue_tutorial") }}
          </v-btn>
          <v-btn
            color="shwabler"
            flat
            @click="acceptExit"
          >
            {{ $t("exit_tutorial") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
    
</template>

<script>
import NotificationsList from "@/components/NotificationsList"
import LanguageSelector from "@/components/LanguageSelector"
import TutorialTooltip from "@/components/Tutorial/TutorialTooltip"

export default {
  components: {
    NotificationsList,
    LanguageSelector,
    TutorialTooltip
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
      rightDrawer: false,
      // popUpped: [],
      closeTutorialModel: false
    }
  },
  computed: {
    unreadCount() {
      const count = this.$store.getters["messagesNotification/newMessagesCount"]
      return count ? `: ${count}` : ""
    },
    popupedElementIds() {
      return this.$store.getters["tutorial/popupedElementIds"]
    },
    items() {
      return [
        {
          icon: "email",
          id: "feed",
          title: this.$t("feed"),
          to: "/app/tutorial/feed",
          isAuth: true
        },
        {
          icon: "list",
          id: "cards",
          title: this.$t("my_cards"),
          to: "/app/tutorial/cards",
          isAuth: true
        },
        {
          icon: "chat",
          id: "dialogs",
          title: this.$t("dialogs"),
          to: "app//tutorial/dialogs",
          isAuth: true
        },
        {
          icon: "settings",
          id: "settings",
          title: this.$t("settings.settings_name"),
          to: "/app/settings",
          isAuth: true
        },
        {
          icon: "help_outline",
          id: "help",
          title: this.$t("help.help_name"),
          to: "/help",
          isAuth: true
        },
        {
          icon: "apps",
          id: "login",
          title: this.$t("login"),
          to: "/tutorial/login",
          isAuth: false
        },
        {
          icon: "apps",
          id: "signup",
          title: this.$t("signup"),
          to: "/signup",
          isAuth: false
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
  // watch: {
  //   popupedElementIds: function(newValue) {
  //     this.popUpped.forEach(
  //       item => (document.querySelectorAll(item)[0].style.zIndex = "")
  //     )
  //     this.popUpped = newValue
  //     this.popUpped.forEach(
  //       item => (document.querySelectorAll(item)[0].style.zIndex = 100)
  //     )
  //   }
  // },
  mounted() {
    // eslint-disable-next-line no-undef
    if (this.$route.path !== this.$store.getters["tutorial/appState"].route) {
      this.$router.replace(this.$store.getters["tutorial/appState"].route)
    }
  },
  middleware({ store, route, redirect }) {
    // If the user is not authenticated
    if (
      !["/tutorial/feed", "/tutorial/cards", "/tutorial/dialogs"].some(str =>
        route.path.includes(str)
      )
      // TODO replace with generic list
    ) {
      return redirect(store.getters["tutorial/appState"].route)
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
    },
    acceptExit() {
      this.$store.commit("settings/setSettings", { isFirstTime: false })
      // this.$store.dispatch("settings/set")
      this.$router.push("/feed")
    },
    dislineExit() {
      this.closeTutorialModel = false
    },
    exitTutorialHandler() {
      this.closeTutorialModel = true
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

.exitTitle {
  color: #fff;
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
