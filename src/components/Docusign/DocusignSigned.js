import React, { useState, useEffect } from 'react'

import { SignedContainer } from './styles'

const DocusignSigned = () => {
  const [count, setCount] = useState(3)

  useEffect(() => {
    setTimeout(() => setCount(2), 1000)
    setTimeout(() => setCount(1), 2000)
    setTimeout(() => window.parent.signedCallback(), 3000)
  }, [])

  return (
    <SignedContainer>
      <h3>Document successfully signed.</h3>
      <p>You can close this window</p>
      <p><small>closing in {count} seconds</small></p>
    </SignedContainer>
  )
}

export default DocusignSigned
