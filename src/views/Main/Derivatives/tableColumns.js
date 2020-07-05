/* eslint-disable radix */
/* eslint-disable react/prop-types */
import React from 'react'
import { format } from 'date-fns'

import IntlMessages from '@/utils/IntlMessages'
import { numberFormat } from '@/utils/number'
import CustomCell from '@/components/CustomCell'

const columStyle = {
  paddingTop: '10px'
}

const renderLabel = (label) => (
  <IntlMessages id={`pages.derivatives.table.${label}`} />
)

const tableColumns = [
  {
    Header: 'Id',
    accessor: 'id',
    Cell: ({ value }) => <CustomCell value={parseInt(value)} />,
    maxWidth: 80,
    style: columStyle
  },
  {
    Header: renderLabel('maturityDate'),
    accessor: 'maturityDate',
    minWidth: 100,
    Cell: ({ value }) => <CustomCell value={format(new Date(value), 'MM/dd/yyyy')} />,
    style: columStyle
  },
  {
    Header: renderLabel('amount'),
    accessor: 'tradeNotionalAmount',
    minWidth: 100,
    Cell: ({ value }) => <CustomCell value={numberFormat(value, '0,0')} />,
    style: columStyle
  },
  {
    Header: renderLabel('composition'),
    accessor: 'basketComposition',
    minWidth: 200,
    Cell: ({ value }) => <CustomCell value={`Claims ID ${value.join(',')}`} />,
    style: columStyle
  }
]

export default tableColumns
