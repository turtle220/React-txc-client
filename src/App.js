import React, { Suspense, lazy } from 'react'
import { useSelector } from 'react-redux'
import { Security, LoginCallback } from '@okta/okta-react'
import { ApolloProvider } from '@apollo/react-hooks'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory
} from 'react-router-dom'
import { IntlProvider } from 'react-intl'

import PageLoader from '@/components/PageLoader'
import SecureRoute from '@/components/SecureRoute'

import { apolloClient } from '@/utils/apollo'

import AppLocale from './lang'

const Home = lazy(() => import('./views'))
const Main = lazy(() => import('./views/Main'))
const User = lazy(() => import('./views/User'))
const Logout = lazy(() => import('./views/User/Logout'))
const Docusign = lazy(() => import('./components/Docusign/route'))
const Error = lazy(() => import('./views/Error'))
const Unauthorized = lazy(() => import('./views/Unauthorized'))

const { REACT_APP_OKTA_ISSUER_URL, REACT_APP_CLIENT_ID } = process.env

const AppRoutes = () => {
  const history = useHistory()

  const onAuthRequired = () => {
    history.push('/user/login')
  }

  return (
    <Security
      issuer={REACT_APP_OKTA_ISSUER_URL}
      clientId={REACT_APP_CLIENT_ID}
      redirectUri={`${window.location.origin}/implicit/callback`}
      onAuthRequired={onAuthRequired}
      tokenManager={{
        storage: 'sessionStorage'
      }}
      pkce
    >
      <Switch>
        <SecureRoute
          path="/app"
          component={Main}
        />
        <Route path="/" exact component={Home} />
        <Route path="/user" component={User} />
        <Route path="/logout" component={Logout} />
        <Route path='/docusign' component={Docusign} />
        <Route path="/error" exact component={Error} />
        <Route path="/unauthorized" exact component={Unauthorized} />
        <Route path='/implicit/callback' component={LoginCallback} />
        <Redirect to="/error" />
      </Switch>
    </Security>
  )
}

const App = () => {
  const { locale } = useSelector(({ settings }) => settings)
  const currentAppLocale = AppLocale[locale]

  return (
    <ApolloProvider client={apolloClient}>
      <div className="h-100">
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <Suspense fallback={<PageLoader />}>
            <Router>
              <AppRoutes />
            </Router>
          </Suspense>
        </IntlProvider>
      </div>
    </ApolloProvider>
  )
}

export default App
