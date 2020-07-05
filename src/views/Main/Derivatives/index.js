import React from 'react'
import { object } from 'prop-types'
import { Row, Card, CardBody } from 'reactstrap'
import ReactTable from 'react-table'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'

import { Colxx, Separator } from '@/components/CustomBootstrap'
import DataTablePagination from '@/components/DatatablePagination'
import Breadcrumb from '@/components/Breadcrumb'
import PageLoader from '@/components/PageLoader'
import ActionsButton from '@/components/ActionsButton'
import DatatableEmptyMessage from '@/components/DatatableEmptyMessage'
import { defaultPageSize, minRows } from '@/constants/defaultTableConfig'

import FilterButton from '@/components/Filter'

import { useRole } from '@/hooks'
import { ROLE } from '@/constants/roles'

import getTdProps from '@/utils/getTdProps'

import tableColumns from './tableColumns'

import { GET_DERIVATES } from './graphql/queries'

// fake data
const fakeData = [
  {
    key: 'pandas123',
    value: 'Pandas',
    label: 'Pandas'
  },
  {
    key: 'fluffy345',
    value: 'Fluffy',
    label: 'Fluffy Unicorns'
  }
]

const Derivatives = ({ match }) => {
  const { url } = useRouteMatch()
  const history = useHistory()

  const [canSeeFilter] = useRole([
    ROLE.TXC_ACCOUNT_ADMIN,
    ROLE.TXC_SUPER_ADMIN,
    ROLE.TXC_BACK_OFFICE,
    ROLE.BROKER
  ])

  const { data: { derivatives = [] } = {}, loading } = useQuery(
    GET_DERIVATES,
    { notifyOnNetworkStatusChange: true }
  )

  const handleRowClick = (id) => {
    history.push(`${url}/${id}`)
  }

  return (
    <Row>
      <Colxx xxs='12'>
        <Breadcrumb heading='menu.derivatives' match={match} />
        <ActionsButton
          csvData={derivatives || null}
          csvDataFilename='derivatives.csv'
          csvDataText='general.actions.export'
          className='ml-3'
        />
        {canSeeFilter && (
          <FilterButton
            newHandler={() => console.log('fetch new data with filter')}
            newHandlerText='Apply'
            resetHandler={() => console.log('reset the query')}
            resetHandlerText='Reset'
            filterDataOptions={fakeData}
            filterDataDefaultValue={fakeData[1]}
          />
        )}
        <Separator className='mb-5' />

        {loading ? (
          <PageLoader />
        ) : (
          <Card>
            <CardBody>
              <ReactTable
                data={derivatives}
                columns={tableColumns}
                defaultPageSize={defaultPageSize}
                minRows={minRows}
                showPageJump={false}
                showPageSizeOptions={false}
                PaginationComponent={DataTablePagination}
                NoDataComponent={DatatableEmptyMessage}
                getTdProps={getTdProps(handleRowClick)}
                className='-highlight'
                multiSort={false}
              />
            </CardBody>
          </Card>
        )}
      </Colxx>
    </Row>
  )
}

Derivatives.propTypes = {
  match: object
}

export default Derivatives
