import React, { useState, useRef, useEffect, useMemo } from 'react'
import { object, bool } from 'prop-types'
import { Button } from 'reactstrap'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { v1 as uuid } from 'uuid'

import { useToast } from '@/hooks'

import IntlMessages from '@/utils/IntlMessages'

import { DOCUMENT_STATUS } from '@/constants/documents'
import { TASK_STATUS } from '@/constants/task'
import { S3_BUCKET_PATHS } from '@/constants/s3BucketPaths'

import IsLoading from '@/components/Loader/IsLoading'
import ModalTaskOrderError, { useModalTaskOrderError } from '@/components/ModalTaskOrderError'

import { DOCUMENTS_CLAIM_QUERY, WORKFLOW_CLAIM_QUERY } from '@/graphql/queries/claims'
import { UPLOAD_DOCUMENT_MUTATION } from '@/graphql/mutations/documents'
import { S3_URL_QUERY } from '@/graphql/queries/documents'

const noneStyle = {
  fontSize: '1rem',
  color: '#797979'
}

const cellStyle = {
  fontSize: '1rem',
  marginTop: '1px'
}

const ActionUpload = ({ document, taskExecution, allowReplace = true }) => {
  const [fileObj, setFile] = useState(null)
  const [claimId, setClaimId] = useState(null)
  const [uploadFileLoading, setUploadFileLoading] = useState(false)
  const showToast = useToast()
  const inputEl = useRef(null)
  const { pathname } = useLocation()
  const [error, setError] = useModalTaskOrderError()

  const isReplace = !document ? false : document?.name !== '-'

  const fileNameId = useMemo(() => {
    const currentFrom = document || taskExecution

    return `${uuid()}_${currentFrom ? currentFrom.documentKey : ''}`
  }, [document, taskExecution])

  const showUploadError = () => {
    setUploadFileLoading(false)
  }

  useEffect(() => {
    const pathnameList = pathname.split('/')

    if (pathnameList.includes('claims')) {
      const indice = pathnameList.indexOf('claims')
      setClaimId(pathnameList[indice + 1])
    }
  }, [pathname])

  const uploadDocumentOptions = {
    update: (store, { data: { uploadDocument: updatedDocument } }) => {
      const { documentsClaim } = store.readQuery({
        query: DOCUMENTS_CLAIM_QUERY,
        variables: { claimId }
      })

      store.writeQuery({
        query: DOCUMENTS_CLAIM_QUERY,
        variables: { claimId },
        data: {
          documentsClaim: documentsClaim.map((document) => {
            if (updatedDocument.id === document.id) {
              return {
                ...document,
                name: updatedDocument.name,
                status: updatedDocument.status,
                type: updatedDocument.docType
              }
            }
            return document
          })
        }
      })
    },
    onCompleted: () => {
      showToast('success', 'Successfully uploaded document')
    },
    onError: (({ message }) => {
      setError(message)
      showUploadError()
    }),
    refetchQueries: [
      {
        query: WORKFLOW_CLAIM_QUERY,
        variables: { claimId }
      }
    ]
  }

  const [
    uploadDocument,
    { loading: loadingCreateDocument }
  ] = useMutation(UPLOAD_DOCUMENT_MUTATION, uploadDocumentOptions)

  const handleClick = () => {
    inputEl.current.click()
  }

  const onUploadCompleted = () => {
    const variables = {
      name: fileNameId,
      type: fileObj.type,
      replace: isReplace
    }

    if (!document && taskExecution) {
      uploadDocument({
        variables: {
          ...variables,
          taskExecutionId: taskExecution.id,
          workflowExecutionId: taskExecution.workflowExecutionId,
          fromId: taskExecution.fromId
        }
      })
    }

    if (!taskExecution && document) {
      uploadDocument({
        variables: {
          ...variables,
          documentId: document.id,
          workflowExecutionId: document.workflowExecutionId,
          fromId: document.fromId
        }
      })
    }
  }

  const [getUrl, { loading: getSignedUrlLoading }] = useLazyQuery(S3_URL_QUERY, {
    onCompleted: async (data) => {
      const { signedUrl } = data?.singedUrl
      setUploadFileLoading(true)

      try {
        const options = {
          headers: {
            'Content-Type': fileObj.type,
            'Content-Disposition': 'attachment'
          }
        }

        const response = await axios.put(signedUrl, fileObj, options)

        if (response?.status !== 200) {
          showUploadError()
          return
        }

        onUploadCompleted()
        setUploadFileLoading(false)
      } catch (error) {
        showUploadError()
      }
    },
    onError: () => {
      showUploadError()
    }
  })

  const handleChangeLabel = (evt) => {
    const selectedFile = evt?.target?.files[0]
    setFile(selectedFile)

    getUrl({
      variables: {
        path: S3_BUCKET_PATHS.DOCUMENTS.CLAIM,
        fileName: fileNameId,
        fileType: selectedFile.type
      }
    })
  }

  const loading = getSignedUrlLoading || uploadFileLoading || loadingCreateDocument

  const documentApproved = document?.status === DOCUMENT_STATUS.APPROVED
  const taskExecutionCompleted = taskExecution?.status === TASK_STATUS.COMPLETED

  if (documentApproved || taskExecutionCompleted) {
    return (
      <span className="text-muted" style={noneStyle}>
        <IntlMessages id="tabs.documents.none" />
      </span>
    )
  }

  return (
    <>
      <input
        hidden
        type="file"
        ref={inputEl}
        onChange={handleChangeLabel}
      />
      <IsLoading
        size={20}
        loading={loading}
      >
        {(isReplace && !allowReplace) ? (
          <span className="text-muted" style={noneStyle}>
            <IntlMessages id="tabs.documents.none" />
          </span>
        ) : (
          <Button
            onClick={handleClick}
            style={document && cellStyle}
            className="p-0"
            color="link"
          >
            <IntlMessages id={`tabs.documents.${isReplace ? 'replace' : 'upload'}`} />
          </Button>
        )}
      </IsLoading>
      <ModalTaskOrderError
        error={error}
        setError={setError}
      />
    </>
  )
}

ActionUpload.propTypes = {
  document: object,
  taskExecution: object,
  allowReplace: bool
}

export default ActionUpload
