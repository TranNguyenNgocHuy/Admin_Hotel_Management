export interface StatBookingData {
  createdAt: string
  totalPrice: number
  extrasPrice: number
}

export interface StatStaysData {
  id: number
  createAt: string
  startDate: string
  endDate: string
  numNights: number
  numGuests: number
  cabinPrice: number
  extrasPrice: number
  totalPrice: number
  status: 'unconfirmed' | 'checked-in' | 'checked-out'
  hasBreakfast: boolean
  isPaid: boolean
  observations: string
  guests: {
    fullName: string
  }
}
