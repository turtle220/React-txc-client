/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from 'reactstrap'
import { useMutation, useApolloClient } from '@apollo/react-hooks'

import { useToast } from '@/hooks'
import IntlMessages from '@/utils/IntlMessages'
import { DOCUMENTS_CLAIM_QUERY } from '@/graphql/queries/claims'

import { S3_BUCKET_PATHS } from '@/constants/s3BucketPaths'

import { S3_DOWNLOAD_URL_QUERY } from '@/graphql/queries/documents'

import CustomCell from '@/components/CustomCell'
import StatusCell from '@/components/StatusCell'
import IsLoading from '@/components/Loader/IsLoading'

import { LOG_TYPE } from '@/constants/logMessages'
import { APPROVE_DOCUMENT, REJECT_DOCUMENT } from '@/components/claims/DueDiligence/graphql/mutations'
import {
  DOCUMENT_STATUS,
  DOCUMENT_ACTION_TYPE,
  APPROVE_DOCUMENT_LOG_MESSAGE
} from '@/constants/documents'

import ActionUpload from '../ActionUpload'

const StyledNameCell = styled.div`
  display: flex;
  align-items: center;

  .name-cell-text {
    max-width: 500px;
    white-space: pre-wrap;
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
        path: `${S3_BUCKET_PATHS.DOCUMENTS.CLAIM}`,
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

const ActionCell = ({
  original: document,
  columnProps: { rest: { allowReplacePhaseOne, allowReplacePhaseTwo, claimId } }
}) => {
  const [doc, setDocument] = useState(document)
  const [actionType, setActionType] = useState(null)
  const showDefaultToast = useToast()
  const showToast = (actionType, toastType) => showDefaultToast(
    toastType,
    APPROVE_DOCUMENT_LOG_MESSAGE[actionType][toastType]
  )
  const isDisabled = (
    doc?.status === DOCUMENT_STATUS.APPROVED
    || doc?.status === DOCUMENT_STATUS.REJECTED
  )
  const allowReplace = {
    'Phase 1': allowReplacePhaseOne,
    'Phase 2': allowReplacePhaseTwo
  }

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

  if (document.name === '-') {
    return (
      <ActionUpload
        document={doc}
        allowReplace={allowReplace[doc?.category]}
      />
    )
  }

  if (isDisabled) {
    return <IntlMessages id="general.none" />
  }

  return (
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
  )
}

export const tableColumns = [
  {
    Header: renderLabel('name'),
    Cell: NameCell,
    accessor: 'description',
    minWidth: 300,
    style: getColumStyle()
  },
  {
    Header: renderLabel('category'),
    accessor: 'category',
    Cell: CustomCell,
    minWidth: 80,
    style: getColumStyle()
  },
  {
    Header: renderLabel('download', true),
    accessor: 'download',
    Cell: DownloadCell,
    minWidth: 50,
    style: getColumStyle(true)
  },
  {
    Header: renderLabel('type', true),
    accessor: 'type',
    Cell: CustomCell,
    minWidth: 100,
    style: getColumStyle(true)
  }
]

export const noBuyerSellerColumns = [
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
    getProps: ({ allowReplacePhaseOne, allowReplacePhaseTwo, claimId }) => ({
      allowReplacePhaseOne,
      allowReplacePhaseTwo,
      claimId
    })
  }
]
