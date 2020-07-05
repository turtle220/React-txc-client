/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { object, element, oneOfType, string } from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

import { getCurrentUser } from '@/utils/session'

const AuthenticationRoute = ({ component: Component, authUser, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const loggedUser = getCurrentUser()

      if (!loggedUser?.token) {
        return (
          <Redirect to="/user/login" />
        )
      }

      if (loggedUser) {
        return <Component {...props} />
      }

      return (
        <Redirect
          to={{
            pathname: '/user/login',
            state: { from: props.location }
          }}
        />
      )
    }}
  />
)

AuthenticationRoute.propTypes = {
  component: oneOfType([element, object]),
  authUser: oneOfType([string, object]),
}

export default AuthenticationRoute
