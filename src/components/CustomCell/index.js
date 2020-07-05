import React from 'react'
import { string, number, oneOfType } from 'prop-types'
import styled from 'styled-components'
import { baseTheme } from '../../themes'

const Cell = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.$primary_color};
  margin: 0;
  padding: 0;
  line-height: 25px;
  display: inline-block;
`

const CustomCell = ({ value, className }) => (
  <Cell className={className}>{value}</Cell>
)

CustomCell.propTypes = {
  value: oneOfType([string, number]),
  className: string
}

Cell.defaultProps = {
  theme: baseTheme
}

export default CustomCell
