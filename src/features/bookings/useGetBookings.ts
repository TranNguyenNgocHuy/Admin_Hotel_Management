import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getBookings, GetBookingsResult } from '../../services/apiBookings'
import { useSearchParams } from 'react-router-dom'
import { PAGE_SIZE } from '../../utils/constants'

export function useGetBookings() {
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()

  //FILTER
  const filterValue = searchParams.get('status')
  const filter = !filterValue || filterValue === 'all' ? null : { field: 'status', value: filterValue }

  // SORT
  const sortByRaw = searchParams.get('sortBy') || 'startDate-desc'
  const [field, direction] = sortByRaw.split('-')
  const sortBy = { field, direction }

  // PAGINATION
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))

  //QUERY
  const {
    isLoading,
    data: { data: bookings, count } = { data: [], count: 0 },
    error
  } = useQuery<GetBookingsResult>({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page })
  })

  //PRE_FETCHING
  const totalPage = Math.ceil(count / PAGE_SIZE)
  if (page < totalPage)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 })
    })

  return { isLoading, bookings, error, count }
}
