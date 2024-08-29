import Spinner from '../../ui/Spinner'
import CabinRow from './CabinRow'
import { useGetCabins } from './useGetCabins'
import Table from '../../ui/Table'

function CabinTable() {
  const { isLoading, cabins } = useGetCabins()

  if (isLoading) return <Spinner />

  return (
    <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>

      <Table.Body>{cabins?.map((cabin) => <CabinRow cabin={cabin} key={cabin.id} />)}</Table.Body>
    </Table>
  )
}

export default CabinTable
