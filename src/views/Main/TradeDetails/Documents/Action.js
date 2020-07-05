import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Button } from 'reactstrap'

import { useToast } from '@/hooks'

import IntlMessages from '@/utils/IntlMessages'

import { TASK_STATUS, TASK_ACTION_LABEL } from '@/constants/task'
import { LOG_TYPE } from '@/constants/logMessages'

import IsLoading from '@/components/Loader/IsLoading'
import ModalTaskOrderError, { useModalTaskOrderError } from '@/components/ModalTaskOrderError'

import { EXECUTE_WORKFLOW_TASK_MUTATION } from '@/graphql/mutations/workflows'

const Action = ({ task, tradeId }) => {
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
        taskId: task.task.id,
        workflowExecutionId: task.workflowExecutionId,
        fromId: tradeId
      }
    })
  }

  if (task.status === TASK_STATUS.COMPLETED) {
    return <IntlMessages id="general.none" />
  }

  return (
    <>
      <div>
        <IsLoading loading={updateTaskExecutionLoading} size={25}>
          <Button
            color='link'
            className='p-0'
            onClick={executeTask}
          >
            <IntlMessages id={TASK_ACTION_LABEL.CONFIRM} />
          </Button>
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
