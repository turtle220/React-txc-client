import {
  TASK_TYPE,
  TASK_ACTION_LABEL,
  TASK_STATUS
} from '@/constants/task'
import { WORKFLOW_TASKS } from '@/constants/workflow-tasks'

const claimTaskAction = ({ type, onClick, taskName, rejectClaim }) => {
  switch (type) {
    case TASK_TYPE.DOC_APPROVAL:
      return [
        {
          label: TASK_ACTION_LABEL.APPROVE,
          onClick: () => onClick(TASK_STATUS.COMPLETED)
        },
        {
          label: TASK_ACTION_LABEL.REJECT,
          onClick: () => onClick(TASK_STATUS.REJECTED)
        }
      ]
    case TASK_TYPE.DOC_UPLOAD:
      return [
        {
          label: TASK_ACTION_LABEL.UPLOAD,
          onClick: () => {}
        }
      ]
    case TASK_TYPE.MULTIPLE_DOC_UPLOAD:
      return [
        {
          label: TASK_ACTION_LABEL.UPLOAD,
          onClick: () => {}
        }
      ]
    case TASK_TYPE.CONFIRM:
      return [
        {
          label: TASK_ACTION_LABEL.CONFIRM,
          onClick: () => onClick(TASK_STATUS.COMPLETED)
        }
      ]
    case TASK_TYPE.DATA_ENTRY:
      return [
        {
          label: TASK_ACTION_LABEL.ENTER_DATA,
          onClick: () => {}
        }
      ]
    case TASK_TYPE.SUBMIT:
      return [
        {
          label: TASK_ACTION_LABEL.SUBMIT,
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
          onClick: () => onClick(TASK_STATUS.COMPLETED)
        },
        {
          label: TASK_ACTION_LABEL.REJECT,
          onClick: () => taskName === WORKFLOW_TASKS.CLAIM_APPROVAL.MARK_CLAIM_AS_APPROVED
            ? rejectClaim()
            : onClick(TASK_STATUS.REJECTED)
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

export default claimTaskAction
