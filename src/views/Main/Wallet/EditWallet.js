import React, { useState, useEffect } from 'react'
import { useApolloClient, useMutation } from '@apollo/react-hooks'
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

import Select from '@/components/Select'
import IsLoading from '@/components/Loader/IsLoading'

import { ROLE } from '@/constants/roles'

import IntlMessages from '@/utils/IntlMessages'
import { getEuroCurrencyDisplayFormat } from '@/utils/currency'

import { MEMBERS_QUERY } from '@/graphql/queries/members'
import { UPDATE_MEMBER_WALLET_MUTATION } from '@/graphql/mutations/wallets'

import { Balance } from './styles'

const EditWallet = ({ isOpen, close, onEdit }) => {
  const [loadingMembers, setLoadingMembers] = useState(false)
  const [members, setMembers] = useState([])
  const [membersOptions, setMembersOptions] = useState([])
  const [selectedMember, setSelectedMember] = useState(null)
  const [walletBalanceValue, setWalletBalanceValue] = useState(null)
  const [newBalanceValue, setNewBalanceValue] = useState(null)

  const apolloClient = useApolloClient()

  const fetchMembers = async () => {
    setLoadingMembers(true)

    const { data: { members } } = await apolloClient.query({
      query: MEMBERS_QUERY,
      variables: {
        approved: true,
        types: [
          ROLE.MEMBER_BUYER_DERIVATIVE_ACCOUNT_ADMIN,
          ROLE.MEMBER_BUYER_DERIVATIVE,
          ROLE.MEMBER_BUYER_CLAIM_ACCOUNT_ADMIN,
          ROLE.MEMBER_BUYER_CLAIM,
          ROLE.MEMBER_BUYER_ALL,
          ROLE.MEMBER_BUYER_ALL_ACCOUNT_ADMIN
        ]
      }
    })

    setLoadingMembers(false)
    setMembers(members)
    setMembersOptions(members.map(({ id, companyName }) => ({
      value: id,
      label: companyName
    })))
  }

  const getSelectedMember = () => (
    members.find(({ id }) => id === selectedMember) || {}
  )

  const getCurrentWalletBalance = () => {
    const { walletBalance } = getSelectedMember()
    return getEuroCurrencyDisplayFormat(walletBalance || 0, 0)
  }

  const getNewBlockedFundsAmount = () => {
    const { walletBalance } = getSelectedMember()
    return getEuroCurrencyDisplayFormat((walletBalance + parseFloat(walletBalanceValue)) || 0, 0)
  }

  const [updateMemberWalletBalance, {
    loading: savingWallet
  }] = useMutation(UPDATE_MEMBER_WALLET_MUTATION, {
    variables: {
      walletValue: newBalanceValue,
      memberId: selectedMember
    },
    onCompleted: ({ updateMemberWallet: { walletBalance } }) => {
      onEdit(walletBalance)
      fetchMembers()
    }
  })

  const isSaveEnabled = (
    selectedMember === null
  )

  const save = async () => {
    setWalletBalanceValue(null)
    await updateMemberWalletBalance()
    close()
    setSelectedMember(null)
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  return (
    <Modal isOpen={isOpen} toggle={close}>
      <ModalHeader toggle={close}>
        <IntlMessages id="pages.wallet.edit.edit-wallet" />
      </ModalHeader>
      <ModalBody>
        <p>
          <Select
            options={membersOptions}
            value={selectedMember}
            className='react-select'
            classNamePrefix='react-select'
            onChange={(opt) => {
              setSelectedMember(opt.value)
            }}
            isLoading={loadingMembers}
          />
        </p>
        <p>
          <b><IntlMessages id="pages.wallet.edit.blocked-funds" />: </b>
          {getCurrentWalletBalance()}
        </p>
        <Balance>
          <FormGroup>
            <Label for="balance">
              <b><IntlMessages id="pages.wallet.edit.amount-to-add" /></b>
            </Label>
            <NumberFormat
              className='form-control'
              defaultValue={null}
              onValueChange={(values) => {
                const { walletBalance } = getSelectedMember()
                const { value } = values
                setNewBalanceValue(walletBalance + parseFloat(value))
                setWalletBalanceValue(value)
              }}
              isNumericString
              placeholder="0"
              decimalScale={2}
              decimalSeparator=','
              thousandSeparator='.'
              prefix="€ "
            />
          </FormGroup>
        </Balance>
        <p>
          <b><IntlMessages id="pages.wallet.edit.new-blocked-funds-amount" />: </b>
          {getNewBlockedFundsAmount()}
        </p>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={save}
          disabled={isSaveEnabled}
        >
          <IsLoading loading={savingWallet} size={20} color='white'>
            <IntlMessages id="pages.wallet.edit.save" />
          </IsLoading>
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default EditWallet
