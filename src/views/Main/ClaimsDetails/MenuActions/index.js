import React, { useState } from 'react'
import { object } from 'prop-types'
import styled from 'styled-components'
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'

import IntlMessages from '@/utils/IntlMessages'
import { useRole } from '@/hooks'
import { ROLE } from '@/constants/roles'
import Loader from '@/components/Loader'
import ModalTaskOrderError, { useModalTaskOrderError } from '@/components/ModalTaskOrderError'

import { CLAIM_MENU_ACTIONS, CLAIM_STATUS } from '@/constants/claim'
import Action from './Action'
import CSVExport from '@/components/CSVExport'

const Container = styled(UncontrolledDropdown)`
  margin-left: 30px;
`

const MenuActions = ({ claim }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useModalTaskOrderError()
  const [isMemberSeller] = useRole([
    ROLE.MEMBER_SELLER
  ])
  const [isDeloitte] = useRole([
    ROLE.DELOITTE_CONSULTANT,
    ROLE.DELOITTE_MANAGER_ADMIN,
    ROLE.DELOITTE_PARTNER_ADMIN
  ])
  const [isBuyer] = useRole([
    ROLE.MEMBER_BUYER_CLAIM,
    ROLE.MEMBER_BUYER_CLAIM_ACCOUNT_ADMIN
  ])

  const claimMenuActions = CLAIM_MENU_ACTIONS.filter((menuAction) => {
    if (menuAction.name === 'approvePhaseTwo' && claim.status === CLAIM_STATUS.PENDING) return false
    return true
  })

  return (
    <>
      <Container>
        {!isMemberSeller && !loading && (
          <DropdownToggle
            caret
            color="primary"
            size="lg"
            outline
            className="top-right-button top-right-button-single"
          >
            <IntlMessages id='pages.actions' />
          </DropdownToggle>
        )}
        <DropdownMenu>
          {claimMenuActions.map((action) => {
            if (action.type === 'export' && !isDeloitte && !isBuyer) {
              return (
                <DropdownItem>
                  <CSVExport
                    key={action.name}
                    className=""
                    filename={`${action.name} export - ${new Date()}`}
                    text={`pages.claims.actions.${action.label}`}
                    data={action.formatter(claim)}
                    target="_blank"
                  />
                </DropdownItem>
              )
            }
            if (action.name === 'claimPaid' && claim.status !== 'closed' && !isDeloitte && !isBuyer) {
              return null
            }
            return (
              <Action
                key={action.name}
                action={action}
                claim={claim}
                setLoading={setLoading}
                setError={setError}
              />
            )
          })}
        </DropdownMenu>
        {loading && (
          <div className="ml-2 d-inline">
            <Loader size={25} inline color="black" />
          </div>
        )}
      </Container>
      <ModalTaskOrderError
        error={error}
        setError={setError}
      />
    </>
  )
}

MenuActions.propTypes = {
  claim: object.isRequired
}

export default MenuActions
