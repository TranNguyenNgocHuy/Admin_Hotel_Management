import { getToday } from '../utils/helpers'
import supabase from './supabase'
import { BookingData, BookingFullData } from '../features/bookings/interfaceBooking'
import { PAGE_SIZE } from '../utils/constants'
import { StatBookingData, StatStaysData } from '../features/dashboard/interfaceStats'
import { TodayActivityData } from '../features/check-in-out/interfaceCheck-in-out'

interface GetBookingsParams {
  filter: {
    field: string
    value: string
  } | null
  sortBy: {
    field: string
    direction: string
  }
  page: number
}

export interface GetBookingsResult {
  data: BookingData[]
  count: number
}

export async function getBookings({ filter, sortBy, page }: GetBookingsParams): Promise<GetBookingsResult> {
  let query = supabase.from('bookings').select('*, cabins(name) , guests(fullName, email)', { count: 'exact' })

  // FILTER
  if (filter) query = query.eq(filter.field, filter.value)

  // SORT
  if (sortBy) query = query.order(sortBy.field, { ascending: sortBy.direction === 'asc' })

  // PAGINATION
  if (page) {
    const form = (page - 1) * PAGE_SIZE
    const to = form + PAGE_SIZE - 1
    query = query.range(form, to)
  }

  const { data, error, count } = await query

  if (error) {
    console.error(error)
    throw new Error('Booking could not be loaded')
  }

  return { data: data as BookingData[], count: count ?? 0 }
}

export async function getBooking(id: number) {
  const { data, error } = await supabase.from('bookings').select('*, cabins(*), guests(*)').eq('id', id).single()

  if (error) {
    console.error(error)
    throw new Error('Booking not found')
  }

  return data as BookingFullData
}

export async function getBookingsAfterDate(date: string) {
  // Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
  const { data, error } = await supabase
    .from('bookings')
    .select('createdAt, totalPrice, extrasPrice')
    .gte('createdAt', date)
    .lte('createdAt', getToday({ end: true }))

  if (error) {
    console.error(error)
    throw new Error('Bookings could not get loaded')
  }

  return data as StatBookingData[]
}

export async function getStaysAfterDate(date: string) {
  // Returns all STAY DATES of customer that are were created after the given date
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName)')
    .gte('startDate', date)
    .lte('startDate', getToday())

  if (error) {
    console.error(error)
    throw new Error('Bookings could not get loaded')
  }

  return data as StatStaysData[]
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  // Explain: status === 'unconfirmed' and startDate === today ==> Count customers will check-in
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate)))
  // Explain: status === 'checked-in' and endDate === today ==> Count customers will check-out
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName, nationality, countryFlag)')
    .or(`and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`)
    .order('createdAt')

  if (error) {
    console.error(error)
    throw new Error('Bookings could not get loaded')
  }
  return data as TodayActivityData[]
}

export async function updateBooking(
  id: number,
  obj: {
    status: string
    isPaid?: boolean
    hasBreakfast?: boolean
    extrasPrice?: number
    totalPrice?: number
  }
) {
  const { data, error } = await supabase.from('bookings').update(obj).eq('id', id).select().single()

  if (error) {
    console.error(error)
    throw new Error('Booking could not be updated')
  }
  return data
}

export async function deleteBooking(id: number) {
  const { data, error } = await supabase.from('bookings').delete().eq('id', id)

  if (error) {
    console.error(error)
    throw new Error('Booking could not be deleted')
  }
  return data
}
