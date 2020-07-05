import React from 'react'
import { useParams } from 'react-router-dom'

import MemberDetailsPage from '@/components/MemberDetails'

const MemberDetails = () => {
  const { memberId } = useParams()

  return (
    <MemberDetailsPage memberId={memberId} />
  )
}

export default MemberDetails
