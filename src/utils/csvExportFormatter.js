import replaceObjectNullProperties from '@/utils/replaceObjectNullProperties'
import { isEmpty } from '@/utils/isEmpty'

export const formatClaimsList = (list) => {
  if (list.length > 0) {
    return list.map((claim) => {
      const updatedClaim = { ...claim }
      if (claim.sellerMember) {
        updatedClaim.sellerMember = claim.sellerMember.companyName
      }
      return updatedClaim
    })
  }
  return []
}

export const formatCervedScores = (o) => {
  if (isEmpty(o)) {
    return []
  }


  const claim = replaceObjectNullProperties(o)

  const headers = [
    'Claim ID',
    'Seller ID',
    'CGS (1 to 10)',
    'CEBIScore4',
    'Enterprise Business Risk (1 to 3)',
    'Negative Events (1 to 7)',
    'Payline (1 to 6)',
    'Cerved Database Checks (1 to 6)',
    'Cerved Last Updated Date'
  ]

  const data = [
    claim.id,
    claim.sellerMember.id,
    claim.sellerMember.cgs,
    claim.sellerMember.cebisScore,
    claim.sellerMember.enterpriseBusinessRisk,
    claim.sellerMember.negativeEvents,
    claim.sellerMember.payline,
    claim.sellerMember.cervedDatabaseChecks,
    claim.sellerMember.cervedLastUpdatedDate
  ]
  return [headers, data]

}

export const formatDeloittePhase1 = (o) => {
  if (isEmpty(o)) {
    return []
  }
  const claim = replaceObjectNullProperties(o)
  const headers = [
    'Claim ID',
    'Seller ID',
    'Tax Case',
    'Conformity Score'
  ]

  const data = [
    claim.id,
    claim.sellerMember.id,
    claim.taxCase,
    claim.conformityScore
  ]
  return [headers, data]

}

export const formatDeloittePhase2 = (o) => {
  if (isEmpty(o)) {
    return []
  }
  const claim = replaceObjectNullProperties(o)
  const headers = [
    'Claim ID',
    'Seller ID',
    'List of reviewed documents',
    'Business and Industrial field',
    'Company Activity',
    'Tax Claim due diligence',
    'Integrity Assessment Claim Model',
    'Integrity Assessment Claim Model(Previous Year)',
    'Tax debts and charges',
    'Conclusions'
  ]

  const data = [
    claim.id,
    claim.sellerMember.id,
    claim.listReviewedDocumentsScore,
    claim.businessIndustrialFieldScore,
    claim.companyActivityScore,
    claim.taxClaimDueDiligenceScore,
    claim.integrityAssesmentClaimModelScore,
    claim.integrityAssessementClaimModelPreviousYearScore,
    claim.taxDebtsChargesScore,
    claim.conclusionsScore

  ]
  return [headers, data]
}
