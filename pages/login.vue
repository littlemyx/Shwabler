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
  import axios from 'axios'

  export default {
    middleware: 'test',
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required'
      ],
      password: '',
      passwordRules: [
        v => (v && v.length) || 'Password is required'
      ]
    }),

    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          axios.post('/api/submit', {
            name: this.name,
            email: this.email,
            select: this.select,
            checkbox: this.checkbox
          })
        };
        this.$router.push('/posts')
      },
      clear () {
        this.$refs.form.reset()
      }
    }
  }
</script>
