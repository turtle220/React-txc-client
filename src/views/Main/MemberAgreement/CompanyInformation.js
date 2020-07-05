import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import { object, func, bool } from 'prop-types'
import {
  Row,
  CardTitle,
  FormGroup,
  Label,
} from 'reactstrap'
import * as yup from 'yup'
import { Formik, Field } from 'formik'
import MaskedInput from 'react-text-mask'

import IntlMessages from '@/utils/IntlMessages'

import { Colxx, Separator } from '@/components/CustomBootstrap'
import { Buttons } from '@/components/Wizard'
import InputFile from '@/components/InputFile'
import Select from '@/components/Select'

import categoryClientOptions from '@/constants/categoryClientOptions'
import { S3_BUCKET_PATHS } from '@/constants/s3BucketPaths'

import { MEMBER_ROLES_QUERY } from './graphql/queries'

const postalCodeMask = (userInput) => {
  const numbers = userInput.match(/\d/g)
  let numberLength = 0
  if (numbers) {
    numberLength = numbers.join('').length
  }

  if (numberLength > 5) {
    return [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  }

  return [/\d/, /\d/, /\d/, /\d/, /\d/]
}

const validationSchema = yup.object().shape({
  type: yup.string().required('This field is required'),
  categoryClient: yup.string().required('This field is required'),
  registeredEmail: yup
    .string()
    .email('Type a valid email')
    .required('This field is required'),
  officialAddress: yup.string().required('This field is required'),
  street: yup.string().required('This field is required'),
  postalCode: yup
    .string()
    .test('postalCode', 'Type a valid Postal Code', (input) => /(\d{5}([\\-]\d{4})?)/g.test(input))
    .required('This field is required'),
  country: yup.string().required('This field is required'),
  registeredNumber: yup.string().required('This field is required'), // changing to to string as we dont know the correct validation
  companyName: yup.string().required('This field is required'),
  vatNumber: yup.string().required('This field is required'), // changing to to string as we dont know the correct validation
  authority: yup.string().required('This field is required'),
  documents: yup.object().shape({
    companyRegistrationReport: yup.object().required('This field is required').nullable(),
    groupChart: yup.object().required('This field is required').nullable(),
    lastFinancialStatement: yup.object().required('This field is required').nullable(),
    statute: yup.object().required('This field is required').nullable()
  })
})

const CompanyInformation = ({
  initialFormValues,
  updateFormValues,
  isFirstStep,
  isLastStep,
  goToNextStep,
  goToBackStep,
  registerConcluded,
  updateFieldValue,
  populateStep,
  memberTypeValue
}) => {
  const apolloClient = useApolloClient()
  const [loadingRoles, setLoadingRoles] = useState(false)
  const [memberRoles, setMemberRoles] = useState([])

  const handleSubmit = (values) => {
    updateFormValues(values, 'companyInformation')
    goToNextStep()
  }

  const handleSelectFile = (setFieldValue, fieldName) => (field, fileName, fileObj) => {
    const { type, name } = fileObj
    updateFieldValue({
      name: fileName,
      originalName: name,
      docType: type
    }, fieldName)()

    setFieldValue(field, { name: fileName, originalName: name, docType: type })
  }

  const fetchMemberRoles = async () => {
    setLoadingRoles(true)

    const { data: { memberRoles } } = await apolloClient.query({
      query: MEMBER_ROLES_QUERY,
      variables: {
        withAdmin: true
      }
    })

    const rolesOptions = memberRoles.map((item, index) => ({
      key: index,
      label: item?.description,
      value: item?.name
    }))

    setMemberRoles(rolesOptions)
    setLoadingRoles(false)
  }

  useEffect(() => {
    fetchMemberRoles()
  }, [])

  return (
    <Formik
      enableReinitialize
      initialValues={{
        ...initialFormValues,
        type: memberTypeValue
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ touched, errors, values, setFieldValue, handleSubmit }) => (
        <>
          <Row>
            <Colxx xxs='12' md='4'>
              <FormGroup>
                <Label>Member Type</Label>
                <Select
                  options={memberRoles}
                  name='type'
                  value={values.type}
                  className='react-select'
                  classNamePrefix='react-select'
                  onChange={(option) => setFieldValue('type', option.value)}
                  isLoading={loadingRoles}
                  isDisabled
                  onBlur={updateFieldValue(values.type, 'type')}
                />
                {errors.type && touched.type && (
                  <div className='invalid-feedback d-block'>
                    {errors.type}
                  </div>
                )}
              </FormGroup>
            </Colxx>

            <Colxx xxs='12' md='4'>
              <FormGroup>
                <Label>Category Client</Label>
                <Select
                  options={categoryClientOptions}
                  name='categoryClient'
                  value={values.categoryClient}
                  className='react-select'
                  classNamePrefix='react-select'
                  onChange={(option) => setFieldValue('categoryClient', option.value)}
                  isLoading={!categoryClientOptions.length}
                  isDisabled={registerConcluded}
                  onBlur={updateFieldValue(
                    values.categoryClient,
                    'categoryClient'
                  )}
                />
                {errors.categoryClient && touched.categoryClient && (
                  <div className='invalid-feedback d-block'>
                    {errors.categoryClient}
                  </div>
                )}
              </FormGroup>
            </Colxx>
          </Row>
          <Row>
            <Colxx xxs='12' md='4'>
              <FormGroup>
                <Label>Company Name</Label>
                <Field
                  className='form-control'
                  name='companyName'
                  disabled={registerConcluded}
                  onBlur={updateFieldValue(values.companyName, 'companyName')}
                />
                {errors.companyName && touched.companyName && (
                  <div className='invalid-feedback d-block'>
                    {errors.companyName}
                  </div>
                )}
              </FormGroup>
            </Colxx>

            <Colxx xxs='12' md='4'>
              <FormGroup>
                <Label>
                  <IntlMessages id='pages.members.details.registered-email-pec' />
                </Label>
                <Field
                  className='form-control'
                  name='registeredEmail'
                  disabled={registerConcluded}
                  onBlur={updateFieldValue(
                    values.registeredEmail,
                    'registeredEmailPec'
                  )}
                />
                {errors.registeredEmail && touched.registeredEmail && (
                  <div className='invalid-feedback d-block'>
                    {errors.registeredEmail}
                  </div>
                )}
              </FormGroup>
            </Colxx>

            <Colxx xxs='12' md='4'>
              <FormGroup>
                <Label>VAT Number/Tax Code</Label>
                <Field
                  className='form-control'
                  name='vatNumber'
                  disabled={registerConcluded}
                  onBlur={updateFieldValue(values.vatNumber, 'vatNumber')}
                />
                {errors.vatNumber && touched.vatNumber && (
                  <div className='invalid-feedback d-block'>
                    {errors.vatNumber}
                  </div>
                )}
              </FormGroup>
            </Colxx>
          </Row>

          <Row>
            <Colxx xxs='12' md='4'>
              <FormGroup>
                <Label>Registered number</Label>
                <Field
                  className='form-control'
                  name='registeredNumber'
                  disabled={registerConcluded}
                  onBlur={updateFieldValue(
                    values.registeredNumber,
                    'registeredNumber'
                  )}
                />
                {errors.registeredNumber && touched.registeredNumber && (
                  <div className='invalid-feedback d-block'>
                    {errors.registeredNumber}
                  </div>
                )}
              </FormGroup>
            </Colxx>

            <Colxx xxs='12' md='4'>
              <FormGroup>
                <Label>Authority</Label>
                <Field
                  className='form-control'
                  name='authority'
                  disabled={registerConcluded}
                  onBlur={updateFieldValue(values.authority, 'authority')}
                />
                {errors.authority && touched.authority && (
                  <div className='invalid-feedback d-block'>
                    {errors.authority}
                  </div>
                )}
              </FormGroup>
            </Colxx>

            <Colxx xxs='12' md='4'>
              <FormGroup>
                <Label>Street Address</Label>
                <Field
                  className='form-control'
                  name='street'
                  disabled={registerConcluded}
                  onBlur={updateFieldValue(values.street, 'street')}
                />
                {errors.street && touched.street && (
                  <div className='invalid-feedback d-block'>
                    {errors.street}
                  </div>
                )}
              </FormGroup>
            </Colxx>
          </Row>

          <Row>
            <Colxx xxs='12' md='4'>
              <FormGroup>
                <Label>City</Label>
                <Field
                  className='form-control'
                  name='officialAddress'
                  disabled={registerConcluded}
                  onBlur={updateFieldValue(
                    values.officialAddress,
                    'officialAddress'
                  )}
                />
                {errors.officialAddress && touched.officialAddress && (
                  <div className='invalid-feedback d-block'>
                    {errors.officialAddress}
                  </div>
                )}
              </FormGroup>
            </Colxx>

            <Colxx xxs='12' md='4'>
              <FormGroup>
                <Label>Postal Code</Label>
                <Field
                  name='postalCode'
                  render={({ field }) => (
                    <MaskedInput
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...field}
                      guide={false}
                      mask={postalCodeMask}
                      className='form-control'
                      disabled={registerConcluded}
                      onBlur={updateFieldValue(values.postalCode, 'zipCode')}
                    />
                  )}
                />
                {errors.postalCode && touched.postalCode && (
                  <div className='invalid-feedback d-block'>
                    {errors.postalCode}
                  </div>
                )}
              </FormGroup>
            </Colxx>

            <Colxx xxs='12' md='4'>
              <FormGroup>
                <Label>Country</Label>
                <Field
                  className='form-control'
                  name='country'
                  disabled={registerConcluded}
                  onBlur={updateFieldValue(values.country, 'country')}
                />
                {errors.country && touched.country && (
                  <div className='invalid-feedback d-block'>
                    {errors.country}
                  </div>
                )}
              </FormGroup>
            </Colxx>
          </Row>

          <CardTitle className='mb-3 mt-4'>Documents</CardTitle>
          <Separator className='mb-5' />

          <Row>
            <Colxx xxs='12' md='6'>
              <FormGroup>
                <Label>Company Registration Report (Visura)</Label>
                <InputFile
                  id='companyRegistrationReport'
                  name='documents.companyRegistrationReport'
                  value={values?.documents?.companyRegistrationReport?.originalName}
                  downloadFileKey={values?.documents?.companyRegistrationReport?.name}
                  fileName='companyRegistrationReport'
                  onChange={handleSelectFile(
                    setFieldValue,
                    'companyRegistrationReport'
                  )}
                  disabled={registerConcluded}
                  path={S3_BUCKET_PATHS.DOCUMENTS.MEMBER}
                />
                {errors.documents?.companyRegistrationReport
                  && touched.documents?.companyRegistrationReport && (
                    <div className='invalid-feedback d-block'>
                      {errors.documents?.companyRegistrationReport}
                    </div>
                  )}
              </FormGroup>
            </Colxx>

            <Colxx xxs='12' md='6'>
              <FormGroup>
                <Label>Statute</Label>
                <InputFile
                  id='statute'
                  name='documents.statute'
                  value={values?.documents?.statute?.originalName}
                  downloadFileKey={values?.documents?.statute?.name}
                  onChange={handleSelectFile(setFieldValue, 'statute')}
                  disabled={registerConcluded}
                  fileName='statute'
                  path={S3_BUCKET_PATHS.DOCUMENTS.MEMBER}
                />
                {errors.documents?.statute && touched.documents?.statute && (
                  <div className='invalid-feedback d-block'>
                    {errors.documents?.statute}
                  </div>
                )}
              </FormGroup>
            </Colxx>
          </Row>

          <Row>
            <Colxx xxs='12' md='6'>
              <FormGroup>
                <Label>Group Chart and shareholdings</Label>
                <InputFile
                  id='groupChart'
                  name='documents.groupChart'
                  value={values?.documents?.groupChart?.originalName}
                  downloadFileKey={values?.documents?.groupChart?.name}
                  onChange={handleSelectFile(
                    setFieldValue,
                    'groupChart'
                  )}
                  disabled={registerConcluded}
                  fileName='groupChart'
                  path={S3_BUCKET_PATHS.DOCUMENTS.MEMBER}
                />
                {errors.documents?.groupChart
                  && touched.documents?.groupChart && (
                    <div className='invalid-feedback d-block'>
                      {errors.documents?.groupChart}
                    </div>
                  )}
              </FormGroup>
            </Colxx>
            <Colxx xxs='12' md='6'>
              <FormGroup>
                <Label>Last financial statement</Label>
                <InputFile
                  id='lastFinancialStatement'
                  name='documents.lastFinancialStatement'
                  value={values?.documents?.lastFinancialStatement?.originalName}
                  downloadFileKey={values?.documents?.lastFinancialStatement?.name}
                  onChange={handleSelectFile(
                    setFieldValue,
                    'lastFinancialStatement'
                  )}
                  disabled={registerConcluded}
                  fileName='lastFinancialStatement'
                  path={S3_BUCKET_PATHS.DOCUMENTS.MEMBER}
                />
                {errors.documents?.lastFinancialStatement
                  && touched.documents?.lastFinancialStatement && (
                    <div className='invalid-feedback d-block'>
                      {errors.documents?.lastFinancialStatement}
                    </div>
                  )}
              </FormGroup>
            </Colxx>
          </Row>

          <Row className='mt-4'>
            <Colxx xxs='12'>
              <Buttons
                prevButtonDisabled={isFirstStep}
                nextButtonDisabled={isLastStep}
                goToNextStep={handleSubmit}
                goToBackStep={goToBackStep}
                registerConcluded={registerConcluded}
                populateStep={populateStep('companyInformation')}
              />
            </Colxx>
          </Row>
        </>
      )}
    </Formik>
  )
}

CompanyInformation.propTypes = {
  initialFormValues: object,
  isFirstStep: bool,
  isLastStep: bool,
  updateFormValues: func,
  goToNextStep: func,
  goToBackStep: func,
  registerConcluded: bool,
  updateFieldValue: func,
  populateStep: func,
}

export default CompanyInformation
