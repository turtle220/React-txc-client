import { gql } from 'apollo-boost'

import { taskExecutionFragment } from './workflows'

export const UPLOAD_TRADE_DOCUMENT_MUTATION = gql`
  mutation UploadTradeDocument(
    $documentId: ID!,
    $tradeId: ID!
    $workflowExecutionId: ID!,
    $name: String!,
    $type: String!,
  ) {
    uploadTradeDocument (
      documentId: $documentId,
      tradeId: $tradeId
      workflowExecutionId: $workflowExecutionId,
      name: $name,
      type: $type,
    ) {
      id
      name
      category
      docType
      status
      workflowFinished
    }
  }
`

export const TRADE_PRE_APPROVE_MUTATION = gql`
  mutation PreApproveTrade($tradeId: ID!) {
    preApproveTrade (tradeId: $tradeId) {
      ...TaskExecutionInfo
    }
  }
  ${taskExecutionFragment}
`

export const TRADE_APPROVE_MUTATION = gql`
  mutation ApproveTrade($tradeId: ID!) {
    approveTrade (tradeId: $tradeId) {
      ...TaskExecutionInfo
    }
  }
  ${taskExecutionFragment}
`


export const UPDATE_MEMBER_WALLET_MUTATION = gql`
  mutation UpdateMemberWallet ($walletValue: Float!, $memberId: ID!) {
    updateMemberWallet (walletValue: $walletValue, memberId: $memberId) {
      id,
      walletBalance
    }
  }
`
