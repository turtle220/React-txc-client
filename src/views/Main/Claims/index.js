import React, { useState, useEffect } from 'react'
import { Row, Card, CardBody } from 'reactstrap'
import { useApolloClient } from '@apollo/react-hooks'
import PerfectScrollbar from 'react-perfect-scrollbar'
import ReactTable from 'react-table'
import classnames from 'classnames'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { Colxx, Separator } from '@/components/CustomBootstrap'
import DataTablePagination from '@/components/DatatablePagination'
import Breadcrumb from '@/components/Breadcrumb'
import PageLoader from '@/components/PageLoader'
import ActionsButton from '@/components/ActionsButton'
import AutoCompleteFilter from '@/components/AutoCompleteFilter'

import getTdProps from '@/utils/getTdProps'
import { formatType } from '@/utils/formatType'

import { useRole } from '@/hooks'
import { ROLE } from '@/constants/roles'
import { defaultPageSize, minRows } from '@/constants/defaultTableConfig'
import { CLAIMS_QUERY } from '@/graphql/queries/claims'
import { APPROVED_SELLERS_QUERY } from '@/graphql/queries/members'

import { formatClaimsList } from '@/utils/csvExportFormatter'

import NewClaimModal from './NewClaimModal'

import tableColumns from './tableColumns'

// eslint-disable-next-line react/prop-types
const CustomTbodyComponent = ({ className, children, ...rest }) => (
  <div {...rest} className={classnames('rt-tbody', className || [])}>
    <PerfectScrollbar option={{ suppressScrollX: true }}>
      {children}
    </PerfectScrollbar>
  </div>
)

// render the actions button with dynamic properties
const renderActionsButton = (openModal, claims, roles) => {
  const attrs = {
    csvData: formatClaimsList(claims) || null,
    csvDataFilename: 'claims.csv',
    csvDataText: 'pages.claims.actions.export',
    className: 'ml-3'
  }
  if (roles) {
    attrs.newHandler = openModal
    attrs.newHandlerText = 'pages.claims.actions.new-claim'
  }
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <ActionsButton {...attrs} />
  )
}

const Claims = () => {
  const match = useRouteMatch()
  const history = useHistory()
  const client = useApolloClient()
  const [claims, setClaims] = useState([])
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedSellerMemberId, setSelectedSellerMemberId] = useState('')
  const [sellersOptions, setSellersOptions] = useState([])

  const handleRowClick = (id) => {
    history.push(`${match.url}/${id}`)
  }

  const [canSeeFilter] = useRole([
    ROLE.TXC_ACCOUNT_ADMIN,
    ROLE.TXC_SUPER_ADMIN,
    ROLE.TXC_BACK_OFFICE,
    ROLE.BROKER
  ])

  const [canCreateNewClaim] = useRole([
    ROLE.TXC_ACCOUNT_ADMIN,
    ROLE.TXC_SUPER_ADMIN,
    ROLE.BROKER,
    ROLE.MEMBER_SELLER
  ])

  const [canSeeIndicatedInterest] = useRole([
    ROLE.MEMBER_BUYER_CLAIM_ACCOUNT_ADMIN,
    ROLE.MEMBER_BUYER_CLAIM,
    ROLE.MEMBER_BUYER_ALL,
    ROLE.MEMBER_BUYER_ALL_ACCOUNT_ADMIN
  ])

  const [canSeeEligibleBuyers] = useRole([
    ROLE.TXC_ACCOUNT_ADMIN,
    ROLE.TXC_SUPER_ADMIN,
    ROLE.TXC_OPERATION,
    ROLE.TXC_BACK_OFFICE
  ])

  const [canSeeAction] = useRole([...Object.keys(ROLE).filter((name) => name !== 'NOTARY_ADMIN' && name !== 'MEMBER_BUYER_CLAIM' && name !== 'MEMBER_BUYER_CLAIM_ACCOUNT_ADMIN')])
  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)
  const updateClaimsCache = (claimAdded) => {
    setClaims((existingClaims) => ([
      ...existingClaims,
      claimAdded
    ]))
  }

  const fetchClaims = async ({ sellerMemberId }) => {
    setLoading(true)
    const { data } = await client.query({
      query: CLAIMS_QUERY,
      fetchPolicy: 'no-cache',
      variables: {
        sellerMemberId
      }
    })

    setClaims(data.claims)
    setLoading(false)
  }

  const claimList = formatType(claims)

  const fetchSellers = async () => {
    const { data: { approvedSellers } } = await client.query({
      query: APPROVED_SELLERS_QUERY
    })

    setSellersOptions(approvedSellers.map((seller) => ({
      value: seller.id,
      label: seller.companyName
    })))
  }

  const filterClaims = (value) => {
    setSelectedSellerMemberId(value)
    fetchClaims({ sellerMemberId: value })
  }

  const resetFilter = () => {
    fetchClaims({})
    setSelectedSellerMemberId('')
  }

  useEffect(() => {
    fetchSellers()
    fetchClaims({})
  }, [])

  const columns = tableColumns({
    canSeeIndicatedInterest,
    canSeeEligibleBuyers
  })

  return (
    <>
      <Row>
        <Colxx xxs='12'>
          <Breadcrumb heading='menu.claims' match={match} />
          {canSeeAction
            && renderActionsButton(openModal, claims, canCreateNewClaim)}
          {canSeeFilter && !loading && (
            <AutoCompleteFilter
              title='Member'
              onFilter={filterClaims}
              value={selectedSellerMemberId}
              onReset={resetFilter}
              options={sellersOptions}
            />
          )}
          <Separator className='mt-3 mb-5' />
          {loading ? (
            <PageLoader />
          ) : (
            <Card>
              <CardBody>
                <ReactTable
                  data={claimList}
                  TbodyComponent={CustomTbodyComponent}
                  columns={columns}
                  defaultPageSize={defaultPageSize}
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
          )}
        </Colxx>
      </Row>
      <NewClaimModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        onAdd={updateClaimsCache}
      />
    </>
  )
}
export default Claims
