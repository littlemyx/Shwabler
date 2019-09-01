<template>
  <v-app id="centered">
    <v-content>
      <v-container fluid fill-height pa-0>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<style>
>>> .application--wrap {
  min-height: 87vh !important;
}
</style>
