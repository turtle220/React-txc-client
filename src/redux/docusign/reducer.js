import { DOCUSIGN_CLOSE_SIGN_MODAL } from '../types'

const INIT_STATE = {
  docusignModalClosed: false
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case DOCUSIGN_CLOSE_SIGN_MODAL:
      return {
        ...state,
        docusignModalClosed: action.payload
      }

    default: return { ...state }
  }
}
