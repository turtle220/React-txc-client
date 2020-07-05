import React from 'react'
import { string } from 'prop-types'
import styled from 'styled-components'

import IntlMessages from '@/utils/IntlMessages'

const StyledEmptyMessage = styled.div`
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0,0,0,0.5);
`

const DatatableEmptyMessage = ({ messageId = 'datatable.no-rows-found' }) => (
  <StyledEmptyMessage>
    <IntlMessages id={messageId} />
  </StyledEmptyMessage>
)

DatatableEmptyMessage.propTypes = {
  messageId: string
}

export default DatatableEmptyMessage
