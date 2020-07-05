import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { object, func, bool } from 'prop-types'
import {
  Row,
  CardTitle,
  FormGroup,
  Label
} from 'reactstrap'
import * as yup from 'yup'
import { Formik, Field } from 'formik'
import qs from 'query-string'
import { useLocation } from 'react-router-dom'

import useToast from '@/hooks/useToast'

import { Colxx, Separator } from '@/components/CustomBootstrap'
import { Buttons } from '@/components/Wizard'
import InputFile from '@/components/InputFile'

import { S3_BUCKET_PATHS } from '@/constants/s3BucketPaths'

import { SELLERS_QUERY } from '@/graphql/queries/members'

import { FINISH_MEMBERSHIP_AGREEMENT } from './graphql/mutations'
import formatMember from './formatMember'

const validationSchema = yup.object().shape({
  firstName: yup.string().required('This field is required'),
  surname: yup.string().required('This field is required'),
  mobilePhone: yup.string().required('This field is required'),
  landline: yup.string().required('This field is required'),
  email: yup.string().email('Type a valid email').required('This field is required'),
  companyFunction: yup.string().required('This field is required'),
  companyTitle: yup.string().required('This field is required'),
  documents: yup.object().shape({
    operativeInfoIdCard: yup.string().required('This field is required').nullable(),
    operativeInfoFiscalCode: yup.string().required('This field is required').nullable(),
    operativeInfoPoa: yup.string().required('This field is required').nullable(),
    operativeInfoPrivacy: yup.string().required('This field is required').nullable()
  })
})

