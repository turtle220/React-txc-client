import { DOCUSIGN_CLOSE_SIGN_MODAL } from '../types'

export const closeDocusignSignModal = (payload) => (
  {
    type: DOCUSIGN_CLOSE_SIGN_MODAL,
    payload
  }
)
