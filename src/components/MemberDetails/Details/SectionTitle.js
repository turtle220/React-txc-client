import React from 'react'
import { CardTitle } from 'reactstrap'
import { string } from 'prop-types'

import { Separator } from '@/components/CustomBootstrap'
import IntlMessages from '@/utils/IntlMessages'

const SectionTitle = ({ label }) => (
  <>
    <CardTitle className="mb-3">
      <IntlMessages id={`pages.members.details.${label}`} />
    </CardTitle>
    <Separator className="mb-4" />
  </>
)

SectionTitle.propTypes = {
  label: string,
}

export default SectionTitle
