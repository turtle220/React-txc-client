import React, { Fragment } from 'react'
import { object } from 'prop-types'
import { useMutation } from '@apollo/react-hooks'
import { useParams, useHistory } from 'react-router-dom'

import { useToast } from '@/hooks'

import IntlMessages from '@/utils/IntlMessages'

import { TASK_TYPE, TASK_STATUS } from '@/constants/task'
import { LOG_TYPE } from '@/constants/logMessages'
import { MEMBER_STATUS } from '@/constants/member-status'
import { WORKFLOW_EXECUTION_STATUS } from '@/constants/workflow'

import IsLoading from '@/components/Loader/IsLoading'
import ModalTaskOrderError, { useModalTaskOrderError } from '@/components/ModalTaskOrderError'

import { MEMBERS_QUERY } from '@/graphql/queries/members'
import { UPDATE_WORKFLOW_TASK } from '@/graphql/mutations/workflows'

import ActionUpload from '../Workflow/ActionUpload'

import memberTaskAction from '../Workflow/memberTaskAction'
import TaskButton from '../Workflow/TaskButton'

import { APPROVE_MEMBER } from '../graphql/mutations'

import {
  DOCUMENTS_MEMBER_QUERY,
  WORKFLOW_MEMBER_QUERY,
  WORKFLOW_BUYER_MEMBER_QUERY
} from '../graphql/queries'

const Action = ({
  isUser,
  enable,
  claimId,
  taskExecution
}) => {
  const showToast = useToast()
  const { memberId } = useParams()
  const history = useHistory()
  const [error, setError] = useModalTaskOrderError()

  const {
    workflowExecutionId,
    taskId,
    type,
    status,
    fromId
  } = taskExecution

  const goToClaim = ({ tab }) => () => {
    history.push(`/app/claims/${claimId}`, { tab })
  }

  const onCompleted = () => {
    showToast('success', LOG_TYPE.TASK_EXECUTED)
  }

  const onError = (({ message }) => {
    setError(message)
  })

  const refetchQueries = [
    {
      query: DOCUMENTS_MEMBER_QUERY,
      variables: {
        memberId
      }
    },
    {
      query: isUser
        ? WORKFLOW_BUYER_MEMBER_QUERY
        : WORKFLOW_MEMBER_QUERY,
      variables: {
        memberId
      }
    }
  ]

  const [
    updateWorkflowTask,
    { loading: updateTaskExecutionLoading }
  ] = useMutation(UPDATE_WORKFLOW_TASK, {
    onCompleted,
    onError,
    refetchQueries,
    update: (store, { data: { updateWorkflowTask } }) => {
      if (updateWorkflowTask.workflowFinished) {
        const { members } = store.readQuery({
          query: MEMBERS_QUERY
        })

        store.writeQuery({
          query: MEMBERS_QUERY,
          data: {
            members: members.map((member) => {
              if (member.id === memberId) {
                return {
                  ...member,
                  status: MEMBER_STATUS[WORKFLOW_EXECUTION_STATUS.COMPLETED]
                }
              }

              return member
            })
          }
        })
      }
    }
  })

  const [
    approveMember,
    { loading: approveMemberLoading }
  ] = useMutation(APPROVE_MEMBER, {
    onCompleted,
    onError,
    refetchQueries: [
      ...refetchQueries,
      { query: MEMBERS_QUERY }
    ]
  })

  const handleUpdateWorkflowTask = (status) => {
    updateWorkflowTask({
      variables: {
        taskId,
        workflowExecutionId,
        status,
        fromId: claimId || fromId
      }
    })
  }

  const handleApproveMember = () => {
    approveMember({
      variables: {
        memberId
      }
    })
  }

  if (status === TASK_STATUS.COMPLETED || status === TASK_STATUS.REJECTED) {
    return <IntlMessages id="general.none" />
  }

  if (type === TASK_TYPE.DOC_UPLOAD) {
    return (
      <ActionUpload
        taskExecution={taskExecution}
        refetchQueries={refetchQueries}
      />
    )
  }

  if (!enable) {
    return <IntlMessages id="general.none" />
  }
  const loading = updateTaskExecutionLoading || approveMemberLoading

  const taskActions = memberTaskAction({
    type,
    handleUpdateWorkflowTask,
    handleApproveMember,
    goToClaim
  })

  return (
    <>
      <div>
        <IsLoading loading={loading} size={25}>
          {taskActions.map((action, index) => (
            <Fragment key={index}>
              {index >= 1 && ' | '}
              <TaskButton info={action} />
            </Fragment>
          ))}
        </IsLoading>
      </div>
      <ModalTaskOrderError
        error={error}
        setError={setError}
      />
    </>
  )
}

Action.propTypes = {
  taskExecution: object
}

export default Action
