import React, { useState } from 'react'
import propTypes from 'prop-types'
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button
} from 'reactstrap'

import { useDispatch } from 'react-redux'

import { closeDocusignSignModal } from '@/redux/actions'
import { getCurrentUser } from '@/utils/session'

import Loader from '@/components/Loader'

import DocusignEnvelopeRecipients from './DocusignEnvelopeRecipients'

import { StyledIframe, IframeLoading } from './styles'

const DocusignFlow = ({ taskExecution, ids, active = true, children }) => {
  const currentUser = getCurrentUser()

  const initialFlow = {
    next: 'action-button',
    taskExecutionId: taskExecution.id,
    ids,
    signers: [
      {
        email: currentUser.email,
        name: `${currentUser.firstName} ${currentUser.surName}`,
        clientUserId: currentUser.id
      }
    ]
  }

  const dispatch = useDispatch()
  const [iframeLoading, setIframeLoading] = useState(true)
  const [flow, setFlow] = useState(initialFlow)
  const [modal, setModal] = useState(true)

  if (!active) return children

  // Clear Hash Fragment for Security
  window.history.replaceState(null, null, ' ')

  const handleModalClose = () => {
    setFlow({
      next: 'waiting-state-reload'
    })
    dispatch(closeDocusignSignModal(true))
    setModal(false)
  }

  window.signedCallback = () => {
    handleModalClose()
  }

  if (!flow) {
    return <span>Please retry</span>
  }

  if (flow.next === 'action-button') {
    if (children) {
      return (
        React.cloneElement(children, {
          onClick: () => setFlow({
            ...flow,
            next: 'get-envelope-recipients'
          })
        })
      )
    }

    return (
      <Button
        color="link"
        className="p-0"
        onClick={() => setFlow({
          ...flow,
          next: 'get-envelope-recipients'
        })}
      >
        e-Signature
      </Button>
    )
  }

  if (flow.next === 'get-envelope-recipients') {
    return (
      <DocusignEnvelopeRecipients
        taskExecution={taskExecution}
        ids={flow.ids}
        signers={flow.signers}
        onCreate={({
          envelope,
          user,
          url
        }) => setFlow({
          ...flow,
          next: 'sign-document',
          envelope,
          user,
          url
        })}
      />
    )
  }

  if (flow.next === 'sign-document') {
    return (
      <>
        <span>Singing...</span>
        <Modal
          toggle={handleModalClose}
          isOpen={modal}
          size='lg'
        >
          <ModalHeader toggle={handleModalClose} />
          <ModalBody>
            {iframeLoading && (
              <IframeLoading>
                <Loader color="#333" />
                <p>Loading DocuSign</p>
              </IframeLoading>
            )}
            <StyledIframe
              hide={iframeLoading}
              src={flow.url}
              onLoad={() => setIframeLoading(false)}
            />
          </ModalBody>
        </Modal>
      </>
    )
  }

  if (flow.next === 'waiting-state-reload') {
    return <span>Reload</span>
  }

  return <Loader color='#000' />
}

DocusignFlow.propTypes = {
  taskExecution: propTypes.object,
  ids: propTypes.object
}

export default DocusignFlow
