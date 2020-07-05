import React from 'react'
import { Input, FormGroup } from 'reactstrap'
import { object, string, func } from 'prop-types'
import styled from 'styled-components'
import Select from '@/components/Select'
import scores from '@/constants/diligenceScores'
import { baseTheme } from '@/themes'

const Description = styled.p`
  margin: 0;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.$primary_color};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* number of lines to show */
  -webkit-box-orient: vertical;
`

Description.defaultProps = {
  theme: baseTheme
}

const styles = {
  tdInput: {
    maxWidth: '100px'
  },
  text: {
    padding: '0.88rem 1rem 0.68rem',
    fontSize: '1rem',
    color: '#797979'
  },
  select: {
    control: (provided, state) => ({
      ...provided,
      height: '49px',
      borderColor: !state.isFocused && 'transparent !important'
    })
  }
}

const renderError = (touched, errors, field) => (
  errors[field]
    && touched[field] && (
    <div className="invalid-feedback d-block">
      {errors[field]}
    </div>
  )
)

const ReportItem = ({ item, values, disabled, onChange, touched, errors }) => (
  <tr>
    <th style={styles.text} scope="now">{item?.id}</th>
    <td style={{ ...styles.text, maxWidth: '220px' }}>
      <Description>{item?.description}</Description>
    </td>
    <td
      className="p-0"
      style={styles.tdInput}
    >
      <FormGroup className="mb-0">
        <Input
          value={values[item?.commentary]}
          onChange={({ target }) => onChange(item?.commentary, target?.value)}
          style={styles.text}
          className="border-0"
          disabled={disabled}
        />
        {renderError(touched, errors, item?.commentary)}
      </FormGroup>
    </td>
    <td className="p-0">
      <FormGroup className="mb-0">
        <Select
          value={values[item?.score]}
          className="react-select"
          classNamePrefix="react-select"
          options={scores}
          styles={styles.select}
          isDisabled={disabled}
          onChange={({ value }) => onChange(item?.score, value)}
        />
        {renderError(touched, errors, item?.score)}
      </FormGroup>
    </td>
  </tr>
)

ReportItem.propTypes = {
  item: object,
  values: object,
  disabled: string,
  onChange: func,
  touched: object,
  errors: object
}

export default ReportItem
