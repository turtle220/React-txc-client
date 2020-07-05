import React, { Suspense, lazy } from 'react'
import { object } from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'

import { AuthorizationRoute } from '@/components/PrivateRoute'
import PageLoader from '@/components/PageLoader'
import { ROLE } from '@/constants/roles'

const Users = lazy(() => import('./Users'))
const UserDetails = lazy(() => import('./UserDetails'))
const AccountSettings = lazy(() => import('./AccountSettings'))
const Members = lazy(() => import('./Members'))
const MemberDetails = lazy(() => import('./MemberDetails'))

const Administrative = ({ match }) => (
  <Suspense fallback={<PageLoader />}>
    <Switch>
      <Redirect exact path='/app/administrative' to={`${match.url}/users`} />
      <AuthorizationRoute
        exact
        roles={[
          ROLE.TXC_ACCOUNT_ADMIN,
          ROLE.TXC_SUPER_ADMIN,
          ROLE.TXC_OPERATION,
          ROLE.TXC_BACK_OFFICE,
          ROLE.NOTARY_ADMIN
        ]}
        path={`${match.url}/users`}
        component={Users}
      />
      <AuthorizationRoute
        roles={[
          ROLE.TXC_ACCOUNT_ADMIN,
          ROLE.TXC_SUPER_ADMIN,
          ROLE.TXC_OPERATION,
          ROLE.TXC_BACK_OFFICE,
          ROLE.NOTARY_ADMIN
        ]}
        path={`${match.url}/users/:userId/member/:memberId`}
        component={UserDetails}
      />
      <Route
        exact
        path={`${match.url}/account-settings`}
        component={AccountSettings}
      />
      <Route
        path={`${match.url}/account-settings/:userId`}
        component={AccountSettings}
      />
      <AuthorizationRoute
        exact
        roles={[
          ROLE.TXC_ACCOUNT_ADMIN,
          ROLE.TXC_SUPER_ADMIN,
          ROLE.BROKER,
          ROLE.TXC_OPERATION,
          ROLE.NOTARY_ADMIN
        ]}
        path={`${match.url}/members`}
        component={Members}
      />
      <AuthorizationRoute
        roles={[
          ROLE.TXC_ACCOUNT_ADMIN,
          ROLE.TXC_SUPER_ADMIN,
          ROLE.BROKER,
          ROLE.TXC_OPERATION,
          ROLE.NOTARY_ADMIN
        ]}
        path={`${match.url}/members/:memberId`}
        component={MemberDetails}
      />
      <Redirect to='/error' />
    </Switch>
  </Suspense>
)

Administrative.propTypes = {
  match: object
}

export default Administrative
