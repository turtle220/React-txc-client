import React, { useState, useEffect } from 'react'
import { object, func, bool } from 'prop-types'
import { Button } from 'reactstrap'
import { useMutation, useApolloClient } from '@apollo/react-hooks'

import { useToast } from '@/hooks'

import { S3_BUCKET_PATHS } from '@/constants/s3BucketPaths'

import CustomCell from '@/components/CustomCell'
import StatusCell from '@/components/StatusCell'
import IsLoading from '@/components/Loader/IsLoading'

import { LOG_TYPE } from '@/constants/logMessages'
import {
  DOCUMENT_STATUS,
  DOCUMENT_ACTION_TYPE,
  APPROVE_DOCUMENT_LOG_MESSAGE
} from '@/constants/documents'

import { DOCUMENTS_CLAIM_QUERY } from '@/graphql/queries/claims'
import { S3_DOWNLOAD_URL_QUERY } from '@/graphql/queries/documents'

import { APPROVE_DOCUMENT, REJECT_DOCUMENT } from './graphql/mutations'

const DocumentItem = ({ document, claimId, openNotes, disabled }) => {
  const [doc, setDocument] = useState(document)
  const [actionType, setActionType] = useState(null)
  const showDefaultToast = useToast()
  const [downloading, setDownloading] = useState(false)
  const apolloClient = useApolloClient()

  useEffect(() => {
    setDocument(document)
  }, [document])

  const handleClickDownload = async () => {
    setDownloading(true)

    const { data: { s3DownloadUrl } } = await apolloClient.query({
      query: S3_DOWNLOAD_URL_QUERY,
      variables: {
        path: `${S3_BUCKET_PATHS.DOCUMENTS.CLAIM}`,
        fileNameKey: document.name,
        fileNameDisplay: document.description
      }
    })

    setDownloading(false)

    window.open(s3DownloadUrl, '_blank')
  }

  const handleClickNotes = () => {
    openNotes(doc)
  }

  const showToast = (actionType, toastType) => showDefaultToast(
    toastType,
    APPROVE_DOCUMENT_LOG_MESSAGE[actionType][toastType]
  )

  const updateDocumentsClaimCache = (store, documentUpdated) => {
    const { documentsClaim } = store.readQuery({
      query: DOCUMENTS_CLAIM_QUERY,
      variables: { claimId }
    })

    store.writeQuery({
      query: DOCUMENTS_CLAIM_QUERY,
      variables: { claimId },
      data: {
        documentsClaim: documentsClaim.map((document) => {
          if (documentUpdated.id === document.id) {
            return {
              ...document,
              status: documentUpdated.status
            }
          }
          return document
        })
      }
    })
  }

  const [approveDocument, { loading: loadingApproveDocument }] = useMutation(APPROVE_DOCUMENT, {
    onCompleted: ({ approveDocument: approvedDocument }) => {
      setDocument(approvedDocument)
      showToast(actionType, LOG_TYPE.SUCCESS)
    },
    onError: () => {
      showToast(actionType, LOG_TYPE.ERROR)
    },
    update: (store, { data: { approveDocument: approvedDocument } }) => {
      updateDocumentsClaimCache(store, approvedDocument)
    }
  })

  const [rejectDocument, { loading: loadingRejectDocument }] = useMutation(REJECT_DOCUMENT, {
    onCompleted: ({ rejectDocument: rejectedDocument }) => {
      setDocument(rejectedDocument)
      showToast(actionType, LOG_TYPE.SUCCESS)
    },
    onError: () => {
      showToast(actionType, LOG_TYPE.ERROR)
    },
    update: (store, { data: { rejectDocument: rejectedDocument } }) => {
      updateDocumentsClaimCache(store, rejectedDocument)
    }
  })

  const handleApproveDocument = () => {
    setActionType(DOCUMENT_ACTION_TYPE.APPROVE)
    approveDocument({
      variables: {
        id: doc.id,
        workflowExecutionId: doc.workflowExecutionId,
        fromId: doc.fromId
      }
    })
  }

  const handleRejectDocument = () => {
    setActionType(DOCUMENT_ACTION_TYPE.REJECT)
    rejectDocument({
      variables: {
        id: doc.id,
        workflowExecutionId: doc.workflowExecutionId,
        fromId: doc.fromId
      }
    })
  }

  const isDisabled = (
    doc?.status === DOCUMENT_STATUS.APPROVED
    || doc?.status === DOCUMENT_STATUS.REJECTED
    || doc?.name === '-') || disabled

  return (
    <tr>
      <td>
        <div className="glyph-icon simple-icon-doc d-inline mr-2" />
        <CustomCell value={doc.description} />
      </td>
      <td>
        <StatusCell value={doc.status} />
      </td>
      <td className="text-center">
        {doc.name === '-' ? '-' : (
          <IsLoading size={25} loading={downloading}>
            <button
              className="btn bg-transparent p-0 pt-1 border-0"
              type="button"
              onClick={handleClickDownload}
            >
              <div className="glyph-icon iconsminds-download-1" />
            </button>
          </IsLoading>
        )}
      </td>
      <td className="text-center">
        <button
          className="btn bg-transparent p-0 pt-2 border-0"
          type="button"
          onClick={handleClickNotes}
        >
          <div className="glyph-icon simple-icon-speech" />
        </button>
      </td>
      <td className="text-center">
        {isDisabled ? 'none' : (
          <IsLoading size={25} loading={loadingApproveDocument || loadingRejectDocument}>
            <>
              <Button
                className="p-1"
                color="link"
                onClick={handleApproveDocument}
              >
                Approve
              </Button>
              |
              <Button
                className="p-1"
                color="link"
                onClick={handleRejectDocument}
              >
                Reject
              </Button>
            </>
          </IsLoading>
        )}
      </td>
    </tr>
  )
}

DocumentItem.propTypes = {
  document: object,
  openNotes: func,
  disabled: bool
}

export default DocumentItem
