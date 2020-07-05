import React from 'react'
import { object } from 'prop-types'
import { Row } from 'reactstrap'
import { useQuery } from '@apollo/react-hooks'

import { Colxx, Separator } from '@/components/CustomBootstrap'
import Breadcrumb from '@/components/Breadcrumb'
import PageLoader from '@/components/PageLoader'
import ShortcutsWidget from './ShortcutsWidget'
import WalletWidget from './WalletWidget'
import ClaimsWidget from './ClaimsWidget'
import TradesWidget from './TradesWidget'
import TasksWidget from './TasksWidget'

import { GET_DASHBOARD } from './graphql/queries'
import { ROLE } from '@/constants/roles'
import { getCurrentUser } from '@/utils/session'
import {
  shortcuts,
  wallet,
  // tasks
} from './data'

const shotcutRoles = [
  ROLE.MEMBER_BUYER_DERIVATIVE_ACCOUNT_ADMIN,
  ROLE.MEMBER_BUYER_DERIVATIVE,
  ROLE.MEMBER_BUYER_CLAIM_ACCOUNT_ADMIN,
  ROLE.MEMBER_BUYER_CLAIM,
  ROLE.MEMBER_BUYER_ALL,
  ROLE.MEMBER_BUYER_ALL_ACCOUNT_ADMIN,
  ROLE.TXC_ACCOUNT_ADMIN,
  ROLE.TXC_SUPER_ADMIN,
  ROLE.TXC_OPERATION,
  ROLE.TXC_BACK_OFFICE,
  ROLE.TXC_ACCOUNT_ADMIN,
  ROLE.TXC_SUPER_ADMIN,
  ROLE.BROKER,
  ROLE.MEMBER_SELLER,
  ROLE.NOTARY_ADMIN
]
const walletRoles = [
  ROLE.TXC_ACCOUNT_ADMIN,
  ROLE.TXC_SUPER_ADMIN,
  ROLE.TXC_BACK_OFFICE,
  ROLE.BROKER,
  ROLE.MEMBER_SELLER,
  ROLE.MEMBER_BUYER_CLAIM,
  ROLE.MEMBER_BUYER_ALL,
  ROLE.MEMBER_BUYER_ALL_ACCOUNT_ADMIN,
  ROLE.MEMBER_BUYER_CLAIM_ACCOUNT_ADMIN,
  ROLE.MEMBER_BUYER_DERIVATIVE_ACCOUNT_ADMIN,
  ROLE.MEMBER_BUYER_DERIVATIVE
]
const claimRoles = [
  ROLE.TXC_ACCOUNT_ADMIN,
  ROLE.TXC_SUPER_ADMIN,
  ROLE.TXC_OPERATION,
  ROLE.MEMBER_BUYER_ALL,
  ROLE.MEMBER_BUYER_ALL_ACCOUNT_ADMIN,
  ROLE.MEMBER_BUYER_CLAIM,
  ROLE.MEMBER_BUYER_CLAIM_ACCOUNT_ADMIN,
  ROLE.MEMBER_BUYER_DERIVATIVE_ACCOUNT_ADMIN,
  ROLE.MEMBER_SELLER,
  ROLE.BROKER,
  ROLE.DELOITTE_MANAGER_ADMIN,
  ROLE.DELOITTE_PARTNER_ADMIN,
  ROLE.DELOITTE_CONSULTANT
]
const tradeRoles = [ROLE.NOTARY_ADMIN]

const MyDashboard = ({ match }) => {
  const { data: { claims = [], trades = [], tasks = [] } = {}, loading } = useQuery(GET_DASHBOARD)

  const {
    role: { name: userRole }
  } = getCurrentUser()
  const approved = getCurrentUser().registerApproved

  // @ TODO rethink this a bit more - could see if we can make use of useRole,
  // will need to refactor that hook
  const canSeeShortcut = shotcutRoles.includes(userRole)
  const canSeeWallet = walletRoles.includes(userRole)
  const canSeeClaims = claimRoles.includes(userRole)
  const canSeeTrades = tradeRoles.includes(userRole)

  let currentShortcuts = shortcuts
  if (!approved) {
    // when user is not approved, only member application form is available
    currentShortcuts = [shortcuts[3]]
  }

  return (
    <Row>
      <Colxx xxs='12'>
        <Breadcrumb heading='menu.my-dashboard' match={match} />
        <Separator className='mb-5' />
      </Colxx>

      {loading ? (
        <PageLoader />
      ) : (
        <>
          {canSeeShortcut && (
            <Colxx xxs='12' lg='6' className='mb-4'>
              <ShortcutsWidget data={currentShortcuts} userRole={userRole} />
            </Colxx>
          )}
          {canSeeWallet && approved && (
            <Colxx xxs='12' lg='6' className='mb-4'>
              <WalletWidget data={wallet} />
            </Colxx>
          )}
          {canSeeClaims && approved && (
            <Colxx xxs='12' lg='6' className='mb-4'>
              <ClaimsWidget claims={claims} />
            </Colxx>
          )}
          {canSeeTrades && approved && (
            <Colxx xxs='12' lg='6' className='mb-4'>
              <TradesWidget trades={trades} />
            </Colxx>
          )}
          <Colxx xxs='12' lg='6' className='mb-4'>
            <TasksWidget tasks={tasks} />
          </Colxx>
        </>
      )}
    </Row>
  )
}

MyDashboard.propTypes = {
  match: object
}

export default MyDashboard
