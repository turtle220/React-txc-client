import { gql } from 'apollo-boost'

export const UPDATE_CERVED_SCORES_MUTATION = gql`
  mutation updateCervedScores ($memberVAT: String!, $memberId: ID!) {
    updateCervedScores (memberVAT: $memberVAT, memberId: $memberId)
  }
`
