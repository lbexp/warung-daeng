import { ref } from 'vue'
import useSignUp from '@/repositories/useSignUp'

export default function useRegisterForm() {
  const name = ref('')
  const email = ref('')
  const password = ref('')

  const { loading, onFetch } = useSignUp()

  const signUp = async () => {
    const { error } = await onFetch({
      name: name.value,
      email: email.value,
      password: password.value
    })

    if (error) {
      alert(error)
    }
  }

  return {
    loading,
    name,
    email,
    password,
    onSignUp: signUp
  }
}
