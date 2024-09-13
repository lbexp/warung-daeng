import { ref } from 'vue'

import { API_URL } from '@/config'
import type { RegisterData } from '@/entities/User'

export default function useSignUp() {
  const loading = ref(false)
  const error = ref('')
  const data = ref<{ accessToken: string } | null>(null)

  async function fetchData({ name, email, password }: RegisterData) {
    loading.value = true

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          name,
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
