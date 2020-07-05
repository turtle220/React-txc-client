import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'

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
import * as yup from 'yup'
import { Formik } from 'formik'

import IntlMessages from '@/utils/IntlMessages'
import Loader from '@/components/Loader'
import { Colxx } from '@/components/CustomBootstrap'
import Select from '@/components/Select'

import useToast from '@/hooks/useToast'

import { MEMBER_ROLES_QUERY } from './graphql/queries'
import { CREATE_USER } from './graphql/mutations'

const validationSchema = yup.object().shape({
  firstName: yup.string().required('This field is required'),
  surName: yup.string().required('This field is required'),
  email: yup.string()
    .email('You must enter a valid E-mail')
    .required('This field is required'),
  password: yup.string()
    .min(8, 'Password should be at least 6 characters')
    .required('This field is required'),
  roleId: yup.string().required('This field is required')
})

const Register = ({ history }) => {
  const showToast = useToast()

  const {
    loading: loadingRoles,
    data: { memberRoles = [] } = {}
  } = useQuery(MEMBER_ROLES_QUERY)

  const [signup, {
    loading: loadingCreateUser
  }] = useMutation(CREATE_USER, {
    onCompleted: () => {
      showToast('success', 'User registered successfully')
      history.replace('/app')
    },
    onError: (error) => {
      showToast('error', error)
    }
  })

  const createUser = async (values) => {
    await signup({ variables: values })
  }

  const rolesOptions = memberRoles
    .map((item, index) => ({
      key: index,
      label: item?.description,
      value: item?.id
    }))

  return (
    <Row className='h-100'>
      <Colxx xxs='12' md='6' className='mx-auto my-auto'>
        <Card className='auth-card'>
          <div className='form-side'>
            <div className='d-flex justify-content-center align-items-center'>
              <NavLink to='/' className='white'>
                <span className='logo-single' />
              </NavLink>
            </div>
            <CardTitle className='mb-4'>
              <IntlMessages id='user.register' />
            </CardTitle>
            <Formik
              enableReinitialize
              initialValues={{
                firstName: '',
                surName: '',
                email: '',
                password: '',
                roleId: memberRoles[0]?.id || ''
              }}
              validationSchema={validationSchema}
              onSubmit={createUser}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                setFieldValue,
                handleSubmit
              }) => (
                <Form>
                  <FormGroup>
                    <Label className='form-group has-float-label mb-4'>
                      <Input
                        name='firstName'
                        value={values.firstName}
                        invalid={!!errors.firstName}
                        onChange={handleChange}
                      />
                      {touched.firstName && errors.firstName && (
                        <FormFeedback>{errors.firstName}</FormFeedback>
                      )}
                      <IntlMessages id='user.firstname' />
                    </Label>
                  </FormGroup>

                  <FormGroup>
                    <Label className='form-group has-float-label mb-4'>
                      <Input
                        name='surName'
                        value={values.surName}
                        invalid={!!errors.surName}
                        onChange={handleChange}
                      />
                      {touched.surName && errors.surName && (
                        <FormFeedback>{errors.surName}</FormFeedback>
                      )}
                      <IntlMessages id='user.surname' />
                    </Label>
                  </FormGroup>

                  <FormGroup>
                    <Label className='form-group has-float-label mb-4'>
                      <Input
                        type='email'
                        name='email'
                        value={values.email}
                        invalid={!!errors.email}
                        onChange={handleChange}
                      />
                      {touched.email && errors.email && (
                        <FormFeedback>{errors.email}</FormFeedback>
                      )}
                      <IntlMessages id='user.email' />
                    </Label>
                  </FormGroup>

                  <FormGroup>
                    <Label className='form-group has-float-label mb-4'>
                      <Select
                        options={rolesOptions}
                        name='roleId'
                        value={values.roleId}
                        isLoading={loadingRoles}
                        className='react-select'
                        classNamePrefix='react-select'
                        onChange={(option) => setFieldValue('roleId', option.value)}
                      />
                      <IntlMessages id='user.member-type' />
                    </Label>
                  </FormGroup>

                  <FormGroup>
                    <Label className='form-group has-float-label mb-4'>
                      <Input
                        type='password'
                        name='password'
                        value={values.password}
                        invalid={!!errors.password}
                        onChange={handleChange}
                      />
                      {touched.password && errors.password && (
                        <FormFeedback>{errors.password}</FormFeedback>
                      )}
                      <IntlMessages id='user.password' />
                    </Label>
                  </FormGroup>

                  <div className='d-flex justify-content-between align-items-center'>
                    <NavLink to='/user/login'>
                      <IntlMessages id='user.login-title' />
                    </NavLink>

                    <Button
                      color='primary'
                      className='btn-shadow'
                      size='lg'
                      onClick={handleSubmit}
                      type='submit'
                      disabled={
                        loadingRoles || loadingCreateUser
                      }
                    >
                      {loadingCreateUser ? (
                        <Loader size={20} />
                      ) : (
                        <IntlMessages id='user.register-button' />
                      )}
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

export default Register
