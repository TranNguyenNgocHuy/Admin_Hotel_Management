import { useMutation, useQueryClient } from '@tanstack/react-query'
import { editCabin as editCabinApi } from '../../services/apiCabins'
import toast from 'react-hot-toast'

export function useEditCabin() {
  const queryClient = useQueryClient()
  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: editCabinApi,
    onSuccess: () => {
      toast.success('Cabin successfully edited')
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      })
    },
    onError: (err: Error) => toast.error(err.message)
  })
  return { isEditing, editCabin }
}
