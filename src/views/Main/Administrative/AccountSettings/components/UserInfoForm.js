import React from 'react'
import {
  Row,
  FormGroup,
  Label,
  Card,
  CardBody,
  Button,
} from 'reactstrap'
import * as yup from 'yup'
import { Formik, Field } from 'formik'

import IntlMessages from '@/utils/IntlMessages'
import { Colxx } from '@/components/CustomBootstrap'
import { initialFormValues } from '../initialFormValues'

const validationSchema = yup.object().shape({
  firstName: yup.string().required('This field is required'),
  surName: yup.string().required('This field is required'),
  companyName: yup.string().required('This field is required'),
  phone: yup.string().required('This field is required'),
  email: yup
    .string()
    .email('Type a valid email')
    .required('This field is required'),
  mobile: yup.string().required('This field is required'),
  address: yup.string().required('This field is required'),
  city: yup.string().required('This field is required')
})

const UserInfoForm = ({ readonly, values = {} }) => {
  const handleSubmit = (values) => {
    console.log('handleSubmit', values)
  }

  return (

    <Card>
      <CardBody>
        <Formik
          enableReinitialize
          initialValues={initialFormValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors, handleSubmit }) => (
            <>
              <Row>
                <Colxx xxs='12' md='6'>
                  <FormGroup>
                    <Label>
                      <IntlMessages id='pages.account-settings.firstname' />
                    </Label>
                    <Field className='form-control' name='firstName' disabled={readonly} value={values.firstName} />
                    {errors.firstName && touched.firstName && (
                    <div className='invalid-feedback d-block'>
                      {errors.firstName}
                    </div>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      <IntlMessages id='pages.account-settings.surname' />
                    </Label>
                    <Field className='form-control' name='surName' disabled={readonly} value={values.surName} />
                    {errors.surName && touched.surName && (
                    <div className='invalid-feedback d-block'>
                      {errors.surName}
                    </div>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      <IntlMessages id='pages.account-settings.email' />
                    </Label>
                    <Field className='form-control' name='email' disabled={readonly} value={values.email} />
                    {errors.email && touched.email && (
                    <div className='invalid-feedback d-block'>
                      {errors.email}
                    </div>
                    )}
                  </FormGroup>
                </Colxx>
              </Row>

              {!readonly && (
                <Button
                  color='primary'
                  size='lg'
                  className='float-right mt-3'
                  onClick={handleSubmit}
                >
                  <IntlMessages id='pages.account-settings.save' />
                </Button>
              )}
            </>
          )}
        </Formik>
      </CardBody>
    </Card>

  )
}

UserInfoForm.propTypes = {
}

export default UserInfoForm
