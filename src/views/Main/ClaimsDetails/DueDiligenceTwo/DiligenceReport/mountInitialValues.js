import replaceObjectNullProperties from '@/utils/replaceObjectNullProperties'

const mountInitialValues = (values) => {
  const {
    listReviewedDocumentsScore,
    businessIndustrialFieldScore,
    companyActivityScore,
    taxClaimDueDiligenceScore,
    integrityAssesmentClaimModelScore,
    integrityAssessementClaimModelPreviousYearScore,
    taxDebtsChargesScore,
    conclusionsScore,
    listReviewedDocumentsComment,
    businessIndustrialFieldComment,
    companyActivityComment,
    taxClaimDueDiligenceComment,
    integrityAssesmentClaimModelComment,
    integrityAssessementClaimModelPreviousYearComment,
    taxDebtsChargesComment,
    conclusionsComment
  } = values

  const initialValues = {
    listReviewedDocumentsScore,
    businessIndustrialFieldScore,
    companyActivityScore,
    taxClaimDueDiligenceScore,
    integrityAssesmentClaimModelScore,
    integrityAssessementClaimModelPreviousYearScore,
    taxDebtsChargesScore,
    conclusionsScore,
    listReviewedDocumentsComment,
    businessIndustrialFieldComment,
    companyActivityComment,
    taxClaimDueDiligenceComment,
    integrityAssesmentClaimModelComment,
    integrityAssessementClaimModelPreviousYearComment,
    taxDebtsChargesComment,
    conclusionsComment
  }

  return replaceObjectNullProperties(initialValues)
}

export default mountInitialValues
