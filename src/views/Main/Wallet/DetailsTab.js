import React from 'react'
import {
  Row,
  Card,
  CardBody,
  CardTitle
} from 'reactstrap'

import { Colxx, Separator } from '@/components/CustomBootstrap'

import { useRole } from '@/hooks'
import IntlMessages from '@/utils/IntlMessages'
import { getEuroCurrencyDisplayFormat } from '@/utils/currency'
import { getHumanizedDateFormat } from '@/utils/date'

import { ROLE } from '@/constants/roles'

import Transactions from './Transactions'

const CreditLine = ({ creditLine }) => (
  <Colxx xxs="6" sm="4" md="3" lg="3" className="mb-4">
    <Card>
      <CardBody className="text-center">
        <p className="card-text font-weight-semibold mb-0">
          My Credit Line
        </p>
        <p className="lead text-center">{getEuroCurrencyDisplayFormat(creditLine, 2)}</p>
      </CardBody>
    </Card>
  </Colxx>
)

const BlockedFunds = ({ balance }) => (
  <Colxx xxs="6" sm="4" md="3" lg="3" className="mb-4">
    <Card>
      <CardBody className="text-center">
        <p className="card-text font-weight-semibold mb-0">
          Blocked Funds
        </p>
        <p className="lead text-center">{getEuroCurrencyDisplayFormat(balance, 2)}</p>
      </CardBody>
    </Card>
  </Colxx>
)

const TradedAmount = ({ amount }) => (
  <Colxx xxs="6" sm="4" md="3" lg="3" className="mb-4">
    <Card>
      <CardBody className="text-center">
        <p className="card-text font-weight-semibold mb-0">
          Traded Amount
        </p>
        <p className="lead text-center">{getEuroCurrencyDisplayFormat(amount, 2)}</p>
      </CardBody>
    </Card>
  </Colxx>
)

const Transaction = ({ transactions }) => (
  <Colxx xxs="6" sm="4" md="3" className="mb-4">
    <Card>
      <CardBody className="text-center">
        <p className="card-text font-weight-semibold mb-0">
          Transactions
        </p>
        <p className="lead text-center">{transactions}</p>
      </CardBody>
    </Card>
  </Colxx>
)

const LastTransactionDate = ({ date }) => (
  <Colxx xxs="6" sm="4" md="3" className="mb-4">
    <Card>
      <CardBody className="text-center">
        <p className="card-text font-weight-semibold mb-0">
          Last Transaction Date
        </p>
        <p className="lead text-center">{getHumanizedDateFormat(date)}</p>
      </CardBody>
    </Card>
  </Colxx>
)

const DetailsTab = ({ status, wallet, creditLine, selectedSellerMemberId }) => {
  const [isAdminUser] = useRole([
    ROLE.TXC_ACCOUNT_ADMIN,
    ROLE.TXC_SUPER_ADMIN,
    ROLE.TXC_BACK_OFFICE
  ])
  const [isSeller] = useRole([ROLE.MEMBER_SELLER])
  const [isBuyerAdmin] = useRole([
    ROLE.MEMBER_BUYER_CLAIM_ACCOUNT_ADMIN,
    ROLE.MEMBER_BUYER_ALL_ACCOUNT_ADMIN
  ])
  const [isBuyerNoAdmin] = useRole([ROLE.MEMBER_BUYER_CLAIM, ROLE.MEMBER_BUYER_ALL])
  const [isPartner] = useRole([ROLE.BROKER])

  const sellerOrPartner = isSeller || isPartner
  const adminOrPartner = isAdminUser || isPartner

  return (
    <Row>
      <Colxx xxs='12' className='mb-5'>
        <Card>
          <CardBody>
            <div className="d-flex flex-row justify-content-between mb-3">
              <CardTitle className='mb-3'>
                <IntlMessages id='pages.wallet.wallet-snapshot' />
              </CardTitle>
              {adminOrPartner && (
                <p color='#145388'>{status}</p>
              )}
            </div>
            <Separator className='mb-5' />
            <div className="row icon-cards-row">
              {isAdminUser && (
                <>
                  <BlockedFunds balance={wallet.balance} />
                  <Transaction transactions={wallet.transations} />
                  <TradedAmount amount={wallet.amount} />
                </>
              )}
              {isBuyerAdmin && (
                <>
                  <CreditLine creditLine={creditLine} />
                  <BlockedFunds balance={wallet.balance} />
                  <Transaction transactions={wallet.transations} />
                </>
              )}
              {isBuyerNoAdmin && (
                <>
                  <CreditLine creditLine={creditLine} />
                  <Transaction transactions={wallet.transations} />
                  <LastTransactionDate date={wallet.lastTransactionDate} />
                </>
              )}
              {sellerOrPartner && (
                <>
                  <TradedAmount amount={wallet.amount} />
                  <Transaction transactions={wallet.transations} />
                  <LastTransactionDate date={wallet.lastTransactionDate} />
                </>
              )}
              <Colxx xxs="6" sm="4" md="3" className="mb-4">
                <Card>
                  <CardBody className="text-center">
                    <p className="card-text font-weight-semibold mb-0">
                      Total Amount of Transactions (€)
                    </p>
                    <p className="lead text-center">{getEuroCurrencyDisplayFormat(wallet.amount, 0)}</p>
                  </CardBody>
                </Card>
              </Colxx>
            </div>
          </CardBody>
        </Card>
      </Colxx>

      <Colxx xxs='12' className='mb-4'>
        <Card>
          <CardBody>
            <CardTitle className='mb-3'>
              <IntlMessages id='pages.wallet.chart.transactions' />
            </CardTitle>
            <Separator className='mb-3' />
            <Transactions
              sellerMemberId={selectedSellerMemberId}
            />
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  )
}

export default DetailsTab
