import styled from 'styled-components'
import { createContext, useContext, useState } from 'react'
import { HiEllipsisVertical } from 'react-icons/hi2'
import { useOutsideClick } from '../hooks/useOutsideClick'

const StyledMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`

type StyledListProp = {
  position: Position
}
const StyledList = styled.ul<StyledListProp>`
  position: absolute;
  z-index: 1;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y + 1}px;
`

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  & span {
    white-space: nowrap;
  }
`
type Position = {
  x: number
  y: number
}
interface MenusContext {
  openId: number | null
  close: () => void
  open: (cabinId: number) => void
  position: Position | null
  setPosition: React.Dispatch<React.SetStateAction<Position | null>>
}
const MenusContext = createContext<MenusContext | undefined>(undefined)

interface CommonProps {
  children: React.ReactNode
}

interface ListProps {
  id: number
  children: React.ReactNode
}

interface ToggleProps {
  id: number
}

interface ButtonProps {
  icon: React.ReactNode
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}

function Menus({ children }: CommonProps) {
  const [openId, setOpenId] = useState<number | null>(null)
  const [position, setPosition] = useState<Position | null>(null)

  const close = () => setOpenId(null)
  const open = (cabinId: number) => setOpenId(cabinId)

  return (
    <MenusContext.Provider value={{ openId, close, open, position, setPosition }}>{children}</MenusContext.Provider>
  )
}

function Menu({ children }: CommonProps) {
  return <StyledMenu>{children}</StyledMenu>
}

function Toggle({ id }: ToggleProps) {
  const context = useContext(MenusContext)
  if (!context) throw new Error('Toggle must be used within a Menus')

  const { openId, close, open, setPosition } = context

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()

    const button = e.currentTarget.closest('button')

    if (button) {
      const rect = button.getBoundingClientRect()
      setPosition({
        x: -8,
        y: rect.height
      })
    }

    openId === null || openId !== id ? open(id) : close()
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  )
}

function List({ id, children }: ListProps) {
  const context = useContext(MenusContext)
  if (!context) throw new Error('List must be used within a Menus')

  const { openId, position, close } = context
  const ref = useOutsideClick<HTMLUListElement>(close, false)

  if (openId !== id || position === null) return null

  return (
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>
  )
}

function Button({ children, icon, onClick, disabled }: ButtonProps) {
  const context = useContext(MenusContext)
  if (!context) throw new Error('Button must be used within a Menus')
  const { close } = context

  function handleClick() {
    onClick?.()
    close()
  }
  return (
    <li>
      <StyledButton onClick={handleClick} disabled={disabled}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  )
}

Menus.Menu = Menu
Menus.Toggle = Toggle
Menus.List = List
Menus.Button = Button

export default Menus
