import React from 'react'
import { object, string } from 'prop-types'
import {
  Row,
  Card,
  CardBody,
  CardTitle
} from 'reactstrap'

import { useRole } from '@/hooks'
import { ROLE } from '@/constants/roles'
import IntlMessages from '@/utils/IntlMessages'
import { Colxx, Separator } from '@/components/CustomBootstrap'
import { getEuroCurrencyDisplayFormat } from '@/utils/currency'
import { getHumanizedDateFormat } from '@/utils/date'
import { getPercentDisplay } from '@/utils/number'

const ListItem = ({ label, value }) => (
  <li className="mb-2">
    <b><IntlMessages id={`pages.claims.details.${label}`} /></b>:
    <span className="float-right">{value || '-'}</span>
  </li>
)

ListItem.propTypes = {
  label: string,
  value: string
}

const DetailsTab = ({ claim }) => {
  const [isBuyer] = useRole([
    ROLE.MEMBER_BUYER_CLAIM_ACCOUNT_ADMIN,
    ROLE.MEMBER_BUYER_CLAIM
  ])
  const [isSeller] = useRole([
    ROLE.MEMBER_SELLER
  ])

  return (
    <Row>
      <Colxx xxs="12" lg="6" className="mb-4">
        <Card className="mb-4">
          <CardBody>
            <CardTitle className="mb-3">
              <IntlMessages id="pages.claims.details.description" />
            </CardTitle>

            <Separator className="mb-5" />

            <ul className="list-unstyled p-0 mb-3">
              <ListItem label="seller-name" value={claim?.sellerMember?.companyName} />
              <ListItem label="type" value={claim?.type} />
              <ListItem label="notional-value" value={getEuroCurrencyDisplayFormat(claim?.notionalValue)} />
              <ListItem label="claim-issue-date" value={getHumanizedDateFormat(claim?.claimIssueDate)} />
              <ListItem label="dso" value={claim?.dso} />
              <ListItem
                label="expected-repayment-value"
                value={getEuroCurrencyDisplayFormat(claim?.expectedRepaymentValue)}
              />
              <ListItem
                label="expected-repayment-date"
                value={getHumanizedDateFormat(claim?.repaymentDate)}
              />
              <ListItem label="status" value={claim?.status} />
              <ListItem label="category" value={claim?.category} />
            </ul>
          </CardBody>
        </Card>
      </Colxx>

      <Colxx xxs="12" lg="6" className="mb-4">
        <Card className="mb-8">
          <CardBody>
            <CardTitle className="mb-3">
              <IntlMessages id="pages.claims.details.price-rating" />
            </CardTitle>

            <Separator className="mb-5" />

            <ul className="list-unstyled p-0 mb-3">
              <ListItem label="starting-px" value={getEuroCurrencyDisplayFormat(claim?.startingPx)} />
              <ListItem label="buy-now-px" value={getEuroCurrencyDisplayFormat(claim?.auctionBuyNowPx)} />
              <ListItem label="rating" value={claim?.rating} />
              {!isBuyer && (
                <ListItem label="auction-fee" value={claim?.tcFeeValue * 10000} />
              )}
              <ListItem label="derivative-fee" value={claim?.derivativeFeeValue * 10000} />
              {!isSeller && (
                <ListItem label="operations-fee" value={claim?.tcOpFeeValue * 10000} />
              )}
              <ListItem label="derivative-operations-fee" value={claim?.derivativeOpValue * 10000} />
              <ListItem label="penalty-interest-rate" value={getPercentDisplay(claim?.penaltyInterestRate)} />
            </ul>
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  )
}

DetailsTab.propTypes = {
  claim: object
}

export default DetailsTab
