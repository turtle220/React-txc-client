import React, { useState } from 'react'
import { CardTitle, Table } from 'reactstrap'
import { object } from 'prop-types'
import { useParams } from 'react-router-dom'
import { useLazyQuery, useApolloClient } from '@apollo/react-hooks'

import useToast from '@/hooks/useToast'

import IntlMessages from '@/utils/IntlMessages'

import { UPDATE_CERVED_SCORES_MUTATION } from '@/graphql/mutations/reports'
import { GET_CLAIM_DETAILS } from '@/graphql/queries/claims'

import RefreshCervedScores from './RefreshCervedScores'
import ScoreBar from './ScoreBar'

const cervedScores = [
  { label: 'CGS (1 to 10)', key: 'cgs' },
  { label: 'CEBIScore4 (1 to 10)', key: 'cebisScore' },
  { label: 'Enterprise Business Risk (1 to 3)', key: 'enterpriseBusinessRisk' },
  { label: 'Negative Events (1 to 7)', key: 'negativeEvents' },
  { label: 'Payline (1 to 6)', key: 'payline' },
  { label: 'Cerved Database Checks (1 to 6)', key: 'cervedDatabaseChecks' },
]

const CervedScores = ({ claim }) => {
  const showToast = useToast()
  const { claimId } = useParams()
  const [claimDetail, setClaimDetail] = useState(claim)

  const apolloClient = useApolloClient()

  const [
    getClaimDetails,
    { loading: loadingClaimDetails }
  ] = useLazyQuery(GET_CLAIM_DETAILS, {
    fetchPolicy: 'no-cache',
    onCompleted: ({ claim }) => {
      setClaimDetail(claim)
    },
    onError: () => {
      showToast('error', 'Update cerved scores error, try again.')
    }
  })

  const refreshScores = async () => {
    await apolloClient.mutate({
      mutation: UPDATE_CERVED_SCORES_MUTATION,
      variables: {
        memberVAT: claimDetail?.sellerMember.vatNumber,
        memberId: claimDetail?.sellerMember.id
      }
    })

    getClaimDetails({
      variables: {
        id: claimId
      }
    })
  }

  return (
    <>
      <CardTitle className="mb-5">
        <IntlMessages id="pages.claims.cerved-scores" />
      </CardTitle>

      <Table borderless>
        <tbody>
          {cervedScores?.map(({ label, key }) => (
            <tr key={key}>
              <td className="pt-0 pl-0">{label}</td>
              <td className="pt-0 pr-0 text-right">
                <ScoreBar slug={key} score={claimDetail?.sellerMember} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <RefreshCervedScores
        loading={loadingClaimDetails}
        refreshScores={refreshScores}
        lastRefresh={claimDetail?.sellerMember?.cervedLastUpdatedDate}
      />
    </>
  )
}

CervedScores.propTypes = {
  claim: object.isRequired
}

export default CervedScores
