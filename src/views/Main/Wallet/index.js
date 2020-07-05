import React, { useState, useEffect } from 'react'
import {
  Row,
  Nav,
  NavItem,
  TabContent,
  TabPane
} from 'reactstrap'
import { useApolloClient } from '@apollo/react-hooks'
import { NavLink, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'

import IntlMessages from '@/utils/IntlMessages'

import { useRole } from '@/hooks'

import { ROLE } from '@/constants/roles'

import AutoCompleteFilter from '@/components/AutoCompleteFilter'
import { Colxx } from '@/components/CustomBootstrap'
import Breadcrumb from '@/components/Breadcrumb'
import ActionsButton from '@/components/ActionsButton'
import IsLoading from '@/components/IsLoading'

import { WALLET_QUERY } from '@/graphql/queries/wallets'
import { APPROVED_MEMBERS_QUERY, MEMBER_STATEMENT_QUERY } from '@/graphql/queries/members'
import { USER_DETAIL } from '@/graphql/queries/users'

import EditWallet from './EditWallet'
import DetailsTab from './DetailsTab'
import Statements from './Statements'

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`

const Wallet = () => {
  const match = useRouteMatch()
  const [isModalOpen, setModalOpen] = useState(false)
  const [wallet, setWallet] = useState({})
  const [loading, setLoading] = useState(false)
  const [selectedSellerMemberId, setSelectedSellerMemberId] = useState('')
  const [membersOptions, setMembersOptions] = useState([])
  const [creditLine, setCreditLine] = useState()
  const [statements, setStatements] = useState()
  const [status, setStatus] = useState('Member: All Members')
  const [activeTab, setActiveTab] = useState('1')

  const [isAdminUser] = useRole([
    ROLE.TXC_ACCOUNT_ADMIN,
    ROLE.TXC_SUPER_ADMIN,
    ROLE.TXC_BACK_OFFICE
  ])

  const [canSeeFilter] = useRole([
    ROLE.TXC_ACCOUNT_ADMIN,
    ROLE.TXC_SUPER_ADMIN,
    ROLE.TXC_BACK_OFFICE,
    ROLE.BROKER
  ])

  const [isMember] = useRole([
    ROLE.BROKER,
    ROLE.MEMBER_BUYER_CLAIM,
    ROLE.MEMBER_BUYER_CLAIM_ACCOUNT_ADMIN,
    ROLE.MEMBER_SELLER
  ])

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  const client = useApolloClient()

  const fetchWallet = async ({ sellerMemberId }) => {
    setLoading(true)

    const { data: { wallet } } = await client.query({
      query: WALLET_QUERY,
      variables: {
        sellerMemberId
      },
    })

    setWallet(wallet)
    setLoading(false)
  }

  const fetchMemberStatements = async () => {
    const { data: { documentsMemberStatement = [] } = {} } = await client.query({
      query: MEMBER_STATEMENT_QUERY
    })

    setStatements(documentsMemberStatement)
  }

  const fetchMemberDetail = async () => {
    const { data: { user = {} } = {} } = await client.query({
      query: USER_DETAIL
    })

    setCreditLine(user.creditLine)
  }

  const fetchMembers = async () => {
    const { data: { approvedMembers } } = await client.query({
      query: APPROVED_MEMBERS_QUERY
    })

    setMembersOptions(approvedMembers.map((member) => ({
      value: member.id,
      label: member.companyName
    })))
  }

  const filterWallet = (value) => {
    const member = membersOptions.find((member) => member.value === value)
    setStatus(`Member: ${member.label}`)
    setSelectedSellerMemberId(value)
    fetchWallet({ sellerMemberId: value })
  }

  const resetFilter = () => {
    setStatus('Member: All Members')
    fetchWallet({})
    setSelectedSellerMemberId('')
  }

  const refreshBalance = (balance) => {
    setWallet((current) => ({
      ...current,
      balance
    }))
  }

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }

  useEffect(() => {
    fetchMemberDetail()
    fetchWallet({})
    fetchMemberStatements()
    fetchMembers()
  }, [])

  return (
    <Row>
      <Colxx xxs='12'>
        <Header>
          <div>
            <Breadcrumb heading='menu.wallet' match={match} />
          </div>
          <HeaderLeft>
            {isAdminUser && (
              <ActionsButton
                newHandler={openModal}
                newHandlerText='pages.wallet.actions.edit'
                className='ml-3'
              />
            )}
            {canSeeFilter && (
              <AutoCompleteFilter
                title='Member'
                onFilter={filterWallet}
                value={selectedSellerMemberId}
                onReset={resetFilter}
                options={membersOptions}
              />
            )}
          </HeaderLeft>
        </Header>
        <Nav tabs className='separator-tabs ml-0 mb-5'>
          <NavItem>
            <NavLink
              className='nav-link'
              onClick={() => toggleTab('1')}
              isActive={() => activeTab === '1'}
              to='#'
            >
              <IntlMessages id='pages.wallet.details' />
            </NavLink>
          </NavItem>
          {isMember && (
            <NavItem>
              <NavLink
                className='nav-link'
                onClick={() => toggleTab('2')}
                isActive={() => activeTab === '2'}
                to='#'
              >
                <IntlMessages id='pages.wallet.statements' />
              </NavLink>
            </NavItem>
          )}
        </Nav>

        <IsLoading loading={loading}>
          <TabContent activeTab={activeTab}>
            <TabPane tabId='1'>
              <DetailsTab
                status={status}
                wallet={wallet}
                creditLine={creditLine}
                selectedSellerMemberId={selectedSellerMemberId}
              />
            </TabPane>
            <TabPane tabId='2'>
              <Statements statements={statements} />
            </TabPane>
          </TabContent>
        </IsLoading>
      </Colxx>

      <EditWallet isOpen={isModalOpen} close={closeModal} onEdit={refreshBalance} />
    </Row>
  )
}

export default Wallet
