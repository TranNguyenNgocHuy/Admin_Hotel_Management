import styled from 'styled-components'

const StyledEmpty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`

interface EmptyProps {
  resourceName: string
}

function Empty({ resourceName }: EmptyProps) {
  return <StyledEmpty>No {resourceName} could be found.</StyledEmpty>
}

export default Empty
