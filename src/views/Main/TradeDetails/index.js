import React, { useState, useEffect, useCallback } from 'react'
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
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks'
import { NavLink, useRouteMatch, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { useToast, useRole } from '@/hooks'

import IntlMessages from '@/utils/IntlMessages'

import { ROLE } from '@/constants/roles'

import PageLoader from '@/components/PageLoader'
import Breadcrumb from '@/components/Breadcrumb'
import { Colxx } from '@/components/CustomBootstrap'
import Loader from '@/components/Loader'
import ModalTaskOrderError, { useModalTaskOrderError } from '@/components/ModalTaskOrderError'

import { TRADE_QUERY, TRADE_DOCUMENTS_QUERY, TRADE_WORKFLOW_TASKS_QUERY } from '@/graphql/queries/wallets'
import { TRADE_PRE_APPROVE_MUTATION, TRADE_APPROVE_MUTATION } from '@/graphql/mutations/wallets'

import DetailsTab from './DetailsTab'
import Documents from './Documents'
import Tasks from './Tasks'

const TradeDetails = () => {
  const {
    docusignModalClosed
  } = useSelector(({ docusign }) => docusign)
  const [activeTab, setActiveTab] = useState('1')
  const match = useRouteMatch()
  const { tradeId } = useParams()
  const showToast = useToast()

  const [canPreApproveTrade] = useRole([ROLE.TXC_BACK_OFFICE])
  const [canApproveTrade] = useRole([ROLE.TXC_ACCOUNT_ADMIN, ROLE.TXC_SUPER_ADMIN])
  const [isAdmin] = useRole([
    ROLE.TXC_BACK_OFFICE,
    ROLE.TXC_ACCOUNT_ADMIN,
    ROLE.TXC_SUPER_ADMIN
  ])

  const [error, setError] = useModalTaskOrderError()

  const onError = (({ message }) => {
    setError(message)
  })

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }

  const { data: { trade = {} } = {}, loading } = useQuery(TRADE_QUERY, {
    variables: {
      id: tradeId
    }
  })

  const {
    data: { tradeDocuments = [] } = {},
    loading: loadingDocuments
  } = useQuery(TRADE_DOCUMENTS_QUERY, {
    variables: {
      tradeId
    }
  })

  const [getWorkflowTasks] = useLazyQuery(TRADE_WORKFLOW_TASKS_QUERY, {
    fetchPolicy: 'network-only'
  })

  const getTradeWorkflowTasks = useCallback(
    () => {
      getWorkflowTasks({
        variables: {
          tradeId
        }
      })
    }, [getWorkflowTasks, tradeId]
  )

  useEffect(() => {
    if (docusignModalClosed) {
      getTradeWorkflowTasks()
    }
  }, [docusignModalClosed, getTradeWorkflowTasks])

  const {
    data: { tradeWorkflowTasks = [] } = {},
    loading: loadingWorkflowTasks
  } = useQuery(TRADE_WORKFLOW_TASKS_QUERY, {
    variables: {
      tradeId
    },
    fetchPolicy: 'network-only'
  })

  const [executePreApproveTrade, {
    loading: isPreApproving
  }] = useMutation(TRADE_PRE_APPROVE_MUTATION, {
    variables: { tradeId },
    onCompleted: () => {
      showToast('success', 'Success! Trade is pre-approved.')
    },
    onError,
    refetchQueries: [{
      query: TRADE_QUERY,
      variables: { id: tradeId }
    }]
  })

  const [executeApproveTrade, {
    loading: isApproving
  }] = useMutation(TRADE_APPROVE_MUTATION, {
    variables: { tradeId },
    onCompleted: () => {
      showToast('success', 'Successfully approved trade')
    },
    onError,
    refetchQueries: [{
      query: TRADE_QUERY,
      variables: { id: tradeId }
    }]
  })

  if (loading || loadingDocuments || loadingWorkflowTasks) return <PageLoader />

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb
            heading="menu.trades"
            match={match}
            formatParam={() => <span>Trade ID {tradeId}</span>}
          />

          <div className="float-sm-right mb-2">
            <UncontrolledDropdown>
              {isAdmin && (
                <DropdownToggle
                  caret
                  color="primary"
                  size="lg"
                  outline
                  className="top-right-button top-right-button-single"
                >
                  <IntlMessages id="pages.actions" />
                </DropdownToggle>
              )}
              <DropdownMenu>
                {canPreApproveTrade && (
                  <DropdownItem
                    onClick={executePreApproveTrade}
                    disabled={trade.preApproved}
                  >
                    <IntlMessages id='pages.trades.actions.mark_trade_pre_approved' />
                    {trade.preApproved && <i className="simple-icon-check ml-2" />}
                  </DropdownItem>
                )}
                {canApproveTrade && (
                  <DropdownItem
                    onClick={executeApproveTrade}
                    disabled={trade.approved}
                  >
                    <IntlMessages id='pages.trades.actions.mark_trade_approved' />
                    {trade.approved && <i className="simple-icon-check ml-2" />}
                  </DropdownItem>
                )}
              </DropdownMenu>
              {(isPreApproving || isApproving) && (
                <div className="ml-2 d-inline">
                  <Loader size={25} inline color="black" />
                </div>
              )}
            </UncontrolledDropdown>
          </div>

          <Nav tabs className="separator-tabs ml-0 mb-5">
            <NavItem>
              <NavLink
                className="nav-link"
                onClick={() => toggleTab('1')}
                isActive={() => activeTab === '1'}
                to="#"
              >
                <IntlMessages id="pages.trades.details" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className="nav-link"
                onClick={() => toggleTab('2')}
                isActive={() => activeTab === '2'}
                to="#"
              >
                <IntlMessages id="pages.trades.documents" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className="nav-link"
                onClick={() => toggleTab('3')}
                isActive={() => activeTab === '3'}
                to="#"
              >
                <IntlMessages id="pages.trades.workflow" />
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <DetailsTab
                trade={trade}
              />
            </TabPane>
            <TabPane tabId="2">
              <Documents documents={tradeDocuments} tradeId={tradeId} />
            </TabPane>
            <TabPane tabId="3">
              <Tasks
                tasks={tradeWorkflowTasks}
                tradeId={tradeId}
                claimId={trade?.claim?.id}
                sellerMemberId={trade?.sellerMember?.id}
                buyerMemberId={trade?.buyerUser?.memberId}
              />
            </TabPane>
          </TabContent>
        </Colxx>
      </Row>
      <ModalTaskOrderError
        error={error}
        setError={setError}
      />
    </>
  )
}

export default TradeDetails
