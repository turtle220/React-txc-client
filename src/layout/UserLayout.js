import React from 'react'
import { node } from 'prop-types'
import styled from 'styled-components'

const Main = styled.main`
  margin: 0;
  height: 100%;

  .container {
    height: 100vh;
  }
`

const UserLayout = ({ children }) => (
  <Main>
    <div className="container">{children}</div>
  </Main>
)

UserLayout.propTypes = {
  children: node.isRequired
}

export default UserLayout
