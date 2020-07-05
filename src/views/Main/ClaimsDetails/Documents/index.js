import React from 'react'
import { Row, Card, CardBody } from 'reactstrap'
import ReactTable from 'react-table'

import { Colxx } from '@/components/CustomBootstrap'
import DataTablePagination from '@/components/DatatablePagination'
import { defaultPageSize, minRows } from '@/constants/defaultTableConfig'
import DatatableEmptyMessage from '@/components/DatatableEmptyMessage'
import { tableColumns, noBuyerSellerColumns } from './tableColumns'
import { useRole } from '@/hooks'
import { ROLE } from '@/constants/roles'

const Documents = ({
  documents,
  allowReplacePhaseOne = true,
  allowReplacePhaseTwo = true,
  claimId
}) => {
  const [isBuyerSeller] = useRole([
    ROLE.MEMBER_BUYER_ALL,
    ROLE.MEMBER_BUYER_ALL_ACCOUNT_ADMIN,
    ROLE.MEMBER_BUYER_CLAIM,
    ROLE.MEMBER_BUYER_CLAIM_ACCOUNT_ADMIN,
    ROLE.MEMBER_BUYER_DERIVATIVE,
    ROLE.MEMBER_BUYER_DERIVATIVE_ACCOUNT_ADMIN,
    ROLE.MEMBER_SELLER
  ])

  let columns = tableColumns
  if (!isBuyerSeller) columns = columns.concat(noBuyerSellerColumns)
  return (
    <Row>
      <Colxx xxs='12'>
        <Card>
          <CardBody>
            <ReactTable
              data={documents}
              columns={columns}
              defaultPageSize={defaultPageSize}
              minRows={minRows}
              showPageJump={false}
              showPageSizeOptions={false}
              PaginationComponent={DataTablePagination}
              NoDataComponent={DatatableEmptyMessage}
              allowReplacePhaseOne={allowReplacePhaseOne}
              allowReplacePhaseTwo={allowReplacePhaseTwo}
              claimId={claimId}
              multiSort={false}
            />
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  )
}

export default Documents
