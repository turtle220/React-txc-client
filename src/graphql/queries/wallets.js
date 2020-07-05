import { gql } from 'apollo-boost'

export const WALLET_QUERY = gql`
  query wallet ($sellerMemberId: ID) {
    wallet(sellerMemberId: $sellerMemberId) {
      balance
      transations
      lastTransactionDate
      amount
    }
  }
`

export const TRADES_QUERY = gql`
  query Trades ($sellerMemberId: ID) {
    trades(sellerMemberId: $sellerMemberId) {
      id
      tradeDate
      amount
      status
      client
      type
      px
    }
  }
`

export const TRADE_QUERY = gql`
  query Trade($id: ID!) {
    trade(id: $id) {
      id
      tradeDate
      amount
      fee
      preApproved
      approved
      px
      yeildTr
      multiple
      claim {
        id
        dso
        expectedRepaymentValue
        repaymentDate
        tcOpFeeValue
        tcFeeValue
        rating
      }
      buyerUser {
        memberId
        firstName
        surName
      }
      sellerMember {
        id
        companyName
        registerApproved
        operativeInfoFullName
      }
    }
  }
`

export const TRADE_DOCUMENTS_QUERY = gql`
  query TradeDocuments ($tradeId: ID!) {
    tradeDocuments(tradeId: $tradeId) {
      id
      name
      description
      category
      documentKey
      docType
      status
      notes
      workflowExecutionId
      fromId
      workflowFinished
      taskExecution {
        id
        status
        workflowExecutionId
        task {
          id
          description
          type
        }
      }
    }
  }
`

export const TRADE_WORKFLOW_TASKS_QUERY = gql`
  query TradeWorkflowTasks ($tradeId: ID!) {
    tradeWorkflowTasks (tradeId: $tradeId) {
      id
      status
      category
      documentKey
      workflowExecutionId
      task {
        id
        type
        description
      }
      workflowFinished
    }
  }
`
