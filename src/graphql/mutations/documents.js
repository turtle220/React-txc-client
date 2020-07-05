import { gql } from 'apollo-boost'

export const UPLOAD_DOCUMENT_MUTATION = gql`
  mutation UploadDocument(
    $documentId: ID,
    $taskExecutionId: ID,
    $name: String,
    $type: String!,
    $replace: Boolean!,
    $workflowExecutionId: ID!,
    $fromId: ID!
  ) {
    uploadDocument (
      documentId: $documentId,
      taskExecutionId: $taskExecutionId,
      name: $name,
      type: $type,
      replace: $replace,
      workflowExecutionId: $workflowExecutionId,
      fromId: $fromId
    ) {
      id
      name
      description
      category
      docType
      status
    }
  }
`
