import React from 'react'
import { string } from 'prop-types'
import { Button } from 'reactstrap'
import { useHistory, useLocation } from 'react-router-dom'

import IntlMessages from '@/utils/IntlMessages'

const DataEntry = ({ link }) => {
  const value = link.split('/')
  const tab = parseInt(value[1], 10)
  const { pathname } = useLocation()
  const history = useHistory()

  const goTo = () => {
    history.push(pathname, { tab })
  }

  return (
    <Button color="link" className="p-0" onClick={goTo}>
      <IntlMessages id='tabs.tasks.actions.enter-data' />
    </Button>
  )
}

DataEntry.prototype = {
  link: string
}

export default DataEntry
