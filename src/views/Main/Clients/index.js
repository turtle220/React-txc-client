import React from 'react'
import { Row, Card, CardBody } from 'reactstrap'
import { useRouteMatch, useHistory } from 'react-router-dom'
import ReactTable from 'react-table'
import { useQuery } from '@apollo/react-hooks'
import PerfectScrollbar from 'react-perfect-scrollbar'
import classnames from 'classnames'

import { Colxx, Separator } from '@/components/CustomBootstrap'
import Breadcrumb from '@/components/Breadcrumb'
import DataTablePagination from '@/components/DatatablePagination'
import IsLoading from '@/components/IsLoading'
import ActionsButton from '@/components/ActionsButton'

import { defaultPageSize, minRows } from '@/constants/defaultTableConfig'

import getTdProps from '@/utils/getTdProps'

import { SELLERS_QUERY } from '@/graphql/queries/members'

import tableColumns from './tableColumns'

const CustomTbodyComponent = ({ className, children, ...rest }) => (
  <div {...rest} className={classnames('rt-tbody', className || [])}>
    <PerfectScrollbar option={{ suppressScrollX: true }}>
      {children}
    </PerfectScrollbar>
  </div>
)

const Clients = () => {
  const match = useRouteMatch()
  const history = useHistory()

  const { data: { sellers = [] } = {}, loading } = useQuery(SELLERS_QUERY)

  const handleRowClick = () => {}

  const goToMemberAgreementForm = () => {
    history.replace('/app/membership-agreement?from=partner')
  }

  return (
    <>
      <Row>
        <Colxx xxs='12'>
          <Breadcrumb heading='menu.clients' match={match} />
          <ActionsButton
            newHandler={goToMemberAgreementForm}
            newHandlerText='pages.clients.add_new_client'
            csvData={sellers || null}
            csvDataFilename='clients.csv'
            csvDataText='general.actions.export'
            className='ml-3'
          />
          <Separator className='mt-3 mb-5' />
          <IsLoading loading={loading}>
            <Card>
              <CardBody>
                <ReactTable
                  data={sellers}
                  columns={tableColumns}
                  defaultPageSize={defaultPageSize}
                  TbodyComponent={CustomTbodyComponent}
                  minRows={minRows}
                  showPageJump={false}
                  showPageSizeOptions={false}
                  PaginationComponent={DataTablePagination}
                  getTdProps={getTdProps(handleRowClick)}
                  className='-highlight react-table-fixed-height'
                  multiSort={false}
                />
              </CardBody>
            </Card>
          </IsLoading>
        </Colxx>
      </Row>
    </>
  )
}

export default Clients
