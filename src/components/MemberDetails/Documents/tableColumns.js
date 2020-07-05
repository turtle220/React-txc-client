/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import styled from 'styled-components'
import { useApolloClient } from '@apollo/react-hooks'

import IntlMessages from '@/utils/IntlMessages'

import CustomCell from '@/components/CustomCell'
import IsLoading from '@/components/Loader/IsLoading'

import { S3_BUCKET_PATHS } from '@/constants/s3BucketPaths'

import { S3_DOWNLOAD_URL_QUERY } from '@/graphql/queries/documents'

import ActionCell from './ActionCell'
import StatusCell from './StatusCell'

const StyledNameCell = styled.div`
  display: flex;
  align-items: center;

  .name-cell-text {
    max-width: 500px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`

const getColumStyle = (center) => ({
  paddingTop: '10px',
  textAlign: center ? 'center' : 'left'
})

const renderLabel = (label, center) => (
  <div className={center && 'text-center'}>
    <IntlMessages id={`tabs.documents.table.${label}`} />
  </div>
)

const NameCell = ({ original }) => (
  <StyledNameCell title={original.description}>
    <div className="glyph-icon simple-icon-doc d-inline mr-2" />
    <CustomCell
      value={original.description}
      className='name-cell-text'
    />
  </StyledNameCell>
)

const DownloadCell = ({ original }) => {
  const [loading, setLoading] = useState(false)
  const apolloClient = useApolloClient()

  if (original.name === '-') {
    return '-'
  }

  const handleClickDownload = async () => {
    setLoading(true)

    const { data: { s3DownloadUrl } } = await apolloClient.query({
      query: S3_DOWNLOAD_URL_QUERY,
      variables: {
        path: `${S3_BUCKET_PATHS.DOCUMENTS.MEMBER}`,
        fileNameKey: original.name,
        fileNameDisplay: original.description
      }
    })

    setLoading(false)

    window.open(s3DownloadUrl, '_blank')
  }


  return (
    <IsLoading size={25} loading={loading}>
      <button
        className="btn bg-transparent p-0 pt-1 border-0"
        type="button"
        onClick={handleClickDownload}
      >
        <div className="glyph-icon iconsminds-download-1" />
      </button>
    </IsLoading>
  )
}

const tableColumns = [
  {
    Header: renderLabel('name'),
    Cell: NameCell,
    minWidth: 300,
    style: getColumStyle()
  },
  {
    Header: renderLabel('category'),
    accessor: 'category',
    Cell: CustomCell,
    minWidth: 150,
    style: getColumStyle()
  },
  {
    Header: renderLabel('download', true),
    Cell: DownloadCell,
    minWidth: 100,
    style: getColumStyle(true)
  },
  {
    Header: renderLabel('status'),
    accessor: 'status',
    Cell: StatusCell,
    minWidth: 100,
    style: getColumStyle()
  },
  {
    Header: renderLabel('action', true),
    Cell: ActionCell,
    filterable: false,
    sortable: false,
    resizable: false,
    style: getColumStyle(true),
    getProps: ({ workflowStatus, fromId }) => ({ workflowStatus, fromId })
  }
]

export default tableColumns
