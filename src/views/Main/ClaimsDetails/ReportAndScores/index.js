import React from 'react'
import {
  Row,
  Card,
  CardBody,
} from 'reactstrap'
import { object } from 'prop-types'

import { Colxx } from '@/components/CustomBootstrap'

import CervedScores from './CervedScores'
import PriceAndRating from './PriceAndRating'

const ReportAndScores = ({ claim }) => (
  <Row>
    <Colxx xxs="12" lg="12" className="mb-4">
      <Card className="mb-4">
        <CardBody>
          <CervedScores claim={claim} />
        </CardBody>
      </Card>
    </Colxx>
    {/* <Colxx xxs="12" lg="5" className="mb-4">
      <Card className="mb-4">
        <CardBody>
          <CervedPdfReport
            document={cervedPdfReportDocument}
            claimId={claim.id}
          />
        </CardBody>
      </Card>
    </Colxx> */}
    <Colxx xxs="12" lg="12" className="mb-4">
      <Card className="mb-8">
        <CardBody>
          <PriceAndRating claim={claim} />
        </CardBody>
      </Card>
    </Colxx>
    {/* <Colxx xxs="12" lg="12" className="mb-4">
      <Card className="mb-8">
        <CardBody>
          <Downloads />
        </CardBody>
      </Card>
    </Colxx> */}
  </Row>
)

ReportAndScores.propTypes = {
  claim: object
}

export default ReportAndScores
