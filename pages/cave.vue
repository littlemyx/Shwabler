<template>
<div>
  <CaveList v-bind:cards="cards" v-on:deleteItem="deleteItem"/>

  <v-btn fab dark @click="openDialog" class="add dark-gray mr-3">
      <v-icon medium dark>add</v-icon>
  </v-btn>

  <v-dialog
    v-model="dialog"
    width="500"
  >
    <Card color="gray" v-bind:newCardValues="newCard" v-bind:layoutedtStyle="false">
      <InputText 
        label="Header of your card"
        slot="header"
        v-bind:value="newCardTitle"
        v-on:input="inputTitle"
        v-bind:dark="false"
        v-bind:counter="50"
      />

      <InputText 
        label="Main plot goes here"
        v-bind:value="newCardText"
        v-on:input="inputText"
        v-bind:dark="false"
        v-bind:counter="400"
      />
      
      <template slot="footer">
        <v-spacer></v-spacer>
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
import CaveList from '../components/CaveList.vue';
import Card from '../components/Card.vue';
import InputText from '../components/InputText.vue';
// <InputText label="Header of your card" slot-scope="head" slot="header" v-bind:value="head.value.title" v-bind:dark="false" v-bind:counter="50"/>
// <InputText label="Main plot goes here" v-model="newCard.text" v-bind:dark="false" v-bind:counter="400"/>
export default {
  data () {
    return {
      dialog: false,
      newCard: {
        title: '',
        text: ''
      }
    }
  },
  fetch ({store}) {
    // const list = require('../assets/data/caveList.json');
    // store.commit('cave/setCaveList', list);
  },
  computed: {
    newCardTitle () { return this.$store.state.cave.newCardTitle; },
    newCardText () { return this.$store.state.cave.newCardText; },
    cards () { return this.$store.state.cave.caveList; }
  },
  methods: {
    openDialog () {
      this.dialog = true;
      this.$store.commit('cave/setNewCardTitle', '');
      this.$store.commit('cave/setNewCardText', '');
    },
    add () {
      const newPost = {
        id: 0,
        title: this.newCardTitle,
        text: this.newCardTitle
      };
      this.dialog = false;
      this.$store.dispatch('cave/addToCaveListAsync', [newPost]);
    },
    cancel () {
      this.dialog = false;
    },
    inputTitle (value) {
      this.$store.commit('cave/setNewCardTitle', value);
    },
    inputText (value) {
      this.$store.commit('cave/setNewCardText', value);
    },
    deleteItem (id) {
      this.$store.dispatch('cave/removeFromCaveListAsync', id)
    }
  },
  components: {
    Card,
    CaveList,
    InputText
  },
  layout: 'AppLayout'
}
</script>

<style scoped>
.add{
  position: fixed;
  bottom: 40px;
  right: 40px;
  opacity: 0.8;
}

.add2{
  position: fixed;
  bottom: 40px;
  right: 140px;
  opacity: 0.8;
}

.add:hover{
  opacity: 1;
}

.dialogHeader{
  width: 100%;
}

.footer{
  width: 100%;
}
</style>
