import { gql } from 'apollo-boost'

export const taskExecutionFragment = gql`
  fragment TaskExecutionInfo on TaskExecution {
    id
    status
    task {
      id
      description
    }
    workflowFinished
}
`

export const UPDATE_WORKFLOW_TASK = gql`
  mutation UpdateWorkflowTask (
    $taskId: ID!
    $workflowExecutionId: ID!
    $status: String!
    $fromId: ID!
  ) {
    updateWorkflowTask (
      taskId: $taskId
      workflowExecutionId: $workflowExecutionId
      status: $status
      fromId: $fromId
    ) {
      ...TaskExecutionInfo
    }
  }
  ${taskExecutionFragment}
`

export const EXECUTE_WORKFLOW_TASK_MUTATION = gql`
  mutation ExecuteWorkflowTask (
    $taskId: ID!
    $workflowExecutionId: ID!
    $fromId: ID!
  ) {
    executeWorkflowTask (
      taskId: $taskId
      workflowExecutionId: $workflowExecutionId
      fromId: $fromId
    ) {
      ...TaskExecutionInfo
    }
  }
  ${taskExecutionFragment}
`
