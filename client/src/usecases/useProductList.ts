import { onMounted, watch } from 'vue'
import { useDebouncedRef } from '@/hooks/useDebounceRef'

import useGetProducts from '@/repositories/useGetProducts'

export default function useProductList() {
  const search = useDebouncedRef('')
  const page = useDebouncedRef(1)

  const { error, loading, products, onFetch } = useGetProducts()

  onMounted(() => {
    onFetch({
      search: search.value,
      page: page.value
    })
  })

  watch(search, async () => {
    onFetch({
      search: search.value,
      page: page.value
    })
  })

  watch(page, async () => {
    onFetch({
      search: search.value,
      page: page.value
    })
  })

  return {
    loading,
    products,
    page,
    search,
    error
  }
}
