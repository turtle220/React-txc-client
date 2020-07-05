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
import { NavLink } from 'react-router-dom'
import { useApolloClient } from '@apollo/react-hooks'
import * as yup from 'yup'
import { Formik } from 'formik'
import { useOktaAuth } from '@okta/okta-react'

import { Colxx } from '@/components/CustomBootstrap'
import Loader from '@/components/Loader'

import IntlMessages from '@/utils/IntlMessages'
import { setCurrentUser } from '@/utils/session'
import { oktaSignIn } from '@/utils/okta-auth'
import { clearStorage } from '@/utils/storage'

import { useToast } from '@/hooks'

import { USER_EMAIL_QUERY, VERIFY_USER_QUERY } from '@/graphql/queries/users'

import LoginAs from './LoginAs'

const validationSchema = yup.object().shape({
  email: yup.string()
    .email('You must enter a valid E-mail')
    .required('This field is required'),
  password: yup.string()
    .min(6, 'Password should be at least 8 characters')
    .required('This field is required')
})

const LoginForm = () => {
  const { authService } = useOktaAuth()
  const client = useApolloClient()
  const [loading, setLoading] = useState(false)
  const [sessionToken, setSessionToken] = useState(null)
  const showToast = useToast()

  const login = async (values) => {
    setLoading(true)

    try {
      await client.query({
        query: VERIFY_USER_QUERY,
        variables: {
          email: values.email
        }
      })

      oktaSignIn({
        username: values.email,
        password: values.password
      })
        .then((res) => {
          client.query({
            query: USER_EMAIL_QUERY,
            variables: {
              email: values.email
            }
          }).then(({ data: { userEmailQuery } }) => {
            setCurrentUser(userEmailQuery)
            setSessionToken(res.sessionToken)
          }).catch(() => {})
        })
        .catch(() => {
          showToast('error', 'Invalid user')
          clearStorage()
        })
        .finally(() => {
          setLoading(false)
        })
    } catch (err) {
      setLoading(false)
    }
  }

  if (sessionToken) {
    authService.redirect({ sessionToken })
    return null
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
              <IntlMessages id="user.login-title" />
            </CardTitle>
            <Formik
              initialValues={{
                email: '',
                password: ''
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => login(values)}
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

                  <FormGroup>
                    <Label className="form-group has-float-label mb-4">
                      <Input
                        type="password"
                        name="password"
                        value={values.password}
                        invalid={!!errors.password}
                        onChange={handleChange}
                      />
                      {touched.password && errors.password && (
                        <FormFeedback>{errors.password}</FormFeedback>
                      )}
                      <IntlMessages
                        id="user.password"
                      />
                    </Label>
                  </FormGroup>

                  <div className="d-flex justify-content-between align-items-center">
                    <NavLink to="/user/forgot-password">
                      <IntlMessages id="user.forgot-password-question" />
                    </NavLink>
                    <Button
                      color="primary"
                      className="btn-shadow"
                      size="lg"
                      type="submit"
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      {loading ? (
                        <Loader size={20} />
                      ) : (<IntlMessages id="user.login-button" />)}
                    </Button>
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <NavLink to="/user/register">
                      <IntlMessages id="user.signup" />
                    </NavLink>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Card>
        <LoginAs
          onLogin={login}
          logging={loading}
        />
      </Colxx>
    </Row>
  )
}

export default LoginForm
