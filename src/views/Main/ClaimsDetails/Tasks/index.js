import React from 'react'
import { Table } from 'reactstrap'
import { array, string } from 'prop-types'

import IntlMessages from '@/utils/IntlMessages'

import { TASK_TYPE_DESCRIPTION, TASK_STATUS_DESCRIPTION } from '@/constants/task'

import DatatableEmptyMessage from '@/components/DatatableEmptyMessage'

import { Row, Point, StatusStyled } from './styles'
import Action from './Action'
import Link from './Link'

const TaskList = ({
  tasks = [],
  sellerMemberId,
  fromId
}) => (
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
        <th>
          <IntlMessages id='tabs.tasks.table.link' />
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
        tasks.map(({
          id,
          category,
          workflowExecutionId,
          workflowCategory,
          status,
          task,
          documentKey
        }) => (
          <Row key={id} status={status}>
            <td className="status">
              <StatusStyled className="d-flex flex-row">
                <Point status={status} />
                {TASK_STATUS_DESCRIPTION[status]}
              </StatusStyled>
            </td>
            <td>{TASK_TYPE_DESCRIPTION[task?.type]}</td>
            <td>{task?.description}</td>
            <td>
              <Link
                type={task?.type}
                link={task?.link}
                status={status}
                sellerMemberId={sellerMemberId}
                workflowCategory={workflowCategory}
              />
            </td>
            <td className='text-center text-capitalize'>{category}</td>
            <td className='text-center'>
              <Action
                type={task?.type}
                workflowCategory={workflowCategory}
                sellerMemberId={sellerMemberId}
                taskExecution={{
                  id,
                  taskId: task?.id,
                  type: task?.type,
                  status,
                  workflowExecutionId,
                  fromId,
                  task,
                  category,
                  documentKey
                }}
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

TaskList.propTypes = {
  tasks: array,
  sellerMemberId: string,
  fromId: string
}

export default TaskList
