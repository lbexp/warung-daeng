import { ref } from 'vue'
import { useRouter } from 'vue-router'

import useAuthStore from '@/stores/auth'
import useSignIn from '@/repositories/useSignIn'

export default function useLoginForm() {
  const email = ref('')
  const password = ref('')

  const { onSaveAuth } = useAuthStore()
  const { loading, onFetch } = useSignIn()
  const { push } = useRouter()

  const signIn = async () => {
    const { data, error } = await onFetch({ email: email.value, password: password.value })

    if (error || !data) {
      alert(error || 'Error undefined')
      return
    }

    onSaveAuth(data.accessToken, email.value)
    push('/')
  }

  return {
    loading,
    email,
    password,
    onSignIn: signIn
  }
}
