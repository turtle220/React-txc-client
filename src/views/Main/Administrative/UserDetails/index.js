import React from 'react'
import { useParams, useHistory } from 'react-router-dom'

import MemberDetails from '@/components/MemberDetails'

const UserDetails = () => {
  const { memberId, userId } = useParams()
  const history = useHistory()

  if (memberId !== 'null') {
    return (
      <MemberDetails memberId={memberId} pageTitle="Users" />
    )
  }

  history.replace(`/app/administrative/account-settings/${userId}`)

  return <div />
}

export default UserDetails
