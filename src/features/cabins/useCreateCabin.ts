import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { createCabin as createCabinApi } from '../../services/apiCabins'

export function useCreateCabin() {
  const queryClient = useQueryClient()
  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createCabinApi,
    onSuccess: () => {
      toast.success('New cabin successfully created')
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      })
    },
    onError: (err: Error) => toast.error(err.message)
  })
  return { isCreating, createCabin }
}
