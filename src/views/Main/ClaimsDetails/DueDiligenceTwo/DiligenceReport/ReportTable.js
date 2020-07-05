import React from 'react'
import { node } from 'prop-types'
import { Table } from 'reactstrap'

import IntlMessages from '@/utils/IntlMessages'

const ReportTable = ({ children }) => {
  const thLabelPrefix = 'pages.claims.diligence.report-table'

  return (
    <Table bordered className="mb-5">
      <thead>
        <tr>
          <th>
            <IntlMessages id={`${thLabelPrefix}.item`} />
          </th>
          <th>
            <IntlMessages id={`${thLabelPrefix}.description`} />
          </th>
          <th>
            <IntlMessages id={`${thLabelPrefix}.commentary`} />
          </th>
          <th>
            <IntlMessages id={`${thLabelPrefix}.score`} />
          </th>
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </Table>
  )
}

ReportTable.propTypes = {
  children: node
}

export default ReportTable
