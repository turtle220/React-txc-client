/* eslint-disable react/prop-types */
import React from 'react'

import CustomCell from '@/components/CustomCell'

import IntlMessages from '@/utils/IntlMessages'
import { getHumanizedDateFormat } from '@/utils/date'
import { getEuroCurrencyDisplayFormat } from '@/utils/currency'

const columStyle = {
  paddingTop: '10px'
}

const renderLabel = (label) => (
  <IntlMessages id={`pages.trades.table.${label}`} />
)

const tableColumns = [
  {
    Header: renderLabel('id'),
    accessor: 'id',
    maxWidth: 80,
    // eslint-disable-next-line radix
    Cell: ({ value }) => <CustomCell value={parseInt(value)} />,
    style: columStyle
  },
  {
    Header: renderLabel('name'),
    accessor: 'name',
    minWidth: 200,
    Cell: ({ value }) => <CustomCell value={value || 'Trade Order'} />,
    style: columStyle
  },
  {
    Header: renderLabel('date'),
    accessor: 'tradeDate',
    minWidth: 100,
    Cell: ({ value }) => <CustomCell value={getHumanizedDateFormat(value)} />,
    style: columStyle
  },
  {
    Header: renderLabel('amount'),
    accessor: 'amount',
    minWidth: 100,
    Cell: ({ value }) => <CustomCell value={getEuroCurrencyDisplayFormat(value, 2)} />,
    style: columStyle
  },
  {
    Header: renderLabel('price'),
    accessor: 'px',
    minWidth: 100,
    Cell: ({ value }) => <CustomCell value={getEuroCurrencyDisplayFormat(value, 2)} />,
    style: columStyle
  }
]

export default tableColumns
