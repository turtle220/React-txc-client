import { gql } from 'apollo-boost'

export const RESET_PASSWORD = gql`
  mutation ResetPassword(
    $email: String!,
    $password: String!,
  ) {
    resetPassword(
      email: $email,
      password: $password,
    )
  }
`
