import React from 'react'
import { string, object } from 'prop-types'
import { Table } from 'reactstrap'

import {
  WidgetBox,
  Divider,
  ChartContainer,
  InfoContainer,
} from './styles'
import IntlMessages from '@/utils/IntlMessages'
import { PolarAreaChart } from '@/components/Charts'
import { polarAreaChartData } from './data'

const TrItem = ({ label, value }) => (
  <tr>
    <td>
      <IntlMessages id={`pages.wallet.chart.${label}`} />
    </td>
    <td className="text-right align-middle">
      <b>{value}</b>
    </td>
  </tr>
)

TrItem.propTypes = {
  label: string,
  value: string,
}

const WalletChart = ({ data }) => (
  <WidgetBox>

    <InfoContainer>
      <Table borderless>
        <tbody>
          <TrItem
            label="balance"
            value={data.balance}
          />
          <TrItem
            label="transactions"
            value={data.transactions}
          />
          <TrItem
            label="last-transactions-date"
            value={data.lastTransactionsDate}
          />
          <TrItem
            label="amount-transactions"
            value={data.amountTransactions}
          />
        </tbody>
      </Table>
    </InfoContainer>

    <Divider />

    <ChartContainer>
      <PolarAreaChart shadow data={polarAreaChartData} />
    </ChartContainer>

  </WidgetBox>
)

WalletChart.propTypes = {
  data: object,
}

export default WalletChart
