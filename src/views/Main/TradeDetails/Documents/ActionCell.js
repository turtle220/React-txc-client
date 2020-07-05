import React, { useState, useRef, useMemo } from 'react'
import { object } from 'prop-types'
import { Button } from 'reactstrap'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import axios from 'axios'
import { v1 as uuid } from 'uuid'

import { useToast } from '@/hooks'

import IntlMessages from '@/utils/IntlMessages'

import { DOCUMENT_STATUS } from '@/constants/documents'
import { S3_BUCKET_PATHS } from '@/constants/s3BucketPaths'

import IsLoading from '@/components/Loader/IsLoading'
import ModalTaskOrderError, { useModalTaskOrderError } from '@/components/ModalTaskOrderError'

import { S3_URL_QUERY } from '@/graphql/queries/documents'
import { UPLOAD_TRADE_DOCUMENT_MUTATION } from '@/graphql/mutations/wallets'
import Action from './Action'

const noneStyle = {
  fontSize: '1rem',
  color: '#797979'
}

const cellStyle = {
  fontSize: '1rem',
  marginTop: '1px'
}

const ActionCell = ({
  original: document,
  columnProps: { rest: { tradeId } }
}) => {
  const [fileObj, setFile] = useState(null)
  const [uploadFileLoading, setUploadFileLoading] = useState(false)
  const showToast = useToast()
  const inputEl = useRef(null)

  const [error, setError] = useModalTaskOrderError()

  const isReplaceable = !document ? false : document?.name !== '-'

  const fileNameId = useMemo(() => `${uuid()}_${document ? document.documentKey : ''}`, [document])

  const showUploadError = () => {
    setUploadFileLoading(false)
    showToast('error', 'Error uploading document, try again')
  }

  const [
    uploadTradeDocument,
    { loading: loadingCreateDocument }
  ] = useMutation(UPLOAD_TRADE_DOCUMENT_MUTATION, {
    onError: (({ message }) => {
      setError(message)
    })
  })

  const handleClick = () => {
    inputEl.current.click()
  }

  const onUploadCompleted = () => {
    uploadTradeDocument({
      variables: {
        documentId: document.id,
        workflowExecutionId: document.workflowExecutionId,
        tradeId: document.fromId,
        name: fileNameId,
        type: fileObj.type
      }
    })
  }

  const [fetchS3SingedUrl, { loading: getSignedUrlLoading }] = useLazyQuery(S3_URL_QUERY, {
    onCompleted: async (data) => {
      const { signedUrl } = data.singedUrl
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
    fetchS3SingedUrl({
      variables: {
        path: S3_BUCKET_PATHS.DOCUMENTS.TRADE,
        fileName: fileNameId,
        fileType: selectedFile.type
      }
    })
  }

  const loading = getSignedUrlLoading || uploadFileLoading || loadingCreateDocument

  if (document?.status === DOCUMENT_STATUS.APPROVED
    || document?.status === DOCUMENT_STATUS.COMPLETED
    || document.workflowFinished
  ) {
    return (
      <span className="text-muted" style={noneStyle}>
        <IntlMessages id="tabs.documents.none" />
      </span>
    )
  }
  if (document.name === '-') {
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
            style={cellStyle}
            className="p-0"
            color="link"
          >
            <IntlMessages id={`tabs.documents.${isReplaceable ? 'replace' : 'upload'}`} />
          </Button>
        </IsLoading>
        <ModalTaskOrderError
          error={error}
          setError={setError}
        />
      </>
    )
  }

  const task = document.taskExecution
  return (<Action task={task} tradeId={tradeId} />)
}

ActionCell.propTypes = {
  original: object.isRequired
}

export default ActionCell
