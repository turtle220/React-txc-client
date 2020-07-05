import React from 'react'
import { Input } from 'reactstrap'
import { format } from 'date-fns'
import { string, func } from 'prop-types'

export const formatDate = (dateString, model = 'yyyy-MM-dd') => {
  if (!dateString) {
    return ''
  }

  if (dateString.includes('-', 4)) {
    return dateString
  }

  const date = new Date(Number(dateString))

  const utcDate = new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  )

  return format(utcDate, model)
}

const InputDate = ({ value, onChange, disabled }) => (
  <Input
    type="date"
    value={formatDate(value)}
    className="form-control"
    onChange={onChange}
    disabled={disabled}
  />
)

InputDate.propTypes = {
  value: string,
  onChange: func
}

export default InputDate
