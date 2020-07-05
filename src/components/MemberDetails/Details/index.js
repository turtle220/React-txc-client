import React from 'react'
import { object } from 'prop-types'
import {
  Row,
  Card,
  CardBody,
} from 'reactstrap'

import { Colxx } from '@/components/CustomBootstrap'

import { ROLE_DESCRIPTION } from '@/constants/roles'

import SectionTitle from './SectionTitle'
import SectionItem from './SectionItem'

const Details = ({ member }) => (
  <Row>
    <Colxx xxs="12" lg="12" className="mb-4">
      <Card className="mb-4">
        <CardBody>
          <SectionTitle label="company-information" />
          <Row>
            <Colxx xxs="12" lg="6">
              <SectionItem
                label="member-type"
                value={ROLE_DESCRIPTION[member.type]}
              />
              <SectionItem
                label="category-client"
                value={member.categoryClient}
              />
              <SectionItem
                label="registered-email-pec"
                value={member.registeredEmailPec}
              />
              <SectionItem
                label="official-address"
                value={member.officialAddress}
              />
              <SectionItem
                label="street"
                value={member.street}
              />
              <SectionItem
                label="zip-postal-code"
                value={member.zipCode}
              />
            </Colxx>

            <Colxx xxs="12" lg="6">
              <SectionItem
                label="country"
                value={member.country}
              />
              <SectionItem
                label="registered-number"
                value={member.registeredNumber}
              />
              <SectionItem
                label="company-name"
                value={member.companyName}
              />
              <SectionItem
                label="vat-number-tax-code"
                value={member.vatNumber}
              />
              <SectionItem
                label="authority"
              />
            </Colxx>
          </Row>
        </CardBody>
      </Card>
    </Colxx>

    <Colxx xxs="12" lg="12" className="mb-4">
      <Card className="mb-4">
        <CardBody>
          <SectionTitle label="legal-representative" />
          <Row>
            <Colxx xxs="12" lg="6">
              {/* <SectionItem
                label="company-information"
                value={legalRepresentative.companyInformation}
              />
              <SectionItem
                label="legal-representative-data"
                value={legalRepresentative.legalRepresentativeData}
              /> */}
              <SectionItem
                label="first-name"
                value={member.legalRepresentativeFirstName}
              />
              <SectionItem
                label="surname"
                value={member.legalRepresentativeSurname}
              />
              <SectionItem
                label="mobile-phone"
                value={member.legalRepresentativePhoneMobile}
              />
              <SectionItem
                label="landline"
                value={member.legalRepresentativePhoneLandline}
              />
            </Colxx>

            <Colxx xxs="12" lg="6">
              <SectionItem
                label="email"
                value={member.legalRepresentativeEmail}
              />
              <SectionItem
                label="company-function"
                value={member.legalRepresentativeCompanyFunction}
              />
              <SectionItem
                label="company-title"
                value={member.legalRepresentativeCompanyTitle}
              />
            </Colxx>
          </Row>
        </CardBody>
      </Card>
    </Colxx>
    <Colxx xxs="12" lg="12" className="mb-4">
      <Card className="mb-4">
        <CardBody>
          <SectionTitle label="beneficial-owner" />
          <Row>
            <Colxx xxs="12" lg="6">
              <SectionItem
                label="first-name"
                value={member.beneficialOwnerFirstName}
              />
              <SectionItem
                label="surname"
                value={member.beneficialOwnerSurname}
              />
              <SectionItem
                label="mobile-phone"
                value={member.beneficialOwnerPhoneMobile}
              />
              <SectionItem
                label="landline"
                value={member.beneficialOwnerPhoneLandline}
              />
            </Colxx>

            <Colxx xxs="12" lg="6">
              <SectionItem
                label="email"
                value={member.beneficialOwnerEmail}
              />
              <SectionItem
                label="company-function"
                value={member.beneficialOwnerCompanyFunction}
              />
              <SectionItem
                label="company-title"
                value={member.beneficialOwnerCompanyTitle}
              />
            </Colxx>
          </Row>
        </CardBody>
      </Card>
    </Colxx>

    <Colxx xxs="12" lg="12" className="mb-4">
      <Card className="mb-4">
        <CardBody>
          <SectionTitle label="operative-information" />
          <Row>
            <Colxx xxs="12" lg="6">
              <SectionItem
                label="first-name"
                value={member.operativeInfoFirstName}
              />
              <SectionItem
                label="surname"
                value={member.operativeInfoSurname}
              />
              <SectionItem
                label="mobile-phone"
                value={member.operativeInfoPhoneMobile}
              />
              <SectionItem
                label="landline"
                value={member.operativeInfoPhoneLandline}
              />
            </Colxx>

            <Colxx xxs="12" lg="6">
              <SectionItem
                label="email"
                value={member.operativeInfoEmail}
              />
              <SectionItem
                label="company-function"
                value={member.operativeInfoCompanyFunction}
              />
              <SectionItem
                label="company-title"
                value={member.operativeInfoCompanyTitle}
              />
            </Colxx>
          </Row>
        </CardBody>
      </Card>
    </Colxx>
  </Row>
)

Details.propTypes = {
  member: object
}

export default Details
