import { useQuery } from '@tanstack/react-query'
import { TodayActivityData } from './interfaceCheck-in-out'
import { getStaysTodayActivity } from '../../services/apiBookings'

export function useTodayActivity() {
  const { isLoading, data: activities = [] } = useQuery<TodayActivityData[]>({
    queryFn: getStaysTodayActivity,
    queryKey: ['today-activity']
  })

  return { isLoading, activities }
}
