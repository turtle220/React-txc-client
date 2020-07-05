import React, { useState } from 'react'
import {
  Button,
  Row,
  Card,
  CardBody,
  CardTitle
} from 'reactstrap'
import styled from 'styled-components'

import IntlMessages from '@/utils/IntlMessages'
import { Colxx } from '@/components/CustomBootstrap'
import NoteItem from './NoteItem'
import NewNote from './NewNote'

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`

const Notes = ({ notes }) => {
  const [isModalOpen, setModalOpen] = useState(false)
  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  return (
    <>
      <Row>
        <Colxx xxs='12' className='mb-4'>
          <Card>
            <CardBody>
              <CardTitle>
                <Header>
                  <div>
                    <IntlMessages id='pages.claims.details.notes' />
                  </div>
                  <HeaderLeft>
                    <Button color='primary' onClick={openModal} className='mb-1'>
                      <IntlMessages id='pages.claims.details.add-note' />
                    </Button>
                  </HeaderLeft>
                </Header>
              </CardTitle>
              <>
                {notes.map((note) => <NoteItem note={note} />)}
              </>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
      <NewNote
        isOpen={isModalOpen}
        closeModal={closeModal}
      />
    </>
  )
}

export default Notes
