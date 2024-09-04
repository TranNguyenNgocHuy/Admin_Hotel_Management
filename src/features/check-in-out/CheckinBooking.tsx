import styled from 'styled-components'
import BookingDataBox from '../bookings/BookingDataBox'

import Row from '../../ui/Row'
import Heading from '../../ui/Heading'
import ButtonGroup from '../../ui/ButtonGroup'
import Button from '../../ui/Button'
import ButtonText from '../../ui/ButtonText'

import { useMoveBack } from '../../hooks/useMoveBack'
import { useGetBooking } from '../bookings/useGetBooking'
import Spinner from '../../ui/Spinner'
import { useEffect, useState } from 'react'
import Checkbox from '../../ui/Checkbox'
import { formatCurrency } from '../../utils/helpers'
import useCheckin from './useCheckin'
import { useGetSettings } from '../settings/useGetSettings'

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState<boolean>(false)
  const [addBreakfast, setAddBreakfast] = useState<boolean>(false)
  const { isLoading, booking } = useGetBooking()
  const { isLoading: isLoadingSetting, settings } = useGetSettings()

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking])

  const moveBack = useMoveBack()
  const { isCheckin, checkin } = useCheckin()

  if (isLoading || isLoadingSetting) return <Spinner />

  if (!booking) return <p>Booking not found</p>

  const { id: bookingId, guests, totalPrice, numGuests, hasBreakfast, numNights } = booking

  const optionalBreakfastPrice = settings?.breakfastPrice ? settings?.breakfastPrice * numNights * numGuests : 0

  function handleCheckin() {
    if (!confirmPaid) return

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice
        }
      })
    } else {
      checkin({ bookingId, breakfast: {} })
    }
  }

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          checked={addBreakfast}
          onChange={() => {
            setAddBreakfast((add) => !add)
            setConfirmPaid(false)
          }}
          id='breakfast'
        >
          Want to add breakfast for {formatCurrency(optionalBreakfastPrice)} ?
        </Checkbox>
      </Box>

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={confirmPaid}
            disabled={confirmPaid || isCheckin}
            onChange={() => setConfirmPaid((confirm) => !confirm)}
            id='confirm'
          >
            I confirm that {guests.fullName} has paid the total amount of{' '}
            {!addBreakfast
              ? formatCurrency(totalPrice)
              : `${formatCurrency(totalPrice + optionalBreakfastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfastPrice)})`}
          </Checkbox>
        </Box>
      )}

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  )
}

export default CheckinBooking
