import { ref } from 'vue'

import { API_URL } from '@/config'
import type { LoginData } from '@/entities/User'

export default function useSignIn() {
  const loading = ref(false)
  const error = ref('')
  const data = ref<{ accessToken: string } | null>(null)

  async function fetchData({ email, password }: LoginData) {
    loading.value = true
    error.value = ''

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          email,
          password
        })
      })

      const resultData = await response.json()

      if (!response.ok) {
        throw new Error(resultData.message || 'Network error')
      }

      data.value = resultData.data
    } catch (err) {
      error.value = (err as Error)?.message || 'Error undefined'
    } finally {
      loading.value = false
    }

    return { data: data.value, error: error.value }
  }

  return { loading, error, onFetch: fetchData }
}
