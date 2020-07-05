import React, { useState, useEffect } from 'react'
import { object, func, bool } from 'prop-types'
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
} from 'reactstrap'
import ReactQuill from 'react-quill'
import { useMutation } from '@apollo/react-hooks'
import { useLocation } from 'react-router-dom'

import { useToast } from '@/hooks'

import IntlMessages from '@/utils/IntlMessages'

import Loader from '@/components/Loader'

import {
  DOCUMENTS_CLAIM_PHASE_ONE_QUERY,
  DOCUMENTS_CLAIM_PHASE_TWO_QUERY
} from '@/graphql/queries/claims'

import { UPDATE_DOCUMENT_NOTES } from './graphql/mutations'

import 'react-quill/dist/quill.snow.css'
import 'react-quill/dist/quill.bubble.css'

const ModalNotes = ({ data, onClose, disabled }) => {
  const [notes, setNotes] = useState(data?.notes)
  const { pathname } = useLocation()
  const showToast = useToast()

  const pathnameList = pathname.split('/')
  let claimId = null

  if (pathnameList.includes('claims')) {
    const indice = pathnameList.indexOf('claims')
    claimId = pathnameList[indice + 1]
  }

  useEffect(() => {
    setNotes(data?.notes)
  }, [data, setNotes])

  const updateDocumentsClaimCache = (store, updatedDocument) => {
    const { documentsPhaseOne } = store.readQuery({
      query: DOCUMENTS_CLAIM_PHASE_ONE_QUERY,
      variables: { claimId }
    })

    store.writeQuery({
      query: DOCUMENTS_CLAIM_PHASE_ONE_QUERY,
      variables: { claimId },
      data: {
        documentsPhaseOne: documentsPhaseOne.map((document) => {
          if (updatedDocument.id === document.id) {
            return {
              ...document,
              notes: updatedDocument.notes
            }
          }
          return document
        })
      }
    })

    const { documentsPhaseTwo } = store.readQuery({
      query: DOCUMENTS_CLAIM_PHASE_TWO_QUERY,
      variables: { claimId }
    })

    store.writeQuery({
      query: DOCUMENTS_CLAIM_PHASE_TWO_QUERY,
      variables: { claimId },
      data: {
        documentsPhaseTwo: documentsPhaseTwo.map((document) => {
          if (updatedDocument.id === document.id) {
            return {
              ...document,
              notes: updatedDocument.notes
            }
          }
          return document
        })
      }
    })
  }

  const updateDocumentOptions = {
    update: (store, { data: { updateDocumentNotes: updatedDocument } }) => {
      updateDocumentsClaimCache(store, updatedDocument)
    },
    onCompleted: () => {
      showToast('success', 'Successfully updated document notes')
      onClose()
    },
    onError: () => {
      showToast('error', 'Error update document notes')
    }
  }

  const [
    updateDocumentNotes,
    { loading: loadingCreateDocument }
  ] = useMutation(UPDATE_DOCUMENT_NOTES, updateDocumentOptions)

  const onSubmit = () => {
    updateDocumentNotes({
      variables: {
        id: data.id,
        notes
      }
    })
  }

  return (
    <Modal isOpen={data?.id} toggle={onClose}>
      <ModalHeader toggle={onClose}>
        {data?.description}
      </ModalHeader>
      <ModalBody>
        <ReactQuill
          theme="bubble"
          value={notes || ''}
          onChange={(value) => setNotes(value)}
          className="mb-4"
          readOnly={disabled}
        />
        {!disabled && (
          <div className="text-right">
            <Button
              color="light mr-2"
              onClick={onSubmit}
              disabled={loadingCreateDocument}
            >
              {loadingCreateDocument ? (
                <Loader size={20} color="black" />
              ) : (
                <IntlMessages id="pages.claims.diligence.modal-ok" />
              )}
            </Button>
            <Button color="primary" onClick={onClose}>
              <IntlMessages id="pages.claims.diligence.modal-cancel" />
            </Button>
          </div>
        )}
      </ModalBody>
    </Modal>
  )
}

ModalNotes.propTypes = {
  data: object,
  onClose: func,
  disabled: bool
}

export default ModalNotes
