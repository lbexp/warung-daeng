import { ref } from 'vue'
import { useRouter } from 'vue-router'

import useCreateProduct from '@/repositories/useCreateProduct'

export default function useAddProduct() {
  const categoryName = ref('')
  const sku = ref('')
  const name = ref('')
  const description = ref('')
  const weight = ref(0)
  const width = ref(0)
  const length = ref(0)
  const height = ref(0)
  const image = ref('')
  const price = ref(0)

  const { loading, onFetch } = useCreateProduct()
  const { push } = useRouter()

  const addProduct = async () => {
    const { error } = await onFetch({
      categoryName: categoryName.value,
      description: description.value,
      height: height.value,
      image: image.value,
      length: length.value,
      name: name.value,
      price: price.value,
      sku: sku.value,
      weight: weight.value,
      width: width.value
    })

    if (error) {
      alert(error || 'Error undefined')
      return
    }

    alert('Product created')
    push('/')
  }

  return {
    loading,
    input: {
      categoryName,
      sku,
      name,
      description,
      weight,
      width,
      length,
      height,
      image,
      price
    },
    onAddProduct: addProduct
  }
}
