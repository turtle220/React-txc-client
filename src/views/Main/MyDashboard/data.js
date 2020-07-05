import { ROLE } from '@/constants/roles'

export const shortcuts = [
  {
    id: 1,
    name: 'Marketplace',
    icon: 'iconsminds-digital-drawing',
    url: 'https://txc.list-group.com/api/login',
    externalUrl: true,
    roles: [
      ROLE.MEMBER_BUYER_DERIVATIVE_ACCOUNT_ADMIN,
      ROLE.MEMBER_BUYER_DERIVATIVE,
      ROLE.MEMBER_BUYER_CLAIM_ACCOUNT_ADMIN,
      ROLE.MEMBER_BUYER_CLAIM,
      ROLE.MEMBER_BUYER_ALL,
      ROLE.MEMBER_BUYER_ALL_ACCOUNT_ADMIN,
      ROLE.MEMBER_SELLER,
      ROLE.BROKER,
      ROLE.TXC_ACCOUNT_ADMIN,
      ROLE.TXC_SUPER_ADMIN,
      ROLE.TXC_OPERATION,
      ROLE.TXC_BACK_OFFICE
    ]
  },
  // {
  //   id: 2,
  //   name: 'Portfolio',
  //   icon: 'iconsminds-statistic',
  //   url: '/',
  //   externalUrl: false,
  //   roles: [
  //     ROLE.MEMBER_SELLER,
  //     ROLE.MEMBER_BUYER_DERIVATIVE_ACCOUNT_ADMIN,
  //     ROLE.MEMBER_BUYER_DERIVATIVE,
  //     ROLE.MEMBER_BUYER_CLAIM_ACCOUNT_ADMIN,
  //     ROLE.MEMBER_BUYER_CLAIM,
  //     ROLE.MEMBER_BUYER_ALL,
  //     ROLE.MEMBER_BUYER_ALL_ACCOUNT_ADMIN,
  //     ROLE.BROKER
  //   ]
  // },
  {
    id: 2,
    name: 'Trades',
    icon: 'iconsminds-statistic',
    url: '/app/trades',
    externalUrl: false,
    roles: [
      ROLE.MEMBER_SELLER,
      ROLE.MEMBER_BUYER_DERIVATIVE_ACCOUNT_ADMIN,
      ROLE.MEMBER_BUYER_DERIVATIVE,
      ROLE.MEMBER_BUYER_CLAIM_ACCOUNT_ADMIN,
      ROLE.MEMBER_BUYER_CLAIM,
      ROLE.MEMBER_BUYER_ALL,
      ROLE.MEMBER_BUYER_ALL_ACCOUNT_ADMIN,
      ROLE.TXC_BACK_OFFICE,
    ]
  },
  {
    id: 3,
    name: 'Sell a Claim',
    icon: 'iconsminds-optimization',
    url: '/app/claims',
    externalUrl: false,
    roles: [ROLE.MEMBER_SELLER, ROLE.BROKER]
  },
  {
    id: 4,
    name: 'My Account',
    icon: 'iconsminds-files',
    url: '/app/administrative/account-settings',
    externalUrl: false,
    roles: [
      ROLE.TXC_ACCOUNT_ADMIN,
      ROLE.TXC_SUPER_ADMIN,
      ROLE.BROKER,
      ROLE.TXC_OPERATION,
      ROLE.TXC_BACK_OFFICE,
      ROLE.MEMBER_SELLER,
      ROLE.MEMBER_BUYER_DERIVATIVE_ACCOUNT_ADMIN,
      ROLE.MEMBER_BUYER_DERIVATIVE,
      ROLE.MEMBER_BUYER_CLAIM_ACCOUNT_ADMIN,
      ROLE.MEMBER_BUYER_CLAIM,
      ROLE.MEMBER_BUYER_ALL,
      ROLE.MEMBER_BUYER_ALL_ACCOUNT_ADMIN
    ]
  },
  {
    id: 5,
    name: 'Members',
    icon: 'iconsminds-business-man-woman',
    url: '/app/administrative/members',
    externalUrl: false,
    roles: [
      ROLE.TXC_ACCOUNT_ADMIN,
      ROLE.TXC_SUPER_ADMIN,
      ROLE.TXC_OPERATION,
      ROLE.NOTARY_ADMIN
    ]
  },
  {
    id: 6,
    name: 'Clients',
    icon: 'iconsminds-business-man-woman',
    url: '/app/clients',
    externalUrl: false,
    roles: [
      ROLE.BROKER
    ]
  },
  {
    id: 7,
    name: 'Users',
    icon: 'iconsminds-mens',
    url: '/app/administrative/users',
    externalUrl: false,
    roles: [
      ROLE.TXC_ACCOUNT_ADMIN,
      ROLE.TXC_SUPER_ADMIN,
      ROLE.TXC_BACK_OFFICE,
    ]
  }
  // { id: 5, name: 'Reports', icon: 'iconsminds-monitor-analytics', url: '/' },
  // { id: 6, name: 'TBD', icon: 'iconsminds-optimization', url: '/' },
]

export const wallet = {
  balance: '€ 500.000',
  transactions: '5',
  lastTransactionsDate: '15/09/2019',
  amountTransactions: '€ 100.000',
}

export const tasks = [
  { id: 1, name: 'Approve Document' },
  { id: 2, name: 'Sign Docusign Document' },
  { id: 3, name: 'Upload Cerved PDF Report' },
  { id: 4, name: 'Approve Document' },
  { id: 5, name: 'Sign Docusign Document' },
  { id: 6, name: 'Upload Cerved PDF Report' },
  { id: 7, name: 'Approve Document' },
  { id: 8, name: 'Sign Docusign Document' },
  { id: 9, name: 'Upload Cerved PDF Report' },
  { id: 10, name: 'Approve Document' },
  { id: 11, name: 'Sign Docusign Document' },
  { id: 12, name: 'Sign Docusign Document' },
]
