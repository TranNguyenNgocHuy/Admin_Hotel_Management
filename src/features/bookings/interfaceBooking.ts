// export interface GuestData {
//   id: number
//   email: string
//   fullName: string
//   createAt: string
//   nationalId: string
//   countryFlag: string
//   nationality: string
// }

export interface BookingData {
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
  ispaid: boolean
  observations: string
  cabins: {
    name: string
  }
  guests: {
    fullName: string
    email: string
  }
}
