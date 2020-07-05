import React from 'react'
import { object } from 'prop-types'
import { Button } from 'reactstrap'

import IntlMessages from '@/utils/IntlMessages'

const TaskButton = ({ info }) => (
  <Button color="link" className="p-0" onClick={info?.onClick}>
    <IntlMessages id={info?.label} />
  </Button>
)

TaskButton.propTypes = {
  info: object
}

export default TaskButton
