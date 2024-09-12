import { useQuery } from '@tanstack/react-query'
import { getBooking } from '../../services/apiBookings'
import { useParams } from 'react-router-dom'
import { BookingFullData } from './interfaceBooking'

export function useGetBooking() {
  const { bookingId } = useParams()
  console.log(bookingId)

  const {
    isLoading,
    data: booking,
    error
  } = useQuery<BookingFullData>({
    queryKey: ['booking', bookingId],
    queryFn: () => getBooking(Number(bookingId))
  })

  return { isLoading, booking, error }
}
