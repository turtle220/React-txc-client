import React from 'react'
import { object, array } from 'prop-types'
import {
  Row,
  Card,
  CardBody,
} from 'reactstrap'

import { Colxx } from '@/components/CustomBootstrap'
import DiligenceDocuments from '@/components/claims/DueDiligence/DiligenceDocuments'
import DiligenceReport from './DiligenceReport'

const DueDiligenceTwo = ({ claim, documents }) => (
  <Row>
    <Colxx xxs="12" lg="12" className="mb-4">
      <Card className="mb-4">
        <CardBody>
          <DiligenceDocuments
            claim={claim}
            documents={documents}
            phase={2}
          />
        </CardBody>
      </Card>
    </Colxx>
    <Colxx xxs="12" lg="12" className="mb-4">
      <Card className="mb-4">
        <CardBody>
          <DiligenceReport claim={claim} />
        </CardBody>
      </Card>
    </Colxx>
  </Row>
)

DueDiligenceTwo.propTypes = {
  claim: object,
  documents: array
}

export default DueDiligenceTwo
