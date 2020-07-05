import { gql } from 'apollo-boost'

export const CREATE_MEMBERSHIP_AGREEMENT = gql`
  mutation CreateMembershipAgreement(
    $type: String,
    $categoryClient: String,
    $registeredEmailPec: String,
    $officialAddress: String,
    $street: String,
    $zipCode: String,
    $country: String,
    $registeredNumber: String,
    $companyName: String,
    $vatNumber: String,
    $authority: String,
    $groupChart: MemberDocument,
    $companyRegistrationReport: MemberDocument,
    $statute: MemberDocument,
    $lastFinancialStatement: MemberDocument,
    $legalRepresentativeFirstName: String,
    $legalRepresentativeSurname: String,
    $legalRepresentativePhoneMobile: String,
    $legalRepresentativePhoneLandline: String,
    $legalRepresentativeEmail: String,
    $legalRepresentativeCompanyFunction: String,
    $legalRepresentativeCompanyTitle: String,
    $legalRepresentativePrivacy: MemberDocument,
    $legalRepresentativeIdCard: MemberDocument,
    $legalRepresentativeFiscalCode: MemberDocument,
    $beneficialOwnerFirstName: String,
    $beneficialOwnerSurname: String,
    $beneficialOwnerPhoneMobile: String,
    $beneficialOwnerPhoneLandline: String,
    $beneficialOwnerEmail: String,
    $beneficialOwnerCompanyFunction: String,
    $beneficialOwnerCompanyTitle: String,
    $beneficialOwnerPrivacy: MemberDocument,
    $beneficialOwnerIdCard: MemberDocument,
    $beneficialOwnerFiscalCode: MemberDocument,
    $operativeInfoFirstName: String,
    $operativeInfoSurname: String,
    $operativeInfoPhoneMobile: String,
    $operativeInfoPhoneLandline: String,
    $operativeInfoEmail: String,
    $operativeInfoCompanyFunction: String,
    $operativeInfoCompanyTitle: String,
    $operativeInfoPoa: MemberDocument,
    $operativeInfoIdCard: MemberDocument,
    $operativeInfoFiscalCode: MemberDocument,
    $operativeInfoPrivacy: MemberDocument,
    $registerConcluded: Boolean,
    $memberId: ID
  ) {
    createMembershipAgreement (
      type: $type,
      categoryClient: $categoryClient,
      registeredEmailPec: $registeredEmailPec,
      officialAddress: $officialAddress,
      street: $street,
      zipCode: $zipCode,
      country: $country,
      registeredNumber: $registeredNumber,
      companyName: $companyName,
      vatNumber: $vatNumber,
      authority: $authority,
      groupChart: $groupChart,
      companyRegistrationReport: $companyRegistrationReport,
      statute: $statute,
      lastFinancialStatement: $lastFinancialStatement,
      legalRepresentativeFirstName: $legalRepresentativeFirstName,
      legalRepresentativeSurname: $legalRepresentativeSurname,
      legalRepresentativePhoneMobile: $legalRepresentativePhoneMobile,
      legalRepresentativePhoneLandline: $legalRepresentativePhoneLandline,
      legalRepresentativeEmail: $legalRepresentativeEmail,
      legalRepresentativeCompanyFunction: $legalRepresentativeCompanyFunction,
      legalRepresentativeCompanyTitle: $legalRepresentativeCompanyTitle,
      legalRepresentativePrivacy: $legalRepresentativePrivacy,
      legalRepresentativeIdCard: $legalRepresentativeIdCard,
      legalRepresentativeFiscalCode: $legalRepresentativeFiscalCode,
      beneficialOwnerFirstName: $beneficialOwnerFirstName,
      beneficialOwnerSurname: $beneficialOwnerSurname,
      beneficialOwnerPhoneMobile: $beneficialOwnerPhoneMobile,
      beneficialOwnerPhoneLandline: $beneficialOwnerPhoneLandline,
      beneficialOwnerEmail: $beneficialOwnerEmail,
      beneficialOwnerCompanyFunction: $beneficialOwnerCompanyFunction,
      beneficialOwnerCompanyTitle: $beneficialOwnerCompanyTitle,
      beneficialOwnerPrivacy: $beneficialOwnerPrivacy,
      beneficialOwnerIdCard: $beneficialOwnerIdCard,
      beneficialOwnerFiscalCode: $beneficialOwnerFiscalCode,
      operativeInfoFirstName: $operativeInfoFirstName,
      operativeInfoSurname: $operativeInfoSurname,
      operativeInfoPhoneMobile: $operativeInfoPhoneMobile,
      operativeInfoPhoneLandline: $operativeInfoPhoneLandline,
      operativeInfoEmail: $operativeInfoEmail,
      operativeInfoCompanyFunction: $operativeInfoCompanyFunction,
      operativeInfoCompanyTitle: $operativeInfoCompanyTitle,
      operativeInfoPoa: $operativeInfoPoa,
      operativeInfoIdCard: $operativeInfoIdCard,
      operativeInfoFiscalCode: $operativeInfoFiscalCode,
      operativeInfoPrivacy: $operativeInfoPrivacy,
      registerConcluded: $registerConcluded,
      memberId: $memberId
    ) {
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
    }
  }
`

