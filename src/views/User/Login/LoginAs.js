import React, { useState } from 'react'
import { func, boolean } from 'prop-types'
import styled from 'styled-components'
import { Button, Row } from 'reactstrap'
import { useQuery } from '@apollo/react-hooks'

import { Colxx } from '@/components/CustomBootstrap'

import { ROLE } from '@/constants/roles'

import { ADMIN_ROLES_QUERY } from '../graphql/queries'

import Loader from '@/components/Loader'
import Select from '@/components/Select'


const ROLE_CREDENTIALS = {
  [ROLE.TXC_ACCOUNT_ADMIN]: {
    email: 'Nathaniel0@gmail.com',
    password: 'g61v9eGA'
  },
  [ROLE.TXC_SUPER_ADMIN]: {
    email: 'Moises_Bailey@hotmail.com',
    password: 'g61v9eGA'
  },
  [ROLE.TXC_OPERATION]: {
    email: 'Katelyn_Cole10@hotmail.com',
    password: 'g61v9eGA'
  },
  [ROLE.TXC_BACK_OFFICE]: {
    email: 'Carrie_Prosacco3@yahoo.com',
    password: 'g61v9eGA'
  },
  [ROLE.DELOITTE_MANAGER_ADMIN]: {
    email: 'Tia_Feil@yahoo.com',
    password: 'g61v9eGA'
  },
  [ROLE.DELOITTE_CONSULTANT]: {
    email: 'Angus.Schmitt@hotmail.com',
    password: 'g61v9eGA'
  },
  [ROLE.DELOITTE_PARTNER_ADMIN]: {
    email: 'Estrella49@hotmail.com',
    password: 'g61v9eGA'
  },
  [ROLE.NOTARY_ADMIN]: {
    email: 'Roxanne_Lebsack57@yahoo.com',
    password: 'g61v9eGA'
  },
  [ROLE.MEMBER_SELLER]: {
    email: 'Ahmed_Rodriguez11@hotmail.com',
    password: 'g61v9eGA'
  },
  [ROLE.MEMBER_BUYER_DERIVATIVE_ACCOUNT_ADMIN]: {
    email: 'Gradyi63@yahoo.com',
    password: 'g61v9eGA'
  },
  [ROLE.MEMBER_BUYER_DERIVATIVE]: {
    email: 'Eunice_Wilderman67@gmail.com',
    password: 'g61v9eGA'
  },
  [ROLE.MEMBER_BUYER_CLAIM_ACCOUNT_ADMIN]: {
    email: 'Grady63@yahoo.com',
    password: 'g61v9eGA'
  },
  [ROLE.MEMBER_BUYER_CLAIM]: {
    email: 'Richmond_Cummings89@hotmail.com',
    password: 'g61v9eGA'
  },
  [ROLE.BROKER]: {
    email: 'Lupe_Rutherford@hotmail.com',
    password: 'g61v9eGA'
  },
  [ROLE.MEMBER_BUYER_ALL]: {
    email: 'Melba77@hotmail.com',
    password: 'g61v9eGA'
  }
}

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;

  > span {
    font-size: 20px;
  }
`

const LoginAs = ({ onLogin, logging }) => {
  const [roleSelected, setRoleSelected] = useState(null)
  const {
    loading,
    data: { adminRoles = [] } = {}
  } = useQuery(ADMIN_ROLES_QUERY)

  const rolesOptions = adminRoles.map((item, index) => ({
    key: index,
    label: item?.description,
    value: item?.name
  }))

  return (
    <>
      <Row className='h-100' style={{ marginTop: 20 }}>
        <Colxx xxs='12' md='12'>
          <Title>
            <span>OR - Login as</span>
          </Title>
        </Colxx>
        <Colxx xxs='12' md='6'>
          <Select
            options={rolesOptions}
            name='roleName'
            value={roleSelected}
            isLoading={loading}
            className='react-select'
            classNamePrefix='react-select'
            onChange={(option) => setRoleSelected(option.value)}
          />
        </Colxx>
        <Colxx xxs='12' md='6'>
          <Button
            color='success'
            size='lg'
            style={{ width: '100%' }}
            onClick={() => onLogin(ROLE_CREDENTIALS[roleSelected])}
            disabled={!roleSelected}
            block
          >
            {logging ? <Loader size={20} /> : <span>LOGIN</span>}
          </Button>
        </Colxx>
      </Row>
    </>
  )
}

LoginAs.propTypes = {
  onLogin: func,
  logging: boolean
}

export default LoginAs
