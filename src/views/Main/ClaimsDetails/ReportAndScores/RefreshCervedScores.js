import React, { useState } from 'react'
import { bool, func, string } from 'prop-types'
import { format } from 'date-fns'
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap'

import IntlMessages from '@/utils/IntlMessages'

const RefreshCervedScores = ({ loading, refreshScores, lastRefresh }) => {
  const refreshAnimation = {
    animation:
      loading ? 'spin 1s linear infinite' : ''
  }

  const [popoverIsOpen, setPopoverIsOpen] = useState(false)

  const togglePopover = () => setPopoverIsOpen(!popoverIsOpen)

  const refresh = () => {
    refreshScores()
    togglePopover()
  }

  return (
    <div className="text-right">
      <button
        id="showPopover"
        className="btn btn-refresh bg-transparent p-0 border-0 mr-2"
        onClick={togglePopover}
        type="button"
      >
        <div
          className="glyph-icon simple-icon-refresh"
          style={refreshAnimation}
        />
      </button>
      <p className="mb-0 d-inline">
        <small>
          ({lastRefresh ? `Refresh Cerved Scores: last updated ${format(lastRefresh, 'MM/dd/yyyy')}` : 'Retrieve Cerved Scores'})
        </small>
      </p>
      <Popover
        isOpen={popoverIsOpen}
        placement="bottom"
        target="showPopover"
        toggle={togglePopover}
        className="p-3"
      >
        <PopoverHeader className="pb-1">
          <IntlMessages id="general.are-you-sure" />
        </PopoverHeader>
        <PopoverBody>
          <p>
            <IntlMessages id="general.cannot-be-undone" />
          </p>
          <Button
            color="success"
            outline
            size="sm"
            onClick={refresh}
            disabled={loading}
            className="mr-2"
          >
            <IntlMessages id="general.yes" />
          </Button>
          <Button
            color="danger"
            outline
            size="sm"
            onClick={togglePopover}
          >
            <IntlMessages id="general.no" />
          </Button>
        </PopoverBody>
      </Popover>
    </div>
  )
}

RefreshCervedScores.propTypes = {
  loading: bool,
  refreshScores: func,
  lastRefresh: string
}

export default RefreshCervedScores
