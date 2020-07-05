import React, { useState, useEffect } from 'react'
import { object } from 'prop-types'
import { useMutation } from '@apollo/react-hooks'
import { Formik } from 'formik'
import * as yup from 'yup'
import { CardTitle, Alert } from 'reactstrap'

import ModalTaskOrderError, { useModalTaskOrderError } from '@/components/ModalTaskOrderError'

import { REPORT_FIELDS } from '@/constants/diligenceReport'

import IntlMessages from '@/utils/IntlMessages'

import { useToast } from '@/hooks'

import {
  WORKFLOW_CLAIM_QUERY,
  DOCUMENTS_CLAIM_QUERY
} from '@/graphql/queries/claims'
import { GENERATE_DUE_DILLIGENCE_REPORT_MUTATION } from '@/graphql/mutations/claims'

import mountInitialValues from './mountInitialValues'

import ReportItem from './ReportItem'
import ReportActions from './ReportActions'
import ReportTable from './ReportTable'

const requiredText = 'This field is required'

const validationSchema = yup.object().shape({
  listReviewedDocumentsScore: yup.string().required(requiredText),
  businessIndustrialFieldScore: yup.string().required(requiredText),
  companyActivityScore: yup.string().required(requiredText),
  taxClaimDueDiligenceScore: yup.string().required(requiredText),
  integrityAssesmentClaimModelScore: yup.string().required(requiredText),
  integrityAssessementClaimModelPreviousYearScore: yup.string().required(requiredText),
  taxDebtsChargesScore: yup.string().required(requiredText),
  conclusionsScore: yup.string().required(requiredText),
  listReviewedDocumentsComment: yup.string().required(requiredText),
  businessIndustrialFieldComment: yup.string().required(requiredText),
  companyActivityComment: yup.string().required(requiredText),
  taxClaimDueDiligenceComment: yup.string().required(requiredText),
  integrityAssesmentClaimModelComment: yup.string().required(requiredText),
  integrityAssessementClaimModelPreviousYearComment: yup.string().required(requiredText),
  taxDebtsChargesComment: yup.string().required(requiredText),
  conclusionsComment: yup.string().required(requiredText)
})

const DiligenceReport = ({ claim }) => {
  const initialValues = mountInitialValues(claim)
  const showToast = useToast()
  const [error, setError] = useModalTaskOrderError()

  const [pdfFile, setPdfFile] = useState(null)
  const [errorMessage, setErrorMessage] = useState()

  const [generateDueDilligenceReport, { loading }] = useMutation(
    GENERATE_DUE_DILLIGENCE_REPORT_MUTATION,
    {
      onCompleted: ({ generateDueDilligenceReport }) => {
        setErrorMessage()
        setPdfFile(generateDueDilligenceReport)
        showToast('success', 'Success! Report generated.')
      },
      onError: ({ message }) => {
        setError(message)
        setErrorMessage(message)
      },
      refetchQueries: [
        {
          query: WORKFLOW_CLAIM_QUERY,
          variables: {
            claimId: claim.id
          }
        },
        {
          query: DOCUMENTS_CLAIM_QUERY,
          variables: {
            claimId: claim.id
          }
        }
      ]
    }
  )

  useEffect(() => {
    if (claim?.deloitteDueDiligenceReport) {
      setPdfFile(claim?.deloitteDueDiligenceReport)
    }
  }, [claim])

  const onSubmit = (values) => {
    generateDueDilligenceReport({
      variables: {
        claimID: claim?.id,
        ...values,
      }
    })
  }

  return (
    <>
      <CardTitle className="mb-4">
        <IntlMessages id="pages.claims.diligence.report-form" />
      </CardTitle>

      <Alert
        isOpen={!!errorMessage}
        color="danger"
      >
        {errorMessage}
      </Alert>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({
          values,
          handleSubmit,
          touched,
          errors,
          setFieldValue
        }) => (
          <>

            <ReportTable>
              {REPORT_FIELDS.map((item) => (
                <ReportItem
                  key={item.id}
                  item={item}
                  values={values}
                  disabled={pdfFile}
                  onChange={setFieldValue}
                  touched={touched}
                  errors={errors}
                />
              ))}
            </ReportTable>

            <ReportActions
              pdfFile={pdfFile}
              saveAndGenerate={handleSubmit}
              loading={loading}
            />

          </>
        )}
      </Formik>
      <ModalTaskOrderError
        error={error}
        setError={setError}
      />
    </>
  )
}

DiligenceReport.propTypes = {
  claim: object
}

export default DiligenceReport
