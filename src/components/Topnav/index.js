import React, { useState } from 'react'
import { object } from 'prop-types'
import styled from 'styled-components'
import cx from 'classnames'
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useOktaAuth } from '@okta/okta-react'
import { clearStorage } from '@/utils/storage'

import {
  setContainerClassnames,
  clickOnMobileMenu
} from '@/redux/actions'

import { MobileMenuIcon, MenuIcon } from '@/components/svg'

import IntlMessages from '@/utils/IntlMessages'
import { getCurrentUser } from '@/utils/session'

import { ROLE_TYPE } from '@/constants/roles'

// import TopnavNotifications from './Notifications'

import ToggleDarkMode from './ToggleDarkMode'
// import ToggleMemberApproval from './ToggleMemberApproval'

const Logo = styled.div`
  cursor: pointer;

  &.userNotApproved {
    margin-left: 50px;
    cursor: auto;
  }
`

const DROPDOWN_ITEMS = [{
  title: 'menu.membership-agreement',
  path: 'membership-agreement',
  roleType: ROLE_TYPE.MEMBER
}, {
  title: 'menu.form-psa',
  path: 'form-psa',
  filePath: 'https://txc-markets-public.s3.eu-central-1.amazonaws.com/PSA.docx'
},
// {
//   title: 'menu.form-deed',
//   path: 'form-deed',
// },
{
  title: 'menu.terms-use',
  path: 'terms-of-use',
  filePath: 'https://txc-markets-public.s3.eu-central-1.amazonaws.com/Platform+Regulation.pdf'
}, {
  title: 'menu.privacy-policy',
  path: 'privacy-policy',
  filePath: 'https://txc-markets-public.s3.eu-central-1.amazonaws.com/Privacy.pdf'
}, {
  title: 'menu.settings',
  path: 'administrative/account-settings',
}, {
  divider: true
}]

const TopNav = ({ history }) => {
  const dispatch = useDispatch()
  const { authService } = useOktaAuth()

  const {
    containerClassnames,
    menuClickCount,
    selectedMenuHasSubItems
  } = useSelector(({ menu }) => menu)

  const userLogged = getCurrentUser()

  const [isInFullScreen, setIsInFullScreen] = useState(false)

  const isInFullScreenEnabled = () => (
    (document.fullscreenElement && document.fullscreenElement !== null)
      || (document.webkitFullscreenElement
        && document.webkitFullscreenElement !== null)
      || (document.mozFullScreenElement
        && document.mozFullScreenElement !== null)
      || (document.msFullscreenElement && document.msFullscreenElement !== null)
  )

  const toggleFullScreen = () => {
    const isInFullScreen = isInFullScreenEnabled()

    const docElm = document.documentElement
    if (!isInFullScreen) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen()
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen()
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen()
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen()
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }

    setIsInFullScreen(!isInFullScreen)
  }

  const handleLogout = async () => {
    clearStorage()
    authService.logout('/user/login')
  }

  const menuButtonClick = (e, menuClickCount, containerClassnames) => {
    e.preventDefault()

    setTimeout(() => {
      const event = document.createEvent('HTMLEvents')
      event.initEvent('resize', false, false)
      window.dispatchEvent(event)
    }, 350)

    dispatch(setContainerClassnames(
      menuClickCount + 1,
      containerClassnames,
      selectedMenuHasSubItems
    ))
  }

  const mobileMenuButtonClick = (e, containerClassnames) => {
    e.preventDefault()
    dispatch(clickOnMobileMenu(containerClassnames))
  }

  const goToDashboard = () => {
    if (!userLogged.registerApproved) return

    history.replace('/app')
  }

  return (
    <nav className="navbar fixed-top">
      {userLogged?.registerApproved && (
        <>
          <NavLink
            to="#"
            className="menu-button d-none d-md-block"
            onClick={(e) => menuButtonClick(e, menuClickCount, containerClassnames)}
          >
            <MenuIcon />
          </NavLink>
          <NavLink
            to="#"
            className="menu-button-mobile d-xs-block d-sm-block d-md-none"
            onClick={(e) => mobileMenuButtonClick(e, containerClassnames)}
          >
            <MobileMenuIcon />
          </NavLink>
        </>
      )}

      <Logo
        onClick={goToDashboard}
        className={cx('navbar-logo', {
          userNotApproved: !userLogged?.registerApproved
        })}
      >
        <span className="logo d-none d-xs-block" />
        <span className="logo-mobile d-block d-xs-none" />
      </Logo>

      <div className="ml-auto d-flex align-items-center">
        <div className="header-icons d-inline-flex align-items-center">
          <div className="position-relative mr-3 d-none d-lg-inline-block">
            <ToggleDarkMode />
          </div>
          {/* <div className="position-relative mr-1 d-none d-lg-inline-block">
            <ToggleMemberApproval />
          </div> */}
          {/* <TopnavNotifications /> */}
          <div className="position-relative d-lg-inline-block">
            <button
              className="header-icon btn btn-empty d-none d-sm-inline-block"
              type="button"
              id="fullScreenButton"
              onClick={toggleFullScreen}
            >
              {isInFullScreen ? (
                <i className="simple-icon-size-actual d-block" />
              ) : (
                <i className="simple-icon-size-fullscreen d-block" />
              )}
            </button>
          </div>
        </div>
        <div className="user d-inline-block">
          <UncontrolledDropdown className="dropdown-menu-right">
            <DropdownToggle className="p-0 d-flex align-items-center" color="empty">
              <span className="name mr-2">
                {userLogged?.role.description}
              </span>
              <span>
                <i className="simple-icon-settings" style={{ fontSize: 32 }} />
              </span>
            </DropdownToggle>
            <DropdownMenu className="mt-3" right>
              {DROPDOWN_ITEMS.map(({
                title, path, divider, roleType, filePath
              }, index) => {
                const hasPermission = !roleType || roleType === userLogged.role.type

                if (!hasPermission) return <div key={index} />

                if (divider) {
                  return <DropdownItem key={index} divider />
                }
                return (
                  <DropdownItem
                    key={index}
                    {...(filePath ? { href: filePath } : { onClick: () => history.push(`/app/${path}`) })}
                  >
                    <IntlMessages id={title} />
                  </DropdownItem>
                )
              })}
              <DropdownItem key="logout" onClick={handleLogout}>
                Sign out
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
    </nav>
  )
}

TopNav.propTypes = {
  history: object
}

export default TopNav
