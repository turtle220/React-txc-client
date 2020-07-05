import { useState, useEffect } from 'react'

import { getCurrentUser } from '@/utils/session'

const useRole = (role) => {
  const [hasRole, setHasRole] = useState(false)
  const roleArray = role instanceof Array ? role : [role]

  const verifyRole = () => {
    const { role: userRole } = getCurrentUser()
    setHasRole(roleArray.includes(userRole.name))
  }

  useEffect(verifyRole, [])

  return [
    hasRole
  ]
}

export default useRole
