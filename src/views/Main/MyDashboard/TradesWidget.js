import React from 'react'
import { Table, Card, CardBody, CardTitle } from 'reactstrap'
import { NavLink, useHistory } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { array } from 'prop-types'

import CustomCell from '@/components/CustomCell'
import { Separator } from '@/components/CustomBootstrap'
import { getHumanizedDateFormat } from '@/utils/date'
import IntlMessages from '@/utils/IntlMessages'
import { tableRow, widget } from './styles'

const TradesWidget = ({ trades }) => {
  const history = useHistory()

  const handleRowClick = (id) => () => {
    history.push(`/app/trades/${id}`)
  }

  return (
    <Card>
      <CardBody>
        <div className='d-flex flex-row justify-content-between mb-3'>
          <CardTitle className='mb-0'>
            <IntlMessages id='pages.dashboard.widget.trades' />
          </CardTitle>
          <NavLink to='/app/trades'>
            <IntlMessages id='pages.dashboard.widget.view-all' />
          </NavLink>
        </div>
        <Separator className='mb-4' />
        <PerfectScrollbar option={{ suppressScrollX: true }} style={widget}>
          <Table hover>
            <thead>
              <tr>
                <th className='border-0'>
                  <IntlMessages id='pages.dashboard.widget.trades.id' />
                </th>
                <th className='border-0'>
                  <IntlMessages id='pages.dashboard.widget.trades.company-name' />
                </th>
                <th className='border-0'>
                  <IntlMessages id='pages.dashboard.widget.trades.trade-date' />
                </th>
                <th className='border-0'>
                  <IntlMessages id='pages.dashboard.widget.trades.amount' />
                </th>
              </tr>
            </thead>
            <tbody>
              {trades.map((trade) => (
                <tr
                  key={trade?.id}
                  style={tableRow}
                  onClick={handleRowClick(trade?.id)}
                >
                  <td>
                    <CustomCell value={trade?.id} />
                  </td>
                  <td>
                    <CustomCell value={trade?.sellerMember?.companyName} />
                  </td>
                  <td>
                    <CustomCell
                      value={getHumanizedDateFormat(trade?.tradeDate)}
                    />
                  </td>
                  <td>
                    <CustomCell value={trade?.amount} />
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

TradesWidget.propTypes = {
  trades: array
}

export default TradesWidget
