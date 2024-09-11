import supabase, { supabaseUrl } from './supabase'
import { CabinData, NewCabinData } from '../features/cabins/interfaceCabin'

export async function getCabins(): Promise<CabinData[]> {
  const { data, error } = await supabase.from('cabins').select('*')

  if (error) {
    console.error(error)
    throw new Error('Cabins could not be loaded')
  }

  return data as CabinData[]
}

export async function createCabin(newCabin: NewCabinData) {
  // Duplicate Cabin
  if (typeof newCabin.image === 'string' && !('id' in newCabin)) {
    const { data, error } = await supabase
      .from('cabins')
      .insert([{ ...newCabin }])
      .select()

    if (error) {
      console.error(error)
      throw new Error('Cabin could not be created')
    }
    return data
  }

  if (!(newCabin.image instanceof File) || 'id' in newCabin) return

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '')
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`

  // 1. Create cabin
  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select()

  if (error) {
    console.error(error)
    throw new Error('Cabin could not be created')
  }

  // 2. Upload image
  const { error: storageError } = await supabase.storage.from('cabins-images').upload(imageName, newCabin.image)

  // 3. Delete cabin IF there was error in image uploading
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data[0].id)
    console.error(storageError)
    throw new Error('Cabin image upload fail')
  }
  return data
}

export async function editCabin(newCabin: NewCabinData) {
  if (!newCabin.id) return

  const dataToUpdate = { ...newCabin }

  if (newCabin.image instanceof File) {
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '')
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`
    dataToUpdate.image = imagePath

    // Upload image
    const { error: storageError } = await supabase.storage.from('cabins-images').upload(imageName, newCabin.image)
    if (storageError) {
      throw new Error('Cabin image upload fail')
    }
  }

  delete dataToUpdate.id
  const { data, error } = await supabase.from('cabins').update(dataToUpdate).eq('id', newCabin.id).select()

  if (error) {
    console.error(error)
    throw new Error('Cabin could not be update')
  }

  return data
}

export async function deleteCabin(id: number) {
  const { error } = await supabase.from('cabins').delete().eq('id', id)

  if (error) {
    console.error(error)
    throw new Error('Cabins could not be deleted')
  }
}
