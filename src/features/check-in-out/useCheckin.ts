import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateBooking } from '../../services/apiBookings'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

interface MutationParams {
  bookingId: number
  breakfast: {
    hasBreakfast?: boolean
    extrasPrice?: number
    totalPrice?: number
  }
}

function useCheckin() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate: checkin, isLoading: isCheckin } = useMutation({
    mutationFn: ({ bookingId, breakfast }: MutationParams) =>
      updateBooking(bookingId, {
        status: 'checked-in',
        isPaid: true,
        ...breakfast
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`)
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      navigate('/')
    },

    onError: () => toast.error('There was an error while checking in')
  })

  return { isCheckin, checkin }
}

export default useCheckin
