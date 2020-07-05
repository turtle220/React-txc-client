import axios from 'axios'
import { toast } from 'react-toastify'

import { getCurrentUser } from '@/utils/session'

const { REACT_APP_BACKEND_API_URL } = process.env

const currentUser = getCurrentUser()

const apiUrl = REACT_APP_BACKEND_API_URL

const DocusignEmbededExperience = {
  createEnvelope: async ({ account, taskExecutionId, ids, signers }) => {
    const { token } = currentUser
    let result = {}

    try {
      result = await axios({
        method: 'POST',
        url: `${apiUrl}/docusign/create-envelope-from-template`,
        data: {
          account,
          signers,
          taskExecutionId,
          ids
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    } catch (error) {
      toast.error(error.message)
      return null
    }

    return {
      envelope: result.data
    }
  },

  getEnvelopeRecipients: async ({ envelopeId, account }) => {
    const { token } = currentUser
    let result = {}

    try {
      result = await axios({
        method: 'POST',
        url: `${apiUrl}/docusign/envelope/recipients`,
        data: {
          envelopeId,
          account,
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    } catch (error) {
      toast.error(error.message)
      return null
    }

    return result.data
  },

  createSigningUrl: async ({ envelopeId, account, signer, taskExecution }) => {
    let result = {}

    try {
      result = await axios({
        method: 'POST',
        url: `${apiUrl}/docusign/envelope/signing-url`,
        data: {
          envelopeId,
          account,
          signer,
          taskExecution
        }
      })
    } catch (error) {
      toast.error(error.message)
      return null
    }

    return result.data
  },

  getUserInfo: async () => {
    const { token } = currentUser
    let result = {}

    try {
      result = await axios.get(`${apiUrl}/docusign/user-info`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    } catch (error) {
      toast.error(error.message)
      return null
    }

    return result.data
  }
}

export default DocusignEmbededExperience
