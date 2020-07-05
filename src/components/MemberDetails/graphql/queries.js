import { gql } from 'apollo-boost'

export const GET_MEMBER = gql`
  query MemberDetail($memberId: ID!) {
    memberDetail(memberId: $memberId) {
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
      legalRepresentativeFirstName
      legalRepresentativeSurname
      legalRepresentativePhoneMobile
      legalRepresentativePhoneLandline
      legalRepresentativeEmail
      legalRepresentativeCompanyFunction
      legalRepresentativeCompanyTitle
      beneficialOwnerFirstName
      beneficialOwnerSurname
      beneficialOwnerPhoneMobile
      beneficialOwnerPhoneLandline
      beneficialOwnerEmail
      beneficialOwnerCompanyFunction
      beneficialOwnerCompanyTitle
      operativeInfoFirstName
      operativeInfoSurname
      operativeInfoPhoneMobile
      operativeInfoPhoneLandline
      operativeInfoEmail
      operativeInfoCompanyFunction
      operativeInfoCompanyTitle
      workflowStatus
      userCreditLine
      activate
    }
  }
`

export const DOCUMENTS_MEMBER_QUERY = gql`
  query DocumentsMember ($memberId: ID!) {
    documentsMember (memberId: $memberId) {
      id
      name
      description
      documentKey
      category
      docType
      url
      notes
      status
      workflowExecutionId
      fromId
      enable
      taskExecution {
        id
        dueDate
        status
        reminderDate
        notes
        workflowCategory
        workflowExecutionId
        task {
          id
          description
          type
          order
        }
      }
    }
  }
`

export const WORKFLOW_MEMBER_QUERY = gql`
  query WorkflowMember ($memberId: ID!) {
    workflowMember (memberId: $memberId) {
      tasks {
        id
        dueDate
        status
        reminderDate
        notes
        workflowCategory
        workflowExecutionId
        documentKey
        task {
          id
          description
          type
          order
        }
      }
    }
  }
`

export const WORKFLOW_BUYER_MEMBER_QUERY = gql`
  query WorkflowBuyerMember ($memberId: ID!) {
    workflowBuyerMember (memberId: $memberId) {
      tasks {
        id
        dueDate
        status
        reminderDate
        notes
        workflowCategory
        workflowExecutionId
        claimId
        task {
          id
          description
          type
          order
        }
      }
    }
  }
`
