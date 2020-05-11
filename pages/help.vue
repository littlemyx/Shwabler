<template>
  <div>
    <div class="tutorial">
      <div class="title">
        {{ $t("help.tutorial") | capitalize }}
      </div>
      <v-btn depressed dark small color="shwabler" @click="tryAgain">{{ $t("try_again")|uppercase }}</v-btn>
    </div>
    <div class="feedback">
      <div class="title">
        {{ $t("help.feedback") | capitalize }}
      </div>
      <v-btn depressed dark small color="shwabler" @click="openFeedbackWindow">{{ $t("help.send_feedback")|uppercase }}</v-btn>
      <div class="feedback_link">
        {{ $t("help.also_send_feedback_to") | capitalize }}
        <a class="feedbackEmail" href="mailto:feedback@shwabler.com">
          feedback@shwabler.com
        </a>
      </div>
    </div>
    <v-dialog
      v-model="feedbackModel"
      width="500"
      max-width="90vw"
    >
      
      <v-card>
        <v-card-title
          class="headline shwabler darken-3 exitTitle"
          primary-title
        >
          {{ $t("help.send_feedback") | capitalize }}
        </v-card-title>

        <div class="text">
          <v-textarea
            v-model="textValue"
            color="shwabler"
            auto-grow
          />
          <v-checkbox
            v-model="isAnonymous"
            :label="$t('help.send_anonymously')"
            color="shwabler"
          />
        </div>

        <v-divider/>

        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="shwabler"
            flat
            @click="closeFeedbackWindow"
          >
            {{ $t("help.close") }}
          </v-btn>
          <v-btn
            color="shwabler"
            flat
            @click="sendFeedback"
          >
            {{ $t("help.send") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<router lang="yaml">
    path: /help
</router>

<script>
import sendFeedback from "@/services/feedback.js"
export default {
  data() {
    return { feedbackModel: false, textValue: "", isAnonymous: false }
  },
  computed: {
    notifications: {
      get() {
        return this.$store.getters["settings/notifications"]
      },
      set(value) {
        this.$store.commit("settings/setSettings", { notifications: value })
      }
    },
    isLoading() {
      return this.$store.getters["settings/isLoading"]
    },

    isSaving() {
      return this.$store.getters["settings/isSaving"]
    }
  },
  methods: {
    save() {
      this.$store.dispatch("settings/set", {
        notifications: this.notifications
      })
    },
    tryAgain() {
      this.$router.push("/tutorial/feed")
    },
    sendFeedback() {
      sendFeedback({
        text: this.textValue,
        author: this.$store.getters["user/userId"],
        email: this.$store.getters["user/activeUser"]
      })
      this.feedbackModel = false
    },
    closeFeedbackWindow() {
      this.feedbackModel = false
    },
    openFeedbackWindow() {
      this.feedbackModel = true
    }
  },
  layout: "AppLayout"
}
</script>

<style scoped>
.title {
  font-size: 48px;
}
.tutorial {
  margin-top: 16px;
}
.text {
  margin: 0 4px;
}
.feedback {
  margin-top: 16px;
}
.feedback_link {
  margin-top: 16px;
}
</style>
