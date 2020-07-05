import React from 'react'
import { object, string } from 'prop-types'
import {
  Row,
  Card,
  CardBody,
  CardTitle,
} from 'reactstrap'

import { Colxx, Separator } from '@/components/CustomBootstrap'

import IntlMessages from '@/utils/IntlMessages'
import { getHumanizedDateFormat } from '@/utils/date'
import { getEuroCurrencyDisplayFormat } from '@/utils/currency'
import { getPercentageDisplayFormat } from '@/utils/formatType'
import { useRole } from '@/hooks'
import { ROLE } from '@/constants/roles'

const ListItem = ({ label, value }) => (
  <li className="mb-2">
    <b><IntlMessages id={`pages.trades.details.${label}`} /></b>:
    <span className="float-right">{value || '-'}</span>
  </li>
)

ListItem.propTypes = {
  label: string,
  value: string
}

const DetailsTab = ({ trade }) => {
  const [canSeeOperationsFee] = useRole([
    ROLE.TXC_ACCOUNT_ADMIN,
    ROLE.TXC_SUPER_ADMIN,
    ROLE.TXC_BACK_OFFICE,
    ROLE.TXC_OPERATION,
    ROLE.MEMBER_BUYER_ALL_ACCOUNT_ADMIN,
    ROLE.MEMBER_BUYER_ALL,
    ROLE.MEMBER_BUYER_DERIVATIVE_ACCOUNT_ADMIN,
    ROLE.MEMBER_BUYER_DERIVATIVE,
    ROLE.MEMBER_BUYER_CLAIM_ACCOUNT_ADMIN,
    ROLE.MEMBER_BUYER_CLAIM
  ])

  const [canSeeAuctionFee] = useRole([
    ROLE.TXC_ACCOUNT_ADMIN,
    ROLE.TXC_SUPER_ADMIN,
    ROLE.TXC_BACK_OFFICE,
    ROLE.TXC_OPERATION,
    ROLE.MEMBER_SELLER,
    ROLE.BROKER
  ])

  return (
    <Row>
      <Colxx xxs="12" lg="6" className="mb-4">
        <Card className="mb-4">
          <CardBody>

            <CardTitle className="mb-3">
              <IntlMessages id="pages.trades.details.description" />
            </CardTitle>
            <Separator className="mb-5" />

            <ul className="list-unstyled p-0 mb-3">
              <ListItem
                label="trade-id"
                value={trade?.id}
              />
              <ListItem
                label="claim-id"
                value={trade?.claim?.id}
              />
              <ListItem
                label="buyer-name"
                value={`${trade?.buyerUser?.firstName} ${trade?.buyerUser?.surName}`}
              />
              <ListItem
                label="seller-name"
                value={trade?.sellerMember?.companyName}
              />
              <ListItem
                label="price"
                value={getEuroCurrencyDisplayFormat(trade?.px)}
              />
              <ListItem
                label="amount"
                value={getEuroCurrencyDisplayFormat(trade?.amount)}
              />
            </ul>
          </CardBody>
        </Card>
      </Colxx>

      <Colxx xxs="12" lg="6" className="mb-4">
        <Card className="mb-4">
          <CardBody>

            <CardTitle className="mb-3">
              <IntlMessages id="pages.trades.details.info" />
            </CardTitle>

            <Separator className="mb-5" />

            <ul className="list-unstyled p-0 mb-3">
              <ListItem
                label="face-value"
                value={getEuroCurrencyDisplayFormat(trade?.amount)}
              />
              <ListItem
                label="yeild-tr"
                value={getPercentageDisplayFormat(trade?.yeildTr)}
              />
              <ListItem
                label="multiple"
                value={trade?.multiple}
              />
              <ListItem
                label="creation-date"
                value={getHumanizedDateFormat(parseInt(trade?.tradeDate, 0))}
              />
              <ListItem
                label="payment"
                value={trade?.claim?.dso}
              />
              <ListItem
                label="repayment"
                value={getEuroCurrencyDisplayFormat(trade?.claim?.expectedRepaymentValue)}
              />
              <ListItem
                label="rating"
                value={trade?.claim?.rating}
              />
              {canSeeOperationsFee && (
                <ListItem
                  label="claim-operations-fee"
                  value={trade?.claim?.tcOpFeeValue}
                />
              )}
              {canSeeAuctionFee && (
                <ListItem
                  label="claim-auction-fee"
                  value={trade?.claim?.tcFeeValue}
                />
              )}
            </ul>
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  )
}

DetailsTab.propTypes = {
  trade: object
}

export default DetailsTab
