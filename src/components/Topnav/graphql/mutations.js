import { gql } from 'apollo-boost'

export const APPROVE_MEMBER = gql`
  mutation ApproveMember(
    $memberId: String!,
  ) {
    approveMember(
      memberId: $memberId,
    ) {
      registerApproved
    }
  }
`

export const REPROVE_MEMBER = gql`
  mutation ReproveMember(
    $memberId: String!,
  ) {
    reproveMember(
      memberId: $memberId,
    ) {
      registerApproved
    }
  }
`
