import React from 'react'
import {
  Row,
  Card,
  CardTitle
} from 'reactstrap'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import { Colxx } from '@/components/CustomBootstrap'

import IntlMessages from '@/utils/IntlMessages'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CheckInbox = () => (
  <Row className="h-100">
    <Colxx xxs="12" md="6" className="mx-auto my-auto">
      <Card className="auth-card">
        <div className="form-side">
          <div className="d-flex justify-content-center align-items-center">
            <NavLink to="/" className="white">
              <span className="logo-single" />
            </NavLink>
          </div>
          <Content>
            <CardTitle className="mb-4">
              <IntlMessages id="user.check-inbox" />
            </CardTitle>

            <IntlMessages id="user.check-inbox-description" />
          </Content>
        </div>
      </Card>
    </Colxx>
  </Row>
)

export default CheckInbox
