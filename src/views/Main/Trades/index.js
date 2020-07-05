import React, { useState, useEffect } from 'react'
import { Row, Card, CardBody } from 'reactstrap'
import { useApolloClient } from '@apollo/react-hooks'
import ReactTable from 'react-table'
import { useRouteMatch, useHistory } from 'react-router-dom'

import { useRole } from '@/hooks'

import AutoCompleteFilter from '@/components/AutoCompleteFilter'
import { Colxx, Separator } from '@/components/CustomBootstrap'
import DataTablePagination from '@/components/DatatablePagination'
import Breadcrumb from '@/components/Breadcrumb'
import PageLoader from '@/components/PageLoader'
import ActionsButton from '@/components/ActionsButton'
import DatatableEmptyMessage from '@/components/DatatableEmptyMessage'

import { ROLE } from '@/constants/roles'
import { defaultPageSize, minRows } from '@/constants/defaultTableConfig'

import getTdProps from '@/utils/getTdProps'

import tableColumns from './tableColumns'

import { TRADES_QUERY } from '@/graphql/queries/wallets'
import { APPROVED_SELLERS_QUERY } from '@/graphql/queries/members'

const Trades = () => {
  const match = useRouteMatch()
  const history = useHistory()
  const client = useApolloClient()

  const handleRowClick = (id) => {
    history.push(`${match.url}/${id}`)
  }

  const [canSeeFilter] = useRole([
    ROLE.TXC_ACCOUNT_ADMIN,
    ROLE.TXC_SUPER_ADMIN,
    ROLE.TXC_BACK_OFFICE,
    ROLE.BROKER
  ])

  const [loading, setLoading] = useState(false)
  const [tradeList, setTradeList] = useState([])
  const [selectedSellerMemberId, setSelectedSellerMemberId] = useState('')
  const [sellersOptions, setSellersOptions] = useState([])

  const fetchTrades = async ({ sellerMemberId }) => {
    setLoading(true)

    const { data } = await client.query({
      query: TRADES_QUERY,
      fetchPolicy: 'no-cache',
      variables: {
        sellerMemberId
      }
    })

    setTradeList(data.trades)
    setLoading(false)
  }

  const fetchSellers = async () => {
    const { data: { approvedSellers } } = await client.query({
      query: APPROVED_SELLERS_QUERY
    })

    setSellersOptions(approvedSellers.map((seller) => ({
      value: seller.id,
      label: seller.companyName
    })))
  }

  const filterTrades = (value) => {
    setSelectedSellerMemberId(value)
    fetchTrades({ sellerMemberId: value })
  }

  const resetFilter = () => {
    fetchTrades({})
    setSelectedSellerMemberId('')
  }

  useEffect(() => {
    fetchTrades({})
    fetchSellers()
  }, [])

  return (
    <Row>
      <Colxx xxs='12'>
        <Breadcrumb heading='menu.trades' match={match} />
        <ActionsButton
          csvData={tradeList || null}
          csvDataFilename='trades.csv'
          csvDataText='pages.trades.actions.export'
          className='ml-3'
        />
        {canSeeFilter && !loading && (
          <AutoCompleteFilter
            title='Member'
            onFilter={filterTrades}
            value={selectedSellerMemberId}
            onReset={resetFilter}
            options={sellersOptions}
          />
        )}
        <Separator className='mb-5' />

        {loading ? (
          <PageLoader />
        ) : (
          <Card>
            <CardBody>
              <ReactTable
                data={tradeList}
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

export default Trades
