import { TASK_STATUS, TASK_LINK_LABEL } from '@/constants/task'

const memnberTaskLink = ({ status, link, goTo, memberId }) => {
  const value = link.split('/')
  const tab = parseInt(value[1], 0)

  if (status === TASK_STATUS.COMPLETED) {
    return {
      label: 'general.none',
      onClick: () => {}
    }
  }

  switch (tab) {
    case 1:
      return {
        label: TASK_LINK_LABEL.LINK_TO_MEMBER_DETAILS,
        onClick: goTo({
          path: `/app/administrative/members/${memberId}`
        })
      }
    case 2:
      return {
        label: TASK_LINK_LABEL.DOWNLOAD_DOCUMENT,
        onClick: goTo({
          tab,
          path: `/app/administrative/members/${memberId}`
        })
      }
    default:
      return {
        label: 'general.none',
        onClick: () => {}
      }
  }
}

export default memnberTaskLink
