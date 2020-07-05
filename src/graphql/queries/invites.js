import { gql } from 'apollo-boost'

export const GET_INVITE_DETAILS = gql`
  query Invite ($id: ID!) {
    invite(id: $id){
      id
      email
      accepted
    }
  }
`
