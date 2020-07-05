/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { object, element, oneOfType, array } from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

import { getCurrentUser } from '@/utils/session'

import { useToast } from '@/hooks'

const AuthorizationRoute = ({ roles, component: Component, ...rest }) => {
  const showToast = useToast()

  return (
    <Route
      {...rest}
      render={(props) => {
        const { role: { name: userRole } } = getCurrentUser()

        const hasRole = roles.includes(userRole)

        if (!hasRole) {
          showToast('error', "You don't have permission to see this screen")
          return (
            <Redirect to='/' />
          )
        }

        return (
          <Component {...props} />
        )
      }}
    />
  )
}

AuthorizationRoute.propTypes = {
  roles: array,
  component: oneOfType([element, object])
}

export default AuthorizationRoute
