/* eslint-disable react/prop-types */
import React from 'react'
import { dateFormat } from '@/utils/date'

import IntlMessages from '@/utils/IntlMessages'
import CustomCell from '@/components/CustomCell'
import BooleanCell from '@/components/BooleanCell'
import { ROLE_DESCRIPTION } from '@/constants/roles'
import { getEuroCurrencyDisplayFormat } from '@/utils/currency'

const columStyle = {
  paddingTop: '10px'
}

const renderLabel = (label) => (
  <IntlMessages id={`pages.users.table.${label}`} />
)

const usersTableColumns = [
  {
    Header: renderLabel('id'),
    accessor: 'id',
    maxWidth: 80,
    Cell: CustomCell,
    style: columStyle
  },
  {
    Header: renderLabel('firstname'),
    accessor: 'firstName',
    minWidth: 150,
    Cell: CustomCell,
    style: columStyle
  },
  {
    Header: renderLabel('lastname'),
    accessor: 'surName',
    minWidth: 150,
    Cell: CustomCell,
    style: columStyle
  },
  {
    Header: renderLabel('company-name'),
    accessor: 'companyName',
    minWidth: 150,
    Cell: CustomCell,
    style: columStyle
  },
  {
    Header: renderLabel('member-type'),
    accessor: 'memberType',
    minWidth: 200,
    Cell: ({ value }) => <CustomCell value={ROLE_DESCRIPTION[value]} />,
    style: columStyle
  },
  {
    Header: renderLabel('member-status'),
    accessor: 'registerApproved',
    minWidth: 100,
    Cell: ({ value }) => <BooleanCell value={value} />,
    style: columStyle
  },
  {
    Header: renderLabel('user-status'),
    accessor: 'activate',
    minWidth: 100,
    Cell: ({ value }) => <BooleanCell value={value} />,
    style: columStyle
  },
  {
    Header: renderLabel('email'),
    accessor: 'email',
    minWidth: 200,
    Cell: CustomCell,
    style: columStyle
  },
  {
    Header: renderLabel('last-signin'),
    accessor: 'lastSignIn',
    minWidth: 100,
    Cell: ({ value }) => <CustomCell value={value ? dateFormat(value) : '-'} />,
    style: columStyle
  },
  {
    Header: renderLabel('credit-line'),
    accessor: 'creditLine',
    minWidth: 150,
    Cell: ({ value }) => <CustomCell value={value ? getEuroCurrencyDisplayFormat(value) : ''} />,
    style: columStyle
  }
]

export default usersTableColumns
