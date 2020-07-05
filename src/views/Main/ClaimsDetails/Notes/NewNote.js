import React from 'react'
import { bool, func } from 'prop-types'
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

const NewNote = ({ isOpen, closeModal }) => {
  const validationSchema = yup.object().shape({
    title: yup.string().required('This field is required'),
    note: yup.string().required('This field is required')
  })

  const addNote = async (values) => {
    // eslint-disable-next-line
    console.log('note values', values)
    closeModal()
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
          title: '',
          note: ''
        }}
        validationSchema={validationSchema}
        onSubmit={addNote}
      >
        {({ errors, touched, handleSubmit }) => (
          <>
            <ModalHeader toggle={closeModal}>
              <IntlMessages id='pages.claims.details.add-new-note' />
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for='inputTitle'>
                  <IntlMessages id='pages.claims.details.add-note-title' />
                </Label>
                <Field className='form-control' name='title' />
                {renderError(touched, errors, 'title')}
              </FormGroup>
              <FormGroup>
                <Label for='inputNote'>
                  <IntlMessages id='pages.claims.details.add-note-content' />
                </Label>
                <Field className='form-control' component='textarea' rows='4' name='note' />
                {renderError(touched, errors, 'note')}
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
                <IsLoading loading={false} size={20} color='white'>
                  <IntlMessages id='pages.claims.details.add-submit' />
                </IsLoading>
              </Button>
            </ModalFooter>
          </>
        )}
      </Formik>
    </Modal>
  )
}

NewNote.propTypes = {
  isOpen: bool,
  closeModal: func
}

export default NewNote
