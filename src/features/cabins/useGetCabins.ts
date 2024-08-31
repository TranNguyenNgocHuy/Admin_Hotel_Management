import { useQuery } from '@tanstack/react-query'
import { getCabins } from '../../services/apiCabins'
import { CabinData } from './interfaceCabin'

export function useGetCabins() {
  const {
    isLoading,
    data: cabins = [],
    error
  } = useQuery<CabinData[]>({
    queryKey: ['cabins'],
    queryFn: getCabins
  })

  return { isLoading, cabins, error }
}
