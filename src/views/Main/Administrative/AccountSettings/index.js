import React, { useState, useEffect } from 'react'
import { object } from 'prop-types'
import {
  Row,
  Nav,
  NavItem,
  TabContent,
  TabPane
} from 'reactstrap'
import { NavLink, useParams } from 'react-router-dom'
import { useQuery, useApolloClient } from '@apollo/react-hooks'
import styled from 'styled-components'

import { getCurrentUser } from '@/utils/session'
import IntlMessages from '@/utils/IntlMessages'
import formatMember from '@/utils/formatMember'
import { useRole, useToast } from '@/hooks'
import { ROLE } from '@/constants/roles'

import { Colxx } from '@/components/CustomBootstrap'
import Breadcrumb from '@/components/Breadcrumb'
import PageLoader from '@/components/PageLoader'
import Documents from '@/components/MemberDetails/Documents'

import { MEMBER_QUERY } from '@/graphql/queries/members'
import { DOCUMENTS_MEMBER_QUERY } from '@/components/MemberDetails/graphql/queries'
import { UPDATE_ACTIVATE } from '@/components/MemberDetails/graphql/mutations'

import { GET_USER_INFO, GET_ADMIN_USER_INFO } from './graphql/queries'

import { UserPasswordForm, UserInfoForm, MemberInfo } from './components'

import SimpleEmailModal from './SimpleEmailModal'
import ActionsButton from './ActionsButton'

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`

const createQuery = ({ userId, isAdmin }) => {
  if (userId) {
    return GET_USER_INFO
  }

  return isAdmin ? GET_ADMIN_USER_INFO : MEMBER_QUERY
}

const AccountSettings = ({ match }) => {
  const [activeTab, setActiveTab] = useState('1')
  const [loadingDocuments, setLoadingDocuments] = useState(false)
  const [documentsMember, setDocumentsMember] = useState([])
  const { role: userRole, memberId } = getCurrentUser()
  const { userId } = useParams()
  const apolloClient = useApolloClient()
  const showToast = useToast()

  const isAdmin = userRole.type === 'admin'

  const query = createQuery({ userId, isAdmin })

  const queryOptions = !userId ? {} : {
    variables: {
      id: userId
    }
  }

  const { data = {}, loading } = useQuery(query, queryOptions)

  let email
  if (data.user) {
    email = data.user.email
  }

  const fetchDocumentsMember = async () => {
    if (isAdmin) return

    setLoadingDocuments(true)

    const { data: { documentsMember } } = await apolloClient.query({
      query: DOCUMENTS_MEMBER_QUERY,
      variables: { memberId }
    })

    setDocumentsMember(documentsMember)
    setLoadingDocuments(false)
  }

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }

  const [isModalOpen, setModalOpen] = useState(false)
  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  const toggleActivate = async () => {
    await apolloClient.mutate({
      mutation: UPDATE_ACTIVATE,
      variables: {
        email
      }
    })

    showToast('success', `User is now ${data.user.activate ? 'suspended' : 'active'}`)
  }

  const renderActionsButton = (openModal) => {
    const attrs = {
      newHandler: openModal,
      newHandlerText: 'pages.account-settings.invite-user',
      toggleActivate,
    }

    if (data.user && userId) {
      attrs.activate = data.user.activate
    }

    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <ActionsButton {...attrs} />
    )
  }

  const [canInviteBuyer] = useRole([
    ROLE.MEMBER_BUYER_ALL_ACCOUNT_ADMIN,
    ROLE.MEMBER_BUYER_DERIVATIVE_ACCOUNT_ADMIN,
    ROLE.MEMBER_BUYER_CLAIM_ACCOUNT_ADMIN
  ])

  useEffect(() => {
    fetchDocumentsMember()
  }, [])

  return (
    <>
      <Row>
        <Colxx xxs='12'>
          <Header>
            <div>
              <Breadcrumb heading='menu.account-settings' match={match} />
            </div>
            <HeaderLeft>
              {canInviteBuyer && renderActionsButton(openModal)}
            </HeaderLeft>
          </Header>
          {loading ? (
            <PageLoader />
          ) : (
            <>
              {userId ? <UserInfoForm readonly values={data.user} /> : (
                <>
                  <Nav tabs className='separator-tabs ml-0 mb-5'>
                    <NavItem>
                      <NavLink
                        className='nav-link'
                        onClick={() => toggleTab('1')}
                        isActive={() => activeTab === '1'}
                        to='#'
                      >
                        <IntlMessages id='pages.account-settings.my-info' />
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className='nav-link'
                        onClick={() => toggleTab('2')}
                        isActive={() => activeTab === '2'}
                        to='#'
                      >
                        <IntlMessages id='pages.account-settings.password-security' />
                      </NavLink>
                    </NavItem>
                    {!isAdmin && (
                      <NavItem>
                        <NavLink
                          className='nav-link'
                          onClick={() => toggleTab('3')}
                          isActive={() => activeTab === '3'}
                          to='#'
                        >
                          <IntlMessages id='pages.account-settings.documents' />
                        </NavLink>
                      </NavItem>
                    )}
                  </Nav>

                  <TabContent activeTab={activeTab}>
                    <TabPane tabId='1'>
                      {isAdmin && <UserInfoForm readonly values={data.user} />}
                      {!isAdmin && (
                        <MemberInfo data={formatMember.separate(data?.member)} />
                      )}
                    </TabPane>

                    <TabPane tabId='2'>
                      <UserPasswordForm />
                    </TabPane>

                    <TabPane tabId='3'>
                      {loadingDocuments ? (
                        <PageLoader />
                      ) : (
                        <Documents
                          documents={documentsMember}
                        />
                      )}
                    </TabPane>

                  </TabContent>
                </>
              )}
            </>
          )}
        </Colxx>
      </Row>
      <SimpleEmailModal
        isOpen={isModalOpen}
        closeModal={closeModal}
      />
    </>
  )
}

AccountSettings.propTypes = {
  match: object
}

export default AccountSettings
