import { useQuery } from '@tanstack/react-query'
import { getSettings } from '../../services/apiSettings'
import { settingData } from './interfaceSettings'

export function useGetSettings() {
  const {
    isLoading,
    data: settings,
    error
  } = useQuery<settingData>({
    queryKey: ['settings'],
    queryFn: getSettings
  })

  return { isLoading, settings, error }
}
