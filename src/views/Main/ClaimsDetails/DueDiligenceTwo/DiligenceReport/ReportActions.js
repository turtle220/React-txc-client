import React, { useState } from 'react'
import { string, func, bool } from 'prop-types'
import { useApolloClient } from '@apollo/react-hooks'
import {
  Button,
  Popover,
  PopoverHeader,
  PopoverBody
} from 'reactstrap'

import IntlMessages from '@/utils/IntlMessages'

import { S3_BUCKET_PATHS } from '@/constants/s3BucketPaths'

import { S3_DOWNLOAD_URL_QUERY } from '@/graphql/queries/documents'

import Loader from '@/components/Loader'

const ReportActions = ({
  pdfFile,
  saveAndGenerate,
  loading
}) => {
  const [popoverIsOpen, setPopoverIsOpen] = useState(false)

  const togglePopover = () => setPopoverIsOpen(!popoverIsOpen)

  const apolloClient = useApolloClient()

  const openFile = async () => {
    const fileNameKey = pdfFile.split('/')[2]
    const { data: { s3DownloadUrl } } = await apolloClient.query({
      query: S3_DOWNLOAD_URL_QUERY,
      variables: {
        path: S3_BUCKET_PATHS.DOCUMENTS.CLAIM,
        fileNameKey,
        fileNameDisplay: pdfFile
      }
    })

    window.open(s3DownloadUrl, '_blank')
  }

  const handleSubmit = () => {
    saveAndGenerate()
    togglePopover()
  }

  return (
    <div className="text-right">
      {pdfFile ? (
        <Button
          size="xs"
          color="success"
          onClick={openFile}
        >
          <IntlMessages id="pages.claims.diligence.pdf-report-download" />
        </Button>
      ) : (
        <Button
          id="confirmPopover"
          color="success"
          onClick={togglePopover}
        >
          {loading ? (
            <p className="m-0">
              <span className="d-inline-block mr-1"><Loader size={15} /></span>
              <IntlMessages id="general.loading" />
            </p>
          ) : (
            <IntlMessages id="pages.claims.diligence.report-form-button" />
          )}
        </Button>
      )}
      <Popover
        isOpen={popoverIsOpen}
        placement="bottom"
        target="confirmPopover"
        toggle={togglePopover}
        className="p-3"
      >
        <PopoverHeader className="pb-1">
          <IntlMessages id="general.are-you-sure" />
        </PopoverHeader>
        <PopoverBody>
          <p>
            <IntlMessages id="general.cannot-be-undone" />
          </p>
          <Button
            color="success"
            outline
            size="sm"
            onClick={handleSubmit}
            disabled={loading}
            className="mr-2"
          >
            <IntlMessages id="general.yes" />
          </Button>
          <Button
            color="danger"
            outline
            size="sm"
            onClick={togglePopover}
          >
            <IntlMessages id="general.no" />
          </Button>
        </PopoverBody>
      </Popover>
    </div>
  )
}

ReportActions.propTypes = {
  pdfFile: string,
  saveAndGenerate: func,
  loading: bool
}

export default ReportActions