const OperativeInformation = ({
  initialFormValues,
  updateFormValues,
  markFormConcluded,
  isFirstStep,
  goToBackStep,
  registerConcluded,
  formValues,
  updateFieldValue,
  populateStep,
  memberId
}) => {
  const showToast = useToast()
  const location = useLocation()

  const { from } = qs.parse(location.search)

  const updateSellersClientsCache = (store, { data: { finishMembershipAgreement: member } }) => {
    const { sellers } = store.readQuery({
      query: SELLERS_QUERY
    })

    store.writeQuery({
      query: SELLERS_QUERY,
      data: {
        sellers: sellers.concat(member)
      }
    })
  }

  const [finishMembershipAgreement, {
    loading: loadingFinishMembershipAgreement
  }] = useMutation(FINISH_MEMBERSHIP_AGREEMENT, {
    onCompleted: ({ finishMembershipAgreement: member }) => {
      showToast('success', 'Success! Membership Agreement submitted.')

      const memberFormValues = formatMember.separate(member)
      updateFormValues(memberFormValues)
      markFormConcluded()
    },
    update: (store, cache) => {
      if (from === 'partner') {
        updateSellersClientsCache(store, cache)
      }
    }
  })

  const handleSubmit = async (values) => {
    const formatedValues = formatMember.join({
      ...formValues,
      operativeInformation: { ...values }
    })

    await finishMembershipAgreement({
      variables: {
        ...formatedValues,
        memberId
      }
    })
  }
  const handleBack = (values) => {
    updateFormValues(values, 'operativeInformation')
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
                    'operativeInfoFirstName'
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
                    'operativeInfoSurname'
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
                    'operativeInfoCompanyFunction'
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
                    'operativeInfoCompanyTitle'
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
                <Label>Mobile Phone</Label>
                <Field
                  className='form-control'
                  name='mobilePhone'
                  disabled={registerConcluded}
                  onBlur={updateFieldValue(
                    values.mobilePhone,
                    'operativeInfoPhoneMobile'
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
                  onBlur={updateFieldValue(
                    values.landline,
                    'operativeInfoPhoneLandline'
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
                <Label>Email</Label>
                <Field
                  onBlur={updateFieldValue(values.email, 'operativeInfoEmail')}
                  className='form-control'
                  name='email'
                  disabled={registerConcluded || from !== 'partner'}
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
                  id='operativeInfoIdCard'
                  name='documents.operativeInfoIdCard'
                  value={values?.documents?.operativeInfoIdCard?.originalName}
                  downloadFileKey={values?.documents?.operativeInfoIdCard?.name}
                  fileName='operativeInfoIdCard'
                  onChange={handleSelectFile(
                    setFieldValue,
                    'operativeInfoIdCard'
                  )}
                  disabled={registerConcluded}
                  path={S3_BUCKET_PATHS.DOCUMENTS.MEMBER}
                />
                {errors.documents?.operativeInfoIdCard
                  && touched.documents?.operativeInfoIdCard && (
                    <div className='invalid-feedback d-block'>
                      {errors.documents?.operativeInfoIdCard}
                    </div>
                  )}
              </FormGroup>
            </Colxx>

            <Colxx xxs='12' md='6'>
              <FormGroup>
                <Label>Fiscal code / Security Number</Label>
                <InputFile
                  id='operativeInfoFiscalCode'
                  name='documents.operativeInfoFiscalCode'
                  value={values?.documents?.operativeInfoFiscalCode?.originalName}
                  downloadFileKey={values?.documents?.operativeInfoFiscalCode?.name}
                  fileName='operativeInfoFiscalCode'
                  onChange={handleSelectFile(
                    setFieldValue,
                    'operativeInfoFiscalCode'
                  )}
                  disabled={registerConcluded}
                  path={S3_BUCKET_PATHS.DOCUMENTS.MEMBER}
                />
                {errors.documents?.operativeInfoFiscalCode
                  && touched.documents?.operativeInfoFiscalCode && (
                    <div className='invalid-feedback d-block'>
                      {errors.documents?.operativeInfoFiscalCode}
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
                  id='operativeInfoPrivacy'
                  name='documents.operativeInfoPrivacy'
                  value={values?.documents?.operativeInfoPrivacy?.originalName}
                  downloadFileKey={values?.documents?.operativeInfoPrivacy?.name}
                  fileName='operativeInfoPrivacy'
                  onChange={handleSelectFile(
                    setFieldValue,
                    'operativeInfoPrivacy'
                  )}
                  disabled={registerConcluded}
                  path={S3_BUCKET_PATHS.DOCUMENTS.MEMBER}
                />
                {errors.documents?.operativeInfoPrivacy
                  && touched.documents?.operativeInfoPrivacy && (
                    <div className='invalid-feedback d-block'>
                      {errors.documents?.operativeInfoPrivacy}
                    </div>
                  )}
              </FormGroup>
            </Colxx>
            <Colxx xxs='12' md='6'>
              <FormGroup>
                <Label>
                  Power of Attorney &nbsp;
                  <a
                    style={{ color: '#145388' }}
                    href={`${process.env.PUBLIC_URL}/assets/templates/PowerOfAtt.docx`}
                    download
                  >
                    Download Template
                  </a>
                </Label>
                <InputFile
                  id='operativeInfoPoa'
                  name='documents.operativeInfoPoa'
                  value={values?.documents?.operativeInfoPoa?.originalName}
                  downloadFileKey={values?.documents?.operativeInfoPoa?.name}
                  fileName='operativeInfoPoa'
                  onChange={handleSelectFile(setFieldValue, 'operativeInfoPoa')}
                  disabled={registerConcluded}
                  path={S3_BUCKET_PATHS.DOCUMENTS.MEMBER}
                />
                {errors.documents?.operativeInfoPoa
                  && touched.documents?.operativeInfoPoa && (
                    <div className='invalid-feedback d-block'>
                      {errors.documents?.operativeInfoPoa}
                    </div>
                  )}
              </FormGroup>
            </Colxx>
          </Row>

          <Row className='mt-4'>
            <Colxx xxs='12'>
              <Buttons
                prevButtonDisabled={isFirstStep}
                nextButtonDisabled={
                  loadingFinishMembershipAgreement || registerConcluded
                }
                goToNextStep={handleSubmit}
                goToBackStep={() => handleBack(values)}
                customNextLabel='Finish'
                nextButtonLoading={loadingFinishMembershipAgreement}
                registerConcluded={registerConcluded}
                populateStep={populateStep('operativeInformation')}
              />
            </Colxx>
          </Row>
        </>
      )}
    </Formik>
  )
}

OperativeInformation.propTypes = {
  initialFormValues: object,
  isFirstStep: bool,
  updateFormValues: func,
  goToBackStep: func,
  registerConcluded: bool,
  formValues: object,
  updateFieldValue: func,
  populateStep: func,
}

export default OperativeInformation
