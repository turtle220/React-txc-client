import { gql } from 'apollo-boost'

export const GET_ADMIN_USER_INFO = gql`
  {
    user {
      id
      firstName
      surName
      email
    }
  }
`

export const GET_USER_INFO = gql`
  query User($id: ID) {
    user(id: $id) {
      id
      firstName
      surName
      email
      activate
    }
  }
`
