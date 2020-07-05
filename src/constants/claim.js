import { ROLE } from './roles'
import { formatCervedScores, formatDeloittePhase1, formatDeloittePhase2 } from '@/utils/csvExportFormatter'

export const CLAIM_STATUS = {
  ACTIVE: 'active',
  PENDING: 'pending',
  APPROVED_PHASE_ONE: 'approved phase 1',
  APPROVED_PHASE_TWO: 'approved phase 2',
  UNLISTED: 'unlisted',
  LISTED: 'listed',
  PARKED: 'parked',
  SOLD: 'sold',
  CLOSED: 'closed',
  PAID: 'paid',
  REJECTED: 'rejected'
}

export const CLAIM_MENU_ACTIONS = [
  {
    name: 'approveClaim',
    label: 'approve-claim',
    logMessage: {
      success: 'Success! Claim Approved.'
    },
    roles: [ROLE.TXC_ACCOUNT_ADMIN, ROLE.DELOITTE_CONSULTANT, ROLE.DELOITTE_PARTNER_ADMIN]
  },
  {
    name: 'approvePhaseOne',
    label: 'approve-phase-one',
    logMessage: {
      success: 'Success! Phase One is now approved.'
    },
    roles: [ROLE.DELOITTE_MANAGER_ADMIN]
  },
  {
    name: 'approvePhaseTwo',
    label: 'approve-phase-two',
    roles: [ROLE.DELOITTE_MANAGER_ADMIN]
  },
  {
    name: 'claimInterest',
    label: 'indicate-interest',
    logMessage: {
      success: 'Success! Your information will be reviewed shortly.',
      error: 'You have already indicated interest in this claim'
    },
    roles: [
      ROLE.MEMBER_BUYER_ALL,
      ROLE.MEMBER_BUYER_ALL_ACCOUNT_ADMIN,
      ROLE.MEMBER_BUYER_CLAIM,
      ROLE.MEMBER_BUYER_CLAIM_ACCOUNT_ADMIN
    ]
  },
  {
    name: 'claimPaid',
    label: 'mark-claim-paid',
    logMessage: {
      success: 'Success! Claim marked as paid.',
      error: 'You already marked claim paid'
    },
    roles: [
      ROLE.DELOITTE_CONSULTANT,
      ROLE.DELOITTE_PARTNER_ADMIN,
      ROLE.MEMBER_BUYER_ALL,
      ROLE.MEMBER_BUYER_CLAIM,
      ROLE.TXC_ACCOUNT_ADMIN,
      ROLE.MEMBER_BUYER_CLAIM,
      ROLE.MEMBER_BUYER_CLAIM_ACCOUNT_ADMIN
    ]
  },
  {
    name: 'downloadCervedScores',
    label: 'download-cerved-scores',
    type: 'export',
    formatter: (data) => formatCervedScores(data),
    roles: [
      ROLE.TXC_ACCOUNT_ADMIN,
      ROLE.TXC_SUPER_ADMIN,
      ROLE.TXC_OPERATION
    ]
  },
  {
    name: 'downloadDeloittePhaseOne',
    label: 'download-deloitte-phase-one',
    type: 'export',
    formatter: (data) => formatDeloittePhase1(data),
    roles: [
      ROLE.TXC_ACCOUNT_ADMIN,
      ROLE.TXC_SUPER_ADMIN,
      ROLE.TXC_OPERATION
    ]
  },
  {
    name: 'downloadDeloittePhaseTwo',
    label: 'download-deloitte-phase-two',
    type: 'export',
    formatter: (data) => formatDeloittePhase2(data),
    roles: [
      ROLE.TXC_ACCOUNT_ADMIN,
      ROLE.TXC_SUPER_ADMIN,
      ROLE.TXC_OPERATION
    ]
  },
  {
    name: 'rejectClaim',
    label: 'reject-claim',
    logMessage: {
      success: 'Success! Claim Rejected.'
    },
    roles: [
      ROLE.TXC_ACCOUNT_ADMIN,
      ROLE.DELOITTE_CONSULTANT,
      ROLE.DELOITTE_MANAGER_ADMIN,
      ROLE.DELOITTE_PARTNER_ADMIN
    ]
  }
]
