import React, { useState, useRef, useMemo } from 'react'
import { object, array } from 'prop-types'
import { Button } from 'reactstrap'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import axios from 'axios'
import { v1 as uuid } from 'uuid'

import { useToast } from '@/hooks'

import IntlMessages from '@/utils/IntlMessages'

import { DOCUMENT_STATUS } from '@/constants/documents'
import { TASK_STATUS } from '@/constants/task'
import { S3_BUCKET_PATHS } from '@/constants/s3BucketPaths'

import IsLoading from '@/components/Loader/IsLoading'
import ModalTaskOrderError, { useModalTaskOrderError } from '@/components/ModalTaskOrderError'

import { UPLOAD_DOCUMENT_MUTATION } from '@/graphql/mutations/documents'
import { S3_URL_QUERY } from '@/graphql/queries/documents'

const noneStyle = {
  fontSize: '1rem',
  color: '#797979'
}

const ActionUpload = ({ taskExecution, refetchQueries }) => {
  const [fileObj, setFile] = useState(null)
  const [uploadFileLoading, setUploadFileLoading] = useState(false)
  const showToast = useToast()
  const inputEl = useRef(null)
  const [error, setError] = useModalTaskOrderError()

  const fileNameId = useMemo(() => `${uuid()}_${taskExecution ? taskExecution.documentKey : ''}`, [taskExecution])

  const showUploadError = () => {
    setUploadFileLoading(false)
  }

  const uploadDocumentOptions = {
    onCompleted: () => {
      showToast('success', 'Successfully uploaded document')
    },
    onError: (({ message }) => {
      setError(message)
      showUploadError()
    }),
    refetchQueries
  }

  const [
    uploadDocument,
    { loading: loadingCreateDocument }
  ] = useMutation(UPLOAD_DOCUMENT_MUTATION, uploadDocumentOptions)

  const handleClick = () => {
    inputEl.current.click()
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

        uploadDocument({
          variables: {
            name: fileNameId,
            type: fileObj.type,
            replace: false,
            taskExecutionId: taskExecution.id,
            workflowExecutionId: taskExecution.workflowExecutionId,
            fromId: taskExecution.fromId
          }
        })

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
        path: S3_BUCKET_PATHS.DOCUMENTS.MEMBER,
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
        <Button
          onClick={handleClick}
          className="p-0"
          color="link"
        >
          <IntlMessages id="tabs.documents.upload" />
        </Button>
      </IsLoading>
      <ModalTaskOrderError
        error={error}
        setError={setError}
      />
    </>
  )
}

ActionUpload.propTypes = {
  taskExecution: object,
  refetchQueries: array
}

export default ActionUpload
