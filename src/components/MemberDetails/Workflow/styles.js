import styled from 'styled-components'
import { baseTheme } from '@/themes'

import { TASK_STATUS } from '@/constants/task'

const defaultPointColor = '#eee'

const getPointColor = ({ status }) => {
  switch (status) {
    case TASK_STATUS.PENDING:
      return 'orange'
    case TASK_STATUS.COMPLETED:
      return 'green'
    case TASK_STATUS.PAST_DUE:
      return defaultPointColor
    case TASK_STATUS.APPROVED:
      return defaultPointColor
    case TASK_STATUS.REJECTED:
      return 'red'
    case TASK_STATUS.OUTSTANDING:
      return 'red'
    case TASK_STATUS.PENDING_APPROVAL:
      return 'orange'
    case TASK_STATUS.PENDING_PRIOR:
      return 'grey'
    default:
      return defaultPointColor
  }
}

const getTdOpacity = ({ status }) => (
  status === 'pending-prior' ? 0.5 : 1
)

export const Row = styled.tr`
  border-bottom: 15px solid transparent !important;
  background-color: ${({ theme }) => theme.colors.$foreground_color}
  background-clip: padding-box;
  filter: drop-shadow(0px 1px 4px rgba(0,0,0,0.2));

  && td {
    padding: 1.15rem .75rem 1rem;
    line-height: 20px;
    opacity: ${getTdOpacity}
  }`
// for any of the style components that are going to use a theme they need to have default props
Row.defaultProps = {
  theme: baseTheme
}

export const Point = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 7px;
  background-color: ${getPointColor};
  margin-right: 7px;
`

export const StatusStyled = styled.div`
  padding-top: 3px;
  line-height: 15px;
`
