import React from 'react'
import { string, object } from 'prop-types'
import { useMutation } from '@apollo/react-hooks'
import { useLocation } from 'react-router-dom'

import { useToast } from '@/hooks'

import IntlMessages from '@/utils/IntlMessages'

import { WORKFLOW_CATEGORY } from '@/constants/workflow'
import { TASK_TYPE, TASK_STATUS } from '@/constants/task'
import { LOG_TYPE } from '@/constants/logMessages'

import IsLoading from '@/components/Loader/IsLoading'
import ModalTaskOrderError, { useModalTaskOrderError } from '@/components/ModalTaskOrderError'
import DocusignFlow from '@/components/Docusign'
import DataEnry from '@/components/DataEntry'

import { GET_CLAIM_DETAILS, WORKFLOW_CLAIM_QUERY, DOCUMENTS_CLAIM_QUERY } from '@/graphql/queries/claims'
import { UPDATE_WORKFLOW_TASK } from '@/graphql/mutations/workflows'
import { REJECT_CLAIM } from '@/graphql/mutations/claims'

import ActionUpload from '../ActionUpload'

import claimTaskAction from './claimTaskAction'
import TaskButton from './TaskButton'
// import DataEnry from './DataEntry'

const Action = ({ taskExecution, workflowCategory, sellerMemberId }) => {
  const { workflowExecutionId, taskId, type, status, fromId, task } = taskExecution
  const [error, setError] = useModalTaskOrderError()

  const showToast = useToast()
  const { pathname } = useLocation()

  const pathnameList = pathname.split('/')
  let claimId = null

  if (pathnameList.includes('claims')) {
    const indice = pathnameList.indexOf('claims')
    claimId = pathnameList[indice + 1]
  }

  const [
    updateWorkflowTask,
    { loading: updateTaskExecutionLoading }
  ] = useMutation(UPDATE_WORKFLOW_TASK, {
    onCompleted: () => {
      showToast('success', LOG_TYPE.TASK_EXECUTED)
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
      },
      {
        query: DOCUMENTS_CLAIM_QUERY,
        variables: {
          claimId
        }
      }
    ]
  })

  const [
    rejectClaim,
    { loading: rejectClaimLoading }
  ] = useMutation(REJECT_CLAIM, {
    onCompleted: () => {
      showToast('success', LOG_TYPE.TASK_EXECUTED)
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
  })

  const handleClick = (status) => {
    updateWorkflowTask({
      variables: {
        taskId,
        workflowExecutionId,
        status,
        fromId
      }
    })
  }

  const handleRejectClaim = () => {
    rejectClaim({
      variables: {
        id: claimId
      }
    })
  }

  if (status === TASK_STATUS.COMPLETED || status === TASK_STATUS.REJECTED) {
    return <IntlMessages id="general.none" />
  }

  if (type === TASK_TYPE.DOC_UPLOAD) {
    return (
      <ActionUpload taskExecution={taskExecution} />
    )
  }

  if (type === TASK_TYPE.DATA_ENTRY) {
    return (
      <DataEnry link={task.link} />
    )
  }
  const taskActions = claimTaskAction({
    type,
    onClick: handleClick,
    taskName: task?.name,
    rejectClaim: handleRejectClaim
  })

  const loading = updateTaskExecutionLoading || rejectClaimLoading

  return (
    <>
      {workflowCategory === WORKFLOW_CATEGORY.CLAIM ? (
        <IsLoading loading={loading} size={25}>
          {taskActions.map((action, index) => (
            <>
              {index >= 1 && ' | '}
              {type === TASK_TYPE.DOCUSIGN && (
                <DocusignFlow
                  taskExecution={taskExecution}
                  ids={{
                    memberId: sellerMemberId,
                    claimId
                  }}
                />
              )}
              {type !== TASK_TYPE.DOCUSIGN && (
                <TaskButton info={action} />
              )}
            </>
          ))}
        </IsLoading>
      ) : (
        <IntlMessages id="general.none" />
      )}
      <ModalTaskOrderError
        error={error}
        setError={setError}
      />
    </>
  )
}

Action.propTypes = {
  type: string,
  workflowCategory: string,
  taskExecution: object,
}

export default Action
