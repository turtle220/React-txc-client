import React from 'react'
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  Table,
  Button,
} from 'reactstrap'
import { func, string } from 'prop-types'
import { NavLink } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import format from 'date-fns/format'

import IntlMessages from '@/utils/IntlMessages'
import { getHumanizedDateFormat } from '@/utils/date'
import { numberFormat } from '@/utils/number'

import { Colxx, Separator } from '@/components/CustomBootstrap'
import PageLoader from '@/components/PageLoader'

import { CLAIMS_QUERY, GET_DERIVATIVE } from './graphql/queries'

const ListItem = ({ label, value }) => (
  <li className="mb-2">
    <b><IntlMessages id={`pages.derivatives.details.${label}`} /></b>:
    <span className="float-right">{value || '-'}</span>
  </li>
)

ListItem.propTypes = {
  label: string,
  value: string
}

const DetailsTab = ({ changeTab, derivativeId }) => {
  const { data: { claims = [] } = {}, loading } = useQuery(CLAIMS_QUERY, {
    variables: {
      limit: 5
    }
  })

  const { data: { derivative: trade = {} } = {}, loadingDerivative } = useQuery(GET_DERIVATIVE, {
    variables: {
      id: derivativeId
    }
  })

  if (loading || loadingDerivative) {
    return <PageLoader />
  }

  return (
    <Row>

      <Colxx xxs="12" lg="5" className="mb-4">
        <Card className="mb-4">
          <CardBody>

            <CardTitle className="mb-3">
              <IntlMessages id="pages.derivatives.details.description" />
            </CardTitle>
            <Separator className="mb-5" />

            <ul className="list-unstyled p-0 mb-3">
              <ListItem
                label="price"
                value={`€ ${numberFormat(trade?.amount, '0,0')}`}
              />
              <ListItem
                label="amount"
                value={numberFormat(trade?.derivative?.tradeNotionalAmount, '0,0')}
              />
              <ListItem
                label="date"
                value={trade?.tradeDate ? getHumanizedDateFormat(trade?.tradeDate) : ''}
              />
              <ListItem
                label="payoff"
                value={trade?.derivative?.optionPayoff || ''}
              />
              <ListItem
                label="expiry"
                value={trade?.derivative?.expiryDate ? format(new Date(trade?.derivative?.expiryDate), 'MM/dd/yyyy') : ''}
              />
            </ul>

          </CardBody>
        </Card>
      </Colxx>

      <Colxx xxs="12" lg="7" className="mb-4">
        <Card className="mb-4">
          <CardBody>

            <Button
              onClick={() => changeTab('4')}
              className="float-sm-right p-0"
              size="sm"
              color="link"
            >
              <IntlMessages id="general.view-all" />
            </Button>

            <CardTitle className="mb-3">
              <IntlMessages id="pages.derivatives.details.composition" />
            </CardTitle>

            <Separator className="mb-5" />

            <Table bordered>
              <tbody>

                {claims.map((claim) => (
                  <tr key={claim.id}>
                    <td className="list-item-heading">
                      <b>{claim?.sellerMember?.companyName}</b>
                    </td>
                    <td className="list-item-heading text-center">
                      <NavLink to={`/app/claims/${claim.id}`}>
                        <IntlMessages id="general.view-details" />
                      </NavLink>
                    </td>
                  </tr>
                ))}

              </tbody>
            </Table>

          </CardBody>
        </Card>
      </Colxx>

    </Row>
  )
}

DetailsTab.propTypes = {
  changeTab: func.isRequired,
  derivativeId: string.isRequired
}

export default DetailsTab
