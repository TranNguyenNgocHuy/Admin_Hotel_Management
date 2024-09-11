import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { updateBooking } from '../../services/apiBookings'

interface MutationParams {
  bookingId: number
  breakfast?: {
    hasBreakfast?: boolean
    extrasPrice?: number
    totalPrice?: number
  }
}

function useCheckout() {
  const queryClient = useQueryClient()

  const { mutate: checkout, isLoading: isCheckOut } = useMutation({
    mutationFn: ({ bookingId }: MutationParams) =>
      updateBooking(bookingId, {
        status: 'checked-out'
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`)
      queryClient.invalidateQueries({ queryKey: ['booking'] })
      queryClient.invalidateQueries({ queryKey: ['today-activity'] })
    },

    onError: () => toast.error('There was an error while checking out')
  })

  return { isCheckOut, checkout }
}

export default useCheckout
