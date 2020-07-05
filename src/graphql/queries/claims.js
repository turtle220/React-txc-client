import { gql } from 'apollo-boost'

export const CLAIMS_QUERY = gql`
  query Claims ($sellerMemberId: ID) {
    claims(sellerMemberId: $sellerMemberId) {
      id
      claimIssueDate
      notionalValue
      listReviewedDocumentsScore
      businessIndustrialFieldScore
      taxClaimDueDiligenceScore
      companyActivityScore
      integrityAssesmentClaimModelScore
      integrityAssessementClaimModelPreviousYearScore
      taxDebtsChargesScore
      conclusionsScore
      status
      type
      indicatedInterest
      approvedForAuction
      eligibleBuyers
      sellerMember {
        registerApproved
        companyName
        cebisScore
        cgs
        enterpriseBusinessRisk
        negativeEvents
        payline
        cervedDatabaseChecks
        operativeInfoFullName
      }
    }
  }
`

export const GET_CLAIM_DETAILS = gql`
  query Claim ($id: String) {
    claim(id: $id) {
      id
      startingPx
      rating
      notionalValue
      derivativeFeeValue
      auctionBuyNowPx
      dso
      derivativeOpValue
      financingRate
      tcFeeValue
      tcOpFeeValue
      claimIssueDate
      penaltyInterestRate
      interestBasis
      whiteLabel
      repaymentProbability
      expectedRepaymentValue
      repaymentDate
      deloitteDueDiligenceReport
      listReviewedDocumentsScore
      businessIndustrialFieldScore
      companyActivityScore
      taxClaimDueDiligenceScore
      integrityAssesmentClaimModelScore
      integrityAssessementClaimModelPreviousYearScore
      taxDebtsChargesScore
      conclusionsScore
      listReviewedDocumentsComment
      businessIndustrialFieldComment
      companyActivityComment
      taxClaimDueDiligenceComment
      integrityAssesmentClaimModelComment
      integrityAssessementClaimModelPreviousYearComment
      taxDebtsChargesComment
      conclusionsComment
      status
      type
      category
      taxCase
      conformityScore
      claimIssueDate
      submitted
      approved
      interested
      phaseOneApproved
      phaseTwoApproved
      sellerMember {
        id
        companyName
        vatNumber
        cgs
        cebisScore
        enterpriseBusinessRisk
        negativeEvents
        payline
        cervedDatabaseChecks
        cervedLastUpdatedDate
        operativeInfoFullName
      }
    }
  }
`

export const DOCUMENTS_FORM_QUERY = gql`
  {
    documentsForm {
      IRES {
        id
        key
        label
      }
      VAT {
        id
        key
        label
      }
    }
  }
`

export const WORKFLOW_CLAIM_QUERY = gql`
  query WorkflowTasks ($claimId: ID!) {
    workflowTasks (claimId: $claimId) {
        id
        category
        workflowCategory
        workflowExecutionId
        dueDate
        status
        reminderDate
        notes
        documentKey
        task {
          id
          name
          description
          type
          link
          order
        }
      }
  }
`

export const DOCUMENTS_CLAIM_QUERY = gql`
  query DocumentsClaim ($claimId: ID!) {
    documentsClaim (claimId: $claimId) {
      id
      name
      documentKey
      description
      category
      type
      notes
      status
      workflowExecutionId
      fromId
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

export const DOCUMENTS_CLAIM_PHASE_ONE_QUERY = gql`
  query DocumentsClaimPhaseOne ($claimId: ID!) {
    documentsPhaseOne (claimId: $claimId) {
      id
      name
      documentKey
      description
      category
      type
      status
      workflowExecutionId
      notes
      fromId
    }
  }
`

export const DOCUMENTS_CLAIM_PHASE_TWO_QUERY = gql`
  query DocumentsClaimPhaseTwo ($claimId: ID!) {
    documentsPhaseTwo (claimId: $claimId) {
      id
      name
      documentKey
      description
      category
      type
      status
      workflowExecutionId
      notes
      fromId
    }
  }
`
