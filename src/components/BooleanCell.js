import React from 'react'
import styled from 'styled-components'

import { baseTheme } from '@/themes'

const Point = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 7px;
  background-color: ${({ color }) => color};
  margin-right: 7px;
`

const StyledStatusLabel = styled.div`
  padding-top: 5px;
  text-align: center;
  line-height: 15px;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.$primary_color};
`

StyledStatusLabel.defaultProps = {
  theme: baseTheme
}

const BooleanCell = ({ value }) => {
  if (value === null) {
    return (
      <p> </p>
    )
  }
  if (value === true) {
    return (
      <StyledStatusLabel className="d-flex flex-row">
        <Point color='#3e7901' />
      </StyledStatusLabel>
    )
  }
  return (
    <StyledStatusLabel className="d-flex flex-row">
      <Point color='#f44336' />
    </StyledStatusLabel>
  )
}

export default BooleanCell
