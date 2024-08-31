import BookingRow from './BookingRow'
import Table from '../../ui/Table'
import Menus from '../../ui/Menus'
import Empty from '../../ui/Empty'
import Spinner from '../../ui/Spinner'

import { useGetBookings } from './useGetBookings'
import Pagination from '../../ui/Pagination'

function BookingTable() {
  const { isLoading, bookings, count: dataLength } = useGetBookings()

  if (isLoading) return <Spinner />

  return (
    <Menus>
      <Table columns='0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem'>
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body>
          {bookings.length === 0 ? (
            <Empty resourceName='bookings' />
          ) : (
            bookings?.map((booking) => <BookingRow booking={booking} key={booking.id} />)
          )}
        </Table.Body>

        <Table.Footer>
          <Pagination dataLength={dataLength} />
        </Table.Footer>
      </Table>
    </Menus>
  )
}

export default BookingTable
