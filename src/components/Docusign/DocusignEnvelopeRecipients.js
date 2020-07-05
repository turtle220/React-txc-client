import React, { useState, useEffect } from 'react'
import propTypes from 'prop-types'
import { UncontrolledTooltip } from 'reactstrap'

import DocusignEmbededExperience from '@/utils/docusign'
import { getCurrentUser } from '@/utils/session'

import Loader from '@/components/Loader'

const DocusignEnvelopeRecipients = ({ onCreate, taskExecution, ids, signers }) => {
  const [isSaving, setIsSaving] = useState(true)
  const [signer, setSigner] = useState({})
  const currentUser = getCurrentUser()

  const createEnvelope = async () => {
    const user = await DocusignEmbededExperience.getUserInfo()

    if (!user) {
      setIsSaving(false)
      return null
    }

    const account = user.accounts ? user.accounts[0] : {}

    const result = await DocusignEmbededExperience.createEnvelope({
      taskExecutionId: taskExecution.id,
      ids,
      account,
      signers: signers.map((signer) => {
        if (signer.email === currentUser.email) {
          return {
            ...signer,
            email: user.email
          }
        }
        return signer
      })
    })

    setIsSaving(false)

    if (!result) {
      return null
    }

    return {
      envelope: result.envelope,
      user
    }
  }

  const getRecipients = async () => {
    const result = await createEnvelope()

    if (!result) {
      return
    }

    const { envelope, user } = result

    const recipients = await DocusignEmbededExperience.getEnvelopeRecipients({
      envelopeId: envelope.envelope.envelopeId,
      account: user.accounts[0]
    })

    if (!recipients) {
      return
    }

    // eslint-disable-next-line max-len
    const signer = recipients.signers.filter((recipient) => recipient.clientUserId === currentUser.id)
    if (user) {
      signer.email = user.email
    }
    setSigner(signer.length ? signer[0] : false)

    const signingUrl = await DocusignEmbededExperience.createSigningUrl({
      envelopeId: envelope.envelope.envelopeId,
      account: user.accounts[0],
      signer,
      taskExecution
    })

    if (signingUrl) {
      onCreate({
        envelope: envelope.envelope,
        user,
        url: signingUrl.url
      })
    }
  }

  useEffect(() => {
    getRecipients()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isSaving) {
    return (
      <>
        <div id="loaderWithTooltip">
          <Loader color="#333" size={23} />
        </div>
        <UncontrolledTooltip target="loaderWithTooltip">
          Preparing for signing
        </UncontrolledTooltip>
      </>
    )
  }

  if (signer) {
    return <span>none</span>
  }

  return <span>You&apos;re not in the signers list.</span>
}

DocusignEnvelopeRecipients.propTypes = {
  onCreate: propTypes.func,
  taskExecution: propTypes.object,
  ids: propTypes.object,
  signers: propTypes.array
}

export default DocusignEnvelopeRecipients
