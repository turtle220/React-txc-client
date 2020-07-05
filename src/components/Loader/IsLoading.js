import React from 'react'

import Loader from './index'

const IsLoading = ({ loading, color = '#333', size, children }) => (
  loading ? (
    <Loader color={color} size={size} />
  ) : children
)

export default IsLoading
