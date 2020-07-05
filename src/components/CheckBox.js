import React from 'react'
import {
  Label,
  Input
} from 'reactstrap'

const Checkbox = ({ label, isSelected, onCheckboxChange }) => (
  <Label check className="ml-4">
    <Input
      type="checkbox"
      defaultChecked={isSelected}
      onChange={onCheckboxChange}
    /> {' '}
    {label}
  </Label>
)

export default Checkbox
