const initialFormValues = {
  companyInformation: {
    memberType: '',
    categoryClient: '',
    registeredEmail: '',
    officialAddress: '',
    street: '',
    postalCode: '',
    country: '',
    registeredNumber: '',
    companyName: '',
    vatNumber: '',
    authority: '',
    documents: {
      companyRegistrationReport: '',
      groupChart: '',
      beneficialOwner: '',
      lastFinancialStatement: '',
      statute: ''
    }
  },
  legalRepresentative: {
    companyInformation: '',
    firstName: '',
    surname: '',
    mobilePhone: '',
    landline: '',
    email: '',
    companyFunction: '',
    companyTitle: '',
    documents: {
      legalRepresentativeIdCard: '',
      legalRepresentativeFiscalCode: '',
      legalRepresentativePrivacy: ''
    }
  },
  beneficialOwner: {
    firstName: '',
    surname: '',
    mobilePhone: '',
    landline: '',
    email: '',
    companyFunction: '',
    companyTitle: '',
    documents: {
      beneficialOwnerIdCard: '',
      beneficialOwnerFiscalCode: '',
      beneficialOwnerPrivacy: ''
    }
  },
  operativeInformation: {
    firstName: '',
    surname: '',
    mobilePhone: '',
    landline: '',
    email: '',
    companyFunction: '',
    companyTitle: '',
    documents: {
      operativeInfoIdCard: '',
      operativeInfoFiscalCode: '',
      operativeInfoPoa: '',
      operativeInfoPrivacy: ''
    }
  }
}

export default initialFormValues
