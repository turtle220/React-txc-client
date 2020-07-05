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
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import * as yup from 'yup'
import { Formik } from 'formik'
import qs from 'query-string'
import { useApolloClient } from '@apollo/react-hooks'

import { useToast } from '@/hooks'

import { Colxx } from '@/components/CustomBootstrap'
import IsLoading from '@/components/Loader/IsLoading'

import IntlMessages from '@/utils/IntlMessages'

import { RESET_PASSWORD } from '@/graphql/mutations/users'

const validationSchema = yup.object().shape({
  password: yup.string()
    .required('This field is required'),
  confirmPassword: yup.string().required('This field is required')
})

const ResetPassword = () => {
  const [isLoading, setLoading] = useState(false)
  const history = useHistory()
  const location = useLocation()
  const client = useApolloClient()
  const showToast = useToast()

  const { email } = qs.parse(location.search)

  const submit = async (values, { setFieldError }) => {
    setLoading(true)

    if (values.password !== values.confirmPassword) {
      setFieldError('confirmPassword', 'Passwords don’t match, please try again.')
      setLoading(false)
      return
    }

    try {
      await client.mutate({
        mutation: RESET_PASSWORD,
        variables: {
          email,
          password: values.password
        }
      })
      setLoading(false)
      showToast('success', 'Password reset successfully')
      history.push('/user/reset-password-successful')
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
              <IntlMessages id="user.reset-password" />
            </CardTitle>

            <Formik
              initialValues={{
                password: '',
                confirmPassword: ''
              }}
              validationSchema={validationSchema}
              onSubmit={submit}
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
                        type="password"
                        name="password"
                        value={values.password}
                        invalid={!!errors.password}
                        onChange={handleChange}
                      />
                      {touched.password && errors.password && (
                        <FormFeedback>{errors.password}</FormFeedback>
                      )}
                      <IntlMessages id='pages.account-settings.enter-new-password' />
                    </Label>
                  </FormGroup>

                  <FormGroup>
                    <Label className="form-group has-float-label mb-4">
                      <Input
                        type="password"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        invalid={!!errors.confirmPassword}
                        onChange={handleChange}
                      />
                      {touched.confirmPassword && errors.confirmPassword && (
                        <FormFeedback>{errors.confirmPassword}</FormFeedback>
                      )}
                      <IntlMessages id='pages.account-settings.confirm-new-password' />
                    </Label>
                  </FormGroup>

                  <div className="d-flex justify-content-end align-items-center">
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

export default ResetPassword
