<template>
  <div>
    <CaveList :cards="cards" @deleteItem="deleteItem"/>

    <v-btn fab dark class="add dark-gray mr-3" @click="openDialog">
      <v-icon class="addIcon" medium dark>add</v-icon>
    </v-btn>

    <v-dialog
      v-model="dialog"
      width="500"
    >
      <Card :new-card-values="newCard" :layoutedt-style="false" color="gray">
        <Chips slot="chips"/>

        <InputText 
          slot="header"
          :value="newCardTitle"
          :dark="false"
          :counter="50"
          label="Header of your card"
          @input="inputTitle"
        />

        <InputText 
          :value="newCardText"
          :dark="false"
          :counter="400"
          label="Main plot goes here"
          @input="inputText"
        />
      
        <template slot="footer">
          <v-spacer/>
          <v-btn
            color="primary"
            flat
            @click="cancel"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            flat
            @click="add"
          >
            Add
          </v-btn>
        </template>
      </Card>
    </v-dialog>
  </div>
</template>

<script>
import CaveList from "../components/CaveList.vue"
import Card from "../components/Card.vue"
import Chips from "../components/Chips.vue"
import InputText from "../components/InputText.vue"
import random from "@/services/random.js"
// <InputText label="Header of your card" slot-scope="head" slot="header" v-bind:value="head.value.title" v-bind:dark="false" v-bind:counter="50"/>
// <InputText label="Main plot goes here" v-model="newCard.text" v-bind:dark="false" v-bind:counter="400"/>
export default {
  components: {
    Card,
    CaveList,
    Chips,
    InputText
  },
  data() {
    return {
      dialog: false,
      newCard: {
        title: "",
        text: ""
      }
    }
  },
  // fetch({ store }) {
  //   // const list = require('../assets/data/caveList.json');
  //   // store.commit('cave/setCaveList', list);
  // },
  computed: {
    newCardTitle() {
      return this.$store.state.cave.newCardTitle
    },
    newCardText() {
      return this.$store.state.cave.newCardText
    },
    cards() {
      return this.$store.state.cave.caveList
    }
  },
  methods: {
    openDialog() {
      this.dialog = true
      this.$store.commit("cave/setNewCardTitle", "")
      this.$store.commit("cave/setNewCardText", "")
    },
    add() {
      const newPost = {
        id: random(103, 999),
        tags: [],
        title: this.newCardTitle,
        text: this.newCardText
      }
      this.dialog = false
      this.$store.dispatch("cave/addToCaveListAsync", [newPost])
    },
    cancel() {
      this.dialog = false
    },
    inputTitle(value) {
      this.$store.commit("cave/setNewCardTitle", value)
    },
    inputText(value) {
      this.$store.commit("cave/setNewCardText", value)
    },
    deleteItem(id) {
      this.$store.dispatch("cave/removeFromCaveListAsync", id)
    }
  },
  layout: "AppLayout"
}
</script>

<style scoped>
.add {
  position: fixed;
  bottom: 10vw;
  right: 1vw;
  opacity: 0.8;
}

.addIcon {
  line-height: 56px;
}

.add2 {
  position: fixed;
  bottom: 40px;
  right: 140px;
  opacity: 0.8;
}

.add:hover {
  opacity: 1;
}

.dialogHeader {
  width: 100%;
}

.footer {
  width: 100%;
}
</style>
