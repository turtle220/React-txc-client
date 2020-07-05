import React from 'react'
import { object, array } from 'prop-types'
import {
  Row,
  Card,
  CardBody,
} from 'reactstrap'

import { Colxx } from '@/components/CustomBootstrap'
import DiligenceDocuments from '@/components/claims/DueDiligence/DiligenceDocuments'
import DiligenceOptions from './DiligenceOptions'
import DiligenceApproval from './DiligenceApproval'

const DueDiligenceOne = ({ claim, documents }) => (
  <Row>
    <Colxx xxs="12" lg="12" className="mb-4">
      <Card className="mb-4">
        <CardBody>
          <DiligenceDocuments
            claim={claim}
            documents={documents}
            phase={1}
            disabled={claim?.submitted}
          />
        </CardBody>
      </Card>
    </Colxx>
    <Colxx xxs="12" lg="8" className="mb-4">
      <Card className="mb-4">
        <CardBody>
          <DiligenceOptions claim={claim} />
        </CardBody>
      </Card>
    </Colxx>
    <Colxx xxs="12" lg="4" className="mb-4">
      <Card className="mb-8">
        <CardBody className="text-center">
          <DiligenceApproval
            claimId={claim?.id}
            claimSubmitted={claim?.submitted}
          />
        </CardBody>
      </Card>
    </Colxx>
  </Row>
)

DueDiligenceOne.propTypes = {
  claim: object,
  documents: array
}

export default DueDiligenceOne
