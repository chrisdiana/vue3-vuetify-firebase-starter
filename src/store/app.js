// Utilities
import { defineStore } from 'pinia'
import {
  signOut,
} from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'
import router from '@/router'



export const useAppStore = defineStore('app', {
  state: () => ({
    notifyOpen: false,
    notifyText: '',
    notifyTimeout: 2000,
    loading: false,
    user: null,
  }),
  getters: {
  },
  actions: {
    notify(text) {
      this.notifyText = text;
      this.notifyOpen = true;
    },
    logout() {
      const auth = useFirebaseAuth()
      return new Promise((resolve, reject) => {
        signOut(auth).then(res => {
          resolve(res)
          router.push('/login')
        })
        .catch(error => {
          reject(error)
        })
      });
    },
  },
})
