import { defineStore } from 'pinia'
import { useFirebaseAuth } from 'vuefire'
import router from '@/router'
import { useCollection, useDocument, getCurrentUser } from 'vuefire'
import { storage } from "@/plugins/firebase"
import { ref as storageRef, uploadBytes, getBytes, getBlob, deleteObject } from "firebase/storage"

function userPath(user) {
  return `users/${user.uid}/images`
}

export const useFilesStore = defineStore('files', {
  state: () => ({
    profileImage: '',
  }),
  getters: {
  },
  actions: {
    async uploadProfileImage(files) {
      if(files) {
        const user = await getCurrentUser()
        if(user) {
          const file = files[0]
          const profileRef = storageRef(storage, `${userPath(user)}/profile.jpg`)
          await uploadBytes(profileRef, file)
          await this.getProfileImage()
        }
      }
    },
    async getProfileImage() {
      const user = await getCurrentUser()
      if(user) {
        const profileRef = storageRef(storage, `${userPath(user)}/profile.jpg`)
        try {
          const result = await getBlob(profileRef)
          var objectURL = URL.createObjectURL(result);
          this.profileImage = objectURL
        } catch(error) {
          console.log('File not found')
        }
      }
    },
    async deleteProfileImage() {
      const user = await getCurrentUser()
      if(user) {
        const profileRef = storageRef(storage, `${userPath(user)}/profile.jpg`)
        const result = await deleteObject(profileRef)
        this.profileImage = ''
      }
    },
  },
})