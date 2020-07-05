import React from 'react'
import { object, func } from 'prop-types'
import { DropdownItem } from 'reactstrap'
import { useMutation } from '@apollo/react-hooks'
import { useRole, useToast } from '@/hooks'
import { getCurrentUser, setCurrentUser } from '@/utils/session'
import IntlMessages from '@/utils/IntlMessages'

import { CLAIM_STATUS } from '@/constants/claim'

import { GET_CLAIM_DETAILS, WORKFLOW_CLAIM_QUERY, DOCUMENTS_CLAIM_QUERY } from '@/graphql/queries/claims'
import {
  APPROVE_CLAIM_AND_WORKFLOW_PHASES,
  REJECT_CLAIM,
  START_CLAIM_PARTICIPANT_WORKFLOW
} from '@/graphql/mutations/claims'

const Action = ({ action: { name, label, roles, logMessage }, claim, setLoading, setError }) => {
  const [isAbleToView] = useRole(roles)
  const showToast = useToast()

  const setLoadingOn = () => setLoading(true)
  const setLoadingOff = () => setLoading(false)

  const [approveClaimAndWorkflowPhases] = useMutation(
    APPROVE_CLAIM_AND_WORKFLOW_PHASES,
    {
      onCompleted() {
        setLoadingOff()
        showToast('success', logMessage.success)
      },
      onError: (({ message }) => {
        setLoadingOff()
        setError(message)
      }),
      refetchQueries: [
        {
          query: WORKFLOW_CLAIM_QUERY,
          variables: {
            claimId: claim.id
          }
        },
        {
          query: GET_CLAIM_DETAILS,
          variables: {
            id: claim.id
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

  const [rejectClaim] = useMutation(
    REJECT_CLAIM,
    {
      onCompleted() {
        setLoadingOff()
        showToast('success', logMessage.success)
      },
      onError: (({ message }) => {
        setLoadingOff()
        setError(message)
      }),
      refetchQueries: [
        {
          query: GET_CLAIM_DETAILS,
          variables: {
            id: claim.id
          }
        },
        {
          query: WORKFLOW_CLAIM_QUERY,
          variables: {
            claimId: claim.id
          }
        }
      ]
    }
  )

  const [startWorkflowExecutionClaimParticipant] = useMutation(
    START_CLAIM_PARTICIPANT_WORKFLOW,
    {
      update: (store) => {
        const variables = { id: claim.id }
        const { claim: currentClaim } = store.readQuery({
          query: GET_CLAIM_DETAILS,
          variables
        })

        store.writeQuery({
          query: GET_CLAIM_DETAILS,
          variables,
          data: {
            claim: {
              ...currentClaim,
              interested: true
            }
          }
        })
      },
      onCompleted() {
        setLoadingOff()
        showToast('success', logMessage.success)
      },
      onError() {
        setLoadingOff()
      }
    }
  )

  const handle = {
    approveClaim() {
      setLoadingOn()
      approveClaimAndWorkflowPhases({
        variables: {
          id: claim?.id
        }
      })
    },

    rejectClaim() {
      setLoadingOn()
      rejectClaim({
        variables: {
          id: claim?.id
        }
      })
    },

    approvePhaseOne() {
      setLoadingOn()
      approveClaimAndWorkflowPhases({
        variables: {
          id: claim?.id
        }
      })
    },

    approvePhaseTwo() {
      setLoadingOn()
      approveClaimAndWorkflowPhases({
        variables: {
          id: claim?.id
        }
      })
    },

    claimInterest() {
      const currentUser = getCurrentUser()

      startWorkflowExecutionClaimParticipant({
        variables: {
          memberId: currentUser.memberId,
          claimId: claim.id
        }
      })
    },

    claimPaid() {
      const currentUser = getCurrentUser()
      const claimsPaid = currentUser?.claimsPaid

      if (claimsPaid?.includes(claim?.id)) {
        showToast('error', logMessage.error)
      } else if (!claimsPaid) {
        setCurrentUser({
          ...currentUser,
          claimsPaid: [claim?.id]
        })
        showToast('success', logMessage.success)
      } else {
        setCurrentUser({
          ...currentUser,
          claimsPaid: [
            ...currentUser?.claimsPaid,
            claim?.id
          ]
        })
        showToast('success', logMessage.success)
      }
    },
    downloadCervedScores() {
    },
    downloadDeloittePhaseOne() {
    },
    downloadDeloittePhaseTwo() {}
  }

  const check = {
    approveClaim: claim?.approved,
    rejectClaim: claim?.status === CLAIM_STATUS.REJECTED,
    approvePhaseOne: claim?.phaseOneApproved,
    approvePhaseTwo: claim?.phaseTwoApproved,
    claimInterest: claim?.interested,
    claimPaid: false,
    downloadCervedScores: false,
    downloadDeloittePhaseOne: false,
    downloadDeloittePhaseTwo: false
  }

  return (
    <>
      {(!roles || isAbleToView) && (
        <DropdownItem onClick={handle[name]} disabled={check[name]}>
          <IntlMessages id={`pages.claims.actions.${label}`} />
          {check[name] && <i className="simple-icon-check ml-2" />}
        </DropdownItem>
      )}
    </>
  )
}

Action.propTypes = {
  action: object,
  claim: object,
  setLoading: func,
  setError: func
}

export default Action
