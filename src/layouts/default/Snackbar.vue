<template>
  <div class="text-center">
    <v-snackbar
      v-model="store.notifyOpen"
      :timeout="store.notifyTimeout"
    >
      {{ store.notifyText }}

      <template v-slot:actions>
        <v-btn
          color="blue"
          variant="text"
          @click="store.notifyOpen = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
import { useAppStore } from '@/store/app'

const store = useAppStore()
</script>