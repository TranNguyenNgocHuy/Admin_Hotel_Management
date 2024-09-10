import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from 'react-icons/hi2'
import { StatBookingData, StatStaysData } from './interfaceStats'
import Stat from './Stat'
import { formatCurrency } from '../../utils/helpers'

interface StatsProps {
  bookings: StatBookingData[]
  confirmedStays: StatStaysData[]
  numDays: number
  numCabins: number
}

function Stats({ bookings, confirmedStays, numDays, numCabins }: StatsProps) {
  // 1.
  const numBookings = bookings.length

  // 2.
  const sales = bookings.reduce((total, currentBooking) => total + currentBooking.totalPrice, 0)

  // 3.
  const checkins = confirmedStays.length

  // 4.
  const totalStaysNight = confirmedStays.reduce((totalNights, currentStay) => totalNights + currentStay.numNights, 0)
  const occupationRate = Math.round((totalStaysNight / (numDays * numCabins)) * 100)

  return (
    <>
      <Stat title='Bookings' color='blue' icon={<HiOutlineBriefcase />} value={numBookings} />
      <Stat title='Sales' color='green' icon={<HiOutlineBanknotes />} value={formatCurrency(sales)} />
      <Stat title='Check ins' color='indigo' icon={<HiOutlineCalendarDays />} value={checkins} />
      <Stat title='Occupancy rate' color='yellow' icon={<HiOutlineChartBar />} value={`${occupationRate}%`} />
    </>
  )
}

export default Stats
