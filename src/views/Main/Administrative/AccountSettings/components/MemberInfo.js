import React from 'react'
import { Row, Card, CardBody } from 'reactstrap'
import { object } from 'prop-types'

import { Colxx } from '@/components/CustomBootstrap'
import SectionTitle from '@/components/MemberDetails/Details/SectionTitle'
import SectionItem from '@/components/MemberDetails/Details/SectionItem'

// @TODO move this to the member detail folder
// we can also use the same query that is being used for the account settings
const MemberInfo = ({
  data
}) => {
  const {
    companyInformation,
    legalRepresentative,
    beneficialOwner,
    operativeInformation
  } = data
  let Type = companyInformation.memberType
  if (Type === 'BROKER') {
    Type = 'PARTNER'
  }
  return (
    <Row>
      <Colxx xxs='12' lg='12' className='mb-4'>
        <Card className='mb-4'>
          <CardBody>
            <SectionTitle label='company-information' />

            <Row>
              <Colxx xxs='12' lg='6'>
                <SectionItem
                  label='member-type'
                  value={Type}
                />
                <SectionItem
                  label='category-client'
                  value={companyInformation.categoryClient}
                />
                <SectionItem
                  label='registered-email-pec'
                  value={companyInformation.registeredEmail}
                />
                <SectionItem
                  label='official-address'
                  value={companyInformation.officialAddress}
                />
                <SectionItem label='street' value={companyInformation.street} />
                <SectionItem
                  label='zip-postal-code'
                  value={companyInformation.zipPostalCode}
                />
              </Colxx>

              <Colxx xxs='12' lg='6'>
                <SectionItem
                  label='country'
                  value={companyInformation.country}
                />
                <SectionItem
                  label='registered-number'
                  value={companyInformation.registeredNumber}
                />
                <SectionItem
                  label='company-name'
                  value={companyInformation.companyName}
                />
                <SectionItem
                  label='vat-number-tax-code'
                  value={companyInformation.vatNumberTaxCode}
                />
                <SectionItem
                  label='authority'
                  value={companyInformation.authority}
                />
              </Colxx>
            </Row>
          </CardBody>
        </Card>
      </Colxx>

      <Colxx xxs='12' lg='12' className='mb-4'>
        <Card className='mb-4'>
          <CardBody>
            <SectionTitle label='legal-representative' />

            <Row>
              <Colxx xxs='12' lg='6'>
                <SectionItem
                  label='company-information'
                  value={legalRepresentative.companyTitle}
                />
                <SectionItem
                  label='legal-representative-data'
                  value={legalRepresentative.legalRepresentativeData}
                />
                <SectionItem
                  label='first-name'
                  value={legalRepresentative.firstName}
                />
                <SectionItem
                  label='surname'
                  value={legalRepresentative.surname}
                />
                <SectionItem
                  label='mobile-phone'
                  value={legalRepresentative.mobilePhone}
                />
              </Colxx>

              <Colxx xxs='12' lg='6'>
                <SectionItem
                  label='landline'
                  value={legalRepresentative.landline}
                />
                <SectionItem label='email' value={legalRepresentative.email} />
                <SectionItem
                  label='company-function'
                  value={legalRepresentative.companyFunction}
                />
                <SectionItem
                  label='company-title'
                  value={legalRepresentative.companyTitle}
                />
              </Colxx>
            </Row>
          </CardBody>
        </Card>
      </Colxx>

      <Colxx xxs='12' lg='12' className='mb-4'>
        <Card className='mb-4'>
          <CardBody>
            <SectionTitle label='beneficial-owner' />

            <Row>
              <Colxx xxs='12' lg='6'>
                <SectionItem
                  label='beneficial-owner-data'
                  value={beneficialOwner.beneficialOwnerData}
                />
                <SectionItem
                  label='first-name'
                  value={beneficialOwner.firstName}
                />
                <SectionItem label='surname' value={beneficialOwner.surname} />
                <SectionItem
                  label='mobile-phone'
                  value={beneficialOwner.mobilePhone}
                />
              </Colxx>

              <Colxx xxs='12' lg='6'>
                <SectionItem
                  label='landline'
                  value={beneficialOwner.landline}
                />
                <SectionItem label='email' value={beneficialOwner.email} />
                <SectionItem
                  label='company-function'
                  value={beneficialOwner.companyFunction}
                />
                <SectionItem
                  label='company-title'
                  value={beneficialOwner.companyTitle}
                />
              </Colxx>
            </Row>
          </CardBody>
        </Card>
      </Colxx>

      <Colxx xxs='12' lg='12' className='mb-4'>
        <Card className='mb-4'>
          <CardBody>
            <SectionTitle label='operative-information' />

            <Row>
              <Colxx xxs='12' lg='6'>
                <SectionItem
                  label='first-name'
                  value={operativeInformation.firstName}
                />
                <SectionItem
                  label='surname'
                  value={operativeInformation.surname}
                />
                <SectionItem
                  label='mobile-phone'
                  value={operativeInformation.mobilePhone}
                />
                <SectionItem
                  label='landline'
                  value={operativeInformation.landline}
                />
              </Colxx>

              <Colxx xxs='12' lg='6'>
                <SectionItem label='email' value={operativeInformation.email} />
                <SectionItem
                  label='company-function'
                  value={operativeInformation.companyFunction}
                />
                <SectionItem
                  label='company-title'
                  value={operativeInformation.companyTitle}
                />
              </Colxx>
            </Row>
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  )
}

MemberInfo.propTypes = {
  data: object
}

export default MemberInfo
