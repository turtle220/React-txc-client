import React, { useState } from 'react'
import { func, string } from 'prop-types'
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

const FilterButton = ({
  newHandler,
  newHandlerText = 'Apply',
  resetHandler,
  resetHandlerText = 'Reset',
  filterDataOptions = [],
  filterDataDefaultValue,
  isDisabled
}) => {
  const [option, setOption] = useState('')
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
              <Label>Member</Label>
              <Select
                options={filterDataOptions}
                name='member'
                value={filterDataDefaultValue}
                className='react-select'
                classNamePrefix='react-select'
                onChange={(opt) => {
                  setOption(opt.value)
                }}
                isLoading={!filterDataOptions}
                isDisabled={isDisabled}
              />
            </Colxx>
          </Row>
          <Row className='filter-buttons'>
            <Colxx xxs='12' md='6'>
              <Button color='light' size='sm' onClick={() => { setDropdownOpen(false); resetHandler() }}>
                {resetHandlerText}
              </Button>
            </Colxx>
            <Colxx xxs='12' md='6'>
              <Button
                color='success'
                size='sm'
                className='float-sm-right'
                onClick={() => {
                  setDropdownOpen(false)
                  newHandler(option)
                }}
              >
                {newHandlerText}
              </Button>
            </Colxx>
          </Row>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

FilterButton.propTypes = {
  newHandler: func,
  newHandlerText: string,
  resetHandler: func,
  resetHandlerText: string
}

export default FilterButton
