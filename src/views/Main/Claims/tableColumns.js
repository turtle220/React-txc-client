/* eslint-disable react/prop-types */
import React from 'react'
import { UncontrolledTooltip } from 'reactstrap'

import scoreTypes from '@/constants/scoreTypes'

import CustomCell from '@/components/CustomCell'

import { getHumanizedDateFormat } from '@/utils/date'
import { getEuroCurrencyDisplayFormat } from '@/utils/currency'
import DotScore from './DotScore'
import './styles.css'

const defaultMinWidth = 150
const textWrap = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
}

const headerStyle = {
  textAlign: 'center',
  borderRight: 'solid 1px',
  borderColor: '#d3d5d8'
}

const columStyle = {
  paddingTop: '10px'
}

const columStyleCerved = {
  paddingTop: '10px'
}

const CenteredHeader = ({ scoreType }) => (
  <>
    <div
      className="d-flex justify-content-center align-items-center"
      id={scoreType.slug}
    >
      <span style={textWrap}>{scoreType.name}</span>
    </div>
    <UncontrolledTooltip target={scoreType.slug}>
      {scoreType.name}
    </UncontrolledTooltip>
  </>
)

const tableColumns = ({ canSeeIndicatedInterest, canSeeEligibleBuyers }) => {
  const headers = [
    {
      Header: () => <div style={headerStyle}>Details</div>,
      columns: [
        {
          Header: 'Id',
          accessor: 'id',
          Cell: ({ value }) => <CustomCell value={parseInt(value, 10)} />,
          maxWidth: 50,
          style: columStyle
        },
        {
          Header: 'Seller Name',
          accessor: 'sellerMember.companyName',
          Cell: CustomCell,
          minWidth: 150,
          style: columStyle
        },
        {
          Header: 'Status',
          accessor: 'status',
          Cell: CustomCell,
          minWidth: 150,
          style: columStyle
        },
        {
          Header: 'Type',
          accessor: 'type',
          Cell: CustomCell,
          minWidth: 100,
          style: columStyle
        },
        {
          Header: 'Date',
          accessor: 'claimIssueDate',
          Cell: ({ value }) => <CustomCell value={getHumanizedDateFormat(value)} />,
          minWidth: 150,
          style: columStyle
        },
        {
          Header: 'Notional Value',
          accessor: 'notionalValue',
          Cell: ({ value }) => <CustomCell value={getEuroCurrencyDisplayFormat(value)} />,
          minWidth: 150,
          style: columStyle
        },
      ]
    },
    {
      Header: () => <div style={headerStyle}>Cerved Scores</div>,
      columns: [
        {
          Header: <CenteredHeader scoreType={scoreTypes[0]} />,
          accessor: `sellerMember.${scoreTypes[0].slug}`,
          Cell: ({ value }) => <DotScore levels={scoreTypes[0].levels} value={value} />,
          resizable: false,
          minWidth: defaultMinWidth,
          style: columStyleCerved
        },
        {
          Header: <CenteredHeader scoreType={scoreTypes[1]} />,
          accessor: `sellerMember.${scoreTypes[1].slug}`,
          Cell: ({ value }) => <DotScore levels={scoreTypes[1].levels} value={value} />,
          resizable: false,
          minWidth: defaultMinWidth,
          style: columStyleCerved
        },
        {
          Header: <CenteredHeader scoreType={scoreTypes[2]} />,
          accessor: `sellerMember.${scoreTypes[2].slug}`,
          Cell: ({ value }) => <DotScore levels={scoreTypes[2].levels} value={value} />,
          resizable: false,
          minWidth: defaultMinWidth,
          style: columStyleCerved
        },
        {
          Header: <CenteredHeader scoreType={scoreTypes[3]} />,
          accessor: `sellerMember.${scoreTypes[3].slug}`,
          Cell: ({ value }) => <DotScore levels={scoreTypes[3].levels} value={value} />,
          resizable: false,
          minWidth: defaultMinWidth,
          style: columStyleCerved
        },
        {
          Header: <CenteredHeader scoreType={scoreTypes[4]} />,
          accessor: `sellerMember.${scoreTypes[4].slug}`,
          Cell: ({ value }) => <DotScore levels={scoreTypes[4].levels} value={value} />,
          resizable: false,
          minWidth: defaultMinWidth,
          style: columStyleCerved
        },
        {
          Header: <CenteredHeader scoreType={scoreTypes[5]} />,
          accessor: `sellerMember.${scoreTypes[5].slug}`,
          Cell: ({ value }) => <DotScore levels={scoreTypes[5].levels} value={value} />,
          resizable: false,
          minWidth: defaultMinWidth,
          style: columStyleCerved
        }
      ]
    },
    {
      Header: () => <div style={{ textAlign: 'center' }}>Deloitte Scores</div>,
      columns: [
        {
          Header: <CenteredHeader scoreType={scoreTypes[6]} />,
          accessor: scoreTypes[6].slug,
          Cell: ({ value }) => <DotScore levels={scoreTypes[6].levels} value={value} />,
          resizable: true,
          minWidth: defaultMinWidth,
          style: columStyle
        },
        {
          Header: <CenteredHeader scoreType={scoreTypes[7]} />,
          accessor: scoreTypes[7].slug,
          Cell: ({ value }) => <DotScore levels={scoreTypes[7].levels} value={value} />,
          resizable: true,
          minWidth: defaultMinWidth,
          style: columStyle
        },
        {
          Header: <CenteredHeader scoreType={scoreTypes[8]} />,
          accessor: scoreTypes[8].slug,
          Cell: ({ value }) => <DotScore levels={scoreTypes[8].levels} value={value} />,
          resizable: true,
          minWidth: defaultMinWidth,
          style: columStyle
        },
        {
          Header: <CenteredHeader scoreType={scoreTypes[9]} />,
          accessor: scoreTypes[9].slug,
          Cell: ({ value }) => <DotScore levels={scoreTypes[9].levels} value={value} />,
          resizable: true,
          minWidth: defaultMinWidth,
          style: columStyle
        },
        {
          Header: <CenteredHeader scoreType={scoreTypes[10]} />,
          accessor: scoreTypes[10].slug,
          Cell: ({ value }) => <DotScore levels={scoreTypes[10].levels} value={value} />,
          resizable: true,
          minWidth: defaultMinWidth,
          style: columStyle
        },
        {
          Header: <CenteredHeader scoreType={scoreTypes[11]} />,
          accessor: scoreTypes[11].slug,
          Cell: ({ value }) => <DotScore levels={scoreTypes[11].levels} value={value} />,
          resizable: true,
          minWidth: defaultMinWidth,
          style: columStyle
        },
        {
          Header: <CenteredHeader scoreType={scoreTypes[12]} />,
          accessor: scoreTypes[12].slug,
          Cell: ({ value }) => <DotScore levels={scoreTypes[12].levels} value={value} />,
          resizable: true,
          minWidth: defaultMinWidth,
          style: columStyle
        },
        {
          Header: <CenteredHeader scoreType={scoreTypes[13]} />,
          accessor: scoreTypes[13].slug,
          Cell: ({ value }) => <DotScore levels={scoreTypes[13].levels} value={value} />,
          resizable: true,
          minWidth: defaultMinWidth,
          style: columStyle
        }
      ]
    }
  ]

  if (canSeeIndicatedInterest) {
    headers[0].columns.push({
      Header: 'Indicated Interest',
      accessor: 'indicatedInterest',
      Cell: ({ value }) => <CustomCell value={value ? 'Yes' : 'No'} />,
      minWidth: 130,
      style: columStyle
    })
    headers[0].columns.push({
      Header: 'Approved for Auction',
      accessor: 'approvedForAuction',
      Cell: ({ value }) => <CustomCell value={value ? 'Yes' : 'No'} />,
      minWidth: 130,
      style: columStyle
    })
  }

  if (canSeeEligibleBuyers) {
    headers[0].columns.push({
      Header: 'Eligible Buyers',
      accessor: 'eligibleBuyers',
      Cell: ({ value }) => <CustomCell value={value?.join(', ') || '-'} />,
      minWidth: 130,
      style: columStyle
    })
  }

  return headers
}

export default tableColumns
