import React from 'react'
import { object } from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'
import UserLayout from '../../layout/UserLayout'

import DocusignSigned from './DocusignSigned'

const Docusign = ({ match }) => (
  <UserLayout>
    <Switch>
      <Route
        path={`${match.url}/signed`}
        component={DocusignSigned}
      />
      <Redirect to="/error" />
    </Switch>
  </UserLayout>
)

Docusign.propTypes = {
  match: object
}

export default Docusign
