import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from 'reactstrap'
import IntlMessages from '@/utils/IntlMessages'

const errorMessagePrefix = 'GraphQL error: uncompletedTasksError: '

export const useModalTaskOrderError = () => {
  const [error, setErrorState] = useState(false)

  const setError = (message) => {
    if (message?.includes(errorMessagePrefix, 0)) {
      return setErrorState(message)
    }
    return setErrorState(null)
  }

  return [
    error,
    setError
  ]
}

const ModalTaskOrderError = ({ error, setError }) => {
  const closeModal = () => setError(null)

  const uncompletedTasks = !error ? [] : JSON.parse(
    error.replace(errorMessagePrefix, '')
  )

  const taskLabel = uncompletedTasks.length > 1
    ? 'tasks.order-error.many-tasks'
    : 'tasks.order-error.one-task'

  const renderModal = () => (
    <Modal isOpen>
      <ModalHeader toggle={closeModal}>
        <IntlMessages id={taskLabel} />
      </ModalHeader>
      <ModalBody style={{ height: 350 }}>
        <PerfectScrollbar options={{ suppressScrollX: true }}>
          <ul>
            {uncompletedTasks.map((error, index) => (
              <li key={index}>
                <p>{error}</p>
              </li>
            ))}
          </ul>
        </PerfectScrollbar>
      </ModalBody>
      <ModalFooter>
        <Button onClick={closeModal}>
          <IntlMessages id="general.close" />
        </Button>
      </ModalFooter>
    </Modal>
  )

  return error
    ? ReactDOM.createPortal(renderModal(), document.body)
    : null
}

export default ModalTaskOrderError
