import React from 'react'
import { CSVLink } from 'react-csv'
import { array, string } from 'prop-types'
import IntlMessages from '@/utils/IntlMessages'

const CSVExport = ({
  data,
  filename = 'export.csv',
  className = 'btn',
  target = '_blank',
  text = 'Export All CSV'
}) => (
  <CSVLink
    data={data}
    filename={filename}
    className={className}
    target={target}
  >
    <IntlMessages id={text} />
  </CSVLink>
)

CSVExport.propTypes = {
  data: array.isRequired,
  filename: string,
  className: string,
  target: string,
  text: string
}

export default CSVExport
