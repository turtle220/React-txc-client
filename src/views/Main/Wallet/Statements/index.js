import React from 'react'
import { Row, Card, CardBody } from 'reactstrap'
import ReactTable from 'react-table'

import { Colxx } from '@/components/CustomBootstrap'
import DataTablePagination from '@/components/DatatablePagination'
import DatatableEmptyMessage from '@/components/DatatableEmptyMessage'
import { defaultPageSize, minRows } from '@/constants/defaultTableConfig'
import tableColumns from './tableColumns'

const Statements = ({ statements }) => (
  <Row>
    <Colxx xxs='12'>
      <Card>
        <CardBody>
          <ReactTable
            data={statements}
            columns={tableColumns}
            defaultPageSize={defaultPageSize}
            minRows={minRows}
            showPageJump={false}
            showPageSizeOptions={false}
            PaginationComponent={DataTablePagination}
            NoDataComponent={DatatableEmptyMessage}
            multiSort={false}
          />
        </CardBody>
      </Card>
    </Colxx>
  </Row>
)


export default Statements
