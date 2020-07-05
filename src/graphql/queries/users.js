import { gql } from 'apollo-boost'

const userFragment = gql`
  fragment UserInfo on User {
    id
    firstName
    surName
    email
    role {
      name
      description
      type
    }
    recipientId
  }
`

export const USERS_QUERY = gql`
  {
    users {
      id,
      firstName,
      surName,
      email,
      creditLine
      lastSignIn,
      memberId,
      creditLine,
      memberType,
      companyName,
      registerApproved,
      activate
    }
  }
`

export const USER_EMAIL_QUERY = gql`
  query UserEmailQuery ($email: String!) {
    userEmailQuery (email: $email) {
      token
      memberId
      registerApproved
      recipientId
      ...UserInfo
    }
  }
  ${userFragment}
`

export const USER_DETAIL = gql`
  {
    user {
      id
      firstName
      surName
      creditLine
    }
  }
`

export const VERIFY_USER_QUERY = gql`
  query VerifyUserQuery ($email: String!) {
    verifyUser (email: $email)
  }
`
