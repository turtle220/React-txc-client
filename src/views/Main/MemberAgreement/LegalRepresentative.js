import React from 'react'
import { object, func, bool } from 'prop-types'
import {
  Row,
  CardTitle,
  FormGroup,
  Label
} from 'reactstrap'
import * as yup from 'yup'
import { Formik, Field } from 'formik'
import { Colxx, Separator } from '@/components/CustomBootstrap'
import { Buttons } from '@/components/Wizard'
import InputFile from '@/components/InputFile'

import { S3_BUCKET_PATHS } from '@/constants/s3BucketPaths'

const validationSchema = yup.object().shape({
  firstName: yup.string().required('This field is required'),
  surname: yup.string().required('This field is required'),
  mobilePhone: yup.string().required('This field is required'),
  landline: yup.string().required('This field is required'),
  email: yup.string().email('Type a valid email').required('This field is required'),
  companyFunction: yup.string().required('This field is required'),
  companyTitle: yup.string().required('This field is required'),
  documents: yup.object().shape({
    legalRepresentativeIdCard: yup.string().required('This field is required').nullable(),
    legalRepresentativeFiscalCode: yup.string().required('This field is required').nullable(),
    legalRepresentativePrivacy: yup.string().required('This field is required').nullable()
  })
})

const LegalRepresentative = ({
  initialFormValues,
  updateFormValues,
  isFirstStep,
  isLastStep,
  goToNextStep,
  goToBackStep,
  registerConcluded,
  updateFieldValue,
  populateStep,
}) => {
  const handleSubmit = (values) => {
    updateFormValues(values, 'legalRepresentative')
    goToNextStep()
  }

  const handleBack = (values) => {
    updateFormValues(values, 'legalRepresentative')
    goToBackStep()
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

  return (
    <Formik
      enableReinitialize
      initialValues={initialFormValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ touched, errors, values, setFieldValue, handleSubmit }) => (
        <>
          <Row>
            <Colxx xxs='12' md='4'>
              <FormGroup>
                <Label>First Name</Label>
                <Field
                  onBlur={updateFieldValue(
                    values.firstName,
                    'legalRepresentativeFirstName'
                  )}
                  className='form-control'
                  name='firstName'
                  disabled={registerConcluded}
                />
                {errors.firstName && touched.firstName && (
                  <div className='invalid-feedback d-block'>
                    {errors.firstName}
                  </div>
                )}
              </FormGroup>
            </Colxx>

            <Colxx xxs='12' md='4'>
              <FormGroup>
                <Label>Surname</Label>
                <Field
                  onBlur={updateFieldValue(
                    values.surname,
                    'legalRepresentativeSurname'
                  )}
                  className='form-control'
                  name='surname'
                  disabled={registerConcluded}
                />
                {errors.surname && touched.surname && (
                  <div className='invalid-feedback d-block'>
                    {errors.surname}
                  </div>
                )}
              </FormGroup>
            </Colxx>
            <Colxx xxs='12' md='4'>
              <FormGroup>
                <Label>Company Function</Label>
                <Field
                  onBlur={updateFieldValue(
                    values.companyFunction,
                    'legalRepresentativeCompanyFunction'
                  )}
                  className='form-control'
                  name='companyFunction'
                  disabled={registerConcluded}
                />
                {errors.companyFunction && touched.companyFunction && (
                  <div className='invalid-feedback d-block'>
                    {errors.companyFunction}
                  </div>
                )}
              </FormGroup>
            </Colxx>

            <Colxx xxs='12' md='4'>
              <FormGroup>
                <Label>Company Title</Label>
                <Field
                  onBlur={updateFieldValue(
                    values.companyTitle,
                    'legalRepresentativeCompanyTitle'
                  )}
                  className='form-control'
                  name='companyTitle'
                  disabled={registerConcluded}
                />
                {errors.companyTitle && touched.companyTitle && (
                  <div className='invalid-feedback d-block'>
                    {errors.companyTitle}
                  </div>
                )}
              </FormGroup>
            </Colxx>

            <Colxx xxs='12' md='4'>
              <FormGroup>
                <Label>Landline</Label>
                <Field
                  onBlur={updateFieldValue(
                    values.landline,
                    'legalRepresentativePhoneLandline'
                  )}
                  className='form-control'
                  name='landline'
                  disabled={registerConcluded}
                />
                {errors.landline && touched.landline && (
                  <div className='invalid-feedback d-block'>
                    {errors.landline}
                  </div>
                )}
              </FormGroup>
            </Colxx>

            <Colxx xxs='12' md='4'>
              <FormGroup>
                <Label>Mobile Phone</Label>
                <Field
                  className='form-control'
                  name='mobilePhone'
                  disabled={registerConcluded}
                  onBlur={updateFieldValue(
                    values.mobilePhone,
                    'legalRepresentativePhoneMobile'
                  )}
                />
                {errors.mobilePhone && touched.mobilePhone && (
                  <div className='invalid-feedback d-block'>
                    {errors.mobilePhone}
                  </div>
                )}
              </FormGroup>
            </Colxx>

            <Colxx xxs='12' md='4'>
              <FormGroup>
                <Label>Email</Label>
                <Field
                  onBlur={updateFieldValue(
                    values.email,
                    'legalRepresentativeEmail'
                  )}
                  className='form-control'
                  name='email'
                  disabled={registerConcluded}
                />
                {errors.email && touched.email && (
                  <div className='invalid-feedback d-block'>{errors.email}</div>
                )}
              </FormGroup>
            </Colxx>
          </Row>

          <CardTitle className='mb-3 mt-4'>Documents</CardTitle>
          <Separator className='mb-5' />

          <Row>
            <Colxx xxs='12' md='6'>
              <FormGroup>
                <Label>Identity Card or passport</Label>
                <InputFile
                  id='legalRepresentativeIdCard'
                  name='documents.legalRepresentativeIdCard'
                  value={values?.documents?.legalRepresentativeIdCard?.originalName}
                  downloadFileKey={values?.documents?.legalRepresentativeIdCard?.name}
                  fileName='legalRepresentativeIdCard'
                  path={S3_BUCKET_PATHS.DOCUMENTS.MEMBER}
                  disabled={registerConcluded}
                  onChange={handleSelectFile(
                    setFieldValue,
                    'legalRepresentativeIdCard'
                  )}
                />
                {errors.documents?.legalRepresentativeIdCard
                  && touched.documents?.legalRepresentativeIdCard && (
                    <div className='invalid-feedback d-block'>
                      {errors.documents?.legalRepresentativeIdCard}
                    </div>
                  )}
              </FormGroup>
            </Colxx>

            <Colxx xxs='12' md='6'>
              <FormGroup>
                <Label>Fiscal code / Security Number</Label>
                <InputFile
                  id='legalRepresentativeFiscalCode'
                  name='documents.legalRepresentativeFiscalCode'
                  value={values?.documents?.legalRepresentativeFiscalCode?.originalName}
                  downloadFileKey={values?.documents?.legalRepresentativeFiscalCode?.name}
                  fileName='legalRepresentativeFiscalCode'
                  path={S3_BUCKET_PATHS.DOCUMENTS.MEMBER}
                  onChange={handleSelectFile(
                    setFieldValue,
                    'legalRepresentativeFiscalCode'
                  )}
                  disabled={registerConcluded}
                />
                {errors.documents?.legalRepresentativeFiscalCode
                  && touched.documents?.legalRepresentativeFiscalCode && (
                    <div className='invalid-feedback d-block'>
                      {errors.documents?.legalRepresentativeFiscalCode}
                    </div>
                  )}
              </FormGroup>
            </Colxx>
          </Row>

          <Row>
            <Colxx xxs='12' md='6'>
              <FormGroup>
                <Label>
                  Privacy &nbsp;
                  <a
                    style={{ color: '#145388' }}
                    href={`${process.env.PUBLIC_URL}/assets/templates/Privacy.docx`}
                    download
                  >
                    Download Template
                  </a>
                </Label>
                <InputFile
                  id='legalRepresentativePrivacy'
                  name='documents.legalRepresentativePrivacy'
                  value={values?.documents?.legalRepresentativePrivacy?.originalName}
                  downloadFileKey={values?.documents?.legalRepresentativePrivacy?.name}
                  fileName='legalRepresentativePrivacy'
                  onChange={handleSelectFile(
                    setFieldValue,
                    'legalRepresentativePrivacy'
                  )}
                  disabled={registerConcluded}
                  path={S3_BUCKET_PATHS.DOCUMENTS.MEMBER}
                />
                {errors.documents?.legalRepresentativePrivacy
                  && touched.documents?.legalRepresentativePrivacy && (
                    <div className='invalid-feedback d-block'>
                      {errors.documents?.legalRepresentativePrivacy}
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
                goToBackStep={() => handleBack(values)}
                registerConcluded={registerConcluded}
                populateStep={populateStep('legalRepresentative')}
              />
            </Colxx>
          </Row>
        </>
      )}
    </Formik>
  )
}

LegalRepresentative.propTypes = {
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

export default LegalRepresentative
