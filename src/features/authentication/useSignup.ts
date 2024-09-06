import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { signup as signupApi } from '../../services/apiAuth'
import { SignupFormValues } from './interfaceAuth'

export function useSignup() {
  const { isLoading, mutate: signup } = useMutation({
    mutationFn: ({ fullName, email, password }: SignupFormValues) => signupApi({ fullName, email, password }),
    onSuccess: () => {
      toast.success("Account successfully created! Please verify the new account from the user's email address.")
    }
    // onError: (error) => {
    //   toast.error(error.message)
    // }
  })

  return { isLoading, signup }
}
