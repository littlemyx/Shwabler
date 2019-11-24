<template>
  <v-layout>
    <Card :color="color">
      <div slot="controlItems" class="controlsWrapper">
        <v-tooltip v-if="hasNewMessage" transition="scale-transition" bottom>
          <template v-slot:activator="{ on }">
            <v-icon class="newMessageAlert" medium dark v-on="on">message</v-icon>
          </template>
          <span>{{ $t("new_message") }}</span>
        </v-tooltip>
        <v-tooltip transition="scale-transition" bottom>
          <template v-slot:activator="{ on }">
            <v-btn flat icon color="#fff" class="deleteIcon" @click="deleteCard" v-on="on">
              <v-icon medium light >clear</v-icon>
            </v-btn >
          </template>
          <span>{{ $t("delete") }}</span>
        </v-tooltip>
       
      </div>
      

      

      <div slot="header">
        <h3 class="headline mb-0">{{ title }}</h3>
        <div>{{ cardText }}</div>
      </div>

      
      <TagList 
        slot="chips"
        :preselected_tags="selectedTags" 
        :editable="false" 
        :addable="false" 
        :id="id"
      />

      <div class="messagesWrapper">
        <v-btn :color="color" dark class="lighten-1 messagesToggler" block @click="toggleDialogVisibility">
          {{ isMessagesShow ? $t("hide_dialog") : $t("show_dialog") }}
        </v-btn>
        <template v-if="isMessagesShow">
          <div v-if="isMessagesLoading" class="mesageLoaderWrapper">
            <v-progress-circular
           
              :size="60"
              :width="7"
              color="white"
              indeterminate
            />
          </div>
          <DialogBody v-else :key="messagesId" :id="messagesId" :messages="messages" :color="color" :is-loading="isMessagesLoading" @sendMessage="sendMessage"/>
        </template>
        
      </div>
      
    </Card>
  </v-layout>
</template>

<script>
import Card from "./Card.vue"
import TagList from "./Tags"
import DialogBody from "./DialogBody.vue"
const { colors } = require("../assets/data/colors.json")

export default {
  components: {
    DialogBody,
    Card,
    TagList
  },
  props: {
    id: {
      type: String,
      required: true,
      validator: function() {
        return true
      }
    },
    title: {
      type: String,
      required: true,
      validator: function() {
        return true
      }
    },
    cardText: {
      type: String,
      required: true,
      validator: function() {
        return true
      }
    },
    messages: {
      type: Array,
      required: false,
      default: () => []
    },
    tags: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data() {
    return {
      isMessagesShow: false,
      isLike: false
    }
  },
  computed: {
    color: (function() {
      const length = colors.length
      return function() {
        let seed = this.cardText.slice(0, 5)
        seed = seed.split("").map(x => {
          return x.charCodeAt(0)
        })
        seed = seed.reduce((x, y) => {
          return x + y
        }, 6)
        seed %= length
        return colors[seed]
      }
    })(),
    hasNewMessage() {
      return this.$store.getters["messagesNotification/checkNewMessageById"](
        this.id
      )
    },
    isMessagesLoading() {
      return this.$store.getters["messages/isLoading"](
        this.$store.getters["userList/messagesId"](this.id)
      )
    },
    messagesId() {
      return this.$store.getters["userList/messagesId"](this.id)
    },
    selectedTags() {
      let tags = {}
      this.tags.forEach(tag => {
        tags = { ...tags, ...tag }
      })
      return tags
    }
  },
  methods: {
    toggleDialogVisibility() {
      this.isMessagesShow = !this.isMessagesShow
      this.buttonText = this.isMessagesShow ? "Hide Dialog" : "Show Dialog"
      if (this.isMessagesShow) {
        this.$store.dispatch("messages/fetchMessagesAsync", {
          id: this.messagesId
        })
        this.$store.dispatch("messagesNotification/setMessagesCountAsync", {
          id: this.id
        })
      } else {
        this.$store.dispatch("messages/unsubscribeListenerAsync", {
          id: this.messagesId
        })
      }
    },
    sendMessage(message) {
      this.$store.dispatch("messages/updateMessagesAsync", {
        id: this.messagesId,
        message: {
          author_id: this.$store.getters["user/userId"],
          text: message
        }
      })
      this.$nextTick(function() {
        const container = this.$el.querySelector(`#dialog_${this.messagesId}`)
        container.scrollTop = container.scrollHeight // нужно протестировать
      })
    },
    deleteCard() {
      this.$emit("deleteItem", this.id)
    }
  }
}
</script>


<style>
.messagesWrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.messagesToggler {
  flex: 0 1 auto;
}
.mesageLoaderWrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.controlsWrapper {
  display: flex;
}
.newMessageAlert {
  cursor: default;
}
</style>
