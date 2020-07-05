import React from 'react'
import { string } from 'prop-types'
import { useHistory, useLocation } from 'react-router-dom'

import IntlMessages from '@/utils/IntlMessages'

import { WORKFLOW_CATEGORY } from '@/constants/workflow'
import { TASK_STATUS, TASK_TYPE } from '@/constants/task'

import DocusignFlow from '@/components/Docusign'

import claimTaskLink from './claimTaskLink'
import memberTaskLink from './memberTaskLink'
import TaskButton from './TaskButton'

const Link = ({ taskExecution, type, link, status, memberId, workflowCategory, claimId }) => {
  const { pathname } = useLocation()
  const history = useHistory()

  const goTo = ({ path = pathname, tab }) => () => {
    history.push(path, { tab })
  }

  if (type === TASK_TYPE.DOCUSIGN) {
    if (status === TASK_STATUS.COMPLETED) {
      return <IntlMessages id='general.none' />
    }

    return (
      <DocusignFlow
        taskExecution={taskExecution}
        ids={{
          memberId,
          claimId
        }}
      />
    )
  }

  const renderCorrectLink = (status) => {
    if (status === TASK_STATUS.COMPLETED) {
      return <IntlMessages id='general.none' />
    }
    return (
      <TaskButton info={memberTaskLink({ status, type, link, goTo, memberId })} />
    )
  }

  switch (workflowCategory) {
    case WORKFLOW_CATEGORY.CLAIM:
      return (
        <TaskButton info={claimTaskLink({ status, type, link, goTo, memberId, claimId })} />
      )
    case WORKFLOW_CATEGORY.MEMBER:
      return renderCorrectLink(status)
    default:
      return <IntlMessages id='general.none' />
  }
}

Link.propTypes = {
  type: string,
  status: string,
  memberId: string,
  workflowCategory: string
}

export default Link
