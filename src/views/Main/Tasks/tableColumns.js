/* eslint-disable react/prop-types */
import React from 'react'
import {
  TASK_TYPE_DESCRIPTION,
  TASK_STATUS_DESCRIPTION
} from '@/constants/task'

import { Point, StatusStyled } from './styles'

import TaskLink from '../shared/TaskLink'

const columStyle = {
  paddingTop: '10px',
  cursor: 'context-menu'
}

// This function for action is not needed right now
// const renderAction = ({ original }) => {
//   const isDocusign = original.task.type === TASK_TYPE.DOCUSIGN
//   const isNotCompleted = original.status !== TASK_STATUS.COMPLETED

//   // this is temporary, just as long as we don't have the phase 2 template
//   const isNotClaimPhaseTwo = original.category !== 'Claim Approval - VAT (Phase 2)'

//   if (isDocusign && isNotCompleted && isNotClaimPhaseTwo) {
//     return (
//       <DocusignFlow
//         taskExecution={original}
//         ids={{
//           memberId: original.memberId,
//           claimId: original.claimId
//         }}
//       />
//     )
//   }

//   return <span>none</span>
// }

const tableColumns = [
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ value }) => (
      <StatusStyled className='d-flex flex-row'>
        <Point status={value} />
        {TASK_STATUS_DESCRIPTION[value]}
      </StatusStyled>
    ),
    maxWidth: 100,
    style: columStyle
  },
  {
    Header: 'Type',
    accessor: 'task.type',
    Cell: ({ value }) => <>{TASK_TYPE_DESCRIPTION[value]}</>,
    minWidth: 100,
    style: columStyle
  },
  {
    Header: 'Description',
    accessor: 'task.description',
    Cell: ({ value }) => <>{value}</>,
    minWidth: 250,
    style: columStyle
  },
  {
    Header: 'Link',
    accessor: 'link',
    Cell: ({ original }) => {
      const {
        task,
        status,
        workflowCategory,
        memberId,
        claimId
      } = original
      const attrs = {
        taskExecution: original,
        type: task.type,
        link: task.link,
        status,
        memberId,
        workflowCategory
      }
      if (claimId) attrs.claimId = claimId

      return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <TaskLink {...attrs} />
      )
    },
    minWidth: 100,
    style: columStyle
  },
  {
    Header: 'Category',
    accessor: 'category',
    Cell: ({ value }) => <>{value}</>,
    minWidth: 120,
    style: columStyle
  },
  {
    Header: 'Member ID',
    accessor: 'memberId',
    Cell: ({ value }) => <><p style={{ textAlign: 'center' }}>{value}</p></>,
    minWidth: 70,
    style: columStyle
  },
  {
    Header: 'Claim ID',
    accessor: 'claimId',
    Cell: ({ value }) => <><p style={{ textAlign: 'center' }}>{value}</p></>,
    minWidth: 60,
    style: columStyle
  },
  {
    Header: 'Trade ID',
    accessor: 'tradeId',
    Cell: ({ value }) => <><p style={{ textAlign: 'center' }}>{value}</p></>,
    minWidth: 60,
    style: columStyle
  },
  {
    Header: 'Company Name',
    accessor: 'memberCompanyName',
    Cell: ({ value }) => <>{value}</>,
    minWidth: 120,
    style: columStyle
  },
  // {
  //   Header: 'Action',
  //   Cell: renderAction,
  //   minWidth: 120,
  //   style: columStyle
  // }
]

export default tableColumns
