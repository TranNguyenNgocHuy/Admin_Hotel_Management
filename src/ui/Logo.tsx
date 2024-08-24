import styled from 'styled-components'

const StyledLogo = styled.div`
  text-align: center;
  position: relative;
`

const Img = styled.img`
  height: 10rem;
  width: auto;
`

const P = styled.p`
  font-size: 2.8rem;
  font-weight: 800;
  font-family: 'Great Vibes', cursive;
  color: var(--color-yellow-700);
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
`

function Logo() {
  return (
    <StyledLogo>
      <Img src='/Crown.png' alt='Logo' />
      <P>Natural Hotel</P>
    </StyledLogo>
  )
}

export default Logo
