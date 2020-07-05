import React from 'react'
import { func, array, string } from 'prop-types'
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from 'reactstrap'
import CSVExport from '@/components/CSVExport'
import IntlMessages from '@/utils/IntlMessages'

const ActionsButton = ({
  newHandler,
  newHandlerText,
  newHandlerDisabled,
  csvData,
  csvDataText,
  csvDataFilename,
  className
}) => (
  <div className={`float-sm-right mb-2 ${className}`}>
    <UncontrolledDropdown>
      <DropdownToggle
        caret
        color='primary'
        size='lg'
        outline
        className='top-right-button top-right-button-single'
      >
        <IntlMessages id='pages.actions' />
      </DropdownToggle>
      <DropdownMenu>
        {newHandler && (
          <DropdownItem
            disabled={newHandlerDisabled}
            onClick={newHandler}
          >
            <IntlMessages id={newHandlerText} />
            {newHandlerDisabled && <i className="simple-icon-check ml-2" />}
          </DropdownItem>
        )}
        {csvData && (
          <CSVExport
            data={csvData}
            filename={csvDataFilename}
            text={csvDataText}
          />
        )}
      </DropdownMenu>
    </UncontrolledDropdown>
  </div>
)

ActionsButton.propTypes = {
  newHandler: func,
  newHandlerText: string,
  csvData: array,
  csvDataFilename: string,
  csvDataText: string
}

export default ActionsButton
