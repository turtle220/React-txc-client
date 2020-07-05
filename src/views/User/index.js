import React from 'react'
import { object } from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'

import UserLayout from '../../layout/UserLayout'

import Login from './Login'
import Register from './Register'
import RegisterInvite from './RegisterInvite'
import ForgotPassword from './ForgotPassword'
import CheckInbox from './CheckInbox'
import ResetPassword from './ResetPassword'
import ResetPasswordSuccessful from './ResetPasswordSuccessful'

const User = ({ match }) => (
  <UserLayout>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/login`} />
      <Route path={`${match.url}/login`} component={Login} />
      <Route path={`${match.url}/register/:inviteId`} component={RegisterInvite} />
      <Route path={`${match.url}/register`} component={Register} />
      <Route
        path={`${match.url}/forgot-password`}
        component={ForgotPassword}
      />
      <Route path={`${match.url}/reset-password`} component={ResetPassword} />
      <Route path={`${match.url}/check-inbox`} component={CheckInbox} />
      <Route path={`${match.url}/reset-password-successful`} component={ResetPasswordSuccessful} />
      <Redirect to="/error" />
    </Switch>
  </UserLayout>
)

User.propTypes = {
  match: object
}

export default User
