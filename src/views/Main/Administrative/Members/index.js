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
import ActionsButton from '@/components/ActionsButton'

import { defaultPageSize, minRows } from '@/constants/defaultTableConfig'

import getTdProps from '@/utils/getTdProps'
import { formatType } from '@/utils/formatType'

import { MEMBERS_QUERY } from '@/graphql/queries/members'

import tableColumns from './tableColumns'

const Members = ({ match }) => {
  const { url } = useRouteMatch()
  const history = useHistory()

  const handleRowClick = (id) => {
    history.push(`${url}/${id}`)
  }

  const { data: { members = [] } = {}, loading } = useQuery(
    MEMBERS_QUERY,
    { notifyOnNetworkStatusChange: true }
  )

  const memberList = formatType(members.sort((a, b) => a.id - b.id))

  return (
    <Row>
      <Colxx xxs='12'>
        <Breadcrumb heading='menu.members' match={match} />
        <ActionsButton
          csvData={members || null}
          csvDataFilename='members.csv'
          csvDataText='pages.members.actions.export'
        />
        <Separator className='mb-5' />

        {loading ? (
          <PageLoader />
        ) : (
          <Card>
            <CardBody>
              <ReactTable
                data={memberList}
                defaultPageSize={defaultPageSize}
                minRows={minRows}
                columns={tableColumns}
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

Members.propTypes = {
  match: object
}

export default Members
