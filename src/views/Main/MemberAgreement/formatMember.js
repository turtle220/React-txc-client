
const MEMBER_DOCUMENT = {
  name: '',
  originalName: '',
  docType: ''
}

const getDocumentFormat = (document) => document ? ({
  name: document.name,
  originalName: document.originalName,
  docType: document.docType
}) : MEMBER_DOCUMENT

const formatMember = {
  join: (data) => ({
    type: data?.companyInformation?.type || '',
    categoryClient: data?.companyInformation?.categoryClient || '',
    registeredEmailPec: data?.companyInformation?.registeredEmail || '',
    officialAddress: data?.companyInformation?.officialAddress || '',
    street: data?.companyInformation?.street || '',
    zipCode: data?.companyInformation?.postalCode || '',
    country: data?.companyInformation?.country || '',
    registeredNumber: data?.companyInformation?.registeredNumber || '',
    companyName: data?.companyInformation?.companyName || '',
    vatNumber: data?.companyInformation?.vatNumber || '',
    authority: data?.companyInformation?.authority || '',
    groupChart: getDocumentFormat(data?.companyInformation?.documents?.groupChart),
    companyRegistrationReport: getDocumentFormat(
      data?.companyInformation?.documents?.companyRegistrationReport
    ),
    statute: getDocumentFormat(data?.companyInformation?.documents?.statute),
    lastFinancialStatement: getDocumentFormat(
      data?.companyInformation?.documents?.lastFinancialStatement
    ),
    legalRepresentativeFirstName: data?.legalRepresentative?.firstName || '',
    legalRepresentativeSurname: data?.legalRepresentative?.surname || '',
    legalRepresentativePhoneMobile: data?.legalRepresentative?.mobilePhone || '',
    legalRepresentativePhoneLandline: data?.legalRepresentative?.landline || '',
    legalRepresentativeEmail: data?.legalRepresentative?.email || '',
    legalRepresentativeCompanyFunction: data?.legalRepresentative?.companyFunction || '',
    legalRepresentativeCompanyTitle: data?.legalRepresentative?.companyTitle || '',
    legalRepresentativePrivacy: getDocumentFormat(
      data?.legalRepresentative?.documents?.legalRepresentativePrivacy
    ),
    legalRepresentativeIdCard: getDocumentFormat(
      data?.legalRepresentative?.documents?.legalRepresentativeIdCard
    ),
    legalRepresentativeFiscalCode: getDocumentFormat(
      data?.legalRepresentative?.documents?.legalRepresentativeFiscalCode
    ),
    beneficialOwnerFirstName: data?.beneficialOwner?.firstName || '',
    beneficialOwnerSurname: data?.beneficialOwner?.surname || '',
    beneficialOwnerPhoneMobile: data?.beneficialOwner?.mobilePhone || '',
    beneficialOwnerPhoneLandline: data?.beneficialOwner?.landline || '',
    beneficialOwnerEmail: data?.beneficialOwner?.email || '',
    beneficialOwnerCompanyFunction: data?.beneficialOwner?.companyFunction || '',
    beneficialOwnerCompanyTitle: data?.beneficialOwner?.companyTitle || '',
    beneficialOwnerPrivacy: getDocumentFormat(
      data?.beneficialOwner?.documents?.beneficialOwnerPrivacy
    ),
    beneficialOwnerIdCard: getDocumentFormat(
      data?.beneficialOwner?.documents?.beneficialOwnerIdCard
    ),
    beneficialOwnerFiscalCode: getDocumentFormat(
      data?.beneficialOwner?.documents?.beneficialOwnerFiscalCode
    ),
    operativeInfoFirstName: data?.operativeInformation?.firstName || '',
    operativeInfoSurname: data?.operativeInformation?.surname || '',
    operativeInfoPhoneMobile: data?.operativeInformation?.mobilePhone || '',
    operativeInfoPhoneLandline: data?.operativeInformation?.landline || '',
    operativeInfoEmail: data?.operativeInformation?.email || '',
    operativeInfoCompanyFunction: data?.operativeInformation?.companyFunction || '',
    operativeInfoCompanyTitle: data?.operativeInformation?.companyTitle || '',
    operativeInfoPoa: getDocumentFormat(data?.operativeInformation?.documents?.operativeInfoPoa),
    operativeInfoIdCard: getDocumentFormat(
      data?.operativeInformation?.documents?.operativeInfoIdCard
    ),
    operativeInfoFiscalCode: getDocumentFormat(
      data?.operativeInformation?.documents?.operativeInfoFiscalCode
    ),
    operativeInfoPrivacy: getDocumentFormat(
      data?.operativeInformation?.documents?.operativeInfoPrivacy
    ),
    registerConcluded: data?.registerConcluded || false
  }),
  separate: (data) => ({
    companyInformation: {
      type: data?.type || '',
      categoryClient: data?.categoryClient || '',
      registeredEmail: data?.registeredEmailPec || '',
      officialAddress: data?.officialAddress || '',
      street: data?.street || '',
      postalCode: data?.zipCode || '',
      country: data?.country || '',
      registeredNumber: data?.registeredNumber || '',
      companyName: data?.companyName || '',
      vatNumber: data?.vatNumber || '',
      authority: data?.authority || '',
      documents: {
        groupChart: data?.groupChart || '',
        companyRegistrationReport: data?.companyRegistrationReport || '',
        statute: data?.statute || '',
        lastFinancialStatement: data?.lastFinancialStatement || '',
      }
    },
    legalRepresentative: {
      firstName: data?.legalRepresentativeFirstName || '',
      surname: data?.legalRepresentativeSurname || '',
      mobilePhone: data?.legalRepresentativePhoneMobile || '',
      landline: data?.legalRepresentativePhoneLandline || '',
      email: data?.legalRepresentativeEmail || '',
      companyFunction: data?.legalRepresentativeCompanyFunction || '',
      companyTitle: data?.legalRepresentativeCompanyTitle || '',
      documents: {
        legalRepresentativePrivacy: data?.legalRepresentativePrivacy || '',
        legalRepresentativeIdCard: data?.legalRepresentativeIdCard || '',
        legalRepresentativeFiscalCode: data?.legalRepresentativeFiscalCode || '',
      }
    },
    beneficialOwner: {
      firstName: data?.beneficialOwnerFirstName || '',
      surname: data?.beneficialOwnerSurname || '',
      mobilePhone: data?.beneficialOwnerPhoneMobile || '',
      landline: data?.beneficialOwnerPhoneLandline || '',
      email: data?.beneficialOwnerEmail || '',
      companyFunction: data?.beneficialOwnerCompanyFunction || '',
      companyTitle: data?.beneficialOwnerCompanyTitle || '',
      documents: {
        beneficialOwnerPrivacy: data?.beneficialOwnerPrivacy || '',
        beneficialOwnerIdCard: data?.beneficialOwnerIdCard || '',
        beneficialOwnerFiscalCode: data?.beneficialOwnerFiscalCode || '',
      }
    },
    operativeInformation: {
      firstName: data?.operativeInfoFirstName || '',
      surname: data?.operativeInfoSurname || '',
      mobilePhone: data?.operativeInfoPhoneMobile || '',
      landline: data?.operativeInfoPhoneLandline || '',
      email: data?.operativeInfoEmail || '',
      companyFunction: data?.operativeInfoCompanyFunction || '',
      companyTitle: data?.operativeInfoCompanyTitle || '',
      documents: {
        operativeInfoPoa: data?.operativeInfoPoa || '',
        operativeInfoIdCard: data?.operativeInfoIdCard || '',
        operativeInfoFiscalCode: data?.operativeInfoFiscalCode || '',
        operativeInfoPrivacy: data?.operativeInfoPrivacy || ''
      }
    },
    registerApproved: data?.registerApproved || false,
    registerConcluded: data?.registerConcluded || false,
    status: data.status
  })
}

export default formatMember
