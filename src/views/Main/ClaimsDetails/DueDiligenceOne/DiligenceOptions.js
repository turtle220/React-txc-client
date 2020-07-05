import React, { useState } from 'react'
import { object } from 'prop-types'
import {
  FormGroup,
  Form,
  Label,
  Input,
} from 'reactstrap'
import { useMutation } from '@apollo/react-hooks'
import { useLocation } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

import { useToast } from '@/hooks'

import Select from '@/components/Select'
import { Colxx } from '@/components/CustomBootstrap'
import ModalTaskOrderError, { useModalTaskOrderError } from '@/components/ModalTaskOrderError'

import { CLAIM_TAX_CASE, CLAIM_CONFORMITY_SCORE } from '@/constants/claimTaxCase'

import IntlMessages from '@/utils/IntlMessages'

import { DOCUMENTS_CLAIM_PHASE_TWO_QUERY } from '@/graphql/queries/claims'
import {
  UPDATE_CLAIM_TAX_CASE,
  UPDATE_CLAIM_CONFORMITY_SCORE,
  UPDATE_CLAIM_ISSUE_DATE
} from '@/graphql/mutations/claims'

const SUCCESS_MESSAGES = {
  TAX_CASE: 'Success! Tax Case updated.',
  CONFORMITY_SCORE: 'Success! Conformity score updated.',
  ISSUE_DATE: 'Success! Issue date updated.'
}

const DiligenceOptions = ({ claim }) => {
  const [claimTaxCase, setClaimTaxCase] = useState(claim?.taxCase || '')
  const [claimConformityScore, setClaimConformityScore] = useState(claim?.conformityScore || '')
  const [claimIssueDate, setClaimIssueDate] = useState(claim?.claimIssueDate
    ? moment(parseInt(claim?.claimIssueDate, 10)).toDate()
    : claim?.claimIssueDate)
  const { pathname } = useLocation()
  const showToast = useToast()
  const [error, setError] = useModalTaskOrderError()

  const onError = (({ message }) => {
    setError(message)
  })

  const taxCaseOptions = {
    onCompleted: ({ updateClaimTaxCase }) => {
      setClaimTaxCase(updateClaimTaxCase?.taxCase)
      showToast('success', SUCCESS_MESSAGES.TAX_CASE)
    },
    onError,
    refetchQueries: [
      {
        query: DOCUMENTS_CLAIM_PHASE_TWO_QUERY,
        variables: {
          claimId: claim.id
        }
      }
    ]
  }

  const conformityScoreOptions = {
    onCompleted: ({ updateClaimConformityScore }) => {
      setClaimConformityScore(updateClaimConformityScore?.conformityScore)
      showToast('success', SUCCESS_MESSAGES.CONFORMITY_SCORE)
    },
    onError
  }

  const claimIssueDateOptions = {
    onCompleted: ({ updateClaimIssueDate }) => {
      setClaimIssueDate(updateClaimIssueDate?.claimIssueDate
        ? moment(parseInt(updateClaimIssueDate?.claimIssueDate, 10)).toDate()
        : claimIssueDate)
      showToast('success', SUCCESS_MESSAGES.ISSUE_DATE)
    },
    onError
  }

  const [
    updateClaimTaxCase,
    { loading: loadingUpdateClaimTaxCase }
  ] = useMutation(UPDATE_CLAIM_TAX_CASE, taxCaseOptions)

  const [
    updateClaimConformityScore,
    { loading: loadingUpdateClaimConformityScore }
  ] = useMutation(UPDATE_CLAIM_CONFORMITY_SCORE, conformityScoreOptions)

  const [
    updateClaimIssueDate,
    { loading: loadingUpdateClaimIssueDate }
  ] = useMutation(UPDATE_CLAIM_ISSUE_DATE, claimIssueDateOptions)

  let claimId = null
  const pathnameList = pathname.split('/')

  if (pathnameList.includes('claims')) {
    const indice = pathnameList.indexOf('claims')
    claimId = pathnameList[indice + 1]
  }

  const handleChangeTaxCase = ({ value }) => {
    updateClaimTaxCase({
      variables: {
        id: claimId,
        taxCase: value
      }
    })
  }

  const handleChangeConformityScore = ({ value }) => {
    updateClaimConformityScore({
      variables: {
        id: claimId,
        conformityScore: value
      }
    })
  }

  const handleChangeIssueDate = (date) => {
    // do not allow empty date
    if (!date) {
      showToast('error', 'Claim issue date cannot be empty!')
      return
    }

    updateClaimIssueDate({
      variables: {
        id: claimId,
        claimIssueDate: date
      }
    })
  }

  return (
    <>
      <Form>

        <FormGroup row className="mb-4">
          <Colxx sm={5}>
            <Label size="lg" className="mb-0">
              <IntlMessages id="pages.claims.diligence.tax-case" />
            </Label>
          </Colxx>
          <Colxx sm={7}>
            <Select
              className="react-select"
              classNamePrefix="react-select"
              value={claimTaxCase}
              options={CLAIM_TAX_CASE}
              onChange={handleChangeTaxCase}
              isDisabled={loadingUpdateClaimTaxCase || claim?.submitted}
              isLoading={loadingUpdateClaimTaxCase}
            />
          </Colxx>
        </FormGroup>

        <FormGroup row className="mb-4">
          <Colxx sm={5}>
            <Label size="lg" className="mb-0">
              <IntlMessages id="pages.claims.diligence.conformity-score" />
            </Label>
          </Colxx>
          <Colxx sm={7}>
            <Select
              className="react-select"
              classNamePrefix="react-select"
              value={claimConformityScore}
              options={CLAIM_CONFORMITY_SCORE}
              onChange={handleChangeConformityScore}
              isDisabled={loadingUpdateClaimConformityScore || claim?.submitted}
              isLoading={loadingUpdateClaimConformityScore}
            />
          </Colxx>
        </FormGroup>

        <FormGroup row className="mb-0">
          <Colxx sm={5}>
            <Label size="lg" className="mb-0">
              <IntlMessages id="pages.claims.diligence.claim-issue-date" />
            </Label>
          </Colxx>
          <Colxx sm={7}>
            {loadingUpdateClaimIssueDate
              ? (
                <Input value="Updating..." disabled />
              )
              : (
                <DatePicker
                  selected={claimIssueDate}
                  disabled={claim?.submitted}
                  onChange={handleChangeIssueDate}
                  showYearDropdown
                  dateFormatCalendar="MMMM"
                  yearDropdownItemNumber={15}
                  scrollableYearDropdown
                />
              )}
          </Colxx>
        </FormGroup>

      </Form>
      <ModalTaskOrderError
        error={error}
        setError={setError}
      />
    </>
  )
}

DiligenceOptions.propTypes = {
  claim: object
}

export default DiligenceOptions
