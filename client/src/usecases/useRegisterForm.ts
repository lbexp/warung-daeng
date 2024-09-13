import { ref } from 'vue'

import useAuthStore from '@/stores/auth'
import useSignUp from '@/repositories/useSignUp'

export default function useRegisterForm() {
  const name = ref('')
  const email = ref('')
  const password = ref('')

  const { onSaveAuth } = useAuthStore()
  const { loading, onFetch } = useSignUp()

  const signUp = async () => {
    const { data, error } = await onFetch({
      name: name.value,
      email: email.value,
      password: password.value
    })

    if (error || !data) {
      alert(error || 'Error undefined')
      return
    }

    onSaveAuth(data.accessToken, email.value)
  }

  return {
    loading,
    name,
    email,
    password,
    onSignUp: signUp
  }
}
