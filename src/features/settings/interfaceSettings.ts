export interface FormValuesSetting {
  minBookingLength?: number
  maxBookingLength?: number
  maxGuestsPerBooking?: number
  breakfastPrice?: number
}

export interface settingData {
  id: number
  createdAt: string
  minBookingLength: number
  maxBookingLength: number
  maxGuestsPerBooking: number
  breakfastPrice: number
}
