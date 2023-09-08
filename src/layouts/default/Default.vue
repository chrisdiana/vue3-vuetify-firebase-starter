<template>
  <v-app>
    <v-overlay v-model="store.loading" class="align-center justify-center">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <default-bar v-if="user" />

    <default-view />
  </v-app>
</template>

<script setup>
  import DefaultBar from './AppBar.vue'
  import DefaultView from './View.vue'


  import { useCurrentUser } from 'vuefire'
  import { useAppStore } from '@/store/app'

const store = useAppStore()
  const user = useCurrentUser()
</script>
