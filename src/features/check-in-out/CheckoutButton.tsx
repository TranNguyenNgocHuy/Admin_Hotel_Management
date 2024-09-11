import Button from '../../ui/Button'
import useCheckout from './useCheckout'

interface CheckoutButtonProps {
  bookingId: number
}

function CheckoutButton({ bookingId }: CheckoutButtonProps) {
  const { checkout, isCheckOut } = useCheckout()

  return (
    <Button variation='secondary' size='small' onClick={() => checkout({ bookingId })} disabled={isCheckOut}>
      Check out
    </Button>
  )
}

export default CheckoutButton
