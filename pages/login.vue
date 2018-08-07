<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="name"
      :rules="nameRules"
      label="Name"
    ></v-text-field>
    <v-text-field
      v-model="password"
      :rules="passwordRules"
      label="Password"
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      @click="submit"
    >
      submit
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
</template>

<script>
  // import axios from 'axios';
  import firebase from 'firebase';

  export default {
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => true // !!v || 'Name is required'
      ],
      password: '',
      passwordRules: [
        v => true // (v && v.length) || 'Password is required'
      ]
    }),

    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          // axios.post('/api/submit', {
          //   name: this.name,
          //   email: this.email,
          //   select: this.select,
          //   checkbox: this.checkbox
          // })
          firebase.auth().signInWithEmailAndPassword(this.name, this.password).then(
            (user) => {
              console.log(user);
              this.$router.push('/posts');
            },
            function (error) {
              alert(`oops! ${error}`);
            }
          )
          // this.$store.dispatch('user/signInWithGoogle').then(() => {
          //   console.log('inside then statement on login');
          // }).catch((e) => {
          //   console.log(e.message);
          // })
        };
      },
      clear () {
        // this.$refs.form.reset()
        this.$store.dispatch('user/signOut');
      }
    }
  }
</script>
