import React, { useState, useMemo, useEffect } from 'react'
import { bool, func } from 'prop-types'
import { useMutation, useQuery } from '@apollo/react-hooks'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
} from 'reactstrap'
import * as yup from 'yup'
import { Formik } from 'formik'

import { useToast, useRole } from '@/hooks'

import IntlMessages from '@/utils/IntlMessages'

import { ROLE } from '@/constants/roles'
import s3Url from '@/constants/s3Url'
import { S3_BUCKET_PATHS } from '@/constants/s3BucketPaths'

import { Separator } from '@/components/CustomBootstrap'
import Select from '@/components/Select'
import Loader from '@/components/Loader'
import IsLoading from '@/components/Loader/IsLoading'
import InputFile from '@/components/InputFile'

import { APPROVED_SELLERS_QUERY } from '@/graphql/queries/members'
import { CREATE_CLAIM_MUTATION } from '@/graphql/mutations/claims'
import { DOCUMENTS_FORM_QUERY } from '@/graphql/queries/claims'

const requiredText = 'This field is required'

const options = {
  clients: [],
  type: [
    { label: 'IRES/IRAP', value: 'IRES', key: 1 },
    { label: 'VAT', value: 'VAT', key: 2 }
  ]
}

const NewClaimModal = ({ isOpen, closeModal, onAdd }) => {
  const showToast = useToast()
  const [isSellerMember] = useRole(ROLE.MEMBER_SELLER)
  const [claimType, setClaimType] = useState('VAT')
  const [sellerId, setSellerId] = useState('')
  const [documents, setDocuments] = useState({})

  const { data: { documentsForm = {} } = {}, loading: documentsLoading } = useQuery(
    DOCUMENTS_FORM_QUERY
  )
  const documentsFormType = documentsForm[claimType] || []

  const documentsValidationSchema = useMemo(() => (
    documentsFormType.reduce((acc, curr) => ({
      ...acc,
      [curr.key]: yup.string().required(requiredText)
    }), {})
  ), [documentsFormType])

  const validationSchema = yup.object().shape({
    sellerId: !isSellerMember ? yup.string().required(requiredText) : yup.string(),
    type: yup.string().required(requiredText),
    ...documentsValidationSchema
  })

  const initialValues = {
    type: claimType || '',
    sellerId,
    ...documents
  }

  useEffect(() => {
    setDocuments(documentsFormType.reduce((acc, curr) => ({
      ...acc,
      [curr.key]: ''
    }), {}))
  }, [documentsFormType])

  const createClaimOptions = {
    onCompleted: ({ createClaim: claimCreated }) => {
      onAdd(claimCreated)
      closeModal()
      showToast('success', 'Claim created successfully')
    },
    onError: () => {
      showToast('error', 'Create claim error, try again')
    }
  }

  const [
    createClaim,
    { loading: loadingCreateClaim }
  ] = useMutation(CREATE_CLAIM_MUTATION, createClaimOptions)

  const {
    data: { approvedSellers = [] } = {},
    loading: loadingSellers
  } = useQuery(APPROVED_SELLERS_QUERY)

  const sellerOptions = useMemo(() => (
    approvedSellers.map((item, index) => ({
      key: index,
      label: `${item?.companyName}`,
      value: item?.id
    }))
  ), [approvedSellers])

  const onSubmitClaim = (values) => {
    const valuesKeys = Object.keys(values)
    const documents = []
    valuesKeys.map((valueKey) => {
      const document = documentsFormType.find(({ key }) => key === valueKey)
      if (document) {
        documents.push({
          id: document.id,
          name: values[valueKey],
          description: document.label,
          type: 'pdf'
        })
      }
    })

    const variables = {
      type: values.type,
      sellerId: values.sellerId,
      documents
    }

    createClaim({ variables })
  }

  const handleSelectFile = (setFieldValue) => (field, fileName) => {
    setFieldValue(field, fileName)
    setDocuments((current) => ({
      ...current,
      [field]: fileName
    }))
  }

  const renderError = (touched, errors, field) => (
    errors[field]
      && touched[field] && (
      <div className="invalid-feedback d-block">
        {errors[field]}
      </div>
    )
  )

  const populateDocuments = (setFieldValue) => {
    const pdfDefault = `${s3Url}txc-test.pdf`

    documentsFormType.map(({ key }) => (
      setFieldValue(key, pdfDefault)
    ))
  }

  return (
    <Modal isOpen={isOpen}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitClaim}
      >
        {({ errors, touched, values, setFieldValue, handleSubmit }) => (
          <>
            <ModalHeader toggle={closeModal}>
              <IntlMessages id='pages.claims.new' />
            </ModalHeader>
            <ModalBody>
              {!isSellerMember && (
                <FormGroup>
                  <Label for='sellerId'>
                    <IntlMessages id='pages.claims.new.client' />
                  </Label>
                  <Select
                    name='sellerId'
                    options={sellerOptions}
                    className='react-select'
                    classNamePrefix='react-select'
                    value={values.sellerId}
                    onChange={(option) => {
                      setFieldValue('sellerId', option.value)
                      setSellerId(option.value)
                    }}
                    isLoading={loadingSellers}
                  />
                  {renderError(touched, errors, 'sellerId')}
                </FormGroup>
              )}

              <FormGroup>
                <Label for='exampleSelect'>
                  <IntlMessages id='pages.claims.new.claim-type' />
                </Label>
                <Select
                  name='type'
                  options={options.type}
                  value={values.type}
                  className='react-select'
                  classNamePrefix='react-select'
                  onChange={(option) => {
                    setFieldValue('type', option.value)
                    setClaimType(option.value)
                  }}
                />
                {renderError(touched, errors, 'type')}
              </FormGroup>

              <h4 className='mt-5'>
                <IntlMessages id='pages.claims.new.documents' />
              </h4>
              <Separator className='mb-4' />

              <IsLoading loading={documentsLoading}>
                {documentsFormType.map(({ id, key, label }) => (
                  <FormGroup key={id} className='mb-4'>
                    <Label>{label}</Label>
                    <InputFile
                      name={key}
                      fileName={key}
                      path={S3_BUCKET_PATHS.DOCUMENTS.CLAIM}
                      onChange={handleSelectFile(setFieldValue)}
                    />
                    {renderError(touched, errors, key)}
                  </FormGroup>
                ))}
              </IsLoading>

              {!process.env.REACT_APP_HIDE_AUXIARY_FIELD && (
                <Button
                  size='xs'
                  color='primary'
                  onClick={() => populateDocuments(setFieldValue)}
                >
                  UPLOAD ALL DOCUMENTS
                </Button>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color='default' onClick={() => closeModal()}>
                <IntlMessages id='pages.claims.new.cancel' />
              </Button>

              <Button
                color='primary'
                disabled={loadingCreateClaim}
                onClick={handleSubmit}
              >
                {loadingCreateClaim ? (
                  <Loader size={15} />
                ) : (
                  <IntlMessages id='pages.claims.new.submit' />
                )}
              </Button>
            </ModalFooter>
          </>
        )}
      </Formik>
    </Modal>
  )
}

NewClaimModal.propTypes = {
  isOpen: bool,
  closeModal: func
}

export default NewClaimModal
