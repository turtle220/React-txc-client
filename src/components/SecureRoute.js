import React from 'react'
import { useHistory, Route } from 'react-router-dom'
import { useOktaAuth } from '@okta/okta-react'

const SecureRoute = ({ component: Component, ...rest }) => {
  const { authService, authState } = useOktaAuth()
  const history = useHistory()

  if (!authState.isAuthenticated) {
    if (!authState.isPending) {
      const fromUri = history.createHref(history.location)
      authService.login(fromUri)
    }
    return null
  }

  return (
    <Route
      {...rest}
      render={(props) => (
        <Component {...props} />
      )}
    />
  )
}

export default SecureRoute
