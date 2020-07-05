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
    beneficialOwnerIdCard: yup.object().required('This field is required').nullable(),
    beneficialOwnerFiscalCode: yup.object().required('This field is required').nullable(),
    beneficialOwnerPrivacy: yup.object().required('This field is required').nullable()
  })
})

const BeneficialOwner = ({
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
    updateFormValues(values, 'beneficialOwner')
    goToNextStep()
  }

  const handleBack = (values) => {
    updateFormValues(values, 'beneficialOwner')
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
                  className='form-control'
                  name='firstName'
                  disabled={registerConcluded}
                  onBlur={updateFieldValue(
                    values.firstName,
                    'beneficialOwnerFirstName'
                  )}
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
                  className='form-control'
                  name='surname'
                  disabled={registerConcluded}
                  onBlur={updateFieldValue(
                    values.surname,
                    'beneficialOwnerSurname'
                  )}
                />
                {errors.surname && touched.surname && (
                  <div className='invalid-feedback d-block'>
                    {errors.surname}
                  </div>
                )}
              </FormGroup>
            </Colxx>

            {/* <Colxx xxs='12' md='4'>
              <FormGroup>
                <Label>Place of Birth</Label>
                <Field
                  onBlur={updateFieldValue(
                    values.placeOfBirth,
                    'beneficialOwnerPlaceOfBirth'
                  )}
                  className='form-control'
                  name='placeOfBirth'
                  disabled={registerConcluded}
                />
                {errors.placeOfBirth && touched.placeOfBirth && (
                  <div className='invalid-feedback d-block'>
                    {errors.placeOfBirth}
                  </div>
                )}
              </FormGroup>
            </Colxx>

            <Colxx xxs='12' md='4'>
              <FormGroup>
                <Label>Date of Birth</Label>
                <Field
                  onBlur={updateFieldValue(
                    values.dateOfBirth,
                    'beneficialOwnerDateOfBirth'
                  )}
                  className='form-control'
                  name='dateOfBirth'
                  disabled={registerConcluded}
                />
                {errors.dateOfBirth && touched.dateOfBirth && (
                  <div className='invalid-feedback d-block'>
                    {errors.dateOfBirth}
                  </div>
                )}
              </FormGroup>
            </Colxx> */}

            <Colxx xxs='12' md='4'>
              <FormGroup>
                <Label>Company Function</Label>
                <Field
                  className='form-control'
                  name='companyFunction'
                  disabled={registerConcluded}
                  onBlur={updateFieldValue(
                    values.companyFunction,
                    'beneficialOwnerCompanyFunction'
                  )}
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
                  className='form-control'
                  name='companyTitle'
                  disabled={registerConcluded}
                  onBlur={updateFieldValue(
                    values.companyTitle,
                    'beneficialOwnerCompanyTitle'
                  )}
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
                <Label>Mobile Phone</Label>
                <Field
                  className='form-control'
                  name='mobilePhone'
                  disabled={registerConcluded}
                  onBlur={updateFieldValue(
                    values.mobilePhone,
                    'beneficialOwnerPhoneMobile'
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
                <Label>Landline</Label>
                <Field
                  className='form-control'
                  name='landline'
                  disabled={registerConcluded}
                  onBlur={updateFieldValue(
                    values.landline,
                    'beneficialOwnerPhoneLandline'
                  )}
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
                <Label>Email</Label>
                <Field
                  className='form-control'
                  name='email'
                  disabled={registerConcluded}
                  onBlur={updateFieldValue(
                    values.email,
                    'beneficialOwnerEmail'
                  )}
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
                  id='beneficialOwnerIdCard'
                  name='documents.beneficialOwnerIdCard'
                  value={values?.documents?.beneficialOwnerIdCard?.originalName}
                  downloadFileKey={values?.documents?.beneficialOwnerIdCard?.name}
                  fileName='beneficialOwnerIdCard'
                  path={S3_BUCKET_PATHS.DOCUMENTS.MEMBER}
                  onChange={handleSelectFile(
                    setFieldValue,
                    'beneficialOwnerIdCard'
                  )}
                  disabled={registerConcluded}
                />
                {errors.documents?.beneficialOwnerIdCard
                  && touched.documents?.beneficialOwnerIdCard && (
                    <div className='invalid-feedback d-block'>
                      {errors.documents?.beneficialOwnerIdCard}
                    </div>
                  )}
              </FormGroup>
            </Colxx>

            <Colxx xxs='12' md='6'>
              <FormGroup>
                <Label>Fiscal code / Security Number</Label>
                <InputFile
                  id='beneficialOwnerFiscalCode'
                  name='documents.beneficialOwnerFiscalCode'
                  value={values?.documents?.beneficialOwnerFiscalCode?.originalName}
                  downloadFileKey={values?.documents?.beneficialOwnerFiscalCode?.name}
                  fileName='beneficialOwnerFiscalCode'
                  onChange={handleSelectFile(
                    setFieldValue,
                    'beneficialOwnerFiscalCode'
                  )}
                  disabled={registerConcluded}
                  path={S3_BUCKET_PATHS.DOCUMENTS.MEMBER}
                />
                {errors.documents?.beneficialOwnerFiscalCode
                  && touched.documents?.beneficialOwnerFiscalCode && (
                    <div className='invalid-feedback d-block'>
                      {errors.documents?.beneficialOwnerFiscalCode}
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
                  id='beneficialOwnerPrivacy'
                  name='documents.beneficialOwnerPrivacy'
                  value={values?.documents?.beneficialOwnerPrivacy?.originalName}
                  downloadFileKey={values?.documents?.beneficialOwnerPrivacy?.name}
                  fileName='beneficialOwnerPrivacy'
                  onChange={handleSelectFile(
                    setFieldValue,
                    'beneficialOwnerPrivacy'
                  )}
                  disabled={registerConcluded}
                  path={S3_BUCKET_PATHS.DOCUMENTS.MEMBER}
                />
                {errors.documents?.beneficialOwnerPrivacy
                  && touched.documents?.beneficialOwnerPrivacy && (
                    <div className='invalid-feedback d-block'>
                      {errors.documents?.beneficialOwnerPrivacy}
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
                populateStep={populateStep('beneficialOwner')}
              />
            </Colxx>
          </Row>
        </>
      )}
    </Formik>
  )
}

BeneficialOwner.propTypes = {
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

export default BeneficialOwner
