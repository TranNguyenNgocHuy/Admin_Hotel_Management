import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { login as loginApi, LoginParams } from '../../services/apiAuth'
import toast from 'react-hot-toast'

export function useLogin() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { isLoading, mutate: login } = useMutation({
    mutationFn: ({ email, password }: LoginParams) => loginApi({ email, password }),

    onSuccess: (dataUser) => {
      queryClient.setQueryData(['user'], dataUser.user)
      navigate('/dashboard', { replace: true })
    },

    onError: (err: Error) => {
      console.log('ERROR', err)
      toast.error('Provided email or password are incorrect')
    }
  })

  return { isLoading, login }
}
