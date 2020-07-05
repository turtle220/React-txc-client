import React from 'react'
import { Table } from 'reactstrap'
import { array, string, bool } from 'prop-types'

import IntlMessages from '@/utils/IntlMessages'
import { TASK_TYPE_DESCRIPTION, TASK_STATUS_DESCRIPTION } from '@/constants/task'
import { WORKFLOW_CATEGORY } from '@/constants/workflow'
import { Row, Point, StatusStyled } from './styles'
import Action from './Action'

import DatatableEmptyMessage from '@/components/DatatableEmptyMessage'

const normalizeCategory = (category) => {
  if (category === WORKFLOW_CATEGORY.CLAIM_AUCTION) {
    return category.replace('_auction', '')
  }

  return category
}

const Workflow = ({
  tasks = [],
  fromId,
  isUser
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
        <th className='text-center'>
          <IntlMessages id='tabs.tasks.table.category' />
        </th>
        {isUser && (
          <th className='text-center'>
            Claim ID
          </th>
        )}
        <th className='text-center'>
          <IntlMessages id='tabs.tasks.table.action' />
        </th>
      </Row>
    </thead>
    <tbody>
      {tasks.length ? (
        tasks.map(({ id, status, task, workflowExecutionId, workflowCategory, claimId }) => (
          <Row key={id} status={status}>
            <td className='status'>
              <StatusStyled className='d-flex flex-row'>
                <Point status={status} />
                {TASK_STATUS_DESCRIPTION[status]}
              </StatusStyled>
            </td>
            <td>{TASK_TYPE_DESCRIPTION[task?.type]}</td>
            <td>{task?.description}</td>
            <td className='text-center text-capitalize'>
              {normalizeCategory(workflowCategory)}
            </td>
            {isUser && (
              <td className='text-center'>{claimId}</td>
            )}
            <td className='text-center'>
              <Action
                isUser={isUser}
                claimId={claimId}
                taskExecution={{
                  id,
                  taskId: task.id,
                  type: task?.type,
                  status,
                  workflowExecutionId,
                  fromId
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

Workflow.propTypes = {
  tasks: array,
  fromId: string,
  isUser: bool
}

export default Workflow
