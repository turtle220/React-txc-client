import { gql } from 'apollo-boost'

export const GET_DERIVATES = gql`
  {
    derivatives {
      id
      maturityDate
      tradeNotionalAmount
      basketComposition
    }
  }
`
