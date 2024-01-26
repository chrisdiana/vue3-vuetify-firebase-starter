// Utilities
import { defineStore } from 'pinia'
import { getAuth, signOut } from 'firebase/auth'
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
      const auth = getAuth()
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
