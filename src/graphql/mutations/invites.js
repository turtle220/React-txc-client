import { gql } from 'apollo-boost'

const inviteFragment = gql`
  fragment InviteInfo on Invite {
    id
    email
  }
`
export const SEND_INVITE_MUTATION = gql`
  mutation SendInvite(
    $email: String!
  ) {
    sendInvite (
      email: $email
    ) {
      ...InviteInfo
    }
  }
  ${inviteFragment}
`
