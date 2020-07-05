import React, { Suspense, lazy, useEffect } from 'react'
import { object } from 'prop-types'
import { Route, withRouter, Switch, Redirect } from 'react-router-dom'

import AppLayout from '@/layout/AppLayout'

import PageLoader from '@/components/PageLoader'
import { AuthorizationRoute } from '@/components/PrivateRoute'

import { ROLE } from '@/constants/roles'

import { getCurrentUser } from '@/utils/session'

const MyDashboard = lazy(() => import('./MyDashboard'))
const Administrative = lazy(() => import('./Administrative'))
const Tasks = lazy(() => import('./Tasks'))
const Derivatives = lazy(() => import('./Derivatives'))
const DerivativeDetails = lazy(() => import('./DerivativeDetails'))
const Claims = lazy(() => import('./Claims'))
const ClaimsDetails = lazy(() => import('./ClaimsDetails'))
const Trades = lazy(() => import('./Trades'))
const TradeDetails = lazy(() => import('./TradeDetails'))
const Portifolio = lazy(() => import('./Portifolio'))
const Wallet = lazy(() => import('./Wallet'))
const MemberAgreement = lazy(() => import('./MemberAgreement'))
const Clients = lazy(() => import('./Clients'))


const Main = ({ match, history }) => {
  const approved = getCurrentUser().registerApproved

  useEffect(() => {
    if (!approved) {
      history.replace('/app/membership-agreement')
    }
  }, [])

  return (
    <AppLayout>
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Redirect exact path='/app' to={`${match.url}/my-dashboard`} />
          <Route
            path={`${match.url}/my-dashboard`}
            component={MyDashboard}
          />
          <Route
            path={`${match.url}/administrative`}
            component={Administrative}
          />
          <Route path={`${match.url}/tasks`} component={Tasks} />
          <AuthorizationRoute
            exact
            roles={[
              ROLE.TXC_ACCOUNT_ADMIN,
              ROLE.TXC_SUPER_ADMIN,
              ROLE.TXC_OPERATION,
              ROLE.TXC_BACK_OFFICE,
              ROLE.MEMBER_BUYER_DERIVATIVE_ACCOUNT_ADMIN,
              ROLE.MEMBER_BUYER_DERIVATIVE
            ]}
            path={`${match.url}/derivatives`}
            component={Derivatives}
          />
          <AuthorizationRoute
            exact
            roles={[
              ROLE.TXC_ACCOUNT_ADMIN,
              ROLE.TXC_SUPER_ADMIN,
              ROLE.TXC_OPERATION,
              ROLE.TXC_BACK_OFFICE,
              ROLE.MEMBER_BUYER_DERIVATIVE_ACCOUNT_ADMIN,
              ROLE.MEMBER_BUYER_DERIVATIVE
            ]}
            path={`${match.url}/derivatives/:derivativeId`}
            component={DerivativeDetails}
          />
          <AuthorizationRoute
            exact
            roles={[
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
              ROLE.DELOITTE_CONSULTANT,
              ROLE.NOTARY_ADMIN
            ]}
            path={`${match.url}/claims`}
            component={Claims}
          />
          <AuthorizationRoute
            exact
            roles={[
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
              ROLE.DELOITTE_CONSULTANT,
              ROLE.NOTARY_ADMIN,
              ROLE.TXC_BACK_OFFICE
            ]}
            path={`${match.url}/claims/:claimId`}
            component={ClaimsDetails}
          />
          <AuthorizationRoute
            exact
            roles={[
              ROLE.TXC_ACCOUNT_ADMIN,
              ROLE.TXC_SUPER_ADMIN,
              ROLE.TXC_OPERATION,
              ROLE.TXC_BACK_OFFICE,
              ROLE.NOTARY_ADMIN,
              ROLE.BROKER,
              ROLE.MEMBER_SELLER,
              ROLE.MEMBER_BUYER_CLAIM,
              ROLE.MEMBER_BUYER_CLAIM_ACCOUNT_ADMIN,
              ROLE.MEMBER_BUYER_DERIVATIVE,
              ROLE.MEMBER_BUYER_DERIVATIVE_ACCOUNT_ADMIN,
              ROLE.MEMBER_BUYER_ALL,
              ROLE.MEMBER_BUYER_ALL_ACCOUNT_ADMIN
            ]}
            path={`${match.url}/trades`}
            component={Trades}
          />
          <AuthorizationRoute
            exact
            roles={[
              ROLE.TXC_ACCOUNT_ADMIN,
              ROLE.TXC_SUPER_ADMIN,
              ROLE.TXC_OPERATION,
              ROLE.TXC_BACK_OFFICE,
              ROLE.NOTARY_ADMIN,
              ROLE.BROKER,
              ROLE.MEMBER_SELLER,
              ROLE.MEMBER_BUYER_CLAIM,
              ROLE.MEMBER_BUYER_CLAIM_ACCOUNT_ADMIN,
              ROLE.MEMBER_BUYER_DERIVATIVE,
              ROLE.MEMBER_BUYER_DERIVATIVE_ACCOUNT_ADMIN,
              ROLE.MEMBER_BUYER_ALL,
              ROLE.MEMBER_BUYER_ALL_ACCOUNT_ADMIN
            ]}
            path={`${match.url}/trades/:tradeId`}
            component={TradeDetails}
          />
          <AuthorizationRoute
            exact
            roles={[ROLE.BROKER]}
            path={`${match.url}/clients`}
            component={Clients}
          />
          <Route path={`${match.url}/portifolio`} component={Portifolio} />
          <AuthorizationRoute
            roles={[
              ROLE.TXC_ACCOUNT_ADMIN,
              ROLE.TXC_SUPER_ADMIN,
              ROLE.TXC_BACK_OFFICE,
              ROLE.BROKER,
              ROLE.MEMBER_SELLER,
              ROLE.MEMBER_BUYER_ALL,
              ROLE.MEMBER_BUYER_ALL_ACCOUNT_ADMIN,
              ROLE.MEMBER_BUYER_CLAIM,
              ROLE.MEMBER_BUYER_CLAIM_ACCOUNT_ADMIN,
              ROLE.MEMBER_BUYER_DERIVATIVE,
              ROLE.MEMBER_BUYER_DERIVATIVE_ACCOUNT_ADMIN
            ]}
            path={`${match.url}/wallet`}
            component={Wallet}
          />
          <Route
            path={`${match.url}/membership-agreement`}
            component={MemberAgreement}
          />
          <Redirect to='/error' />
        </Switch>
      </Suspense>
    </AppLayout>
  )
}

Main.propTypes = {
  match: object
}

export default withRouter(Main)
