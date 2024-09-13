import { ref } from 'vue'
import useSignIn from '@/repositories/useSignIn'

export default function useLoginForm() {
  const email = ref('')
  const password = ref('')

  const { loading, onFetch } = useSignIn()

  const signIn = async () => {
    const { error } = await onFetch({ email: email.value, password: password.value })

    if (error) {
      alert(error)
    }
  }

  return {
    loading,
    email,
    password,
    onSignIn: signIn
  }
}
