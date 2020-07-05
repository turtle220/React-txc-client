import React from 'react'
import {
  Table,
  Card,
  CardBody,
  CardTitle
} from 'reactstrap'
import {
  NavLink,
  useHistory
} from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { array } from 'prop-types'

import CustomCell from '@/components/CustomCell'
import { Separator } from '@/components/CustomBootstrap'
import IntlMessages from '@/utils/IntlMessages'
import { tableRow, widget } from './styles'
import { getEuroCurrencyDisplayFormat } from '@/utils/currency'

const ClaimsWidget = ({ claims }) => {
  const history = useHistory()

  const handleRowClick = (id) => () => {
    history.push(`/app/claims/${id}`)
  }

  return (
    <Card>
      <CardBody>
        <div className="d-flex flex-row justify-content-between mb-3">
          <CardTitle className="mb-0">
            <IntlMessages id="pages.dashboard.widget.claims" />
          </CardTitle>
          <NavLink to="/app/claims">
            <IntlMessages id="pages.dashboard.widget.view-all" />
          </NavLink>
        </div>
        <Separator className="mb-4" />
        <PerfectScrollbar
          option={{ suppressScrollX: true }}
          style={widget}
        >
          <Table hover>
            <thead>
              <tr>
                <th className="border-0">
                  <IntlMessages id="pages.dashboard.widget.claims.id" />
                </th>
                <th className="border-0">
                  <IntlMessages id="pages.dashboard.widget.claims.company-name" />
                </th>
                <th className="border-0">
                  <IntlMessages id="pages.dashboard.widget.claims.rating" />
                </th>
                <th className="border-0">
                  <IntlMessages id="pages.dashboard.widget.claims.auction-buy-now-px" />
                </th>
                <th className="border-0">
                  <IntlMessages id="pages.dashboard.widget.claims.notional" />
                </th>
              </tr>
            </thead>
            <tbody>

              {claims.map((claim) => (
                <tr
                  key={claim?.id}
                  style={tableRow}
                  onClick={handleRowClick(claim?.id)}
                >
                  <td>
                    <CustomCell value={claim?.id} />
                  </td>
                  <td>
                    <CustomCell value={claim?.sellerMember?.companyName} />
                  </td>
                  <td>
                    <CustomCell value={claim?.rating} />
                  </td>
                  <td>
                    <CustomCell value={claim?.auctionBuyNowPx} />
                  </td>
                  <td>
                    <CustomCell value={getEuroCurrencyDisplayFormat(claim?.notionalValue)} />
                  </td>
                </tr>
              ))}

            </tbody>
          </Table>
        </PerfectScrollbar>
      </CardBody>
    </Card>
  )
}

ClaimsWidget.propTypes = {
  claims: array
}

export default ClaimsWidget
