import React, { useState, useEffect } from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import {
  Row,
  Card,
  CardBody,
  Badge,
} from 'reactstrap'
import { useLocation, useHistory } from 'react-router-dom'
import qs from 'query-string'

import { ROLE } from '@/constants/roles'
import { MEMBER_STATUS } from '@/constants/member-status'

import { Colxx, Separator } from '@/components/CustomBootstrap'
import Loader from '@/components/Loader'
import Wizard from '@/components/Wizard'

import IntlMessages from '@/utils/IntlMessages'

import { MEMBER_QUERY } from '@/graphql/queries/members'

import CompanyInformation from './CompanyInformation'
import LegalRepresentative from './LegalRepresentative'
import BeneficialOwner from './BeneficialOwner'
import OperativeInformation from './OperativeInformation'
import formatMember from './formatMember'
import initialFormValues from './initialFormValues'
import fakeFormValues from './fakeFormValues'

import { CREATE_MEMBERSHIP_AGREEMENT } from './graphql/mutations'

const MEMBER_STATUS_BADGE_PROPS = {
  [MEMBER_STATUS.PENDING]: {
    color: 'secondary',
    text: 'waiting-for-approval'
  },
  [MEMBER_STATUS.APPROVED]: {
    color: 'primary',
    text: 'approved'
  },
  [MEMBER_STATUS.REJECTED]: {
    color: 'danger',
    text: 'rejected'
  }
}

const StatusBadge = ({ status = MEMBER_STATUS.PENDING }) => {
  const { color, text } = MEMBER_STATUS_BADGE_PROPS[status]

  return (
    <Badge
      style={{ paddingBottom: '0.5em' }}
      color={color}
      pill
    >
      <IntlMessages
        id={`pages.member-agreement.${text}`}
      />
    </Badge>
  )
}

const MemberAgreement = () => {
  const [loading, setLoading] = useState(false)
  const [member, setMember] = useState({})
  const [formValues, setInitialValues] = useState(initialFormValues)
  const apolloClient = useApolloClient()
  const location = useLocation()
  const history = useHistory()
  const [fixedMemberTypeValue, setFixedMemberTypeValue] = useState(null)

  const { from, seller_id } = qs.parse(location.search)

  const fetchMember = async () => {
    const isNewSellerCreatedFromBroker = from === 'partner' && !seller_id
    if (isNewSellerCreatedFromBroker) return

    setLoading(true)

    const { data: { member = {} } = {} } = await apolloClient.query({
      query: MEMBER_QUERY,
      variables: {
        memberId: seller_id
      }
    })

    setLoading(false)
    setMember(member)
    setFixedMemberTypeValue(member.type)
    setInitialValues(formatMember.separate(member))
  }

  useEffect(() => {
    fetchMember()

    if (from === 'partner') {
      setFixedMemberTypeValue(ROLE.MEMBER_SELLER)
    }
  }, [])

  const updateFormValues = (values, key) => {
    setInitialValues({
      ...formValues,
      [key]: {
        ...formValues[key],
        ...values
      }
    })
  }

  const markFormConcluded = () => {
    setInitialValues({
      ...formValues,
      registerConcluded: true,
      memberFormValues: MEMBER_STATUS.PENDING
    })
  }

  const [updateMember] = useMutation(CREATE_MEMBERSHIP_AGREEMENT, {
    onCompleted: ({ createMembershipAgreement: member }) => {
      if (from === 'partner') {
        history.replace(`/app/membership-agreement?from=partner&seller_id=${member.id}`)
      }
    }
  })

  const updateFieldValue = (value, target) => async () => {
    if (!value) {
      return
    }

    await updateMember({
      variables: {
        [target]: value,
        type: fixedMemberTypeValue,
        memberId: member.id || seller_id
      }
    })
  }

  // Test development purposes
  const populateStep = (step) => async () => {
    const variables = formatMember.join({
      ...formValues,
      [step]: fakeFormValues[step],
    })

    const formatStepsDocuments = (formValues) => {
      const { documents } = formValues

      const formatedDocuments = Object.keys(documents).reduce((prev, curr) => (
        documents[curr]
          ? ({
            ...prev,
            [curr]: {
              name: 'txc-test.pdf',
              originalName: 'txc-test.pdf',
              docType: 'application/pdf'
            }
          })
          : prev
      ), {})

      return {
        ...formValues,
        documents: formatedDocuments
      }
    }

    const formatedStepsDocuments = formatStepsDocuments(fakeFormValues[step])

    updateFormValues(formatedStepsDocuments, step)

    Object.keys(variables).forEach(
      (key) => (typeof variables[key] === 'object' && !variables[key].url) && delete variables[key]
    )

    await updateMember({
      variables: {
        ...variables,
        type: fixedMemberTypeValue,
        memberId: member.id || seller_id
      }
    })
  }

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="d-flex flex-row justify-content-between">
            <h1>
              <IntlMessages id="menu.membership-agreement" />
            </h1>
            {formValues.registerConcluded && (
              <p className="mt-2">
                <StatusBadge status={formValues.status} />
              </p>
            )}
          </div>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <Card>
            <CardBody>
              {loading ? (
                <div className="m-5">
                  <Loader color="#333" />
                </div>
              ) : (
                <Wizard
                  stepsTitle={[
                    'Company Information',
                    'Legal Representative',
                    'Beneficial Owner',
                    'Operative Information'
                  ]}
                >
                  <CompanyInformation
                    initialFormValues={formValues.companyInformation}
                    updateFormValues={updateFormValues}
                    registerConcluded={formValues.registerConcluded}
                    updateFieldValue={updateFieldValue}
                    populateStep={populateStep}
                    memberTypeValue={fixedMemberTypeValue}
                  />

                  <LegalRepresentative
                    initialFormValues={formValues.legalRepresentative}
                    registerConcluded={formValues.registerConcluded}
                    updateFormValues={updateFormValues}
                    updateFieldValue={updateFieldValue}
                    populateStep={populateStep}
                  />

                  <BeneficialOwner
                    initialFormValues={formValues.beneficialOwner}
                    registerConcluded={formValues.registerConcluded}
                    updateFormValues={updateFormValues}
                    updateFieldValue={updateFieldValue}
                    populateStep={populateStep}
                  />

                  <OperativeInformation
                    initialFormValues={formValues.operativeInformation}
                    updateFormValues={updateFormValues}
                    markFormConcluded={markFormConcluded}
                    registerConcluded={formValues.registerConcluded}
                    formValues={formValues}
                    updateFieldValue={updateFieldValue}
                    populateStep={populateStep}
                    memberId={member.id || seller_id}
                  />
                </Wizard>
              )}
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  )
}

export default MemberAgreement
