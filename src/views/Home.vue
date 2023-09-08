<template>
  <v-container>
    <v-responsive>
      <v-row>
        <v-col cols="3">
          <h1>Home</h1>
          <p>Protected content</p>
          <p>{{ user?.email }}</p>
          <v-img contain width="300" :src="filesStore.profileImage"></v-img>

          <v-file-input label="Profile image" 
            v-model="profileImage"></v-file-input>
          <v-btn @click="uploadProfileImage">Upload</v-btn>
          <v-btn @click="filesStore.deleteProfileImage" color="red">Delete</v-btn>
        </v-col>
        <v-col cols="9">
          <Widgets />
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAppStore } from '@/store/app'
import { useWidgetStore } from '@/store/widget'
import { useFilesStore } from '@/store/files'
import { useCurrentUser } from 'vuefire'
import Widgets from '@/components/Widgets.vue'

const user = useCurrentUser()
const appStore = useAppStore()
const widgetStore = useWidgetStore()
const filesStore = useFilesStore()
const profileImage = ref(null)

async function uploadProfileImage() {
  await filesStore.uploadProfileImage(profileImage.value)
  appStore.notify('Uploaded')
}

onMounted(async () => {
  await filesStore.getProfileImage()
})
</script>
