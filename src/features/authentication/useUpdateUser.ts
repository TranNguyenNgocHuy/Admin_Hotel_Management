import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { updateCurrentUser, UpdateCurrentUserParam } from '../../services/apiAuth'

function useUpdateUser() {
  const queryClient = useQueryClient()

  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: ({ password, fullName, avatar }: UpdateCurrentUserParam) =>
      updateCurrentUser({ password, fullName, avatar }),

    onSuccess: () => {
      toast.success('User account successfully updated')
      queryClient.invalidateQueries({
        queryKey: ['user']
      })
    },

    onError: (err: Error) => toast.error(err.message)
  })

  return { isUpdating, updateUser }
}

export default useUpdateUser
