import { gql } from 'apollo-boost'

export const GET_DASHBOARD = gql`
    {
      claims {
        id
        rating
        auctionBuyNowPx
        notionalValue
        status
        sellerMember {
          companyName
        }
      }
      trades {
        id
        tradeDate
        amount
        sellerMember {
          companyName
        }
      }
      tasks(status: "PENDING") {
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
