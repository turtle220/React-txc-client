/* eslint-disable */
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import { Nav, NavItem, UncontrolledCollapse } from 'reactstrap'
import { NavLink, withRouter } from 'react-router-dom'
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'

import { getCurrentUser } from '@/utils/session'

import IntlMessages from '../../utils/IntlMessages'

import {
  setContainerClassnames,
  addContainerClassname,
  changeDefaultClassnames,
  changeSelectedMenuHasSubItems
} from '../../redux/actions'

import { MENU_IEMS } from './menu'

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedParentMenu: '',
      viewingParentMenu: ''
    }
  }

  componentDidMount() {
    //Temp fix for submenu popping out on resize
    //window.addEventListener('resize', this.handleWindowResize)
    this.handleWindowResize()
    this.handleProps()
    this.setSelectedLiActive(this.setHasSubItemStatus)
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setSelectedLiActive(this.setHasSubItemStatus)

      window.scrollTo(0, 0)
    }
    this.handleProps()
  }

  componentWillUnmount() {
    this.removeEvents()
    window.removeEventListener('resize', this.handleWindowResize)
  }

  handleWindowResize = (event) => {
    if (event && !event.isTrusted) {
      return
    }
    const { containerClassnames } = this.props
    const nextClasses = this.getMenuClassesForResize(containerClassnames)
    this.props.setContainerClassnames(
      0,
      nextClasses.join(' '),
      this.props.selectedMenuHasSubItems
    )
  }

  handleDocumentClick = (e) => {
    const container = this.getContainer()
    let isMenuClick = false
    if (
      e.target
      && e.target.classList
      && (e.target.classList.contains('menu-button')
        || e.target.classList.contains('menu-button-mobile'))
    ) {
      isMenuClick = true
    } else if (
      e.target.parentElement
      && e.target.parentElement.classList
      && (e.target.parentElement.classList.contains('menu-button')
        || e.target.parentElement.classList.contains('menu-button-mobile'))
    ) {
      isMenuClick = true
    } else if (
      e.target.parentElement
      && e.target.parentElement.parentElement
      && e.target.parentElement.parentElement.classList
      && (e.target.parentElement.parentElement.classList.contains('menu-button')
        || e.target.parentElement.parentElement.classList.contains(
          'menu-button-mobile'
        ))
    ) {
      isMenuClick = true
    }
    if (container.contains(e.target) || container === e.target || isMenuClick) {
      return
    }
    this.setState({
      viewingParentMenu: ''
    })
    this.toggle()
  }

  getMenuClassesForResize = (classes) => {
    const { menuHiddenBreakpoint, subHiddenBreakpoint } = this.props
    let nextClasses = classes.split(' ').filter((x) => x !== '')
    const windowWidth = window.innerWidth
    if (windowWidth < menuHiddenBreakpoint) {
      nextClasses.push('menu-mobile')
    } else if (windowWidth < subHiddenBreakpoint) {
      nextClasses = nextClasses.filter((x) => x !== 'menu-mobile')
      if (
        nextClasses.includes('menu-default')
        && !nextClasses.includes('menu-sub-hidden')
      ) {
        nextClasses.push('menu-sub-hidden')
      }
    } else {
      nextClasses = nextClasses.filter((x) => x !== 'menu-mobile')
      if (
        nextClasses.includes('menu-default')
        && nextClasses.includes('menu-sub-hidden')
      ) {
        nextClasses = nextClasses.filter((x) => x !== 'menu-sub-hidden')
      }
    }
    return nextClasses
  }

  getContainer = () => ReactDOM.findDOMNode(this)

  toggle = () => {
    const hasSubItems = this.getIsHasSubItem()
    this.props.changeSelectedMenuHasSubItems(hasSubItems)
    const { containerClassnames, menuClickCount } = this.props
    const currentClasses = containerClassnames
      ? containerClassnames.split(' ').filter((x) => x !== '')
      : ''
    let clickIndex = -1

    if (!hasSubItems) {
      if (
        currentClasses.includes('menu-default')
        && (menuClickCount % 4 === 0 || menuClickCount % 4 === 3)
      ) {
        clickIndex = 1
      } else if (
        currentClasses.includes('menu-sub-hidden')
        && (menuClickCount === 2 || menuClickCount === 3)
      ) {
        clickIndex = 0
      } else if (
        currentClasses.includes('menu-hidden')
        || currentClasses.includes('menu-mobile')
      ) {
        clickIndex = 0
      }
    } else if (currentClasses.includes('menu-sub-hidden') && menuClickCount === 3) {
      clickIndex = 2
      } else if (
      currentClasses.includes('menu-hidden')
        || currentClasses.includes('menu-mobile')
    ) {
      clickIndex = 0
      }
    if (clickIndex >= 0) {
      this.props.setContainerClassnames(
        clickIndex,
        containerClassnames,
        hasSubItems
      )
    }
  }

  handleProps = () => {
    this.addEvents()
  }

  addEvents = () => {
    ['click', 'touchstart', 'touchend'].forEach((event) => document.addEventListener(event, this.handleDocumentClick, true))
  }

  removeEvents = () => {
    ['click', 'touchstart', 'touchend'].forEach((event) => document.removeEventListener(event, this.handleDocumentClick, true))
  }

  setSelectedLiActive = (callback) => {
    const oldli = document.querySelector('.sub-menu  li.active')
    if (oldli != null) {
      oldli.classList.remove('active')
    }

    /* set selected parent menu */
    const selectedlink = document.querySelector('.sub-menu  a.active')
    if (selectedlink != null) {
      selectedlink.parentElement.classList.add('active')
      this.setState(
        {
          selectedParentMenu: selectedlink.parentElement.parentElement.getAttribute(
            'data-parent'
          )
        },
        callback
      )
    } else {
      const selectedParentNoSubItem = document.querySelector(
        '.main-menu  li a.active'
      )
      if (selectedParentNoSubItem != null) {
        this.setState(
          {
            selectedParentMenu: selectedParentNoSubItem.getAttribute(
              'data-flag'
            )
          },
          callback
        )
      } else if (this.state.selectedParentMenu === '') {
        this.setState(
          {
            selectedParentMenu: MENU_IEMS[0].id
          },
          callback
        )
      }
    }
  }

  setHasSubItemStatus = () => {
    const hasSubmenu = this.getIsHasSubItem()
    this.props.changeSelectedMenuHasSubItems(hasSubmenu)
    this.toggle()
  }

  getIsHasSubItem = () => {
    const { selectedParentMenu } = this.state
    const menuItem = MENU_IEMS.find((x) => x.id === selectedParentMenu)
    if (menuItem) {return menuItem && menuItem.subs && menuItem.subs.length > 0
        ? true
        : false}
    return false
  }



  openSubMenu = (e, menuItem) => {
    const selectedParent = menuItem.id
    const hasSubMenu = menuItem.subs && menuItem.subs.length > 0
    this.props.changeSelectedMenuHasSubItems(hasSubMenu)
    if (!hasSubMenu) {
      this.setState({
        viewingParentMenu: selectedParent,
        selectedParentMenu: selectedParent
      })
      this.toggle()
    } else {
      e.preventDefault()

      const { containerClassnames, menuClickCount } = this.props
      const currentClasses = containerClassnames
        ? containerClassnames.split(' ').filter((x) => x !== '')
        : ''

      if (!currentClasses.includes('menu-mobile')) {
        if (
          currentClasses.includes('menu-sub-hidden')
          && (menuClickCount === 2 || menuClickCount === 0)
        ) {
          this.props.setContainerClassnames(3, containerClassnames, hasSubMenu)
        } else if (
          currentClasses.includes('menu-hidden')
          && (menuClickCount === 1 || menuClickCount === 3)
        ) {
          this.props.setContainerClassnames(2, containerClassnames, hasSubMenu)
        } else if (
          currentClasses.includes('menu-default')
          && !currentClasses.includes('menu-sub-hidden')
          && (menuClickCount === 1 || menuClickCount === 3)
        ) {
          this.props.setContainerClassnames(0, containerClassnames, hasSubMenu)
        }
      } else {
        this.props.addContainerClassname(
          'sub-show-temporary',
          containerClassnames
        )
      }
      this.setState({
        viewingParentMenu: selectedParent
      })
    }
  }

  renderIcon = (item) => item.customIcon ? (
    item.customIcon()
  ) : (
    <i className={item.icon} />
  )

  render() {
    const { selectedParentMenu, viewingParentMenu } = this.state

    const { role: { name: userRole } } = getCurrentUser()

    return (
      <div className="sidebar">
        <div className="main-menu">
          <div className="scroll">
            <PerfectScrollbar
              option={{ suppressScrollX: true, wheelPropagation: false }}
            >
              <Nav vertical className="list-unstyled">
                {MENU_IEMS.map((item, index) => {
                  const hasRole = !item.roles || item.roles.includes(userRole)
                  if (!hasRole) return <div />

                    return (
                      <NavItem
                          key={index}
                          className={classnames({
                            active:
                              (selectedParentMenu === item.id
                                && viewingParentMenu === '')
                              || viewingParentMenu === item.id
                          })}
                        >
                          {item.newWindow ? (
                            <a
                              href={item.to}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              {this.renderIcon(item)}{' '}
                              <IntlMessages id={item.label} />
                            </a>
                          ) : (
                            <NavLink
                              to={item.to}
                              onClick={(e) => this.openSubMenu(e, item)}
                              data-flag={item.id}
                            >
                              {this.renderIcon(item)}{' '}
                              <IntlMessages id={item.label} />
                            </NavLink>
                          )}
                        </NavItem>
                    )
                  })}
              </Nav>
            </PerfectScrollbar>
          </div>
        </div>

        <div className="sub-menu">
          <div className="scroll">
            <PerfectScrollbar
              option={{ suppressScrollX: true, wheelPropagation: false }}
            >
              {MENU_IEMS.map((item, index) => (
                  <Nav
                      key={index}
                      className={classnames({
                        'd-block':
                          (this.state.selectedParentMenu === item.id
                            && this.state.viewingParentMenu === '')
                          || this.state.viewingParentMenu === item.id
                      })}
                      data-parent={item.id}
                    >
                      {item.subs
                        && item.subs.map((sub, index) => {
                          const hasRole =
                            !sub.roles || sub.roles.includes(userRole);
                          if (!hasRole) return <div />;
                          return (
                            <NavItem key={index}>
                              {sub.newWindow ? (
                                <a
                                  href={sub.to}
                                  rel="noopener noreferrer"
                                  target="_blank"
                                >
                                  <i className={sub.icon} />{" "}
                                  <IntlMessages id={sub.label} />
                                </a>
                              ) : sub.subs && sub.subs.length > 0 ? (
                                <Fragment>
                                  <NavLink
                                    to={sub.to}
                                    id={`${item.id}_${index}`}
                                  >
                                    <i className={sub.icon} />{" "}
                                    <IntlMessages id={sub.label} />
                                  </NavLink>

                                  <UncontrolledCollapse
                                    toggler={`#${item.id}_${index}`}
                                  >
                                    <Nav className="third-level-menu">
                                      {sub.subs.map((thirdSub, thirdIndex) => {
                                        return (
                                          <NavItem
                                            key={thirdIndex}
                                          >
                                            {thirdSub.newWindow ? (
                                              <a
                                                href={thirdSub.to}
                                                rel="noopener noreferrer"
                                                target="_blank"
                                              >
                                                <i className={thirdSub.icon} />{" "}
                                                <IntlMessages
                                                  id={thirdSub.label}
                                                />
                                              </a>
                                            ) : (
                                              <NavLink to={thirdSub.to}>
                                                <i className={thirdSub.icon} />{" "}
                                                <IntlMessages
                                                  id={thirdSub.label}
                                                />
                                              </NavLink>
                                            )}
                                          </NavItem>
                                        )
                                      })}
                                    </Nav>
                                  </UncontrolledCollapse>
                                </Fragment>
                              ) : (
                                <NavLink to={sub.to}>
                                  <i className={sub.icon} />{" "}
                                  <IntlMessages id={sub.label} />
                                </NavLink>
                              )}
                            </NavItem>
                          )
                        })}
                    </Nav>
                ))}
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ menu }) => {
  const {
    containerClassnames,
    subHiddenBreakpoint,
    menuHiddenBreakpoint,
    menuClickCount,
    selectedMenuHasSubItems
  } = menu
  return {
    containerClassnames,
    subHiddenBreakpoint,
    menuHiddenBreakpoint,
    menuClickCount,
    selectedMenuHasSubItems
  }
}
export default withRouter(
  connect(
    mapStateToProps,
    {
      setContainerClassnames,
      addContainerClassname,
      changeDefaultClassnames,
      changeSelectedMenuHasSubItems
    }
  )(Sidebar)
)
/* eslint-enable */
