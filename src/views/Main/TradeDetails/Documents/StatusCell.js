import React from 'react'
import styled from 'styled-components'

import IntlMessages from '@/utils/IntlMessages'
import { baseTheme } from '@/themes'
import { DOCUMENT_STATUS } from '@/constants/documents'

const Point = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 7px;
  background-color: ${({ color }) => color};
  margin-right: 7px;
`

const StyledStatusLabel = styled.div`
  padding-top: 5px;
  line-height: 15px;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.$primary_color};
`
StyledStatusLabel.defaultProps = {
  theme: baseTheme
}
const StatusLabel = ({ label }) => {
  const color = {
    completed: '#3e7901',
    default: '#f3a71e'
  }

  return (
    <StyledStatusLabel className="d-flex flex-row">
      <Point color={color[label] || color.default} />
      <IntlMessages id={`tabs.documents.${label}`} />
    </StyledStatusLabel>
  )
}

const status = {
  [DOCUMENT_STATUS.COMPLETED]: <StatusLabel label="completed" />,
  [DOCUMENT_STATUS.PENDING]: <StatusLabel label="pending-upload" />
}

const StatusCell = ({ value }) => status[value]

export default StatusCell
