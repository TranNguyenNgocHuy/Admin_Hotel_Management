import styled from 'styled-components'
import { useCurrentUser } from '../features/authentication/useCurrentUser'
import Spinner from './Spinner'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`

interface ProtectedRouteProps {
  children: React.ReactElement
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate()

  // 1. Load the authenticated user
  const { isLoading, isAuthenticated } = useCurrentUser()

  // 2. If there is NO authenticated user, redirect to Login page
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate('/login')
  }, [isAuthenticated, isLoading, navigate])

  // 3. While loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    )

  // 4. if there is user, render app
  if (isAuthenticated) return children
}

export default ProtectedRoute
