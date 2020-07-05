import React, { useState } from 'react'
import {
  Row,
  Card,
  CardTitle,
  Form,
  Label,
  Input,
  Button,
  FormFeedback,
  FormGroup
} from 'reactstrap'
import { NavLink, useHistory } from 'react-router-dom'
import * as yup from 'yup'
import { Formik } from 'formik'

import { Colxx } from '@/components/CustomBootstrap'
import IsLoading from '@/components/Loader/IsLoading'

import IntlMessages from '@/utils/IntlMessages'
import { oktaForgotPassword } from '@/utils/okta-auth'

const validationSchema = yup.object().shape({
  email: yup.string()
    .email('You must enter a valid E-mail')
    .required('This field is required')
})

const ForgotPassword = () => {
  const history = useHistory()
  const [isLoading, setLoading] = useState(false)

  const onForgotPassword = async (values) => {
    setLoading(true)

    try {
      await oktaForgotPassword({
        email: values.email
      })

      history.push('/user/check-inbox')

      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

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
            <CardTitle className="mb-4">
              <IntlMessages id="user.forgot-password" />
            </CardTitle>

            <Formik
              initialValues={{
                email: ''
              }}
              validationSchema={validationSchema}
              onSubmit={onForgotPassword}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit
              }) => (
                <Form>
                  <FormGroup>
                    <Label className="form-group has-float-label mb-4">
                      <Input
                        type="email"
                        name="email"
                        value={values.email}
                        invalid={!!errors.email}
                        onChange={handleChange}
                      />
                      {touched.email && errors.email && (
                        <FormFeedback>{errors.email}</FormFeedback>
                      )}
                      <IntlMessages id="user.email" />
                    </Label>
                  </FormGroup>

                  <div className="d-flex justify-content-between align-items-center">
                    <NavLink to="/user/login">
                      <IntlMessages id="user.login-title" />
                    </NavLink>
                    <Button
                      color="primary"
                      className="btn-shadow"
                      size="lg"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      <IsLoading loading={isLoading} size={20} color='white'>
                        <IntlMessages id="user.reset-password-button" />
                      </IsLoading>
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Card>
      </Colxx>
    </Row>
  )
}

export default ForgotPassword
