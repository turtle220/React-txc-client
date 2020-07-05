import React from 'react'
import { string, bool } from 'prop-types'
import { CardTitle, Button } from 'reactstrap'
import { useMutation } from '@apollo/react-hooks'

import { useToast } from '@/hooks'

import IntlMessages from '@/utils/IntlMessages'

import IsLoading from '@/components/Loader/IsLoading'
import ModalTaskOrderError, { useModalTaskOrderError } from '@/components/ModalTaskOrderError'

import { LOG_MESSAGES } from '@/constants/logMessages'

import { GET_CLAIM_DETAILS, WORKFLOW_CLAIM_QUERY } from '@/graphql/queries/claims'
import { SUBMIT_FOR_APPROVAL, REJECT_CLAIM } from '@/graphql/mutations/claims'

const DiligenceApproval = ({ claimId, claimSubmitted }) => {
  const LOADER_SIZE = 80
  const showToast = useToast()
  const [error, setError] = useModalTaskOrderError()

  const approvalOptions = {
    onCompleted: (e) => {
      let message = LOG_MESSAGES.SUBMIT_FOR_APPROVAL

      if (!e?.submitClaimPhaseOneForApproval?.submitted) {
        message = LOG_MESSAGES.SUBMIT_FOR_REJECT
      }

      showToast('success', message)
    },
    onError: (({ message }) => {
      setError(message)
    }),
    refetchQueries: [
      {
        query: GET_CLAIM_DETAILS,
        variables: {
          id: claimId
        }
      },
      {
        query: WORKFLOW_CLAIM_QUERY,
        variables: {
          claimId
        }
      }
    ]
  }

  const [
    submitForApproval,
    { loading: loadingApproval }
  ] = useMutation(SUBMIT_FOR_APPROVAL, approvalOptions)

  const [
    rejectClaim,
    { loading: loadingReject }
  ] = useMutation(
    REJECT_CLAIM,
    {
      onCompleted() {
        showToast('success', LOG_MESSAGES.SUBMIT_FOR_REJECT)
      },
      onError: (({ message }) => {
        setError(message)
      }),
      refetchQueries: [
        {
          query: GET_CLAIM_DETAILS,
          variables: {
            id: claimId
          }
        },
        {
          query: WORKFLOW_CLAIM_QUERY,
          variables: {
            claimId
          }
        }
      ]
    }
  )

  const handleApprove = () => {
    submitForApproval({
      variables: {
        id: claimId
      }
    })
  }

  const handleReject = () => {
    rejectClaim({
      variables: {
        id: claimId
      }
    })
  }

  return (
    <>
      <CardTitle className="m-3 mb-5">
        {claimSubmitted ? (
          <IntlMessages id="pages.claims.diligence.approval.submitted.text" />
        ) : <IntlMessages id="pages.claims.diligence.approval" />}
      </CardTitle>
      <div className="mt-3 mb-5 pt-3 pb-4">
        {claimSubmitted ? (
          <IntlMessages id="pages.claims.diligence.approval.submitted" />
        ) : (
          <IsLoading size={LOADER_SIZE} loading={loadingApproval || loadingReject}>
            <Button
              outline
              size="lg"
              color="danger"
              className="m-1"
              onClick={handleReject}
            >
              <IntlMessages id="pages.claims.diligence.approval.reject" />
            </Button>
            <Button
              outline
              size="lg"
              color="success"
              className="m-1"
              onClick={handleApprove}
            >
              <IntlMessages id="pages.claims.diligence.approval.approve" />
            </Button>
          </IsLoading>
        )}
      </div>
      <ModalTaskOrderError
        error={error}
        setError={setError}
      />
    </>
  )
}

DiligenceApproval.propTypes = {
  claimId: string,
  claimSubmitted: bool
}

export default DiligenceApproval
