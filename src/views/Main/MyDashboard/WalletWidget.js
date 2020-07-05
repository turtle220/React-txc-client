import React from 'react'
import { NavLink } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { Card, CardBody, CardTitle } from 'reactstrap'

import { Separator, Colxx } from '@/components/CustomBootstrap'
import IsLoading from '@/components/IsLoading'

import IntlMessages from '@/utils/IntlMessages'
import { getEuroCurrencyDisplayFormat } from '@/utils/currency'
import { getHumanizedDateFormat } from '@/utils/date'
import { useRole } from '@/hooks'
import { ROLE } from '@/constants/roles'

import { WALLET_QUERY } from '@/graphql/queries/wallets'
import { USER_DETAIL } from '@/graphql/queries/users'

const renderBlockedFuns = (wallet) => (
  <Colxx xxs="6" md="6" lg="6" className="mb-4">
    <Card>
      <CardBody className="text-center">
        <p className="card-text font-weight-semibold mb-0">
          Blocked Funds
        </p>
        <p className="lead text-center">{getEuroCurrencyDisplayFormat(wallet.balance)}</p>
      </CardBody>
    </Card>
  </Colxx>
)

const renderTransactions = (wallet) => (
  <Colxx xxs="6" md="6" lg="6" className="mb-4">
    <Card>
      <CardBody className="text-center">
        <p className="card-text font-weight-semibold mb-0">
          Transactions
        </p>
        <p className="lead text-center">{wallet.transations}</p>
      </CardBody>
    </Card>
  </Colxx>
)

const renderLastTransactionDate = (wallet) => (
  <Colxx xxs="6" md="6" lg="6" className="mb-4">
    <Card>
      <CardBody className="text-center">
        <p className="card-text font-weight-semibold mb-0">
          Last Transaction Date
        </p>
        <p className="lead text-center">{getHumanizedDateFormat(wallet.lastTransactionDate)}</p>
      </CardBody>
    </Card>
  </Colxx>
)

const renderAmount = (wallet) => (
  <Colxx xxs="6" md="6" lg="6" className="mb-4">
    <Card>
      <CardBody className="text-center">
        <p className="card-text font-weight-semibold mb-0">
          Total Amount of Transactions (€)
        </p>
        <p className="lead text-center">{getEuroCurrencyDisplayFormat(wallet.amount)}</p>
      </CardBody>
    </Card>
  </Colxx>
)

const renderTradedAmount = (wallet) => (
  <Colxx xxs="6" md="6" lg="6" className="mb-4">
    <Card>
      <CardBody className="text-center">
        <p className="card-text font-weight-semibold mb-0">
          Traded Amount
        </p>
        <p className="lead text-center">{getEuroCurrencyDisplayFormat(wallet.amount)}</p>
      </CardBody>
    </Card>
  </Colxx>
)

const renderCreditLine = (creditLine) => (
  <Colxx xxs="6" md="6" lg="6" className="mb-4">
    <Card>
      <CardBody className="text-center">
        <p className="card-text font-weight-semibold mb-0">
          Credit Line
        </p>
        <p className="lead text-center">{getEuroCurrencyDisplayFormat(creditLine)}</p>
      </CardBody>
    </Card>
  </Colxx>
)

const WalletWidget = () => {
  const { data: { wallet = {} } = {}, loadingWallet } = useQuery(WALLET_QUERY)
  const { data: { user = {} } = {}, loadingUser } = useQuery(USER_DETAIL)

  if (wallet.balance === undefined) {
    wallet.balance = 0
    wallet.transations = 0
    wallet.lastTransactionDate = null
    wallet.amount = 0
  }

  const [isAdminUser] = useRole([
    ROLE.TXC_ACCOUNT_ADMIN,
    ROLE.TXC_SUPER_ADMIN,
    ROLE.TXC_BACK_OFFICE
  ])
  const [isMemberSeller] = useRole([ROLE.MEMBER_SELLER])
  const [isBuyerAdmin] = useRole([
    ROLE.MEMBER_BUYER_CLAIM_ACCOUNT_ADMIN,
    ROLE.MEMBER_BUYER_ALL_ACCOUNT_ADMIN
  ])
  const [isBuyerNoAdmin] = useRole([
    ROLE.MEMBER_BUYER_CLAIM,
    ROLE.MEMBER_BUYER_ALL
  ])
  const [isPartner] = useRole([ROLE.BROKER])

  return (
    <Card>
      <IsLoading loading={loadingWallet && loadingUser}>
        <CardBody>
          <div className="d-flex flex-row justify-content-between mb-3">
            <CardTitle className="mb-0">
              <IntlMessages id="pages.dashboard.widget.wallet" />
            </CardTitle>
            <NavLink to="/app/wallet">
              <IntlMessages id="pages.dashboard.widget.view-detail" />
            </NavLink>
          </div>
          <Separator className="mb-4" />
          {isMemberSeller && (
            <>
              <div className="row icon-cards-row">
                {renderTradedAmount(wallet)}
                {renderTransactions(wallet)}
              </div>
              <div className="row icon-cards-row">
                {renderLastTransactionDate(wallet)}
                {renderAmount(wallet)}
              </div>
            </>
          )}
          {isPartner && (
            <>
              <div className="row icon-cards-row">
                {renderTradedAmount(wallet)}
                {renderTransactions(wallet)}
              </div>
              <div className="row icon-cards-row">
                {renderLastTransactionDate(wallet)}
                {renderAmount(wallet)}
              </div>
            </>
          )}
          {isBuyerAdmin && (
            <>
              <div className="row icon-cards-row">
                {renderCreditLine(user.creditLine)}
                {renderBlockedFuns(wallet)}
              </div>
              <div className="row icon-cards-row">
                {renderTransactions(wallet)}
                {renderAmount(wallet)}
              </div>
            </>
          )}
          {isBuyerNoAdmin && (
            <>
              <div className="row icon-cards-row">
                {renderCreditLine(user.creditLine)}
                {renderTransactions(wallet)}
              </div>
              <div className="row icon-cards-row">
                {renderLastTransactionDate(wallet)}
                {renderAmount(wallet)}
              </div>
            </>
          )}
          {isAdminUser && (
            <>
              <div className="row icon-cards-row">
                {renderBlockedFuns(wallet)}
                {renderTransactions(wallet)}
              </div>
              <div className="row icon-cards-row">
                {renderTradedAmount(wallet)}
                {renderAmount(wallet)}
              </div>
            </>
          )}
        </CardBody>
      </IsLoading>
    </Card>
  )
}

export default WalletWidget
