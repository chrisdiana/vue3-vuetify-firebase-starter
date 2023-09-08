<template>

  <v-sheet class="bg-blue-grey-lighten-4 fill-height" rounded>
    <p class="text-center pa-10">
      <v-icon icon="mdi-circle-slice-6" size="x-large"/>
    </p>
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <v-form
        v-model="form"
      >

        <v-text-field
          v-model="email"
          :rules="[required]"
          class="mb-2"
          clearable
          label="Email"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="[required]"
          clearable
          label="Password"
          type="password"
          placeholder="Enter your password"
          v-show="!resetPassword"
        ></v-text-field>

        <br>

        <v-btn
          :disabled="!form"
          block
          color="success"
          size="large"
          variant="elevated"
          @click="login"
          class="my-3"
          v-show="!resetPassword"
        >
          Sign In
        </v-btn>
        <v-btn
          :disabled="!form"
          block
          color="primary"
          size="large"
          @click="register"
          variant="elevated"
          v-show="!resetPassword"
        >
          Register
        </v-btn>

        <v-btn
          size="small"
          @click="startResetPassword"
          variant="text"
          v-show="!resetPassword"
        >
          Reset Password
        </v-btn>


        
         <v-btn
         :disabled="!email"
          block
          color="primary"
          size="large"
          @click="sendResetEmail"
          variant="elevated"
          v-show="resetPassword"
        >
          Reset Password
        </v-btn>

        <v-btn
          size="small"
          @click="stopResetPassword"
          variant="text"
          v-show="resetPassword"
        >
          Back
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { useCurrentUser, useFirebaseAuth } from 'vuefire'
import { useAppStore } from '@/store/app'


import router from '@/router'

const auth = useFirebaseAuth()
const store = useAppStore()

const email = ref(null)
const password = ref(null)
const error = ref(null)
const form = ref(null)
const resetPassword = ref(false)


function startResetPassword() {
  resetPassword.value = true
  
}

function sendResetEmail() {
  sendPasswordResetEmail(auth, email.value, {
    url: window.location.href,
    handleCodeInApp: false
  })
  .then(() => {
    store.notify('Password reset email sent.')
    resetPassword.value = false
  })
  .catch((reason) => {
    const errorMsg = reason.code.replace('auth/', '')
    store.notify(errorMsg)
  })
}

function stopResetPassword() {
  resetPassword.value = false
}

function login() {
  if (!form.value) return
  store.loading = true

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(res => {
      router.push('/home')
    })
    .catch(reason => {
      const errorMsg = reason.code.replace('auth/', '')
      store.notify(errorMsg)
    })
    .finally(() => {
      store.loading = false
    })
}

function required(v) {
  return !!v || 'Field is required'
}

function register() {
  if (!form.value) return

  store.loading = true

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(res => {
      router.push('/home')
    })
    .catch(reason => {
      const errorMsg = reason.code.replace('auth/', '')
      store.notify(errorMsg)
    })
    .finally(() => {
      store.loading = false
    })
}


onMounted(() => {
})
</script>
