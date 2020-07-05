import { gql } from 'apollo-boost'

export const MEMBER_ROLES_QUERY = gql`
  query MemberRoles ($withAdmin: Boolean) {
    memberRoles (withAdmin: $withAdmin) {
      id
      name
      description
    }
  }
`
