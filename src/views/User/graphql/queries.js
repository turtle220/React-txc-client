import { gql } from 'apollo-boost'

export const MEMBER_ROLES_QUERY = gql`
  {
    memberRoles {
      id
      name
      description
    }
  }
`

export const BUYER_ROLES_QUERY = gql`
  {
    buyerRoles {
      id
      name
      description
    }
  }
`

export const ADMIN_ROLES_QUERY = gql`
  {
    adminRoles {
      id
      name
      description
    }
  }
`