export const FINISH_MEMBERSHIP_AGREEMENT = gql`
  mutation FinishMembershipAgreement(
    $type: String,
    $categoryClient: String,
    $registeredEmailPec: String,
    $officialAddress: String,
    $street: String,
    $zipCode: String,
    $country: String,
    $registeredNumber: String,
    $companyName: String,
    $vatNumber: String,
    $authority: String,
    $groupChart: MemberDocument,
    $companyRegistrationReport: MemberDocument,
    $statute: MemberDocument,
    $lastFinancialStatement: MemberDocument,
    $legalRepresentativeFirstName: String,
    $legalRepresentativeSurname: String,
    $legalRepresentativePhoneMobile: String,
    $legalRepresentativePhoneLandline: String,
    $legalRepresentativeEmail: String,
    $legalRepresentativeCompanyFunction: String,
    $legalRepresentativeCompanyTitle: String,
    $legalRepresentativePrivacy: MemberDocument,
    $legalRepresentativeIdCard: MemberDocument,
    $legalRepresentativeFiscalCode: MemberDocument,
    $beneficialOwnerFirstName: String,
    $beneficialOwnerSurname: String,
    $beneficialOwnerPhoneMobile: String,
    $beneficialOwnerPhoneLandline: String,
    $beneficialOwnerEmail: String,
    $beneficialOwnerCompanyFunction: String,
    $beneficialOwnerCompanyTitle: String,
    $beneficialOwnerPrivacy: MemberDocument,
    $beneficialOwnerIdCard: MemberDocument,
    $beneficialOwnerFiscalCode: MemberDocument,
    $operativeInfoFirstName: String,
    $operativeInfoSurname: String,
    $operativeInfoPhoneMobile: String,
    $operativeInfoPhoneLandline: String,
    $operativeInfoEmail: String,
    $operativeInfoCompanyFunction: String,
    $operativeInfoCompanyTitle: String,
    $operativeInfoPoa: MemberDocument,
    $operativeInfoIdCard: MemberDocument,
    $operativeInfoFiscalCode: MemberDocument,
    $operativeInfoPrivacy: MemberDocument,
    $registerConcluded: Boolean,
    $memberId: ID!
  ) {
    finishMembershipAgreement (
      type: $type,
      categoryClient: $categoryClient,
      registeredEmailPec: $registeredEmailPec,
      officialAddress: $officialAddress,
      street: $street,
      zipCode: $zipCode,
      country: $country,
      registeredNumber: $registeredNumber,
      companyName: $companyName,
      vatNumber: $vatNumber,
      authority: $authority,
      groupChart: $groupChart,
      companyRegistrationReport: $companyRegistrationReport,
      statute: $statute,
      lastFinancialStatement: $lastFinancialStatement,
      legalRepresentativeFirstName: $legalRepresentativeFirstName,
      legalRepresentativeSurname: $legalRepresentativeSurname,
      legalRepresentativePhoneMobile: $legalRepresentativePhoneMobile,
      legalRepresentativePhoneLandline: $legalRepresentativePhoneLandline,
      legalRepresentativeEmail: $legalRepresentativeEmail,
      legalRepresentativeCompanyFunction: $legalRepresentativeCompanyFunction,
      legalRepresentativeCompanyTitle: $legalRepresentativeCompanyTitle,
      legalRepresentativePrivacy: $legalRepresentativePrivacy,
      legalRepresentativeIdCard: $legalRepresentativeIdCard,
      legalRepresentativeFiscalCode: $legalRepresentativeFiscalCode,
      beneficialOwnerFirstName: $beneficialOwnerFirstName,
      beneficialOwnerSurname: $beneficialOwnerSurname,
      beneficialOwnerPhoneMobile: $beneficialOwnerPhoneMobile,
      beneficialOwnerPhoneLandline: $beneficialOwnerPhoneLandline,
      beneficialOwnerEmail: $beneficialOwnerEmail,
      beneficialOwnerCompanyFunction: $beneficialOwnerCompanyFunction,
      beneficialOwnerCompanyTitle: $beneficialOwnerCompanyTitle,
      beneficialOwnerPrivacy: $beneficialOwnerPrivacy,
      beneficialOwnerIdCard: $beneficialOwnerIdCard,
      beneficialOwnerFiscalCode: $beneficialOwnerFiscalCode,
      operativeInfoFirstName: $operativeInfoFirstName,
      operativeInfoSurname: $operativeInfoSurname,
      operativeInfoPhoneMobile: $operativeInfoPhoneMobile,
      operativeInfoPhoneLandline: $operativeInfoPhoneLandline,
      operativeInfoEmail: $operativeInfoEmail,
      operativeInfoCompanyFunction: $operativeInfoCompanyFunction,
      operativeInfoCompanyTitle: $operativeInfoCompanyTitle,
      operativeInfoPoa: $operativeInfoPoa,
      operativeInfoIdCard: $operativeInfoIdCard,
      operativeInfoFiscalCode: $operativeInfoFiscalCode,
      operativeInfoPrivacy: $operativeInfoPrivacy,
      registerConcluded: $registerConcluded,
      memberId: $memberId
    ) {
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
    }
  }
`
