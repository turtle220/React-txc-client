import { gql } from 'apollo-boost'

const claimFragment = gql`
  fragment ClaimInfo on Claim {
    id
    startingPx
    notionalValue
    rating
    derivativeFeeValue
    auctionBuyNowPx
    listReviewedDocumentsComment
    businessIndustrialFieldComment
    taxClaimDueDiligenceComment
    integrityAssesmentClaimModelComment
    integrityAssessementClaimModelPreviousYearComment
    taxDebtsChargesComment
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
    category
    deloitteDueDiligenceReport
    submitted
    approved
    phaseOneApproved
    phaseTwoApproved
    taxCase
    conformityScore
    type
    taxCase
    conformityScore
    claimIssueDate
    expectedRepaymentValue
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
    interested
    sellerMember {
      id
      vatNumber
      cgs
      cervedLastUpdatedDate
      operativeInfoFullName
      companyName
      cebisScore
      enterpriseBusinessRisk
      negativeEvents
      payline
      cervedDatabaseChecks
    }
  }
`

export const CREATE_CLAIM_MUTATION = gql`
  mutation CreateClaim(
    $type: String!,
    $sellerId: ID,
    $documents: [ClaimDocumentInput]
  ) {
    createClaim (
      type: $type,
      sellerId: $sellerId
      documents: $documents
    ) {
      ...ClaimInfo
    }
  }
  ${claimFragment}
`

export const UPDATE_CLAIM = gql`
  mutation UpdateClaim(
    $id: String!
    $startingPx: Float
    $rating: Float
    $notionalValue: Float
    $derivativeFeeValue: Float
    $auctionBuyNowPx: Float
    $dso: Float
    $derivativeOpValue: Float
    $financingRate: Float
    $tcFeeValue: Float
    $tcOpFeeValue: Float
    $claimIssueDate: String
    $penaltyInterestRate: Float
    $interestBasis: Float
    $whiteLabel: Boolean
    $repaymentProbability: Float
    $category: Int
    $status: String
  ) {
    updateClaim (
      id: $id
      startingPx: $startingPx
      rating: $rating
      notionalValue: $notionalValue
      derivativeFeeValue: $derivativeFeeValue
      auctionBuyNowPx: $auctionBuyNowPx
      dso: $dso
      derivativeOpValue: $derivativeOpValue
      financingRate: $financingRate
      tcFeeValue: $tcFeeValue
      tcOpFeeValue: $tcOpFeeValue
      claimIssueDate: $claimIssueDate
      penaltyInterestRate: $penaltyInterestRate
      interestBasis: $interestBasis
      whiteLabel: $whiteLabel
      repaymentProbability: $repaymentProbability
      category: $category
      status: $status
    ) {
      ...ClaimInfo
    }
  }
  ${claimFragment}
`

export const GENERATE_DUE_DILLIGENCE_REPORT_MUTATION = gql`
  mutation GenerateDueDilligence (
    $claimID: String!
    $listReviewedDocumentsScore: Int!
    $businessIndustrialFieldScore: Int!
    $companyActivityScore: Int!
    $taxClaimDueDiligenceScore: Int!
    $integrityAssesmentClaimModelScore: Int!
    $integrityAssessementClaimModelPreviousYearScore: Int!
    $taxDebtsChargesScore: Int!
    $conclusionsScore: Int!
    $listReviewedDocumentsComment: String!
    $businessIndustrialFieldComment: String!
    $companyActivityComment: String!
    $taxClaimDueDiligenceComment: String!
    $integrityAssesmentClaimModelComment: String!
    $integrityAssessementClaimModelPreviousYearComment: String!
    $taxDebtsChargesComment: String!
    $conclusionsComment: String!
  ) {
    generateDueDilligenceReport (
      claimID: $claimID
      listReviewedDocumentsScore: $listReviewedDocumentsScore
      businessIndustrialFieldScore: $businessIndustrialFieldScore
      companyActivityScore: $companyActivityScore
      taxClaimDueDiligenceScore: $taxClaimDueDiligenceScore
      integrityAssesmentClaimModelScore: $integrityAssesmentClaimModelScore
      integrityAssessementClaimModelPreviousYearScore: $integrityAssessementClaimModelPreviousYearScore
      taxDebtsChargesScore: $taxDebtsChargesScore
      conclusionsScore: $conclusionsScore
      listReviewedDocumentsComment: $listReviewedDocumentsComment
      businessIndustrialFieldComment: $businessIndustrialFieldComment
      companyActivityComment: $companyActivityComment
      taxClaimDueDiligenceComment: $taxClaimDueDiligenceComment
      integrityAssesmentClaimModelComment: $integrityAssesmentClaimModelComment
      integrityAssessementClaimModelPreviousYearComment: $integrityAssessementClaimModelPreviousYearComment
      taxDebtsChargesComment: $taxDebtsChargesComment
      conclusionsComment: $conclusionsComment
    )
  }
`

export const UPDATE_CLAIM_TAX_CASE = gql`
  mutation UpdateClaimTaxCase (
    $id: String!
    $taxCase: Int!
  ) {
    updateClaimTaxCase (
      id: $id
      taxCase: $taxCase
    ) {
      ...ClaimInfo
    }
  }
  ${claimFragment}
`

export const UPDATE_CLAIM_CONFORMITY_SCORE = gql`
  mutation UpdateClaimConformityScore (
    $id: String!
    $conformityScore: Int!
  ) {
    updateClaimConformityScore (
      id: $id
      conformityScore: $conformityScore
    ) {
      ...ClaimInfo
    }
  }
  ${claimFragment}
`

export const UPDATE_CLAIM_ISSUE_DATE = gql`
  mutation UpdateClaimIssueDate (
    $id: String!
    $claimIssueDate: String!
  ) {
    updateClaimIssueDate (
      id: $id
      claimIssueDate: $claimIssueDate
    ) {
      ...ClaimInfo
    }
  }
  ${claimFragment}
`

export const SUBMIT_FOR_APPROVAL = gql`
  mutation SubmitClaimPhaseOneForApproval (
    $id: String!
    $status: String
  ) {
    submitClaimPhaseOneForApproval (
      id: $id
      status: $status
    ) {
      ...ClaimInfo
    }
  }
  ${claimFragment}
`

export const APPROVE_CLAIM_AND_WORKFLOW_PHASES = gql`
  mutation ApproveClaimAndWorkflowPhases (
    $id: String!
  ) {
    approveClaimAndWorkflowPhases (
      id: $id
    ) {
      ...ClaimInfo
    }
  }
  ${claimFragment}
`

export const REJECT_CLAIM = gql`
  mutation RejectClaim (
    $id: String!
  ) {
    rejectClaim (
      id: $id
    ) {
      ...ClaimInfo
    }
  }
  ${claimFragment}
`

export const START_CLAIM_PARTICIPANT_WORKFLOW = gql`
  mutation StartWorkflowExecutionClaimParticipant (
    $memberId: String!
    $claimId: String!
  ) {
    startWorkflowExecutionClaimParticipant (
      memberId: $memberId
      claimId: $claimId
    )
  }
`
