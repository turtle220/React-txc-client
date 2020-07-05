import React, { useState } from 'react'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  Label,
  Button,
  Row
} from 'reactstrap'

import { Colxx } from '@/components/CustomBootstrap'
import Select from '@/components/Select'

const AutoCompleteFilter = ({
  title,
  onFilter,
  value,
  onReset,
  options,
  isDisabled,
  isLoading
}) => {
  const [selectedValue, setSelectedValue] = useState(value)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggle = () => setDropdownOpen((prevState) => !prevState)

  return (
    <div className='float-sm-right mb-2'>
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle className='p-0 d-flex' color='empty'>
          <span>
            <i className='iconsminds-filter-2' style={{ fontSize: 32 }} />
          </span>
        </DropdownToggle>
        <DropdownMenu right className='position-absolute' id='filter'>
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
                  onFilter(selectedValue)
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
