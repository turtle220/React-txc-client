import React from 'react'
import { object } from 'prop-types'

import Action from './Action'

const ActionCell = ({
  original: document,
  columnProps: { rest: { fromId } },
}) => {
  const { id, status, task, workflowExecutionId, claimId } = document.taskExecution
  const { enable } = document
  return (
    <Action
      isUser='false'
      claimId={claimId}
      enable={enable}
      taskExecution={{
        id,
        taskId: task.id,
        type: task?.type,
        status,
        workflowExecutionId,
        fromId
      }}
    />
  )
}

ActionCell.propTypes = {
  original: object.isRequired
}

export default ActionCell
