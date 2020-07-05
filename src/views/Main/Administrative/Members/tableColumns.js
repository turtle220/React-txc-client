/* eslint-disable react/prop-types */
import React from 'react'

import IntlMessages from '@/utils/IntlMessages'

import CustomCell from '@/components/CustomCell'
import StatusCell from '@/components/StatusCell'

import { ROLE_DESCRIPTION } from '@/constants/roles'

const columStyle = {
  paddingTop: '10px'
}

const renderLabel = (label) => (
  <IntlMessages id={`pages.members.table.${label}`} />
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
    accessor: 'operativeInfoFullName',
    maxWidth: 320,
    Cell: CustomCell,
    style: columStyle
  },
  {
    Header: renderLabel('type'),
    accessor: 'type',
    minWidth: 100,
    Cell: ({ value }) => <CustomCell value={ROLE_DESCRIPTION[value]} />,
    style: columStyle
  },
  {
    Header: renderLabel('companyName'),
    accessor: 'companyName',
    minWidth: 100,
    Cell: CustomCell,
    style: columStyle
  },
  {
    Header: renderLabel('registeredEmailPec'),
    accessor: 'operativeInfoEmail',
    minWidth: 130,
    Cell: CustomCell,
    style: columStyle
  },
  {
    Header: renderLabel('status'),
    accessor: 'status',
    minWidth: 80,
    Cell: ({ value }) => <StatusCell value={value} />,
    style: columStyle
  },
]

export default tableColumns
