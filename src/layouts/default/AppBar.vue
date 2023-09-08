<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-icon icon="mdi-circle-slice-6" />
      App
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn @click="store.logout">
      Logout
    </v-btn>

  </v-app-bar>
</template>

<script setup>
import { useAppStore } from '@/store/app'
const store = useAppStore()


</script>
