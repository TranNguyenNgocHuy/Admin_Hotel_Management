import styled from 'styled-components'

import CreateCabinForm from './CreateCabinForm'
import { formatCurrency } from '../../utils/helpers'
import { useDeleteCabin } from './useDeleteCabin'
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2'
import { useCreateCabin } from './useCreateCabin'
import Modal from '../../ui/Modal'
import ConfirmDelete from '../../ui/ConfirmDelete'
import Table from '../../ui/Table'

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`

interface Props {
  cabin: {
    id: number
    createAt: string
    name: string
    maxCapacity: number
    regularPrice: number
    discount: number
    description: string
    image: string
  }
}

function CabinRow({ cabin }: Props) {
  const { isDeleting, deleteCabin } = useDeleteCabin()
  const { id: cabinId, name, maxCapacity, regularPrice, discount, image } = cabin

  const { isCreating, createCabin } = useCreateCabin()

  function handleDuplicateCabin() {
    const { id, ...copyValueCabin } = cabin
    console.log(id)
    copyValueCabin.name = `Copy of ${cabin.name}`
    createCabin(copyValueCabin)
  }

  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>

      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}
      <div>
        <Modal>
          <button disabled={isCreating} onClick={handleDuplicateCabin}>
            <HiSquare2Stack />
          </button>

          <Modal.Open opens='edit'>
            <button>
              <HiPencil />
            </button>
          </Modal.Open>

          <Modal.Window name='edit'>
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>

          <Modal.Open opens='delete'>
            <button>
              <HiTrash />
            </button>
          </Modal.Open>

          <Modal.Window name='delete'>
            <ConfirmDelete
              resourceName={`Cabin ${name}`}
              disabled={isDeleting}
              handleConfirm={() => deleteCabin(cabinId)}
              handleCloseModal={() => close()}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  )
}

export default CabinRow
