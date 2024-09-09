export interface SignupFormValues {
  fullName: string
  email: string
  password: string
  passwordConfirm?: string
}

export interface CurrentUserData {
  id: string
  aud: string
  role: string
  email: string
  email_confirmed_at: string
  phone: string
  confirmed_at: string
  last_sign_in_at: string
  app_metadata: {
    provider: string
    providers: string[]
  }
  user_metadata: User_Metadata
  identities: Identity[]
  created_at: string
  update_at: string
  is_anonymous: boolean
}

interface Identity {
  created_at: string
  email: string
  id: string
  identity_data: IdentityData
  identity_id: string
  last_sign_in_at: string
  provider: string
  updated_at: string
  user_id: string
}

interface IdentityData {
  avartar: string
  email: string
  email_verified: boolean
  fullName: string
  phone_verified: boolean
  sub: string
}

export interface User_Metadata {
  avatar: string
  email: string
  email_verified: boolean
  fullName: string
  phone_verified: boolean
  sub: string
}
