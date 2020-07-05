import React from 'react'
import { string, number, oneOfType } from 'prop-types'

import IntlMessages from '@/utils/IntlMessages'

const TableRowItem = ({ label, value }) => (
  <tr>
    <td className="list-item-heading">
      <b>
        <IntlMessages id={`pages.${label}`} />
      </b>
    </td>
    <td className="list-item-heading text-center">
      {value}
    </td>
  </tr>
)

TableRowItem.propTypes = {
  label: string,
  value: oneOfType([string, number])
}

export default TableRowItem
