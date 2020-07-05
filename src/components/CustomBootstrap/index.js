import React from 'react'
import { string } from 'prop-types'
import { Col } from 'reactstrap'

const Colxx = (props) => (
  <Col {...props} widths={['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']} />
)

const Separator = ({ className }) => (
  <div className={`separator ${className}`} />
)

Separator.propTypes = {
  className: string
}

export { Colxx, Separator }
