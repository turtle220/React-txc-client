import React from 'react'
import { func, string } from 'prop-types'
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from 'reactstrap'

import IntlMessages from '@/utils/IntlMessages'

const ActionsButton = ({
  newHandler,
  newHandlerText,
  newHandlerDisabled,
  isBuyer,
  activate,
  toggleActivate,
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
        {newHandler && isBuyer && (
        <DropdownItem
          disabled={newHandlerDisabled}
          onClick={newHandler}
        >
          <IntlMessages id={newHandlerText} />
            {newHandlerDisabled && <i className="simple-icon-check ml-2" />}
        </DropdownItem>
        )}
        <DropdownItem
          onClick={toggleActivate}
        >
          {activate ? (
            <IntlMessages id='pages.users.details.inactive' />
          ) : (
            <IntlMessages id='pages.users.details.active' />
          )}
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  </div>
)


ActionsButton.propTypes = {
  newHandler: func,
  newHandlerText: string,
  toggleActivate: func
}

export default ActionsButton
