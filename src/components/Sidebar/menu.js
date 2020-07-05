import DerivaitvesIcon from '@/components/svg/DerivativesIcon'

import { ROLE } from '@/constants/roles'

export const MENU_IEMS = [
  {
    id: 'mydashboard',
    icon: 'simple-icon-home',
    label: 'menu.my-dashboard',
    to: '/app/my-dashboard'
  },
  {
    id: 'clients',
    icon: 'iconsminds-business-mens',
    label: 'menu.clients',
    to: '/app/clients',
    roles: [ROLE.BROKER],
  },
  {
    id: 'administrative',
    icon: 'iconsminds-file-clipboard-file---text',
    label: 'menu.administrative',
    to: '/app/administrative',
    roles: [
      ROLE.TXC_ACCOUNT_ADMIN,
      ROLE.TXC_SUPER_ADMIN,
      ROLE.TXC_OPERATION,
      ROLE.NOTARY_ADMIN,
      ROLE.TXC_BACK_OFFICE
    ],
    subs: [
      {
        id: 'administrative-members',
        label: 'menu.members',
        to: '/app/administrative/members',
        roles: [
          ROLE.TXC_ACCOUNT_ADMIN,
          ROLE.TXC_SUPER_ADMIN,
          ROLE.TXC_OPERATION,
          ROLE.NOTARY_ADMIN
        ]
      },
      {
        id: 'administrative-admins-users',
        area: 'manageAdminUser',
        label: 'menu.users',
        to: '/app/administrative/users',
        roles: [
          ROLE.TXC_ACCOUNT_ADMIN,
          ROLE.TXC_SUPER_ADMIN,
          ROLE.TXC_OPERATION,
          ROLE.TXC_BACK_OFFICE,
          ROLE.NOTARY_ADMIN
        ]
      },
      {
        id: 'administrative-admin-account-settings',
        label: 'menu.account-settings',
        to: '/app/administrative/account-settings',
        roles: [ROLE.TXC_ACCOUNT_ADMIN, ROLE.TXC_SUPER_ADMIN, ROLE.NOTARY_ADMIN]
      }
    ]
  },
  {
    id: 'tasks',
    icon: 'iconsminds-check',
    label: 'menu.tasks',
    to: '/app/tasks',
    roles: [
      ROLE.TXC_ACCOUNT_ADMIN,
      ROLE.TXC_OPERATION,
      ROLE.TXC_SUPER_ADMIN,
      ROLE.MEMBER_BUYER_ALL,
      ROLE.MEMBER_BUYER_ALL_ACCOUNT_ADMIN,
      ROLE.MEMBER_BUYER_CLAIM,
      ROLE.MEMBER_BUYER_CLAIM_ACCOUNT_ADMIN,
      ROLE.MEMBER_BUYER_DERIVATIVE_ACCOUNT_ADMIN,
      ROLE.MEMBER_SELLER,
      ROLE.BROKER
    ]
  },
  {
    id: 'claims',
    area: 'viewClaim',
    icon: 'iconsminds-optimization',
    label: 'menu.claims',
    to: '/app/claims',
    roles: [
      ROLE.TXC_ACCOUNT_ADMIN,
      ROLE.TXC_SUPER_ADMIN,
      ROLE.TXC_OPERATION,
      ROLE.MEMBER_BUYER_ALL,
      ROLE.MEMBER_BUYER_ALL_ACCOUNT_ADMIN,
      ROLE.MEMBER_BUYER_CLAIM,
      ROLE.MEMBER_BUYER_CLAIM_ACCOUNT_ADMIN,
      ROLE.MEMBER_BUYER_DERIVATIVE_ACCOUNT_ADMIN,
      ROLE.MEMBER_SELLER,
      ROLE.BROKER,
      ROLE.DELOITTE_MANAGER_ADMIN,
      ROLE.DELOITTE_PARTNER_ADMIN,
      ROLE.DELOITTE_CONSULTANT,
      ROLE.NOTARY_ADMIN
    ]
  },
  {
    id: 'derivatives',
    icon: 'simple-icon-list',
    customIcon: DerivaitvesIcon,
    label: 'menu.derivatives',
    to: '/app/derivatives',
    roles: [
      ROLE.TXC_ACCOUNT_ADMIN,
      ROLE.TXC_SUPER_ADMIN,
      ROLE.TXC_OPERATION,
      ROLE.TXC_BACK_OFFICE,
      ROLE.MEMBER_BUYER_ALL,
      ROLE.MEMBER_BUYER_ALL_ACCOUNT_ADMIN,
      ROLE.MEMBER_BUYER_DERIVATIVE_ACCOUNT_ADMIN,
      ROLE.MEMBER_BUYER_DERIVATIVE
    ]
  },
  {
    id: 'trades',
    icon: 'iconsminds-statistic',
    label: 'menu.trades',
    to: '/app/trades',
    roles: [
      ROLE.TXC_ACCOUNT_ADMIN,
      ROLE.TXC_SUPER_ADMIN,
      ROLE.TXC_OPERATION,
      ROLE.TXC_BACK_OFFICE,
      ROLE.NOTARY_ADMIN,
      ROLE.BROKER,
      ROLE.MEMBER_SELLER,
      ROLE.MEMBER_BUYER_ALL,
      ROLE.MEMBER_BUYER_ALL_ACCOUNT_ADMIN,
      ROLE.MEMBER_BUYER_CLAIM,
      ROLE.MEMBER_BUYER_CLAIM_ACCOUNT_ADMIN,
      ROLE.MEMBER_BUYER_DERIVATIVE,
      ROLE.MEMBER_BUYER_DERIVATIVE_ACCOUNT_ADMIN,
      ROLE.MEMBER_BUYER_ALL
    ]
  },
  {
    id: 'wallet',
    area: 'viewWallet',
    icon: 'iconsminds-wallet',
    label: 'menu.wallet',
    to: '/app/wallet',
    roles: [
      ROLE.TXC_ACCOUNT_ADMIN,
      ROLE.TXC_SUPER_ADMIN,
      ROLE.TXC_BACK_OFFICE,
      ROLE.BROKER,
      ROLE.MEMBER_SELLER,
      ROLE.MEMBER_BUYER_CLAIM,
      ROLE.MEMBER_BUYER_ALL,
      ROLE.MEMBER_BUYER_ALL_ACCOUNT_ADMIN,
      ROLE.MEMBER_BUYER_CLAIM_ACCOUNT_ADMIN,
      ROLE.MEMBER_BUYER_DERIVATIVE_ACCOUNT_ADMIN,
      ROLE.MEMBER_BUYER_DERIVATIVE
    ]
  }
]
