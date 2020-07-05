/* eslint-disable react/prop-types */
import React from 'react'
import { useHistory } from 'react-router-dom'

import IntlMessages from '@/utils/IntlMessages'

import CustomCell from '@/components/CustomCell'
import StatusCell from '@/components/StatusCell'
import Link from '@/components/Link'

const columStyle = {
  paddingTop: '10px'
}

const renderLabel = (label) => (
  <IntlMessages id={`pages.clients.table.${label}`} />
)

const FormLink = ({ memberId }) => {
  const history = useHistory()

  const goToMembershipForm = () => {
    history.push(`/app/membership-agreement?from=partner&seller_id=${memberId}`)
  }

  return (
    <Link
      onClick={goToMembershipForm}
    >
      <IntlMessages id='pages.clients.table.link_to_form' />
    </Link>
  )
}

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
    Header: renderLabel('first_name'),
    accessor: 'operativeInfoFirstName',
    maxWidth: 250,
    Cell: CustomCell,
    style: columStyle
  },
  {
    Header: renderLabel('last_name'),
    accessor: 'operativeInfoSurname',
    minWidth: 100,
    Cell: CustomCell,
    style: columStyle
  },
  {
    Header: renderLabel('company'),
    accessor: 'companyName',
    minWidth: 120,
    Cell: CustomCell,
    style: columStyle
  },
  {
    Header: renderLabel('email'),
    accessor: 'operativeInfoEmail',
    minWidth: 100,
    Cell: CustomCell,
    style: columStyle
  },
  {
    Header: renderLabel('member_status'),
    accessor: 'status',
    minWidth: 80,
    Cell: ({ value }) => <StatusCell value={value} />,
    style: columStyle
  },
  {
    Header: renderLabel('membership_form'),
    accessor: 'id',
    minWidth: 80,
    Cell: ({ value }) => <FormLink memberId={value} />,
    style: columStyle
  },
]

export default tableColumns
