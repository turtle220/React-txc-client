import {
  TASK_TYPE,
  TASK_ACTION_LABEL,
  TASK_STATUS
} from '@/constants/task'

const memberTaskAction = ({ type, handleUpdateWorkflowTask, handleApproveMember, goToClaim }) => {
  switch (type) {
    case TASK_TYPE.DOC_APPROVAL:
      return [
        {
          label: TASK_ACTION_LABEL.APPROVE,
          onClick: () => handleUpdateWorkflowTask(TASK_STATUS.COMPLETED)
        },
        {
          label: TASK_ACTION_LABEL.REJECT,
          onClick: () => handleUpdateWorkflowTask(TASK_STATUS.REJECTED)
        }
      ]
    case TASK_TYPE.DOC_UPLOAD:
      return [
        {
          label: TASK_ACTION_LABEL.UPLOAD,
          onClick: () => {}
        }
      ]
    case TASK_TYPE.DOCUSIGN:
      return [
        {
          label: TASK_ACTION_LABEL.E_SIGNATURE,
          onClick: () => {}
        }
      ]
    case TASK_TYPE.APPROVE_REJECT:
      return [
        {
          label: TASK_ACTION_LABEL.APPROVE,
          onClick: () => handleApproveMember()
        },
        {
          label: TASK_ACTION_LABEL.REJECT,
          onClick: () => handleUpdateWorkflowTask(TASK_STATUS.REJECTED)
        }
      ]
    case TASK_TYPE.CONFIRM:
      return [
        {
          label: TASK_ACTION_LABEL.CONFIRM,
          onClick: () => handleUpdateWorkflowTask(TASK_STATUS.COMPLETED)
        }
      ]
    case TASK_TYPE.DATA_ENTRY:
      return [
        {
          label: TASK_ACTION_LABEL.ENTER_DATA,
          onClick: goToClaim({ tab: 6 })
        }
      ]
    default:
      return [
        {
          label: 'general.none',
          onClick: () => {}
        }
      ]
  }
}

export default memberTaskAction
