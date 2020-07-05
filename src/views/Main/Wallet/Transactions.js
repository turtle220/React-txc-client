import React, { useEffect, useState } from 'react'
import { string } from 'prop-types'
import { Table } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import { useApolloClient } from '@apollo/react-hooks'

import CustomCell from '@/components/CustomCell'
import IsLoading from '@/components/IsLoading'

import IntlMessages from '@/utils/IntlMessages'
import { getHumanizedDateFormat } from '@/utils/date'
import { getEuroCurrencyDisplayFormat } from '@/utils/currency'

import { TRADES_QUERY } from '@/graphql/queries/wallets'

const ThItem = ({ label }) => (
  <th className="border-0">
    <IntlMessages id={`pages.wallet.table.${label}`} />
  </th>
)

ThItem.propTypes = {
  label: string
}

const styles = {
  tradeRow: { cursor: 'pointer' }
}

const Transactions = ({ sellerMemberId }) => {
  const [trades, setTrades] = useState([])
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const client = useApolloClient()

  const handleRowClick = (id) => () => {
    history.push(`/app/trades/${id}`)
  }

  const fetchTrades = async ({ sellerMemberId }) => {
    setLoading(true)

    const { data: { trades } } = await client.query({
      query: TRADES_QUERY,
      variables: {
        sellerMemberId
      }
    })

    setTrades(trades)
    setLoading(false)
  }

  useEffect(() => {
    fetchTrades({ sellerMemberId })
  }, [sellerMemberId])

  return (
    <IsLoading loading={loading}>
      <Table hover>
        <thead>
          <tr>
            <ThItem label="id" />
            <ThItem label="trade-date" />
            <ThItem label="amount" />
            <ThItem label="status" />
            <ThItem label="client" />
            <ThItem label="type-of-transaction" />
          </tr>
        </thead>
        <tbody>
          {trades.map((item) => (
            <tr
              key={item.id}
              style={styles.tradeRow}
              onClick={handleRowClick(item.id)}
            >
              <td>
                <CustomCell value={item.id} />
              </td>
              <td>
                <CustomCell value={getHumanizedDateFormat(item.tradeDate)} />
              </td>
              <td>
                <CustomCell value={getEuroCurrencyDisplayFormat(item.amount, 2)} />
              </td>
              <td>
                <CustomCell value={item.status} />
              </td>
              <td>
                <CustomCell value={item.client} />
              </td>
              <td>
                <CustomCell value={item.type} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </IsLoading>
  )
}

export default Transactions
