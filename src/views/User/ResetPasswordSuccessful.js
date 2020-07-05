import React, { useEffect } from 'react'
import {
  Row,
  Card,
  CardTitle,
  Button
} from 'reactstrap'
import { NavLink, useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { Colxx } from '@/components/CustomBootstrap'

import IntlMessages from '@/utils/IntlMessages'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ResetPasswordSuccessful = () => {
  const history = useHistory()

  const goToLogin = () => {
    history.replace('/user/login')
  }

  useEffect(() => {
    setTimeout(goToLogin, 3000)
  }, [])

  return (
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
                <IntlMessages id="user.reset-sucessful" />
              </CardTitle>

              <IntlMessages id="user.were-redirect-you-back-to-login" />

              <Button color="link" className="p-0" onClick={goToLogin}>
                <IntlMessages id='user.nothing-happens-click-here' />
              </Button>
            </Content>
          </div>
        </Card>
      </Colxx>
    </Row>
  )
}

export default ResetPasswordSuccessful
