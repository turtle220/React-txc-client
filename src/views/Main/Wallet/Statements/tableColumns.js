import React, { useState } from 'react'
import { useApolloClient } from '@apollo/react-hooks'

import IntlMessages from '@/utils/IntlMessages'
import { getHumanizedDateFormat } from '@/utils/date'

import CustomCell from '@/components/CustomCell'
import IsLoading from '@/components/Loader/IsLoading'

import { S3_BUCKET_PATHS } from '@/constants/s3BucketPaths'

import { S3_DOWNLOAD_URL_QUERY } from '@/graphql/queries/documents'

const getColumStyle = (center) => ({
  paddingTop: '10px',
  textAlign: center ? 'center' : 'left'
})

const renderLabel = (label, center) => (
  <div className={center && 'text-center'}>
    <IntlMessages id={`tabs.documents.table.${label}`} />
  </div>
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
    accessor: 'description',
    Cell: CustomCell,
    minWidth: 150,
    style: getColumStyle()
  },
  {
    Header: renderLabel('date'),
    accessor: 'createdAt',
    Cell: ({ value }) => <CustomCell value={getHumanizedDateFormat(value)} />,
    minWidth: 150,
    style: getColumStyle()
  },
  {
    Header: renderLabel('download', true),
    Cell: DownloadCell,
    minWidth: 50,
    style: getColumStyle(true)
  },
]

export default tableColumns
