import React, { useState } from 'react'
import { UncontrolledTooltip } from 'reactstrap'
import Switch from 'rc-switch'

import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'

import IntlMessages from '@/utils/IntlMessages'

import { getCurrentUser, setCurrentUser } from '@/utils/session'

import { APPROVE_MEMBER, REPROVE_MEMBER } from './graphql/mutations'

const ToggleMemberApproval = () => {
  const history = useHistory()
  const userLogged = getCurrentUser()

  const [memberApproved, setMemberApproved] = useState(userLogged?.registerApproved)

  const handleCompleted = (registerApproved) => {
    setMemberApproved(registerApproved)
    setCurrentUser({ ...userLogged, registerApproved })
    history.push('/')
  }

  const [approveMember, { loading: approveMemberLoading }] = useMutation(
    APPROVE_MEMBER,
    {
      onCompleted: ({ approveMember }) => {
        handleCompleted(approveMember?.registerApproved)
      },
      onError: (error) => {
        console.log('approveMember', error)
      }
    }
  )

  const [reproveMember, { loading: reproveMemberLoading }] = useMutation(
    REPROVE_MEMBER,
    {
      onCompleted: ({ reproveMember }) => {
        handleCompleted(reproveMember?.registerApproved)
      },
      onError: (error) => {
        console.log('reproveMember', error)
      }
    }
  )

  const toggleApproveMember = () => {
    const data = {
      variables: {
        memberId: userLogged?.memberId
      }
    }

    if (!memberApproved) {
      approveMember(data)
    } else {
      reproveMember(data)
    }
  }

  return (
    <>
      <Switch
        className="custom-switch custom-switch-primary custom-switch-small"
        checked={memberApproved}
        onChange={toggleApproveMember}
        disabled={approveMemberLoading || reproveMemberLoading}
        id="tooltipMemberApproval"
      />
      <UncontrolledTooltip placement="bottom" target="tooltipMemberApproval">
        <IntlMessages id="general.toggle-approval-member" />
      </UncontrolledTooltip>
    </>
  )
}

export default ToggleMemberApproval
