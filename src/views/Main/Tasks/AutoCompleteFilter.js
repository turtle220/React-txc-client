import React, { useState } from 'react'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  Label,
  Button,
  Row,
} from 'reactstrap'

import { useRole } from '@/hooks'

import { Colxx } from '@/components/CustomBootstrap'
import Select from '@/components/Select'
import CheckBox from '@/components/CheckBox'

import { ROLE } from '@/constants/roles'

const AutoCompleteFilter = ({
  title,
  onFilter,
  value,
  allTasksValue,
  statusValue,
  onReset,
  options,
  statusOptions,
  isDisabled,
  isLoading
}) => {
  const [selectedValue, setSelectedValue] = useState(value)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(statusValue)
  const [showAllTasks, setShowAllTasks] = useState(allTasksValue)

  const toggle = () => setDropdownOpen((prevState) => !prevState)

  const [canSeeFilter] = useRole([
    ROLE.TXC_ACCOUNT_ADMIN,
    ROLE.TXC_SUPER_ADMIN,
    ROLE.TXC_OPERATION,
    ROLE.TXC_BACK_OFFICE,
    ROLE.BROKER
  ])

  const [isAdmin] = useRole([
    ROLE.TXC_ACCOUNT_ADMIN,
    ROLE.TXC_SUPER_ADMIN,
  ])

  const onChangeAllTasksSelected = () => {
    setShowAllTasks(!showAllTasks)
  }

  return (
    <div className='float-sm-right mb-2'>
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle className='p-0 d-flex' color='empty'>
          <span>
            <i className='iconsminds-filter-2' style={{ fontSize: 32 }} />
          </span>
        </DropdownToggle>
        <DropdownMenu right className='position-absolute' id='filter'>
          {canSeeFilter && (
            <Row>
              <Colxx xxs='12'>
                <Label>{title}</Label>
                <Select
                  options={options}
                  name='member'
                  value={selectedValue}
                  className='react-select'
                  classNamePrefix='react-select'
                  onChange={(opt) => {
                    setSelectedValue(opt.value)
                  }}
                  isLoading={isLoading}
                  isDisabled={isDisabled}
                />
              </Colxx>
            </Row>
          )}
          <Row style={{ marginTop: '30px' }}>
            <Colxx xxs='12'>
              <Label>Status</Label>
              <Select
                options={statusOptions}
                name='status'
                value={selectedStatus}
                className='react-select'
                classNamePrefix='react-select'
                onChange={(opt) => {
                  setSelectedStatus(opt.value)
                }}
                isLoading={isLoading}
                isDisabled={isDisabled}
              />
            </Colxx>
          </Row>
          {isAdmin && (
            <Row style={{ marginTop: '30px' }}>
              <Colxx xxs='12'>
                <CheckBox
                  label='Show all tasks'
                  isSelected={showAllTasks}
                  onCheckboxChange={onChangeAllTasksSelected}
                />
              </Colxx>
            </Row>
          )}
          <Row className='filter-buttons'>
            <Colxx xxs='12' md='6'>
              <Button color='light' size='sm' onClick={() => { setDropdownOpen(false); onReset() }}>
                Reset
              </Button>
            </Colxx>
            <Colxx xxs='12' md='6'>
              <Button
                color='success'
                size='sm'
                className='float-sm-right'
                onClick={() => {
                  setDropdownOpen(false)
                  onFilter(selectedValue, selectedStatus, showAllTasks)
                }}
              >
                Apply
              </Button>
            </Colxx>
          </Row>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

export default AutoCompleteFilter
