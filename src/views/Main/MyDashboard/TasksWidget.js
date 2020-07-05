import React from 'react'
import {
  Table,
  Card,
  CardBody,
  CardTitle
} from 'reactstrap'
import {
  NavLink,
  useHistory
} from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'

import CustomCell from '@/components/CustomCell'
import { Separator } from '@/components/CustomBootstrap'
import DocusignFlow from '@/components/Docusign'

import IntlMessages from '@/utils/IntlMessages'

import { WORKFLOW_CATEGORY } from '@/constants/workflow'
import { TASK_TYPE_DESCRIPTION, TASK_TYPE } from '@/constants/task'

import { tableRow, widget } from './styles'

const TasksWidget = ({ tasks }) => {
  const history = useHistory()

  const handleClaimLink = (task) => {
    const tab = task.task.link.split('/')[1]
    const path = `claims/${task.claimId}`
    history.push(path, { tab })
  }

  const handleMemberLink = (task) => {
    const tab = task.task.link.split('/')[1]
    const path = `administrative/members/${task.memberId}`
    history.push(path, { tab })
  }

  const handleRowClick = (task) => () => {
    switch (task.workflowCategory) {
      case WORKFLOW_CATEGORY.CLAIM:
        return handleClaimLink(task)
      case WORKFLOW_CATEGORY.MEMBER:
        return handleMemberLink(task)
      default:
        return null
    }
  }

  return (
    <Card>
      <CardBody>
        <div className="d-flex flex-row justify-content-between mb-3">
          <CardTitle className="mb-0">
            <IntlMessages id="pages.dashboard.widget.tasks" />
          </CardTitle>
          <NavLink to="/app/tasks">
            <IntlMessages id="pages.dashboard.widget.view-all" />
          </NavLink>
        </div>
        <Separator className="mb-4" />
        <PerfectScrollbar
          option={{ suppressScrollX: true }}
          style={widget}
        >
          <Table
            hover
          >
            <thead>
              <tr>
                <th className="border-0">
                  <IntlMessages id="pages.dashboard.widget.tasks.name" />
                </th>
                <th className="border-0">
                  <IntlMessages id="pages.dashboard.widget.tasks.type" />
                </th>
                <th className="border-0">
                  <IntlMessages id="pages.dashboard.widget.tasks.claim-id" />
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <DocusignFlow
                  taskExecution={task}
                  active={task.task.type === TASK_TYPE.DOCUSIGN}
                  ids={{
                    memberId: task.memberId,
                    claimId: task.claimId
                  }}
                >
                  <tr
                    key={task.id}
                    style={tableRow}
                    onClick={handleRowClick(task)}
                  >
                    <td>
                      <CustomCell value={task.task.description} />
                    </td>
                    <td>
                      <CustomCell value={TASK_TYPE_DESCRIPTION[task.task.type]} />
                    </td>
                    <td>
                      <CustomCell value={task.claimId} />
                    </td>
                  </tr>
                </DocusignFlow>
              ))}
            </tbody>
          </Table>
        </PerfectScrollbar>
      </CardBody>
    </Card>
  )
}

export default TasksWidget
