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
    permissions
    recipientId
  }
`

export const CREATE_USER = gql`
  mutation CreateUser(
    $firstName: String!,
    $surName: String!,
    $email: String!,
    $password: String!,
    $roleId: String!
  ) {
    signup (
      firstName: $firstName,
      surName: $surName,
      email: $email,
      password: $password,
      roleId: $roleId
    ) {
      ...UserInfo
    }
  }
  ${userFragment}
`

export const LOGIN = gql`
  mutation Login(
    $username: String!,
    $password: String!
  ) {
    login(
      username: $username,
      password: $password
    ) {
      token
      memberId
      registerApproved
      recipientId
      ...UserInfo
    }
  }
  ${userFragment}
`
export const VERIFY = gql`
  mutation Verify(
    $code: String!,
  ) {
    verify(
      code: $code,
    ) {
      token
      memberId
      registerApproved
      recipientId
      idToken
      uid
      ...UserInfo
    }
  }
  ${userFragment}
`

export const UPDATE_PASSWORD = gql`
  mutation UpdatePassword(
    $userName: String!,
    $currentPassword: String!,
    $newPassword: String!
  ) {
    updatePassword(
      userName: $userName,
      currentPassword: $currentPassword,
      newPassword : $newPassword
    ) {
      ...UserInfo
    }
  }
  ${userFragment}
`
