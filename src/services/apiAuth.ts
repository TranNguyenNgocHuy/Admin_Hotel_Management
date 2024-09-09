import { SignupFormValues } from '../features/authentication/interfaceAuth'
import supabase, { supabaseUrl } from './supabase'

export async function signup({ fullName, email, password }: SignupFormValues) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avartar: ''
      }
    }
  })

  if (error) throw new Error(error?.message)

  return data
}

export interface LoginParams {
  email: string
  password: string
}
export async function login({ email, password }: LoginParams) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) throw new Error(error?.message)

  return data
}

export async function getCurrentUser() {
  // get access token from local storage
  const { data: session } = await supabase.auth.getSession()

  if (!session.session) return null

  const { data, error } = await supabase.auth.getUser()

  if (error) throw new Error(error?.message)

  return data?.user
}

export async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) throw new Error(error?.message)
}

export interface UpdateCurrentUserParam {
  password?: string
  fullName?: string
  avatar?: File | null
}
export async function updateCurrentUser({ password, fullName, avatar }: UpdateCurrentUserParam) {
  // 1. Update pwd OR fullName
  let updateData
  if (password) updateData = { password }
  if (fullName) updateData = { data: { fullName } }

  if (updateData === undefined) return
  const { data, error } = await supabase.auth.updateUser(updateData)

  if (error) throw new Error(error.message)
  if (!avatar) return data

  // 2. Upload the avatar image file
  const fileName = `Avatar-${data.user.id}-${Math.random()}`

  const { error: storageError } = await supabase.storage.from('avatars').upload(fileName, avatar)

  if (storageError) throw new Error(storageError.message)

  // 3. Upload avatar link into the user
  const { data: updateUser, error: updateError } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`
    }
  })

  if (updateError) throw new Error(updateError.message)
  return updateUser
}
