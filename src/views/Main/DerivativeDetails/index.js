import React, { useState } from 'react'
import {
  Row,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  TabContent,
  TabPane,
} from 'reactstrap'
import { NavLink, useRouteMatch, useParams } from 'react-router-dom'
import { injectIntl } from 'react-intl'

import { useRole } from '@/hooks'

import { ROLE } from '@/constants/roles'

import Breadcrumb from '@/components/Breadcrumb'
import { Colxx } from '@/components/CustomBootstrap'

import IntlMessages from '@/utils/IntlMessages'

import DetailsTab from './DetailsTab'
import ClaimsTab from './ClaimsTab'


const DerivativeDetails = () => {
  const [activeTab, setActiveTab] = useState(
    '1'
  )
  const match = useRouteMatch()
  const { derivativeId } = useParams()

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }
  // filter out the roles that cant see the Claims
  const [canSeeClaims] = useRole([
    ...Object.keys(ROLE).filter((name) => name !== 'TXC_BACK_OFFICE')
  ])

  return (
    <Row>
      <Colxx xxs='12'>
        <Breadcrumb
          heading='menu.derivatives'
          match={match}
          formatParam={() => <span>Derivative ID {derivativeId}</span>}
        />

        <div className='float-sm-right mb-2'>
          <UncontrolledDropdown>
            <DropdownToggle
              caret
              color='primary'
              size='lg'
              outline
              className='top-right-button top-right-button-single'
            >
              <IntlMessages id='pages.actions' />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>
                <IntlMessages id='pages.derivatives.edit' />
              </DropdownItem>
              <DropdownItem>
                <IntlMessages id='pages.derivatives.another-action' />
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                <IntlMessages id='pages.derivatives.delete' />
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>

        <Nav tabs className='separator-tabs ml-0 mb-5'>
          <NavItem>
            <NavLink
              className='nav-link'
              onClick={() => toggleTab('1')}
              isActive={() => activeTab === '1'}
              to='#'
            >
              <IntlMessages id='pages.derivatives.details' />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className='nav-link'
              onClick={() => toggleTab('2')}
              isActive={() => activeTab === '2'}
              to='#'
            >
              <IntlMessages id='pages.derivatives.documents' />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className='nav-link'
              onClick={() => toggleTab('3')}
              isActive={() => activeTab === '3'}
              to='#'
            >
              <IntlMessages id='pages.derivatives.workflow' />
            </NavLink>
          </NavItem>
          {canSeeClaims && (
            <NavItem>
              <NavLink
                className='nav-link'
                onClick={() => toggleTab('4')}
                isActive={() => activeTab === '4'}
                to='#'
              >
                <IntlMessages id='pages.derivatives.claims' />
              </NavLink>
            </NavItem>
          )}
        </Nav>

        <TabContent activeTab={activeTab}>
          <TabPane tabId='1'>
            <DetailsTab derivativeId={derivativeId} changeTab={toggleTab} />
          </TabPane>
          {/* <TabPane tabId='2'>
            <Documents />
          </TabPane>
          <TabPane tabId='3'>
            <TaskList />
          </TabPane> */}
          {canSeeClaims && (
            <TabPane tabId='4'>
              <ClaimsTab />
            </TabPane>
          )}
        </TabContent>
      </Colxx>
    </Row>
  )
}

export default injectIntl(DerivativeDetails)
