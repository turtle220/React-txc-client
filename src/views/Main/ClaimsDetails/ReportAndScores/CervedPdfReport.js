import React, { useState, useRef, useMemo } from 'react'
import { CardTitle } from 'reactstrap'
import styled from 'styled-components'
import { object, string } from 'prop-types'
import axios from 'axios'
import { v1 as uuid } from 'uuid'

import { useMutation, useLazyQuery } from '@apollo/react-hooks'

import { S3_BUCKET_PATHS } from '@/constants/s3BucketPaths'

import { useToast } from '@/hooks'

import IntlMessages from '@/utils/IntlMessages'

import IsLoading from '@/components/Loader/IsLoading'
import ModalTaskOrderError, { useModalTaskOrderError } from '@/components/ModalTaskOrderError'

import { DOCUMENTS_CLAIM_QUERY, WORKFLOW_CLAIM_QUERY } from '@/graphql/queries/claims'
import { UPLOAD_DOCUMENT_MUTATION } from '@/graphql/mutations/documents'
import { S3_URL_QUERY } from '@/graphql/queries/documents'

const Container = styled.div`
  text-align: center;
  margin: 106px 0;
  cursor: pointer;

  &&:hover {
    opacity: 0.6;
  }
`

const Icon = styled.div`
  font-size: 60px;
  color: #333;
`

const CervedPdfReport = ({ document, claimId }) => {
  const [fileObj, setFile] = useState(null)
  const [uploadFileLoading, setUploadFileLoading] = useState(false)
  const inputEl = useRef(null)
  const showToast = useToast()
  const [error, setError] = useModalTaskOrderError()

  const isReplace = !document ? false : document?.name !== '-'

  const fileNameId = useMemo(() => `${uuid()}_${document ? document.documentKey : ''}`, [document])

  const showUploadError = () => {
    setUploadFileLoading(false)
    showToast('error', 'Error uploading document, try again')
  }

  const uploadDocumentOptions = {
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
      },
      {
        query: DOCUMENTS_CLAIM_QUERY,
        variables: { claimId }
      }
    ]
  }

  const [
    uploadDocument,
    { loading: loadingCreateDocument }
  ] = useMutation(UPLOAD_DOCUMENT_MUTATION, uploadDocumentOptions)

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
            replace: isReplace,
            documentId: document.id,
            workflowExecutionId: document.workflowExecutionId,
            fromId: document.fromId
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

  const handleClick = () => {
    inputEl.current.click()
  }

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

  const loading = uploadFileLoading
    || getSignedUrlLoading
    || loadingCreateDocument

  return (
    <>
      <input
        hidden
        type="file"
        ref={inputEl}
        onChange={handleChangeLabel}
      />

      <CardTitle className="mb-5">
        <IntlMessages id="pages.claims.cerved-pdf-report" />
      </CardTitle>

      <IsLoading loading={loading}>
        <Container onClick={handleClick}>
          <Icon className="glyph-icon simple-icon-doc mb-3" />
          <p className="mb-0">
            <IntlMessages id="pages.claims.upload-replace" />
          </p>
        </Container>
      </IsLoading>

      <ModalTaskOrderError
        error={error}
        setError={setError}
      />
    </>
  )
}

CervedPdfReport.propTypes = {
  document: object,
  claimId: string
}

export default CervedPdfReport
