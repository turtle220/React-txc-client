import React from 'react'
import { bool, func } from 'prop-types'
import { useMutation } from '@apollo/react-hooks'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
} from 'reactstrap'
import * as yup from 'yup'
import { Formik, Field } from 'formik'

import IsLoading from '@/components/Loader/IsLoading'

import IntlMessages from '@/utils/IntlMessages'

import useToast from '@/hooks/useToast'

import { SEND_INVITE_MUTATION } from '@/graphql/mutations/invites'

const SimpleEmailModal = ({ isOpen, closeModal }) => {
  const showToast = useToast()

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Type a valid email')
      .required('This field is required')
  })

  const [sendInvite, { loading }] = useMutation(SEND_INVITE_MUTATION, {
    onCompleted: () => {
      showToast('success', 'invited successfully.')
      closeModal()
    },
    onError: (error) => {
      showToast('error', error)
      closeModal()
    }
  })

  const createInvite = async (values) => {
    await sendInvite({ variables: values })
  }

  const renderError = (touched, errors, field) => (
    errors[field]
      && touched[field] && (
      <div className="invalid-feedback d-block">
        {errors[field]}
      </div>
    )
  )

  return (
    <Modal isOpen={isOpen}>
      <Formik
        initialValues={{
          email: ''
        }}
        validationSchema={validationSchema}
        onSubmit={createInvite}
      >
        {({ errors, touched, handleSubmit }) => (
          <>
            <ModalHeader toggle={closeModal}>
              <IntlMessages id='pages.account-settings.invite' />
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for='inputEmail'>
                  <IntlMessages id='pages.account-settings.invite.email' />
                </Label>
                <Field className='form-control' name='email' />
                {renderError(touched, errors, 'email')}
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                color='default'
                onClick={() => closeModal()}
              >
                <IntlMessages id='pages.account-settings.invite.cancel' />
              </Button>
              <Button color='primary' onClick={handleSubmit}>
                <IsLoading loading={loading} size={20} color='white'>
                  <IntlMessages id='pages.account-settings.invite.submit' />
                </IsLoading>
              </Button>
            </ModalFooter>
          </>
        )}
      </Formik>
    </Modal>
  )
}

SimpleEmailModal.propTypes = {
  isOpen: bool,
  closeModal: func
}

export default SimpleEmailModal
