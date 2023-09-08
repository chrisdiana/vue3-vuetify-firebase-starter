<template>
  <v-main>
    <router-view />
    <Snackbar />
  </v-main>
</template>

<script setup>
import Snackbar from './Snackbar.vue'
</script>
