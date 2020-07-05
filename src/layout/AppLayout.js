import React from 'react'
import { node } from 'prop-types'
import cx from 'classnames'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { getCurrentUser } from '@/utils/session'

import TopNav from '../components/Topnav'
import Sidebar from '../components/Sidebar'

const AppLayout = ({ children }) => {
  const { containerClassnames } = useSelector(({ menu }) => menu)
  const history = useHistory()

  const userLogged = getCurrentUser()

  return (
    <div
      id="app-container"
      className={cx(containerClassnames, {
        'menu-default main-hidden sub-hidden menu-sub-hidden': !userLogged?.registerApproved,
      })}
    >
      <TopNav history={history} />
      {userLogged?.registerApproved && <Sidebar />}
      <main>
        <div className="container-fluid">
          {children}
        </div>
      </main>
    </div>
  )
}

AppLayout.propTypes = {
  children: node.isRequired
}

export default AppLayout
