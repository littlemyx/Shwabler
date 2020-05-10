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
        <h3 class="headline mb-0">{{ $t(title) }}</h3>
        <div>{{ $t(cardText) }}</div>
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
          <DialogBody v-else id="tutorialDialog" key="tutorialDialog" :messages="messages" :color="color" :is-loading="isMessagesLoading" @sendMessage="sendMessage"/>
        </template>
        
      </div>
      
    </Card>
  </v-layout>
</template>

<script>
import Card from "@/components/Card.vue"
import TagList from "@/components/Tags"
import DialogBody from "@/components/Tutorial/DialogBody.vue"
const { colors } = require("@/assets/data/colors.json")

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
      return false
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
    },
    sendMessage(message) {
      this.$store.commit("tutorial/updateMessages", {
        newData: {
          author_id: this.$store.getters["user/userId"],
          date: {
            seconds: new Date().getSeconds(),
            nanoseconds: new Date().getMilliseconds()
          },
          text: message
        },
        cardNumber: 0,
        stepNumber: 4
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
