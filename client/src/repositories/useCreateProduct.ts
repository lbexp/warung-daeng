import { ref } from 'vue'

import { API_URL } from '@/config'
import type { Product } from '@/entities/Product'

import useAuthStore from '@/stores/auth'

export default function useCreateProduct() {
  const loading = ref(false)
  const error = ref('')

  const { user, onClearAuth } = useAuthStore()

  async function fetchData(payload: Omit<Product, 'id' | 'categoryId'>) {
    loading.value = true
    error.value = ''

    try {
      const response = await fetch(`${API_URL}/products`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...(user?.accessToken && { Authorization: `Bearer ${user.accessToken}` })
        },
        method: 'POST',
        body: JSON.stringify(payload)
      })

      const resultData = await response.json()

      if (!response.ok) {
        if (response.status === 401) {
          onClearAuth()
        }

        throw new Error(resultData.message || 'Network error')
      }
    } catch (err) {
      error.value = (err as Error)?.message || 'Error undefined'
    } finally {
      loading.value = false
    }

    return { success: !error.value, error: error.value }
  }

  return { loading, error: error, onFetch: fetchData }
}
