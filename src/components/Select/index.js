import React from 'react'
import ReactSelect, { components } from 'react-select'
import { array, string, func, bool, object } from 'prop-types'

const getValue = (options, value) => (
  options?.filter((item) => item?.value === value)[0]
)

const getStyles = (styles) => ({
  menu: (provided) => ({
    ...provided,
    zIndex: 4
  }),
  option: (provided) => ({
    ...provided,
    '&:hover': {
      opacity: '50%'
    }
  }),
  ...styles,
})

const Input = (props) => (
  <components.Input
    {...props}
    autoCorrect="off"
    autoCapitalize="off"
  />
)

const Select = ({
  className,
  classNamePrefix,
  options,
  name,
  onChange,
  isLoading,
  isDisabled,
  onBlur,
  defaultValue,
  value,
  styles
}) => (
  <ReactSelect
    components={{ Input }}
    className={className}
    classNamePrefix={classNamePrefix}
    options={options}
    name={name}
    defaultValue={getValue(options, defaultValue)}
    value={getValue(options, value)}
    onChange={onChange}
    isLoading={isLoading}
    isDisabled={isDisabled}
    onBlur={onBlur}
    styles={getStyles(styles)}
  />
)

Select.propTypes = {
  className: string,
  classNamePrefix: string,
  options: array,
  name: string,
  onChange: func,
  isLoading: bool,
  isDisabled: bool,
  onBlur: func,
  defaultValue: string,
  value: string,
  styles: object
}

export default Select
