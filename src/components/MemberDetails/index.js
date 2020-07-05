import React, { useState, useEffect } from 'react'
import { string } from 'prop-types'
import {
  Row,
  Nav,
  NavItem,
  TabContent,
  TabPane,
} from 'reactstrap'
import { NavLink, useRouteMatch, useLocation, useHistory } from 'react-router-dom'
import { injectIntl } from 'react-intl'
import { useQuery, useApolloClient } from '@apollo/react-hooks'

import { useRole, useToast } from '@/hooks'

import { ROLE } from '@/constants/roles'

import Breadcrumb from '@/components/Breadcrumb'
import { Colxx } from '@/components/CustomBootstrap'
import PageLoader from '@/components/PageLoader'

import IntlMessages from '@/utils/IntlMessages'
import { isBuyer } from '@/utils/roles'

import { USERS_QUERY } from '@/graphql/queries/users'

import ActionsButton from './ActionsButton'
import Details from './Details'
import Documents from './Documents'
import Workflow from './Workflow'
import EnterCreditLine from './EnterCreditLine'

import { UPDATE_ACTIVATE } from './graphql/mutations'

import {
  GET_MEMBER,
  DOCUMENTS_MEMBER_QUERY,
  WORKFLOW_MEMBER_QUERY,
  WORKFLOW_BUYER_MEMBER_QUERY
} from './graphql/queries'

const MemberDetails = ({ memberId, pageTitle = 'Members' }) => {
  const [canSeeEditCreditLine] = useRole([
    ROLE.TXC_ACCOUNT_ADMIN,
    ROLE.TXC_SUPER_ADMIN,
    ROLE.TXC_BACK_OFFICE,
    ROLE.TXC_OPERATION
  ])
  const showToast = useToast()

  const { state } = useLocation()
  const history = useHistory()
  const [activeTab, setActiveTab] = useState('1')
  const match = useRouteMatch()
  const [isModalOpen, setModalOpen] = useState(false)
  const apolloClient = useApolloClient()

  useEffect(() => {
    if (state?.tab) {
      setActiveTab(state?.tab.toString())
      window.scrollTo(0, 0)
      history.replace({
        ...history.location,
        state: { ...state, tab: null }
      })
    }
  }, [history, state])

  const isUser = pageTitle === 'Users'

  const {
    data: { memberDetail = {} } = {},
    loading: loadingMember
  } = useQuery(GET_MEMBER, {
    variables: { memberId },
  })

  const buyerUser = isBuyer(memberDetail.type)

  const {
    data: { documentsMember = [] } = {},
    loading: loadingDocuments
  } = useQuery(DOCUMENTS_MEMBER_QUERY, {
    variables: { memberId }
  })

  const query = isUser
    ? WORKFLOW_BUYER_MEMBER_QUERY
    : WORKFLOW_MEMBER_QUERY

  const {
    data = {},
    loading: loadingWorkflow
  } = useQuery(query, {
    variables: { memberId }
  })

  const workflowMember = isUser
    ? data?.workflowBuyerMember || {}
    : data?.workflowMember || {}

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }

  const formatedPageTitle = `menu.${pageTitle.toLocaleLowerCase()}`
  const singularPageTitle = pageTitle.slice(0, pageTitle.length - 1)

  const formatedMatch = match
  let id = memberId

  if (match?.params?.userId && match?.params?.memberId) {
    formatedMatch.path = match.path.replace('/member/:memberId', '')
    id = match.params.userId
  }

  const toggleActivate = async () => {
    await apolloClient.mutate({
      mutation: UPDATE_ACTIVATE,
      variables: {
        email: memberDetail.operativeInfoEmail
      },
      update: (store, { data: { updateUserActivate } }) => {
        const { id: userId, memberId, activate } = updateUserActivate

        const { memberDetail } = store.readQuery({
          query: GET_MEMBER,
          variables: { memberId }
        })

        store.writeQuery({
          query: GET_MEMBER,
          variables: { memberId },
          data: {
            memberDetail: {
              ...memberDetail,
              activate
            }
          }
        })

        if (isUser) {
          const { users } = store.readQuery({
            query: USERS_QUERY
          })

          store.writeQuery({
            query: USERS_QUERY,
            data: {
              users: users.map((user) => {
                if (user.id === userId) {
                  return {
                    ...user,
                    activate
                  }
                }

                return user
              })
            }
          })
        }
      }
    })

    showToast('success', `User is now ${memberDetail.activate ? 'suspended' : 'active'}`)
  }

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  const loading = (loadingMember || loadingDocuments || loadingWorkflow)

  const renderActionButton = () => {
    const attrs = {
      newHandler: openModal,
      newHandlerText: 'pages.users.details.manage-credit-line',
      toggleActivate,
      className: 'ml-3'
    }
    if (canSeeEditCreditLine && memberDetail.userCreditLine) {
      attrs.newHandlerDisabled = false
    }
    if (!canSeeEditCreditLine && memberDetail.userCreditLine) {
      attrs.newHandlerDisabled = true
    }
    attrs.isBuyer = buyerUser
    attrs.activate = memberDetail.activate
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <ActionsButton {...attrs} />
    )
  }

  return (
    <>
      <Row>
        <Colxx xxs='12'>
          <Breadcrumb
            heading={formatedPageTitle}
            match={formatedMatch}
            formatParam={() => (
              <span>
                {singularPageTitle} ID {id}
              </span>
            )}
          />

          {isUser && !loading && renderActionButton()}

          <Nav tabs className='separator-tabs ml-0 mb-5'>
            <NavItem>
              <NavLink
                className='nav-link'
                onClick={() => toggleTab('1')}
                isActive={() => activeTab === '1'}
                to='#'
              >
                <IntlMessages id='pages.trades.details' />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className='nav-link'
                onClick={() => toggleTab('2')}
                isActive={() => activeTab === '2'}
                to='#'
              >
                <IntlMessages id='pages.trades.documents' />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className='nav-link'
                onClick={() => toggleTab('3')}
                isActive={() => activeTab === '3'}
                to='#'
              >
                <IntlMessages id='pages.trades.workflow' />
              </NavLink>
            </NavItem>
          </Nav>

          {loading ? (
            <PageLoader />
          ) : (
            <TabContent activeTab={activeTab}>
              <TabPane tabId='1'>
                <Details member={memberDetail} />
              </TabPane>
              <TabPane tabId='2'>
                <Documents
                  workflowStatus={memberDetail.workflowStatus}
                  documents={documentsMember}
                  fromId={memberDetail.id}
                />
              </TabPane>
              <TabPane tabId='3'>
                {workflowMember ? (
                  <Workflow
                    tasks={workflowMember.tasks}
                    fromId={memberDetail.id}
                    isUser={isUser}
                  />
                ) : (
                  <p>
                    <IntlMessages id='general.no-workflow-started' />
                  </p>
                )}
              </TabPane>
            </TabContent>
          )}
        </Colxx>
      </Row>
      <EnterCreditLine
        isOpen={isModalOpen}
        close={closeModal}
        userId={match?.params?.userId}
        memberId={memberId}
        memberCreditLine={memberDetail.userCreditLine}
      />
    </>
  )
}

MemberDetails.propTypes = {
  memberId: string.isRequired,
  pageTitle: string
}

export default injectIntl(MemberDetails)
