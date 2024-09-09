import styled from 'styled-components'
import { useCurrentUser } from './useCurrentUser'
import Empty from '../../ui/Empty'
import { User_Metadata } from './interfaceAuth'

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`

function UserAvatar() {
  const { user } = useCurrentUser()

  if (user === null || user === undefined) return <Empty resourceName='User' />

  const { fullName, avatar } = user?.user_metadata as User_Metadata

  return (
    <StyledUserAvatar>
      <Avatar src={avatar || 'default-user.jpg'} alt={`Avatar of ${fullName}`} />
      <span>{fullName}</span>
    </StyledUserAvatar>
  )
}

export default UserAvatar
