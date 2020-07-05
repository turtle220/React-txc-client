import React from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import PageLoader from '@/components/PageLoader'
import { clearStorage } from '@/utils/storage'
import { getCurrentUser } from '@/utils/session'

const Logout = ({ history }) => {
  const client = useApolloClient()
  const userLogged = getCurrentUser()
  const theme = localStorage.getItem('themeColor')
  clearStorage()
  if (theme) {
    localStorage.setItem('themeColor', theme)
  }

  client.resetStore()
  if (!userLogged.isDevUser) {
    const id_token = userLogged.idToken
    const redirect_uri = `${window.location.origin}/user/login`
    window.location.href = `${process.env.REACT_APP_OKTA_ISSUER_URL}/logout?id_token_hint=${id_token}&post_logout_redirect_uri=${redirect_uri}&state=FDGW`
  } else {
    history.replace('/user/login')
  }
  return (<PageLoader />)
}

export default Logout
