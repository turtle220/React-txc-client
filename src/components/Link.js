import React from 'react'
import styled from 'styled-components'

const Container = styled.span`
  color: #145388;
  font-size: 1rem;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`

const Link = ({ onClick, children }) => (
  <Container onClick={onClick}>
    {children}
  </Container>
)

export default Link
