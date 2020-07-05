/* DEPRECATED MOVED TO COMPONETNS AND MADE MORE GENERIC  - SHOULD DELETE */
import React from 'react'
import { func } from 'prop-types'
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from 'reactstrap'

import IntlMessages from '@/utils/IntlMessages'

const ActionsButton = ({ editWallet }) => (
  <div className="float-sm-right mb-2">
    <UncontrolledDropdown>
      <DropdownToggle
        caret
        color="primary"
        size="lg"
        outline
        className="top-right-button top-right-button-single"
      >
        <IntlMessages id="pages.actions" />
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={editWallet}>
          <IntlMessages id="pages.wallet.actions.edit" />
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  </div>
)

ActionsButton.propTypes = {
  editWallet: func,
}

export default ActionsButton
