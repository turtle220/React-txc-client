import React, { useState } from 'react'
import { array, string } from 'prop-types'
import { Row, Card, CardBody, CardTitle } from 'reactstrap'
import { NavLink } from 'react-router-dom'

import { Colxx, Separator } from '@/components/CustomBootstrap'
import IntlMessages from '@/utils/IntlMessages'
import { shortcutIcon } from './styles'
import NewClaimModal from '../Claims/NewClaimModal'

const openExternalUrl = (url) => {
  window.open(url)
}

const ShortcutsWidget = ({ data, userRole }) => {
  // @TODO we should move this to a custom hook
  // eslint-disable-next-line no-unused-vars
  const [claims, setClaims] = useState([])
  const [isModalOpen, setModalOpen] = useState(false)
  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  const sellClaimStyles = { border: 'none', margin: 'auto', cursor: 'pointer' }
  if (localStorage.getItem('themeColor') !== 'light.blue') {
    sellClaimStyles.background = 'transparent'
  }

  const updateClaimsCache = (claimAdded) => {
    setClaims((existingClaims) => [...existingClaims, claimAdded])
  }

  return (
    <Card>
      <CardBody>
        <CardTitle className='mb-3'>
          <IntlMessages id='pages.dashboard.widget.shortcuts' />
        </CardTitle>
        <Separator className='mb-5' />
        <Row>
          {data
            .filter((item) => !item.roles || item.roles.includes(userRole))
            .map((i) => (
              <Colxx key={i.id} xxs='6'>
                {i.icon === 'iconsminds-optimization' ? (
                  <button type='button' style={sellClaimStyles} className='d-block p-4 text-center' onClick={openModal}>
                    <div
                      className={`glyph-icon ${i.icon}`}
                      style={shortcutIcon}
                    />
                    <p>{i.name}</p>
                  </button>
                ) : (
                  <NavLink
                    to={!i.externalUrl ? i.url : '/'}
                    className='d-block p-4 text-center'
                    onClick={
                      i.externalUrl ? () => openExternalUrl(i.url) : null
                    }
                  >
                    <div
                      className={`glyph-icon ${i.icon}`}
                      style={shortcutIcon}
                    />
                    <p>{i.name}</p>
                  </NavLink>
                )}
              </Colxx>
            ))}
        </Row>
        <NewClaimModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          onAdd={updateClaimsCache}
        />
      </CardBody>
    </Card>
  )
}

ShortcutsWidget.propTypes = {
  data: array,
  userRole: string
}

export default ShortcutsWidget
