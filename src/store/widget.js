import { defineStore } from 'pinia'
import { useCollection, useDocument, getCurrentUser } from 'vuefire'
import { collection, 
         doc, 
         addDoc, 
         updateDoc, 
         setDoc, 
         getDocs, 
         getDoc, 
         deleteDoc,
         serverTimestamp } from 'firebase/firestore'
import { db, logEventFirebase } from '@/plugins/firebase'


function userPath(user) {
  return `users/${user.uid}/widgets`
}

export const useWidgetStore = defineStore('widget', {
  state: () => ({
    widgets: [],
  }),
  getters: {
  },
  actions: {
    async listUserWidgets() {
      const user = await getCurrentUser()
      if(user) {
        const querySnapshot = await getDocs(collection(db, userPath(user)))
        const data = []
        querySnapshot.forEach(docRef => {
          const record = docRef.data()
          data.push(record)
        });
        this.widgets = data
      }

      return this.widgets;
    },
    async addUserWidget(item) {
      const user = await getCurrentUser()
      if(user) {
        const docRef = doc(collection(db, userPath(user)))
        item.id = docRef.id
        item.created = serverTimestamp()
        item.updated = serverTimestamp()
        await setDoc(docRef, item);
        this.widgets.push(item)
        //logEventFirebase('add_widget', item);
      }
    },
    async updateUserWidget(item) {
      const user = await getCurrentUser()
      if(user) {
        const idx = this.widgets.findIndex(i => i.id === item.id)
        const docRef = doc(db, userPath(user), item.id)
        item.updated = serverTimestamp()
        await updateDoc(docRef, item)
        const result = await getDoc(docRef, item.id)
        this.widgets[idx] = result.data()
      }
    },
    async deleteUserWidget(item) {
      const user = await getCurrentUser()
      if(user) {
        const idx = this.widgets.findIndex(i => i.id === item.id)
        const docRef = doc(db, widgetPath(user), item.id)
        await deleteDoc(docRef)
        this.widgets.splice(idx, 1)
      }
    },
  },
})
