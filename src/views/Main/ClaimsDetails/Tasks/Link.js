import React from 'react'
import { string } from 'prop-types'
import { useHistory, useLocation } from 'react-router-dom'

import IntlMessages from '@/utils/IntlMessages'
import { WORKFLOW_CATEGORY } from '@/constants/workflow'
import { TASK_TYPE } from '@/constants/task'

import claimTaskLink from './claimTaskLink'
import TaskButton from './TaskButton'

const Link = ({ type, link, status, sellerMemberId, workflowCategory }) => {
  const { pathname } = useLocation()
  const history = useHistory()

  const goTo = ({ path = pathname, tab }) => () => {
    history.push(path, { tab })
  }

  if (type === TASK_TYPE.DOCUSIGN) {
    return <IntlMessages id='general.none' />
  }

  switch (workflowCategory) {
    case WORKFLOW_CATEGORY.CLAIM:
      return (
        <TaskButton
          info={claimTaskLink(status, type, link, goTo, sellerMemberId)}
        />
      )
    default:
      return <IntlMessages id="general.none" />
  }
}

Link.propTypes = {
  type: string,
  status: string,
  sellerMemberId: string,
  workflowCategory: string
}

export default Link
