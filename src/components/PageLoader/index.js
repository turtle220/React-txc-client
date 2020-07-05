import React from 'react'
import styled from 'styled-components'

import Loader from '@/assets/images/loader.gif'

const StyledPageLoader = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledLoader = styled.img`
  max-width: 100px;
`

const PageLoader = () => (
  <StyledPageLoader>
    <StyledLoader src={Loader} alt='InterV' />
  </StyledPageLoader>
)

export default PageLoader
