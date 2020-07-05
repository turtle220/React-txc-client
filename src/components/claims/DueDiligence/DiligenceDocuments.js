import React, { useState } from 'react'
import { object, bool } from 'prop-types'
import {
  Table,
  CardTitle,
} from 'reactstrap'

import { Separator } from '@/components/CustomBootstrap'
import IntlMessages from '@/utils/IntlMessages'
import DocumentItem from './DocumentItem'
import ModalNotes from './ModalNotes'

const DiligenceDocuments = ({ claim, documents, disabled }) => {
  const [notes, setNotes] = useState({})
  const closeModal = () => setNotes({})

  return (
    <>
      <CardTitle className="mb-3">
        <IntlMessages id="pages.claims.diligence.documents" />
      </CardTitle>
      <Separator className="mb-5" />
      <Table>
        <thead>
          <tr className="text-center">
            <th className="border-0 text-left">
              <IntlMessages id="pages.claims.diligence.table.name" />
            </th>
            <th className="border-0 text-left">
              <IntlMessages id="pages.claims.diligence.table.status" />
            </th>
            <th className="border-0">
              <IntlMessages id="pages.claims.diligence.table.downloads" />
            </th>
            <th className="border-0">
              <IntlMessages id="pages.claims.diligence.table.notes" />
            </th>
            <th className="border-0">
              <IntlMessages id="pages.claims.diligence.table.action" />
            </th>
          </tr>
        </thead>
        <tbody>
          {documents.map((document) => (
            <DocumentItem
              key={document.id}
              document={document}
              claimId={claim.id}
              claimType={claim?.type}
              claimTaxCase={claim?.taxCase}
              openNotes={setNotes}
              disabled={disabled}
            />
          ))}
        </tbody>
      </Table>
      <ModalNotes
        data={notes}
        onClose={closeModal}
        disabled={disabled}
      />
    </>
  )
}

DiligenceDocuments.propTypes = {
  claim: object,
  disabled: bool
}

export default DiligenceDocuments
