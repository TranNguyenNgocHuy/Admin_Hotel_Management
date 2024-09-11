import styled from 'styled-components'
import { TodayActivityData } from './interfaceCheck-in-out'
import TodayItem from './TodayItem'

const StyledTodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`

interface TodayActivityListProps {
  activities: TodayActivityData[]
}

function TodayActivityList({ activities }: TodayActivityListProps) {
  if (activities.length === 0) return <NoActivity>No activity today...</NoActivity>

  return (
    <StyledTodayList>
      {activities.map((activity) => (
        <TodayItem activity={activity} key={activity.id} />
      ))}
    </StyledTodayList>
  )
}

export default TodayActivityList
