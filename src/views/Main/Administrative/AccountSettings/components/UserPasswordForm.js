import React from 'react'
import { useHistory } from 'react-router-dom'
import { Row, FormGroup, Label, Card, CardBody, Button } from 'reactstrap'
import * as yup from 'yup'
import { Formik, Field } from 'formik'
import { useMutation } from '@apollo/react-hooks'

import IntlMessages from '@/utils/IntlMessages'
import { UPDATE_PASSWORD } from '@/views/User/graphql/mutations'
import { Colxx } from '@/components/CustomBootstrap'
import Loader from '@/components/Loader'
import { getCurrentUser } from '@/utils/session'
import useToast from '@/hooks/useToast'
import { initialPasswordFormValues } from '../initialFormValues'

const validationSchema = yup.object().shape({
  currentPassword: yup.string()
    .required('This field is required'),
  newPassword: yup.string()
    .min(8, 'Password should be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      'Password must contain an uppercase letter, a lowercase letter and a number'
    )
    .required('This field is required'),
  confirmNewPassword: yup.string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required('This field is required')
})

const UserPasswordForm = () => {
  const showToast = useToast()
  const history = useHistory()
  const currentUser = getCurrentUser()
  const userName = currentUser.email

  const [updatePassword, {
    loading: loadingUpdatingPassword
  }] = useMutation(UPDATE_PASSWORD, {
    onCompleted: () => {
      showToast('success', 'Password updated successfully')
      history.replace('/app')
    },
    onError: (error) => {
      showToast('error', error)
    }
  })
  const handleSubmit = async (values) => {
    await updatePassword({ variables: {
      userName,
      currentPassword: values.currentPassword,
      newPassword: values.newPassword
    } })
  }

  return (
    <Card>
      <CardBody>
        <Formik
          enableReinitialize
          initialValues={initialPasswordFormValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors, handleSubmit }) => (
            <>
              <Row>
                <Colxx xxs='12' md='6' className='mt-5'>
                  <FormGroup>
                    <Label>
                      <IntlMessages id='pages.account-settings.enter-current-password' />
                    </Label>
                    <Field className='form-control' name='currentPassword' type='password' />
                    {errors.currentPassword && touched.currentPassword && (
                      <div className='invalid-feedback d-block'>
                        {errors.currentPassword}
                      </div>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      <IntlMessages id='pages.account-settings.enter-new-password' />
                    </Label>
                    <Field className='form-control' name='newPassword' type='password' />
                    {errors.newPassword && touched.newPassword && (
                      <div className='invalid-feedback d-block'>
                        {errors.newPassword}
                      </div>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      <IntlMessages id='pages.account-settings.confirm-new-password' />
                    </Label>
                    <Field className='form-control' name='confirmNewPassword' type='password' />
                    {errors.confirmNewPassword
                      && touched.confirmNewPassword && (
                        <div className='invalid-feedback d-block'>
                          {errors.confirmNewPassword}
                        </div>
                    )}
                  </FormGroup>
                </Colxx>
              </Row>

              <Button
                color='primary'
                size='lg'
                className='float-right mt-3'
                onClick={handleSubmit}
                disabled={loadingUpdatingPassword}
              >
                {loadingUpdatingPassword ? (
                  <Loader size={20} />
                ) : (<IntlMessages id='pages.account-settings.save' />)}
              </Button>
            </>
          )}
        </Formik>
      </CardBody>
    </Card>
  )
}

UserPasswordForm.propTypes = {}

export default UserPasswordForm
