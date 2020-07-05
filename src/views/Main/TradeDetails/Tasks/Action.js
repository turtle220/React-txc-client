import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Button } from 'reactstrap'

import { useToast } from '@/hooks'

import IntlMessages from '@/utils/IntlMessages'

import { TASK_STATUS, TASK_TYPE, TASK_ACTION_LABEL } from '@/constants/task'
import { LOG_TYPE } from '@/constants/logMessages'

import IsLoading from '@/components/Loader/IsLoading'
import ModalTaskOrderError, { useModalTaskOrderError } from '@/components/ModalTaskOrderError'
import DataEntry from '@/components/DataEntry'

import DocusignFlow from '@/components/Docusign'

import { EXECUTE_WORKFLOW_TASK_MUTATION } from '@/graphql/mutations/workflows'

const Action = ({ task: taskExecution, tradeId, claimId, sellerMemberId, buyerMemberId }) => {
  const showToast = useToast()
  const [error, setError] = useModalTaskOrderError()

  const [
    updateWorkflowTask,
    { loading: updateTaskExecutionLoading }
  ] = useMutation(EXECUTE_WORKFLOW_TASK_MUTATION, {
    onCompleted: () => {
      showToast('success', LOG_TYPE.TASK_EXECUTED)
    },
    onError: (({ message }) => {
      setError(message)
    })
  })

  const executeTask = () => {
    updateWorkflowTask({
      variables: {
        taskId: taskExecution.task.id,
        workflowExecutionId: taskExecution.workflowExecutionId,
        fromId: tradeId
      }
    })
  }

  if (taskExecution.status === TASK_STATUS.COMPLETED) {
    return <IntlMessages id="general.none" />
  }

  if (taskExecution.task.type === TASK_TYPE.DATA_ENTRY) {
    return <DataEntry link={taskExecution.task.link} />
  }

  return (
    <>
      <div>
        <IsLoading loading={updateTaskExecutionLoading} size={25}>
          {taskExecution.task?.type === TASK_TYPE.DOCUSIGN && (
            <DocusignFlow
              taskExecution={taskExecution}
              ids={{
                memberId: sellerMemberId,
                buyerMemberId,
                claimId,
                tradeId
              }}
            />
          )}
          {taskExecution.task?.type !== TASK_TYPE.DOCUSIGN && (
            <Button
              color='link'
              className='p-0'
              onClick={executeTask}
            >
              <IntlMessages id={TASK_ACTION_LABEL.CONFIRM} />
            </Button>
          )}
        </IsLoading>
      </div>
      <ModalTaskOrderError
        error={error}
        setError={setError}
      />
    </>
  )
}

export default Action
