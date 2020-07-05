import { gql } from 'apollo-boost'

export const CLAIMS_QUERY = gql`
  query Claims ($limit: Int) {
    claims(limit: $limit) {
      id
      claimIssueDate
      auctionBuyNowPx
      sellerMember {
        companyName
      }
    }
  }
`

export const GET_DERIVATIVE = gql`
  query Derivative($id: String) {
    derivative(id: $id) {
      tradeDate
      amount
      derivative {
        optionPayoff
        tradeNotionalAmount
        expiryDate
      }
    }
  }
`
