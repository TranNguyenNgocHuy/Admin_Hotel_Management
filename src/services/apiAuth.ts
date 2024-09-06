import { SignupFormValues } from '../features/authentication/interfaceAuth'
import supabase from './supabase'

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
