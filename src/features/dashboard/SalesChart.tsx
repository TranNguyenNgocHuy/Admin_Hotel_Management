import styled from 'styled-components'
import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns'

import DashboardBox from './DashboardBox'
import Heading from '../../ui/Heading'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useDarkMode } from '../../context/DarkModeContext'
import { StatBookingData } from './interfaceStats'

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`

interface SalesChartProps {
  bookings: StatBookingData[]
  numDays: number
}

function SalesChart({ bookings, numDays }: SalesChartProps) {
  const { isDarkMode } = useDarkMode()
  const colors = isDarkMode
    ? {
        totalSales: { stroke: '#4f46e5', fill: '#4f46e5' },
        extrasSales: { stroke: '#22c55e', fill: '#22c55e' },
        text: '#e5e7eb',
        background: '#18212f'
      }
    : {
        totalSales: { stroke: '#4f46e5', fill: '#c7d2fe' },
        extrasSales: { stroke: '#16a34a', fill: '#dcfce7' },
        text: '#374151',
        background: '#fff'
      }

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date()
  })

  const data = allDates.map((date) => {
    return {
      label: format(date, 'MMM dd'),
      totalSales: bookings
        .filter((bookings) => isSameDay(date, new Date(bookings.createdAt)))
        .reduce((totalSale, currentBooking) => totalSale + currentBooking.totalPrice, 0),
      extrasSales: bookings
        .filter((bookings) => isSameDay(date, new Date(bookings.createdAt)))
        .reduce((totalSale, currentBooking) => totalSale + currentBooking.extrasPrice, 0)
    }
  })

  return (
    <StyledSalesChart>
      <Heading as='h2'>
        Sales from {format(allDates[0], 'MMM dd yyyy')} &mdash; {format(allDates[allDates.length - 1], 'MMM dd yyyy')}
      </Heading>

      <ResponsiveContainer height={300} width='100%'>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray='3' />
          <XAxis dataKey='label' tick={{ fill: colors.text }} tickLine={{ stroke: colors.text }} />
          <YAxis unit='$' tick={{ fill: colors.text }} tickLine={{ stroke: colors.text }} />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            type='monotone'
            dataKey='totalSales'
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name='Total sales'
            unit='$'
          />
          <Area
            type='monotone'
            dataKey='extrasSales'
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name='Extras sales'
            unit='$'
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  )
}

export default SalesChart
