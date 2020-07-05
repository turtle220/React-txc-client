import { gql } from 'apollo-boost'

export const MEMBERS_QUERY = gql`
  query Member ($approved: Boolean, $types: [String]) {
    members (approved: $approved, types: $types) {
      id,
      operativeInfoFullName,
      operativeInfoEmail,
      type,
      companyName,
      registeredEmailPec,
      status
      walletBalance
    }
  }
`

export const SELLERS_QUERY = gql`
  {
    sellers {
      id
      operativeInfoFirstName
      operativeInfoSurname
      companyName
      operativeInfoEmail
      status
    }
  }
`

export const APPROVED_SELLERS_QUERY = gql`
  {
    approvedSellers {
      id
      operativeInfoFirstName
      operativeInfoSurname
      companyName
      operativeInfoEmail
      status
    }
  }
`

export const APPROVED_MEMBERS_QUERY = gql`
  {
    approvedMembers {
      id
      operativeInfoFirstName
      operativeInfoSurname
      companyName
      operativeInfoEmail
      status
    }
  }
`

export const MEMBER_QUERY = gql`
  query Member ($memberId: ID) {
    member (memberId: $memberId) {
      id
      type
      categoryClient
      registeredEmailPec
      officialAddress
      street
      zipCode
      country
      registeredNumber
      companyName
      vatNumber
      authority
      groupChart {
        name
        originalName
      }
      companyRegistrationReport {
        name
        originalName
      }
      statute {
        name
        originalName
      }
      lastFinancialStatement {
        name
        originalName
      }
      legalRepresentativeFirstName
      legalRepresentativeSurname
      legalRepresentativePhoneMobile
      legalRepresentativePhoneLandline
      legalRepresentativeEmail
      legalRepresentativeCompanyFunction
      legalRepresentativeCompanyTitle
      legalRepresentativePrivacy {
        name
        originalName
      }
      legalRepresentativeIdCard {
        name
        originalName
      }
      legalRepresentativeFiscalCode {
        name
        originalName
      }
      beneficialOwnerFirstName
      beneficialOwnerSurname
      beneficialOwnerPhoneMobile
      beneficialOwnerPhoneLandline
      beneficialOwnerEmail
      beneficialOwnerCompanyFunction
      beneficialOwnerCompanyTitle
      beneficialOwnerPrivacy {
        name
        originalName
      }
      beneficialOwnerIdCard {
        name
        originalName
      }
      beneficialOwnerFiscalCode {
        name
        originalName
      }
      operativeInfoFirstName
      operativeInfoSurname
      operativeInfoPhoneMobile
      operativeInfoPhoneLandline
      operativeInfoEmail
      operativeInfoCompanyFunction
      operativeInfoCompanyTitle
      operativeInfoPoa {
        name
        originalName
      }
      operativeInfoIdCard {
        name
        originalName
      }
      operativeInfoFiscalCode {
        name
        originalName
      }
      operativeInfoPrivacy {
        name
        originalName
      }
      registerApproved
      registerConcluded
      status
    }
  }
`

export const MEMBER_STATEMENT_QUERY = gql`
  {
    documentsMemberStatement {
      id
      name
      description
      createdAt
    }
  }
`
