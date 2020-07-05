import React, { useState } from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label
} from 'reactstrap'
import NumberFormat from 'react-number-format'
import { useMutation } from '@apollo/react-hooks'

import { useToast } from '@/hooks'

import IsLoading from '@/components/Loader/IsLoading'

import IntlMessages from '@/utils/IntlMessages'
import { getEuroCurrencyDisplayFormat } from '@/utils/currency'

import { ENTER_CREDIT_LINE } from './graphql/mutations'
import { GET_MEMBER } from './graphql/queries'

const EnterCreditLine = ({ isOpen, close, userId, memberId, memberCreditLine = null }) => {
  const [creditLine, setCreditLine] = useState(null)
  const showToast = useToast()

  const [
    enterCreditLine,
    { loading: enterCreditLineLoading }
  ] = useMutation(ENTER_CREDIT_LINE, {
    onCompleted: () => {
      close()
      showToast('success', 'Credit line successfully included')
    },
    refetchQueries: [
      {
        query: GET_MEMBER,
        variables: {
          memberId
        }
      }
    ]
  })

  const save = () => {
    enterCreditLine({
      variables: {
        userId,
        creditLine
      }
    })
  }

  return (
    <Modal isOpen={isOpen} toggle={close}>
      <ModalHeader toggle={close}>
        <IntlMessages id="pages.users.details.manage-credit-line" />
      </ModalHeader>
      <ModalBody>
        <p>
          <b><IntlMessages id="pages.users.details.current-credit-line" />: </b>
          {getEuroCurrencyDisplayFormat(memberCreditLine)}
        </p>
        <FormGroup>
          <Label for="credit-line">
            <b><IntlMessages id="pages.users.details.edit-credit-line" /></b>
          </Label>
          <NumberFormat
            className='form-control'
            onValueChange={(values) => {
              const { value } = values
              setCreditLine(memberCreditLine + parseFloat(value))
              if (value === '-' || value === '') {
                setCreditLine(memberCreditLine)
              }
            }}
            isNumericString
            placeholder="0"
            decimalScale={6}
            decimalSeparator=','
            thousandSeparator='.'
            prefix="€ "
          />
        </FormGroup>
        <p>
          <b><IntlMessages id="pages.users.details.new-credit-line" />: </b>
          {getEuroCurrencyDisplayFormat(creditLine)}
        </p>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={save}
          disabled={!creditLine}
        >
          <IsLoading loading={enterCreditLineLoading} size={20} color='white'>
            <IntlMessages id="pages.users.details.save" />
          </IsLoading>
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default EnterCreditLine
