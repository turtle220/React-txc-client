import { gql } from 'apollo-boost'

const documentFragment = gql`
  fragment DocumentInfo on Document {
    id
    name
    description
    category
    url
    docType
    status
  }
`

const taskExecutionFragment = gql`
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

const memberFragment = gql`
  fragment MemberInfo on Member {
    id
  }
`

export const UPLOAD_DOCUMENT_MEMBER_MUTATION = gql`
  mutation UploadDocument(
    $memberId: ID!
    $documentId: ID!,
    $name: String!,
    $type: String!,
    $replace: Boolean!
  ) {
    uploadDocumentMember (
      memberId: $memberId,
      documentId: $documentId,
      name: $name,
      type: $type,
      replace: $replace
    ) {
      ...DocumentInfo
    }
  }
  ${documentFragment}
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

export const APPROVE_MEMBER = gql`
  mutation ApproveMember ($memberId: String!) {
    approveMember (memberId: $memberId) {
      ...MemberInfo
    }
  }
  ${memberFragment}
`

export const ENTER_CREDIT_LINE = gql`
  mutation enterCreditLine ($userId: ID!, $creditLine: Float!) {
    enterCreditLine (userId: $userId, creditLine: $creditLine) {
      creditLine
    }
  }
`

export const UPDATE_ACTIVATE = gql`
  mutation updateUserActivate ($email: String!) {
    updateUserActivate (email: $email) {
      id
      memberId,
      activate
    }
  }
`
