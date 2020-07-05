import React from 'react'
import { number } from 'prop-types'
import scoreTypes from '@/constants/scoreTypes'
import { Bar, Icon } from './styles'

const getScoreByKey = (slug) => {
  const score = scoreTypes.find((e) => e.slug === slug)
  return score.levels
}

const ScoreBar = ({ score, slug }) => (
  <Bar>
    {getScoreByKey(slug).map(({ level, color }) => (
      <li style={{ backgroundColor: color }}>
        {score && score[slug] === level && <Icon />}
        {level}
      </li>
    ))}
  </Bar>
)

ScoreBar.propTypes = {
  score: number.isRequired
}

export default ScoreBar
