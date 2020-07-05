import React from 'react'
import { array, string } from 'prop-types'
import styled from 'styled-components'

const getDotColor = (levels, value) => {
  const level = levels.filter((item) => item.level === value)[0]

  if (!level || !level.color) {
    return 'transparent'
  }

  return level.color
}

const Dot = styled.div`
  background-color: ${({ color }) => color};
  width: 14px;
  height: 14px;
  border-radius: 50%;
`

const DotScore = ({ levels, value }) => {
  if (value == null) {
    return <div />
  }

  return (
    <div className="d-flex score-dot-cell justify-content-center align-items-center">
      <Dot color={getDotColor(levels, value)} />
    </div>
  )
}

DotScore.propTypes = {
  levels: array.isRequired,
  value: string
}

export default DotScore
