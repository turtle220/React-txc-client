import React from 'react'
import { Container, Row, Card, CardTitle, Button } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import { Colxx } from '../components/CustomBootstrap'

const Unauthorized = () => (
  <Container className="h-100">
    <Row className="h-100">
      <Colxx xxs="12" md="6" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="form-side">
            <NavLink to="/" className="white">
              <span className="logo-single" />
            </NavLink>
            <CardTitle className="mb-4">
              Oops! Looks like you haven&apos;t finished the Membership Application yet
            </CardTitle>
            <Button
              href="/app/membership-agreement"
              color="primary"
              className="btn-shadow"
              size="lg"
            >
              GO BACK TO THE FORM
            </Button>
          </div>
        </Card>
      </Colxx>
    </Row>
  </Container>
)

export default Unauthorized
