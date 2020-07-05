import React from 'react'
import { string } from 'prop-types'
import styled from 'styled-components'

import IntlMessages from '@/utils/IntlMessages'

const Item = styled.div`
  font-size: 16px;
`

const SectionItem = ({ label, value, link }) => (
  <Item className="mb-3">

    <b className="mr-2">
      <IntlMessages id={`pages.members.details.${label}`} />:
    </b>

    {!link ? value : (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary"
      >
        <div className="ml-2 d-inline glyph-icon iconsminds-download-1" />
        {' '}{value}
      </a>
    )}

  </Item>
)

SectionItem.propTypes = {
  label: string,
  value: string,
  link: string,
}

export default SectionItem
