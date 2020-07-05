const pdfDefault = {
  name: 'txc-test.pdf',
  originalName: 'txc-test.pdf',
  docType: 'application/pdf'
}

const fakeFormValues = {
  companyInformation: {
    categoryClient: 'BANK',
    registeredEmail: 'email@txc.com',
    officialAddress: 'lorem ipsum',
    street: 'lorem ipsum',
    postalCode: '12321-3132',
    country: 'lorem ipsum',
    registeredNumber: '231233',
    companyName: 'lorem ipsum',
    vatNumber: '11957540153',
    authority: 'lorem ipsum',
    documents: {
      companyRegistrationReport: pdfDefault,
      groupChart: pdfDefault,
      lastFinancialStatement: pdfDefault,
      statute: pdfDefault
    }
  },
  legalRepresentative: {
    companyInformation: 'lorem ipsum',
    firstName: 'lorem ipsum',
    surname: 'lorem ipsum',
    mobilePhone: '(127) 363-2163',
    landline: '2131233233',
    email: 'email@txc.com',
    companyFunction: 'lorem ipsum',
    companyTitle: 'lorem ipsum',
    documents: {
      legalRepresentativeIdCard: pdfDefault,
      legalRepresentativeFiscalCode: pdfDefault,
      legalRepresentativePrivacy: pdfDefault
    }
  },
  beneficialOwner: {
    firstName: 'lorem ipsum',
    surname: 'lorem ipsum',
    mobilePhone: '(127) 363-2163',
    landline: '2131233233',
    email: 'email@txc.com',
    companyFunction: 'lorem ipsum',
    companyTitle: 'lorem ipsum',
    documents: {
      beneficialOwnerIdCard: pdfDefault,
      beneficialOwnerFiscalCode: pdfDefault,
      beneficialOwnerPrivacy: pdfDefault
    }
  },
  operativeInformation: {
    firstName: 'lorem ipsum',
    surname: 'lorem ipsum',
    mobilePhone: '(127) 363-2163',
    landline: '2131233233',
    companyFunction: 'lorem ipsum',
    companyTitle: 'lorem ipsum',
    documents: {
      operativeInfoIdCard: pdfDefault,
      operativeInfoPoa: pdfDefault,
      operativeInfoFiscalCode: pdfDefault,
      operativeInfoPrivacy: pdfDefault
    }
  }
}

export default fakeFormValues
