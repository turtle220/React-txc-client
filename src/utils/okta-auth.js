import OktaAuth from '@okta/okta-auth-js'

const {
  REACT_APP_OKTA_ISSUER_URL,
  REACT_APP_CLIENT_ID
} = process.env

const oktaAuth = new OktaAuth({
  issuer: REACT_APP_OKTA_ISSUER_URL,
  clientId: REACT_APP_CLIENT_ID
})

export const oktaSignIn = ({ username, password }) => (
  oktaAuth.signIn({
    username,
    password
  })
)

export const oktaForgotPassword = ({ email }) => (
  oktaAuth.forgotPassword({
    username: email,
    factorType: 'EMAIL',
    relayState: `${window.location.origin}/user/reset-password-successful`
  })
)
