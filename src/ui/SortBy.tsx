import { useSearchParams } from 'react-router-dom'
import Select from './Select'

type Options = {
  label: string
  value: string
}
interface SortByProps {
  options: Options[]
}

function SortBy({ options }: SortByProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const sortBy = searchParams.get('sortBy') || ''

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set('sortBy', e.target.value)
    setSearchParams(searchParams)
  }

  return <Select options={options} type='white' value={sortBy} onChange={handleChange} />
}

export default SortBy
