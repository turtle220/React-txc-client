import React, { useState, useMemo } from 'react'
import { string, func, bool } from 'prop-types'
import styled from 'styled-components'
import {
  CustomInput
} from 'reactstrap'
import { useLazyQuery, useApolloClient } from '@apollo/react-hooks'
import axios from 'axios'
import { v1 as uuid } from 'uuid'

import { S3_URL_QUERY, S3_DOWNLOAD_URL_QUERY } from '@/graphql/queries/documents'

import Loader from '@/components/Loader'
import IsLoading from '@/components/Loader/IsLoading'

import useToast from '@/hooks/useToast'

const StyledDownloadButton = styled.div`
  width: fit-content;
`

const DownloadButton = ({ fileNameKey, fileNameDisplay, path }) => {
  const [loading, setLoading] = useState(false)
  const apolloClient = useApolloClient()

  const handleClickDownload = async () => {
    setLoading(true)

    const { data: { s3DownloadUrl } } = await apolloClient.query({
      query: S3_DOWNLOAD_URL_QUERY,
      variables: {
        path,
        fileNameKey,
        fileNameDisplay
      }
    })

    setLoading(false)

    window.open(s3DownloadUrl, '_blank')
  }

  return (
    <StyledDownloadButton onClick={handleClickDownload}>
      <IsLoading loading={loading} size={25}>
        <a
          className="btn btn-outline-primary btn-xs"
          rel="noopener noreferrer"
          target="_blank"
        >
          {fileNameDisplay}
          <div className="glyph-icon iconsminds-download-1 d-inline ml-2" />
        </a>
      </IsLoading>
    </StyledDownloadButton>
  )
}

const InputFile = ({
  name,
  onChange,
  disabled,
  fileName,
  value,
  path,
  downloadFileKey,
  ...rest
}) => {
  const [fileObj, setFile] = useState(null)
  const [uploadFileLoading, setUploadFileLoading] = useState(false)
  const showToast = useToast()

  const fileNameId = useMemo(() => `${uuid()}_${fileName}`, [fileName])

  const showUploadError = () => {
    setUploadFileLoading(false)
    showToast('error', 'Upload error, try again.')
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
          showUploadError('upload error')
          return
        }

        onChange(name, fileNameId, fileObj)
        setUploadFileLoading(false)
      } catch {
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

    getUrl(
      {
        variables: {
          path,
          fileName: fileNameId,
          fileType: selectedFile.type
        },
      }
    )
  }

  const loading = getSignedUrlLoading || uploadFileLoading

  const getLabel = () => (
    !loading
      ? ((value || fileObj?.name) || 'Choose file')
      : (
        <div className="d-inline m-0">
          <Loader color="black" size={12} inline />
          <span className="d-inline ml-2">Loading...</span>
        </div>
      )
  )

  return (
    !disabled ? (
      <CustomInput
        type="file"
        onChange={handleChangeLabel}
        label={getLabel()}
        disabled={disabled || loading}
        {...rest}
      />
    ) : !!downloadFileKey && (
      <DownloadButton fileNameKey={downloadFileKey} fileNameDisplay={fileName} path={path} />
    )
  )
}

InputFile.propTypes = {
  name: string,
  onChange: func,
  disabled: bool,
  fileName: string.isRequired,
}

export default InputFile
