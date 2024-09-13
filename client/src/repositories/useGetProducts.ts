import { ref } from 'vue'

import { API_URL } from '@/config'

import useAuthStore from '@/stores/auth'
import type { Product } from '@/entities/Product'

export default function useGetProducts() {
  const loading = ref(false)
  const error = ref('')

  const products = ref<Product[]>([])

  const { user, onClearAuth } = useAuthStore()

  async function fetchData({ search, page }: { search: string; page: number }) {
    loading.value = true

    const queryParams = new URLSearchParams({
      search,
      page: `${page}`
    })

    try {
      const response = await fetch(`${API_URL}/products?${queryParams.toString()}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...(user?.accessToken && { Authorization: `Bearer ${user.accessToken}` })
        },
        method: 'GET'
      })

      const resultData = await response.json()

      if (!response.ok) {
        if (response.status === 401) {
          onClearAuth()
        }

        throw new Error(resultData.message || 'Network error')
      }

      products.value = resultData.data.data
    } catch (err) {
      products.value = []
      error.value = (err as Error)?.message || 'Error undefined'
    } finally {
      loading.value = false
    }

    return { products: products.value, error: error.value }
  }

  return { loading, products, error, onFetch: fetchData }
}
