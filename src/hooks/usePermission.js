import { useState, useEffect } from 'react'

import { getCurrentUser } from '@/utils/session'

const usePermission = (permission) => {
  const [hasPermission, setHasPermission] = useState(false)

  const verifyPermission = () => {
    const { permissions = [] } = getCurrentUser()
    setHasPermission(permissions.includes(permission))
  }

  useEffect(verifyPermission, [])

  return [
    hasPermission
  ]
}

export default usePermission
