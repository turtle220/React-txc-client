import { gql } from 'apollo-boost'

export const TASKS_QUERY = gql`
  query Tasks ($memberId: ID, $status: String, $allTasks: Boolean) {
    tasks(memberId: $memberId, status: $status, allTasks: $allTasks) {
      id
      status
      category
      workflowCategory
      task {
        id
        name
        type
        link
        description
      }
      memberId
      memberCompanyName
      claimId
    }
  }
`
