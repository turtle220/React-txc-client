import React from 'react'
import { object } from 'prop-types'
import { Row } from 'reactstrap'
import IntlMessages from '@/utils/IntlMessages'
import { Colxx, Separator } from '@/components/CustomBootstrap'
import Breadcrumb from '@/components/Breadcrumb'

const Portifolio = ({ match }) => (
  <>
    <Row>
      <Colxx xxs="12">
        <Breadcrumb heading="menu.portifolio" match={match} />
        <Separator className="mb-5" />
      </Colxx>
    </Row>
    <Row>
      <Colxx xxs="12" className="mb-4">
        <p><IntlMessages id="menu.portifolio" /></p>
      </Colxx>
    </Row>
  </>
)

Portifolio.propTypes = {
  match: object
}

export default Portifolio
