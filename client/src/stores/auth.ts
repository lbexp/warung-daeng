import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { User } from '@/entities/User'

const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)

  function initAuth() {
    try {
      const savedAuth = JSON.parse(localStorage.getItem('auth') || '') as unknown as User
      user.value = savedAuth
    } catch (error) {
      user.value = null
    }
  }

  function saveAuth(token: string, email: string) {
    localStorage.setItem(
      'auth',
      JSON.stringify({
        accessToken: token,
        user: {
          email
        }
      })
    )

    user.value = {
      accessToken: token,
      user: {
        email
      }
    }
  }

  function clearAuth() {
    user.value = null
  }

  return {
    user,
    onInitAuth: initAuth,
    onSaveAuth: saveAuth,
    onClearAuth: clearAuth
  }
})

export default useAuthStore
