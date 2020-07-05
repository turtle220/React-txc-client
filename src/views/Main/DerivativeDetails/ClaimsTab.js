import React from 'react'
import {
  Row,
  Card,
  CardBody,
  Table,
} from 'reactstrap'
import { useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'

import CustomCell from '@/components/CustomCell'
import { Colxx } from '@/components/CustomBootstrap'
import PageLoader from '@/components/PageLoader'

import IntlMessages from '@/utils/IntlMessages'

import { CLAIMS_QUERY } from '@/graphql/queries/claims'

const tableHeaders = [
  'id',
  'company-name',
  'date',
  'auction-buy-now-px',
]

const styles = {
  claimRow: { cursor: 'pointer' }
}

const ClaimsTab = () => {
  const history = useHistory()

  const handleRowClick = (id) => () => {
    history.push(`/app/claims/${id}`)
  }

  const { data: { claims = [] } = {}, loading } = useQuery(CLAIMS_QUERY)

  if (loading) {
    return <PageLoader />
  }

  return (
    <Row>
      <Colxx xxs="12" lg="12" className="mb-4">
        <Card className="mb-4">
          <CardBody>

            <Table hover>
              <thead>
                <tr>

                  {tableHeaders.map((item, index) => (
                    <th key={index} className="border-0">
                      <IntlMessages
                        id={`pages.derivatives.claims-table.${item}`}
                      />
                    </th>
                  ))}

                </tr>
              </thead>
              <tbody>

                {claims.map((claim) => (
                  <tr
                    key={claim.id}
                    style={styles.claimRow}
                    onClick={handleRowClick(claim.id)}
                  >
                    <td>
                      <CustomCell value={claim?.id} />
                    </td>
                    <td>
                      <CustomCell value={claim?.sellerMember?.companyName} />
                    </td>
                    <td>
                      <CustomCell value={claim?.claimIssueDate} />
                    </td>
                    <td>
                      <CustomCell value={claim?.auctionBuyNowPx} />
                    </td>
                  </tr>
                ))}

              </tbody>
            </Table>

          </CardBody>
        </Card>
      </Colxx>
    </Row>
  )
}

export default ClaimsTab
