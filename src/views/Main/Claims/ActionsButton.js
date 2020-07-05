/* DEPRECATED MOVED TO COMPONETNS AND MADE MORE GENERIC  - SHOULD DELETE */
import React from 'react'
import { func, array } from 'prop-types'
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from 'reactstrap'
import CSVExport from '@/components/CSVExport'
import IntlMessages from '@/utils/IntlMessages'
// @deprecated
const ActionsButton = ({ newClaim, csvData }) => (
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
        <DropdownItem onClick={newClaim}>
          <IntlMessages id="pages.claims.actions.new-claim" />
        </DropdownItem>
        {csvData && <CSVExport data={csvData} filename="claims.csv" text="pages.claims.actions.export" />}
      </DropdownMenu>
    </UncontrolledDropdown>
  </div>
)

ActionsButton.propTypes = {
  newClaim: func,
  csvData: array
}

export default ActionsButton
