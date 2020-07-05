import {
  TASK_TYPE,
  TASK_STATUS,
  TASK_LINK_LABEL
} from '@/constants/task'

const claimTaskLink = (status, type, link, goTo, sellerMemberId) => {
  const value = link.split('/')
  const tab = parseInt(value[1], 10)

  if (status === TASK_STATUS.COMPLETED) {
    return {
      label: 'general.none',
      onClick: () => {}
    }
  }

  if (type === TASK_TYPE.DOCUSIGN) {
    return {
      label: TASK_LINK_LABEL.LINK_TO_DOCUSIGN_DOCUMENT,
      onClick: goTo({ tab: 1 })
    }
  }

  if (value[0] !== 'claims') {
    return {
      label: TASK_LINK_LABEL.LINK_TO_MEMBER_DETAILS,
      onClick: goTo({
        path: `/app/administrative/members/${sellerMemberId}`
      })
    }
  }

  switch (tab) {
    case 1:
      return {
        label: TASK_LINK_LABEL.LINK_TO_CLAIM_TAB,
        onClick: goTo({ tab })
      }
    case 2:
      return {
        label: TASK_LINK_LABEL.DOWNLOAD_DOCUMENT,
        onClick: goTo({ tab })
      }
    case 4:
      return {
        label: TASK_LINK_LABEL.LINK_TO_PHASE_ONE_APPROVAL,
        onClick: goTo({ tab })
      }
    case 5:
      return {
        label: TASK_LINK_LABEL.LINK_TO_PHASE_TWO_APPROVAL,
        onClick: goTo({ tab })
      }
    case 6:
      return {
        label: TASK_LINK_LABEL.LINK_TO_REPORT_SCORES,
        onClick: goTo({ tab })
      }
    default:
      return {
        label: 'general.none',
        onClick: () => {}
      }
  }
}

export default claimTaskLink
