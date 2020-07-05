import React from 'react'
import { Redirect } from 'react-router-dom'
import { useOktaAuth } from '@okta/okta-react'

import LoginForm from './LoginForm'

const Login = ({ baseUrl }) => {
  const { authState } = useOktaAuth()

  if (authState.isPending) {
    return <div>Loading...</div>
  }
  return authState.isAuthenticated
    ? <Redirect to={{ pathname: '/app' }} />
    : <LoginForm baseUrl={baseUrl} />
}

export default Login
