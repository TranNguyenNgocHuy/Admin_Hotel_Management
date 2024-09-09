import { useState } from 'react'

import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'

import { useCurrentUser } from './useCurrentUser'
import { CurrentUserData } from './interfaceAuth'
import useUpdateUser from './useUpdateUser'

function UpdateUserDataForm() {
  const { user } = useCurrentUser()
  const {
    email,
    user_metadata: { fullName: currentFullName }
  } = user as CurrentUserData

  const { isUpdating, updateUser } = useUpdateUser()

  const [fullName, setFullName] = useState<string>(currentFullName)
  const [avatar, setAvatar] = useState<File | null>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!fullName) return

    updateUser({ fullName, avatar })
  }

  function handleCancel() {
    setFullName(currentFullName)
    setAvatar(null)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label='Email address'>
        <Input value={email} disabled />
      </FormRow>

      <FormRow label='Full name'>
        <Input
          type='text'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id='fullName'
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label='Avatar image'>
        <FileInput
          id='avatar'
          accept='image/*'
          onChange={(e) => setAvatar(e.target.files?.[0] || null)}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow>
        <>
          <Button type='reset' onClick={handleCancel} variation='secondary' disabled={isUpdating}>
            Cancel
          </Button>
          <Button disabled={isUpdating}>Update account</Button>
        </>
      </FormRow>
    </Form>
  )
}

export default UpdateUserDataForm
