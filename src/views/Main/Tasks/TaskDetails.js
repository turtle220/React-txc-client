import React from 'react'
import { object, func } from 'prop-types'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Label,
  Input,
} from 'reactstrap'
import styled from 'styled-components'

import IntlMessages from '@/utils/IntlMessages'

const Description = styled.p`
  font-size: 16px;
`

const CheckLabel = styled(Label)`
  font-size: 16px;
  cursor: pointer;
`

const TaskDetails = ({ data, close }) => (
  <Modal isOpen toggle={close}>
    <ModalHeader toggle={close}>{data.name}</ModalHeader>
    <ModalBody>

      <Description>
        {data.description}
      </Description>

      <div className="text-center mt-5">
        <CheckLabel check className="ml-4">
          <Input type="checkbox" defaultChecked={data.completed} />{' '}
          <IntlMessages id="pages.tasks.mark-task-as-complete" />
        </CheckLabel>
      </div>

    </ModalBody>
    <ModalFooter className="pt-3 pb-3">
      <Button color="primary" onClick={close}>
        <IntlMessages id="pages.tasks.save" />
      </Button>
    </ModalFooter>
  </Modal>
)

TaskDetails.propTypes = {
  data: object,
  close: func
}

export default TaskDetails
