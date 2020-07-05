import React, { useState, useEffect, useCallback } from 'react'
import {
  Row,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  Badge
} from 'reactstrap'
import {
  NavLink,
  useRouteMatch,
  useParams,
  useLocation,
  useHistory
} from 'react-router-dom'
import { injectIntl } from 'react-intl'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { useRole, useToast } from '@/hooks'

import { ROLE } from '@/constants/roles'
import { CLAIM_STATUS } from '@/constants/claim'
import { LOG_MESSAGES } from '@/constants/logMessages'
import IntlMessages from '@/utils/IntlMessages'
import Breadcrumb from '@/components/Breadcrumb'
import PageLoader from '@/components/PageLoader'
import { Colxx } from '@/components/CustomBootstrap'

import {
  GET_CLAIM_DETAILS,
  WORKFLOW_CLAIM_QUERY,
  DOCUMENTS_CLAIM_QUERY,
  DOCUMENTS_CLAIM_PHASE_ONE_QUERY,
  DOCUMENTS_CLAIM_PHASE_TWO_QUERY
} from '@/graphql/queries/claims'

import DetailsTab from './DetailsTab'
import Documents from './Documents'
import Tasks from './Tasks'
import DueDiligenceOne from './DueDiligenceOne'
import DueDiligenceTwo from './DueDiligenceTwo'
import ReportAndScores from './ReportAndScores'
import MenuActions from './MenuActions'
// import Notes from './Notes'

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`
// const notes = [
//   {
//     id: 1,
//     title: 'title #1',
//     date: '2020/1/2',
//     description: 'this is the first notes'
//   },
//   {
//     id: 2,
//     title: 'title #2',
//     date: '2020/1/2',
//     description: 'this is the second notes'
//   },
//   {
//     id: 3,
//     title: 'title #3',
//     date: '2020/1/2',
//     description: 'this is the third notes'
//   }
// ]

const ClaimDetails = () => {
  const {
    docusignModalClosed
  } = useSelector(({ docusign }) => docusign)
  const [currentClaimStatus, setCurrentClaimStatus] = useState(null)
  const [activeTab, setActiveTab] = useState('1')
  const match = useRouteMatch()
  const { claimId } = useParams()
  const { state } = useLocation()
  const history = useHistory()
  const showToast = useToast()

  const [isAbleToView] = useRole([
    ROLE.DELOITTE_MANAGER_ADMIN,
    ROLE.DELOITTE_PARTNER_ADMIN,
    ROLE.DELOITTE_CONSULTANT,
    ROLE.TXC_ACCOUNT_ADMIN,
    ROLE.TXC_SUPER_ADMIN,
    ROLE.TXC_OPERATION
  ])

  const [canSeeReportAndScoresTab] = useRole([
    ROLE.TXC_ACCOUNT_ADMIN,
    ROLE.TXC_SUPER_ADMIN,
    ROLE.TXC_BACK_OFFICE,
    ROLE.TXC_OPERATION
  ])

  const [canSeeClaimDetails] = useRole([
    ROLE.TXC_ACCOUNT_ADMIN,
    ROLE.TXC_SUPER_ADMIN,
    ROLE.TXC_OPERATION,
    ROLE.TXC_BACK_OFFICE,
    ROLE.MEMBER_SELLER,
    ROLE.MEMBER_BUYER_DERIVATIVE_ACCOUNT_ADMIN,
    ROLE.MEMBER_BUYER_DERIVATIVE,
    ROLE.MEMBER_BUYER_CLAIM_ACCOUNT_ADMIN,
    ROLE.MEMBER_BUYER_CLAIM,
    ROLE.MEMBER_BUYER_ALL,
    ROLE.MEMBER_BUYER_ALL_ACCOUNT_ADMIN,
    ROLE.BROKER
  ])

  // const [isNotNotaryAdmin] = useRole([
  //   ...Object.keys(ROLE).filter((name) => name !== 'NOTARY_ADMIN')
  // ])

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

  const [getWorkflowTasks] = useLazyQuery(WORKFLOW_CLAIM_QUERY, {
    fetchPolicy: 'network-only'
  })

  const getClaimWorkflowTasks = useCallback(
    () => {
      getWorkflowTasks({
        variables: {
          claimId
        }
      })
    }, [getWorkflowTasks, claimId]
  )

  useEffect(() => {
    if (docusignModalClosed) {
      getClaimWorkflowTasks()
    }
  }, [docusignModalClosed, getClaimWorkflowTasks])

  const {
    data: { claim = {} } = {},
    loading: loadingClaimDetails
  } = useQuery(GET_CLAIM_DETAILS, {
    variables: {
      id: claimId
    }
  })

  // const canSeeMonitoringTab = isNotNotaryAdmin && claim.status === CLAIM_STATUS.SOLD
  const canSeePhaseOneTab = isAbleToView
  const canSeePhaseTwoTab = !!claim.status
    && (isAbleToView && claim.status !== CLAIM_STATUS.PENDING)

  const updateCurrentClaimStatus = useCallback(
    () => {
      if (claim?.status !== currentClaimStatus) {
        const isCurrentClaimStatusPending = currentClaimStatus === CLAIM_STATUS.PENDING
        const isCurrentClaimStatusPhaseOne = currentClaimStatus === CLAIM_STATUS.APPROVED_PHASE_ONE
        const isNewClaimStatusPhaseOne = claim?.status === CLAIM_STATUS.APPROVED_PHASE_ONE
        const isNewClaimStatusPhaseTwo = claim?.status === CLAIM_STATUS.APPROVED_PHASE_TWO

        if (isCurrentClaimStatusPending && isNewClaimStatusPhaseOne) {
          setCurrentClaimStatus(claim.status)
          showToast('success', LOG_MESSAGES.CLAIM_WORKFLOW_PHASE_ONE_COMPLETED)
        } else if (isCurrentClaimStatusPhaseOne && isNewClaimStatusPhaseTwo) {
          setCurrentClaimStatus(claim.status)
          showToast('success', LOG_MESSAGES.CLAIM_WORKFLOW_PHASE_TWO_COMPLETED)
        } else {
          setCurrentClaimStatus(claim.status)
        }
      }
    },
    [claim, currentClaimStatus, showToast]
  )

  useEffect(() => {
    updateCurrentClaimStatus()
  }, [claim, updateCurrentClaimStatus])

  const {
    data: { workflowTasks = [] } = {},
    loading: loadingWorkflow
  } = useQuery(WORKFLOW_CLAIM_QUERY, {
    variables: { claimId },
    fetchPolicy: 'network-only'
  })

  const {
    data: { documentsClaim = [] } = {},
    loading: loadingDocuments
  } = useQuery(DOCUMENTS_CLAIM_QUERY, {
    variables: { claimId }
  })

  const {
    data: { documentsPhaseOne = [] } = {},
    loading: loadingDocumentsPhaseOne
  } = useQuery(DOCUMENTS_CLAIM_PHASE_ONE_QUERY, {
    variables: { claimId }
  })

  const {
    data: { documentsPhaseTwo = [] } = {},
    loading: loadingDocumentsPhaseTwo
  } = useQuery(DOCUMENTS_CLAIM_PHASE_TWO_QUERY, {
    variables: { claimId }
  })

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }

  const loadingAllDetails = loadingClaimDetails
  || loadingDocuments
  || loadingDocumentsPhaseOne
  || loadingDocumentsPhaseTwo
  || loadingWorkflow

  const isDetailsTabHidden = !canSeeClaimDetails && activeTab === '1'

  return (
    <>
      <Row>
        <Colxx xxs='12'>
          <Header>
            <div>
              <Breadcrumb
                heading='menu.claims'
                match={match}
                formatParam={() => <span>Claim ID {claimId}</span>}
              />
            </div>
            <HeaderLeft>
              {!loadingClaimDetails && (
                <>
                  <Badge color='light'>{`Claim Status: ${claim.status}`}</Badge>
                  <MenuActions claim={claim} />
                </>
              )}
            </HeaderLeft>
          </Header>
          <Nav tabs className='separator-tabs ml-0 mb-5'>
            {canSeeClaimDetails && (
              <NavItem>
                <NavLink
                  className='nav-link'
                  onClick={() => toggleTab('1')}
                  isActive={() => activeTab === '1'}
                  to='#'
                >
                  <IntlMessages id='pages.claims.details' />
                </NavLink>
              </NavItem>
            )}
            <NavItem>
              <NavLink
                className='nav-link'
                onClick={() => toggleTab('2')}
                isActive={() => isDetailsTabHidden || activeTab === '2'}
                to='#'
              >
                <IntlMessages id='pages.claims.documents' />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className='nav-link'
                onClick={() => toggleTab('3')}
                isActive={() => activeTab === '3'}
                to='#'
              >
                <IntlMessages id='pages.claims.workflow' />
              </NavLink>
            </NavItem>
            {canSeePhaseOneTab && (
              <NavItem>
                <NavLink
                  className='nav-link'
                  onClick={() => toggleTab('4')}
                  isActive={() => activeTab === '4'}
                  to='#'
                >
                  <IntlMessages id='pages.claims.one-due-diligence' />
                </NavLink>
              </NavItem>
            )}
            {canSeePhaseTwoTab && (
              <NavItem>
                <NavLink
                  className='nav-link'
                  onClick={() => toggleTab('5')}
                  isActive={() => activeTab === '5'}
                  to='#'
                >
                  <IntlMessages id='pages.claims.two-due-diligence' />
                </NavLink>
              </NavItem>
            )}
            {canSeeReportAndScoresTab && (
              <NavItem>
                <NavLink
                  className='nav-link'
                  onClick={() => toggleTab('6')}
                  isActive={() => activeTab === '6'}
                  to='#'
                >
                  <IntlMessages id='pages.claims.cerved' />
                </NavLink>
              </NavItem>
            )}
            {/* {canSeeMonitoringTab && (
              <NavItem>
                <NavLink
                  className='nav-link'
                  onClick={() => toggleTab('7')}
                  isActive={() => activeTab === '7'}
                  to='#'
                >
                  <IntlMessages id='pages.claims.monitoring' />
                </NavLink>
              </NavItem>
            )} */}
          </Nav>
          {loadingAllDetails ? (
            <PageLoader />
          ) : (
            <TabContent activeTab={isDetailsTabHidden ? '2' : activeTab}>
              {canSeeClaimDetails && (
                <TabPane tabId='1'>
                  <DetailsTab claim={claim} />
                </TabPane>
              )}

              <TabPane tabId='2'>
                <Documents
                  documents={documentsClaim}
                  allowReplacePhaseOne={!claim.phaseOneApproved}
                  allowReplacePhaseTwo={!claim.phaseTwoApproved}
                  claimId={claimId}
                />
              </TabPane>

              <TabPane tabId='3'>
                <Tasks
                  tasks={workflowTasks}
                  sellerMemberId={claim?.sellerMember?.id}
                  claim={claim}
                  fromId={claim.id}
                />
              </TabPane>
              {isAbleToView && (
                <>
                  <TabPane tabId='4'>
                    <DueDiligenceOne
                      claim={claim}
                      documents={documentsPhaseOne}
                    />
                  </TabPane>
                  <TabPane tabId='5'>
                    <DueDiligenceTwo
                      claim={claim}
                      documents={documentsPhaseTwo}
                    />
                  </TabPane>
                </>
              )}
              {canSeeReportAndScoresTab && (
                <TabPane tabId='6'>
                  <ReportAndScores
                    claim={claim}
                    documents={documentsClaim}
                  />
                </TabPane>
              )}
              {/* {canSeeMonitoringTab && (
                <TabPane tabId='7'>
                  <Notes notes={notes} />
                </TabPane>
              )} */}
            </TabContent>
          )}
        </Colxx>
      </Row>
    </>
  )
}

export default injectIntl(ClaimDetails)
