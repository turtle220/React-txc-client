import { gql } from 'apollo-boost'

const documentFragment = gql`
  fragment DocumentInfo on Document {
    id
    name
    description
    category
    docType
    status
    notes
  }
`

export const UPDATE_DOCUMENT_NOTES = gql`
  mutation UpdateDocumentNotes(
    $id: String!,
    $notes: String!,
  ) {
    updateDocumentNotes (
      id: $id,
      notes: $notes,
    ) {
      ...DocumentInfo
    }
  }
  ${documentFragment}
`

export const APPROVE_DOCUMENT = gql`
  mutation ApproveDocument(
    $id: String!
    $workflowExecutionId: ID!
    $fromId: ID!
  ) {
    approveDocument (
      id: $id,
      workflowExecutionId: $workflowExecutionId
      fromId: $fromId
    ) {
      ...DocumentInfo
    }
  }
  ${documentFragment}
`

export const REJECT_DOCUMENT = gql`
  mutation ApproveDocument(
    $id: String!
    $workflowExecutionId: ID!
    $fromId: ID!
  ) {
    rejectDocument (
      id: $id,
      workflowExecutionId: $workflowExecutionId
      fromId: $fromId
    ) {
      ...DocumentInfo
    }
  }
  ${documentFragment}
`
