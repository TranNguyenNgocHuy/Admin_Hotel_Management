import { useSearchParams } from 'react-router-dom'

import Spinner from '../../ui/Spinner'
import CabinRow from './CabinRow'
import { useGetCabins } from './useGetCabins'
import Table from '../../ui/Table'
import Menus from '../../ui/Menus'
import { CabinData } from './interfaceCabin'
import Empty from '../../ui/Empty'

type SortableFields = keyof Pick<CabinData, 'name' | 'regularPrice' | 'maxCapacity'>

function CabinTable() {
  const { isLoading, cabins } = useGetCabins()
  const [searchParams] = useSearchParams()

  if (isLoading) return <Spinner />

  // FILTER
  const filterValue = searchParams.get('discount') || 'all'

  let filterCabins: CabinData[] = []
  if (filterValue === 'all') filterCabins = cabins || []
  if (filterValue === 'no-discount') filterCabins = (cabins || []).filter((cabin) => cabin.discount === 0)
  if (filterValue === 'with-discount') filterCabins = (cabins || []).filter((cabin) => cabin.discount > 0)

  // SORT
  const sortBy = searchParams.get('sortBy') || 'name-asc'

  const [field, direction] = sortBy.split('-') as [SortableFields, string]
  const modifier = direction === 'asc' ? 1 : -1
  const sortedCabins = filterCabins?.sort((a, b) => {
    const aValue = a[field]
    const bValue = b[field]

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue) * modifier
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return (aValue - bValue) * modifier
    }

    return 0
  })

  return (
    <Menus>
      <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body>
          {sortedCabins.length === 0 ? (
            <Empty resourceName='cabins' />
          ) : (
            sortedCabins?.map((cabin) => <CabinRow cabin={cabin} key={cabin.id} />)
          )}
        </Table.Body>
      </Table>
    </Menus>
  )
}
export default CabinTable
