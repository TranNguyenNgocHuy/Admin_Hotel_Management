export interface FormValuesNewCabin {
  id?: number
  name: string
  maxCapacity: number
  regularPrice: number
  discount: number
  description: string
  image: FileList | string
}

export interface CabinData {
  id: number
  name: string
  maxCapacity: number
  regularPrice: number
  discount: number
  description: string
  image: string
  createAt: string
}

export interface NewCabinData {
  id?: number
  name: string
  maxCapacity: number
  regularPrice: number
  discount: number
  description: string
  image: File | string
}
