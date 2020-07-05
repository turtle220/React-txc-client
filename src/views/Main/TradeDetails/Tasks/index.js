import React from 'react'
import { Table } from 'reactstrap'

import IntlMessages from '@/utils/IntlMessages'

import { TASK_TYPE_DESCRIPTION, TASK_STATUS_DESCRIPTION } from '@/constants/task'

import { Row, Point, StatusStyled } from './styles'
import Action from './Action'

import DatatableEmptyMessage from '@/components/DatatableEmptyMessage'

const Tasks = ({ tasks, tradeId, claimId, sellerMemberId, buyerMemberId }) => (
  <Table borderless>
    <thead>
      <Row>
        <th>
          <IntlMessages id='tabs.tasks.table.status' />
        </th>
        <th>
          <IntlMessages id='tabs.tasks.table.type' />
        </th>
        <th>
          <IntlMessages id='tabs.tasks.table.desctiption' />
        </th>
        <th className='text-center'>
          <IntlMessages id='tabs.tasks.table.category' />
        </th>
        <th className='text-center'>
          <IntlMessages id='tabs.tasks.table.action' />
        </th>
      </Row>
    </thead>
    <tbody>
      {tasks.length ? (
        tasks.map((task) => (
          <Row key={task.id} status={task.status}>
            <td className='status'>
              <StatusStyled className='d-flex flex-row'>
                <Point status={task.status} />
                {TASK_STATUS_DESCRIPTION[task.status]}
              </StatusStyled>
            </td>
            <td>{TASK_TYPE_DESCRIPTION[task.task.type]}</td>
            <td>{task.task.description}</td>
            <td className='text-center text-capitalize'>
              {task.category}
            </td>
            <td className='text-center'>
              <Action
                task={task}
                tradeId={tradeId}
                claimId={claimId}
                sellerMemberId={sellerMemberId}
                buyerMemberId={buyerMemberId}
              />
            </td>
          </Row>
        ))
      ) : (
        <Row className="w-100">
          <td colSpan='6'>
            <DatatableEmptyMessage />
          </td>
        </Row>
      )}
    </tbody>
  </Table>
)

export default Tasks
