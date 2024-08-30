import styled from 'styled-components'

interface StyledSelectProps {
  type?: string
}

const StyledSelect = styled.select<StyledSelectProps>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid ${(props) => (props.type === 'white' ? 'var(--color-grey-100)' : 'var(--color-grey-300)')};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`

type Options = {
  label: string
  value: string
}

interface SelectProps {
  value: string
  options: Options[]
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  type: string
}

function Select({ options, value, onChange, type }: SelectProps) {
  return (
    <StyledSelect value={value} type={type} onChange={onChange}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  )
}

export default Select
