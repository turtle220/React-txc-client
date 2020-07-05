import React from 'react'
import { object } from 'prop-types'
import { Row, Card, CardBody } from 'reactstrap'
import { useQuery } from '@apollo/react-hooks'

import ReactTable from 'react-table'
import { useRouteMatch, useHistory } from 'react-router-dom'

import { Colxx, Separator } from '@/components/CustomBootstrap'
import DataTablePagination from '@/components/DatatablePagination'
import DatatableEmptyMessage from '@/components/DatatableEmptyMessage'
import Breadcrumb from '@/components/Breadcrumb'
import PageLoader from '@/components/PageLoader'

import usersTableColumns from '@/constants/usersTableColumns'
import { defaultPageSize, minRows } from '@/constants/defaultTableConfig'

import { formatType } from '@/utils/formatType'

import { USERS_QUERY } from '@/graphql/queries/users'

const Users = ({ match }) => {
  const { url } = useRouteMatch()
  const history = useHistory()

  const { data: { users = [] } = {}, loading } = useQuery(
    USERS_QUERY,
    { notifyOnNetworkStatusChange: true }
  )

  const userList = formatType(users)

  const handleClickRow = (_, rowInfo) => ({
    onClick: () => {
      history.push(`${url}/${rowInfo.original.id}/member/${rowInfo?.original?.memberId}`)
    },
    style: {
      cursor: 'pointer'
    }
  })

  return (
    <Row>
      <Colxx xxs='12'>
        <Breadcrumb heading='menu.users' match={match} />
        <Separator className='mb-5' />

        {loading ? (
          <PageLoader />
        ) : (
          <Card>
            <CardBody>
              <ReactTable
                data={userList}
                columns={usersTableColumns}
                defaultPageSize={defaultPageSize}
                minRows={minRows}
                showPageJump={false}
                showPageSizeOptions={false}
                PaginationComponent={DataTablePagination}
                NoDataComponent={DatatableEmptyMessage}
                getTdProps={handleClickRow}
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

Users.propTypes = {
  match: object
}

export default Users
