import React from 'react'
import styled from 'styled-components'

import IntlMessages from '@/utils/IntlMessages'

import { baseTheme } from '@/themes'

const Point = styled.div`
  min-width: 14px;
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
    approved: '#3e7901',
    rejected: '#f44336',
    default: '#f3a71e'
  }

  return (
    <StyledStatusLabel className="d-flex flex-row">
      <Point color={color[label] || color.default} />
      <IntlMessages id={`status.${label}`} />
    </StyledStatusLabel>
  )
}

const status = {
  APPROVED: <StatusLabel label="approved" />,
  REJECTED: <StatusLabel label="rejected" />,
  PENDING_APPROVAL: <StatusLabel label="pending-approval" />,
  PENDING: <StatusLabel label="pending" />,
  PENDING_UPLOAD: <StatusLabel label="pending-upload" />
}

const StatusCell = ({ value }) => status[value]

export default StatusCell
