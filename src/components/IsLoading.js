import React from 'react'

import PageLoader from './PageLoader'

const IsLoading = ({ loading, children }) => {
  if (loading) return <PageLoader />

  return children
}

export default IsLoading
