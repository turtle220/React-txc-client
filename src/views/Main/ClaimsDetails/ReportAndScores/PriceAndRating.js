import React from 'react'
import {
  CardTitle,
  Label,
  FormGroup,
  Button,
  Row,
  UncontrolledTooltip
} from 'reactstrap'
import { object } from 'prop-types'
import { useMutation } from '@apollo/react-hooks'
import Switch from 'rc-switch'
import styled from 'styled-components'
import * as yup from 'yup'
import { Formik, Field } from 'formik'
import NumberFormat from 'react-number-format'
import { useToast } from '@/hooks'
import claimCategories from '@/constants/claimCategories'

import Loader from '@/components/Loader'
import Select from '@/components/Select'
import { Colxx } from '@/components/CustomBootstrap'

import IntlMessages from '@/utils/IntlMessages'
import replaceObjectNullProperties from '@/utils/replaceObjectNullProperties'

import { GET_CLAIM_DETAILS, WORKFLOW_CLAIM_QUERY } from '@/graphql/queries/claims'
import { UPDATE_CLAIM } from '@/graphql/mutations/claims'

const InlineSwitch = styled(Switch)`
  display: inline-block !important;
`
const validationSchema = yup.object().shape({
  startingPx: yup.string(),
  rating: yup.string(),
  derivativeFeeValue: yup.string(),
  auctionBuyNowPx: yup.string(),
  dso: yup.string(),
  derivativeOpValue: yup.string(),
  financingRate: yup.string(),
  tcFeeValue: yup.string(),
  tcOpFeeValue: yup.string(),
  notionalValue: yup.string(),
  penaltyInterestRate: yup.string(),
  interestBasis: yup.string(),
  repaymentProbability: yup.string(),
  category: yup.string(),
  status: yup.string(),
})

const tooltipStyle = { paddingLeft: '10px' }

const PriceAndRating = ({ claim }) => {
  const showToast = useToast()

  const updateClaimOptions = {
    update: (store, { data: { updateClaim: updatedClaim } }) => {
      store.writeQuery({
        query: GET_CLAIM_DETAILS,
        data: {
          claim: updatedClaim
        }
      })
    },
    onCompleted: () => {
      showToast('success', 'Claim updated successfully')
    },
    onError: () => {
      showToast('error', 'Update claim error, try again')
    },
    refetchQueries: [
      {
        query: WORKFLOW_CLAIM_QUERY,
        variables: {
          claimId: claim.id
        }
      }
    ]
  }

  const [
    updateClaim,
    { loading: loadingUpdateClaim }
  ] = useMutation(UPDATE_CLAIM, updateClaimOptions)

  const handleSubmit = (values) => {
    const variables = {
      id: claim?.id,
      startingPx: parseFloat(values?.startingPx),
      rating: parseFloat(values?.rating),
      derivativeFeeValue: parseFloat(values?.derivativeFeeValue),
      auctionBuyNowPx: parseFloat(values?.auctionBuyNowPx),
      dso: parseFloat(values?.dso),
      derivativeOpValue: parseFloat(values?.derivativeOpValue),
      financingRate: parseFloat(values?.financingRate),
      tcFeeValue: parseFloat(values?.tcFeeValue),
      tcOpFeeValue: parseFloat(values?.tcOpFeeValue),
      notionalValue: parseFloat(values?.notionalValue),
      penaltyInterestRate: parseFloat(values?.penaltyInterestRate),
      interestBasis: parseFloat(values?.interestBasis),
      whiteLabel: Boolean(values?.whiteLabel),
      repaymentProbability: parseFloat(values?.repaymentProbability),
      category: Number(values?.category),
      status: String(values?.status)
    }
    updateClaim({ variables })
  }

  const getFieldProps = (field) => {
    if (claim.phaseTwoApproved) {
      return {
        ...field,
        disabled: claim.phaseTwoApproved
      }
    }

    return field
  }

  return (
    <Formik
      initialValues={replaceObjectNullProperties(claim)}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ touched, errors, values, setFieldValue, handleSubmit }) => (
        <>
          <CardTitle className='mb-5'>
            <IntlMessages id='pages.claims.price-and-rating-inputs' />
          </CardTitle>

          <Row>
            <Colxx xxs='12' lg='3' className='mb-2'>
              <FormGroup>
                <Label for='starting-px'>
                  <IntlMessages id='pages.claims.price-and-rating.starting' />
                </Label>
                <Field
                  id='starting-px'
                  name='startingPx'
                  render={({ field: props }) => {
                    const field = getFieldProps(props)
                    return (
                      <NumberFormat
                        {...field}
                        className='form-control'
                        defaultValue={null}
                        onValueChange={(values) => {
                          const { value } = values
                          setFieldValue('startingPx', value)
                        }}
                        isNumericString
                        placeholder='000.00'
                        decimalScale={2}
                      />
                    )
                  }}
                />
                {errors.startingPx && touched.startingPx && (
                  <div className='invalid-feedback d-block'>
                    {errors.startingPx}
                  </div>
                )}
              </FormGroup>
            </Colxx>

            <Colxx xxs='12' lg='3' className='mb-2'>
              <FormGroup>
                <Label for='rating'>
                  <IntlMessages id='pages.claims.price-and-rating.rating' />
                </Label>
                <Field
                  id='rating'
                  name='rating'
                  render={({ field: props }) => {
                    const field = getFieldProps(props)
                    return (
                      <NumberFormat
                        {...field}
                        className='form-control'
                        defaultValue={null}
                        onValueChange={(values) => {
                          const { value } = values
                          setFieldValue('rating', value)
                        }}
                        isNumericString
                        placeholder='0'
                        decimalScale={0}
                      />
                    )
                  }}
                />
                {errors.rating && touched.rating && (
                  <div className='invalid-feedback d-block'>
                    {errors.rating}
                  </div>
                )}
              </FormGroup>
            </Colxx>

            <Colxx xxs='12' lg='3' className='mb-2'>
              <FormGroup>
                <div>


                  <Label for='tc-fee-value'>
                    <IntlMessages id='pages.claims.price-and-rating.auction-fee' />
                  </Label>
                  <i id='help-bps' style={tooltipStyle} className='simple-icon-question' />
                  <UncontrolledTooltip placement='top' target='help-bps'>
                    Example: Enter 0.003 to get 30 bps
                  </UncontrolledTooltip>
                </div>

                <Field
                  id='tc-fee-value'
                  name='tcFeeValue'
                  render={({ field: props }) => {
                    const field = getFieldProps(props)
                    return (
                      <NumberFormat
                        {...field}
                        className='form-control'
                        defaultValue={null}
                        onValueChange={(values) => {
                          const { value } = values
                          setFieldValue('tcFeeValue', value)
                        }}
                        isNumericString
                        placeholder='0.00'
                        decimalScale={6}
                      />
                    )
                  }}
                />
                {errors.tcFeeValue && touched.tcFeeValue && (
                  <div className='invalid-feedback d-block'>
                    {errors.tcFeeValue}
                  </div>
                )}
              </FormGroup>
            </Colxx>

            <Colxx xxs='12' lg='3' className='mb-2'>
              <FormGroup>
                <div>
                  <Label for='derivative-fee-value'>
                    <IntlMessages id='pages.claims.price-and-rating.derivative-fee' />
                  </Label>
                  <i id='help-bps2' style={tooltipStyle} className='simple-icon-question' />
                  <UncontrolledTooltip placement='top' target='help-bps2'>
                    Example: Enter 0.003 to get 30 bps
                  </UncontrolledTooltip>

                </div>
                <Field
                  id='derivative-fee-value'
                  name='derivativeFeeValue'
                  render={({ field: props }) => {
                    const field = getFieldProps(props)
                    return (
                      <NumberFormat
                        {...field}
                        className='form-control'
                        defaultValue={null}
                        onValueChange={(values) => {
                          const { value } = values
                          setFieldValue('derivativeFeeValue', value)
                        }}
                        isNumericString
                        placeholder='0.00'
                        decimalScale={6}
                      />
                    )
                  }}
                />
                {errors.derivativeFeeValue && touched.derivativeFeeValue && (
                  <div className='invalid-feedback d-block'>
                    {errors.derivativeFeeValue}
                  </div>
                )}
              </FormGroup>
            </Colxx>

            <Colxx xxs='12' lg='3' className='mb-2'>
              <FormGroup>
                <Label for='auction-buy-now-px'>
                  <IntlMessages id='pages.claims.price-and-rating.buy-now' />
                </Label>
                <Field
                  id='auction-buy-now-px'
                  name='auctionBuyNowPx'
                  render={({ field: props }) => {
                    const field = getFieldProps(props)
                    return (
                      <NumberFormat
                        {...field}
                        className='form-control'
                        defaultValue={null}
                        onValueChange={(values) => {
                          const { value } = values
                          setFieldValue('auctionBuyNowPx', value)
                        }}
                        isNumericString
                        placeholder='000.00'
                        decimalScale={2}
                      />
                    )
                  }}
                />
                {errors.auctionBuyNowPx && touched.auctionBuyNowPx && (
                  <div className='invalid-feedback d-block'>
                    {errors.auctionBuyNowPx}
                  </div>
                )}
              </FormGroup>
            </Colxx>

            <Colxx xxs='12' lg='3' className='mb-2'>
              <FormGroup>
                <Label for='dso'>
                  <IntlMessages id='pages.claims.price-and-rating.dso' />
                </Label>
                <Field
                  id='dso'
                  name='dso'
                  render={({ field: props }) => {
                    const field = getFieldProps(props)
                    return (
                      <NumberFormat
                        {...field}
                        className='form-control'
                        defaultValue={null}
                        onValueChange={(values) => {
                          const { value } = values
                          setFieldValue('dso', value)
                        }}
                        isNumericString
                        placeholder='0.00'
                        decimalScale={0}
                      />
                    )
                  }}
                />
                {errors.dso && touched.dso && (
                  <div className='invalid-feedback d-block'>{errors.dso}</div>
                )}
              </FormGroup>
            </Colxx>

            <Colxx xxs='12' lg='3' className='mb-2'>
              <FormGroup>
                <div>
                  <Label for='tc-op-fee-value'>
                    <IntlMessages id='pages.claims.price-and-rating.claim-operations-fee' />
                  </Label>
                  <i id='help-bps3' style={tooltipStyle} className='simple-icon-question' />
                  <UncontrolledTooltip placement='top' target='help-bps3'>
                    Example: Enter 0.003 to get 30 bps
                  </UncontrolledTooltip>
                </div>
                <Field
                  id='tc-op-fee-value'
                  name='tcOpFeeValue'
                  render={({ field: props }) => {
                    const field = getFieldProps(props)
                    return (
                      <NumberFormat
                        {...field}
                        className='form-control'
                        defaultValue={null}
                        onValueChange={(values) => {
                          const { value } = values
                          setFieldValue('tcOpFeeValue', value)
                        }}
                        isNumericString
                        placeholder='0.00'
                        decimalScale={6}
                      />
                    )
                  }}
                />
                {errors.tcOpFeeValue && touched.tcOpFeeValue && (
                  <div className='invalid-feedback d-block'>
                    {errors.tcOpFeeValue}
                  </div>
                )}
              </FormGroup>
            </Colxx>

            <Colxx xxs='12' lg='3' className='mb-2'>
              <FormGroup>
                <div>
                  <Label for='derivative-op-value'>
                    <IntlMessages id='pages.claims.price-and-rating.derivative-operations-fee' />
                  </Label>
                  <i id='help-bps4' style={tooltipStyle} className='simple-icon-question' />
                  <UncontrolledTooltip placement='top' target='help-bps4'>
                    Example: Enter 0.003 to get 30 bps
                  </UncontrolledTooltip>
                </div>
                <Field
                  id='derivative-op-value'
                  name='derivativeOpValue'
                  render={({ field: props }) => {
                    const field = getFieldProps(props)

                    return (
                      <NumberFormat
                        {...field}
                        className='form-control'
                        defaultValue={null}
                        onValueChange={(values) => {
                          const { value } = values
                          setFieldValue('derivativeOpValue', value)
                        }}
                        isNumericString
                        placeholder='0.00'
                        decimalScale={6}
                      />
                    )
                  }}
                />
                {errors.derivativeOpValue && touched.derivativeOpValue && (
                  <div className='invalid-feedback d-block'>
                    {errors.derivativeOpValue}
                  </div>
                )}
              </FormGroup>
            </Colxx>

            <Colxx xxs='12' lg='3' className='mb-2'>
              <FormGroup>
                <div>
                  <Label for='financing-rate'>
                    <IntlMessages id='pages.claims.price-and-rating.financing-rate' />
                  </Label>
                  <i id='help-percent1' style={tooltipStyle} className='simple-icon-question' />
                  <UncontrolledTooltip placement='top' target='help-percent1'>
                    Example: Enter 0.0523 to get 5.23 %
                  </UncontrolledTooltip>
                </div>
                <Field
                  id='financing-rate'
                  name='financingRate'
                  render={({ field }) => (
                    <NumberFormat
                      {...field}
                      className='form-control'
                      id='financingRate'
                      defaultValue={null}
                      onValueChange={(values) => {
                        const { value } = values
                        setFieldValue('financingRate', value)
                      }}
                      name='financingRate'
                      isNumericString
                      placeholder='0.00'
                      decimalScale={4}
                    />
                  )}
                />
                {errors.financingRate && touched.financingRate && (
                  <div className='invalid-feedback d-block'>
                    {errors.financingRate}
                  </div>
                )}
              </FormGroup>
            </Colxx>

            <Colxx xxs='12' lg='3' className='mb-2'>
              <FormGroup>
                <Label for='claim-issue-date'>
                  <IntlMessages id='pages.claims.price-and-rating.notional-value' />
                </Label>
                <Field
                  id='notional-value'
                  name='notionalValue'
                  render={({ field: props }) => {
                    const field = getFieldProps(props)
                    return (
                      <NumberFormat
                        {...field}
                        className='form-control'
                        defaultValue={null}
                        onValueChange={(values) => {
                          const { value } = values
                          setFieldValue('notionalValue', value)
                        }}
                        isNumericString
                        placeholder='000.00'
                      />
                    )
                  }}
                />
                {errors.notionalValue && touched.notionalValue && (
                  <div className='invalid-feedback d-block'>
                    {errors.notionalValue}
                  </div>
                )}
              </FormGroup>
            </Colxx>

            <Colxx xxs='12' lg='3' className='mb-2'>
              <FormGroup>
                <div>
                  <Label for='penalty-interest-rate'>
                    <IntlMessages id='pages.claims.price-and-rating.penalty-interest-rate' />
                  </Label>
                  <i id='help-percent2' style={tooltipStyle} className='simple-icon-question' />
                  <UncontrolledTooltip placement='top' target='help-percent2'>
                    Example: Enter 0.0523 to get 5.23 %
                  </UncontrolledTooltip>
                </div>
                <Field
                  id='penalty-interest-rate'
                  name='penaltyInterestRate'
                  render={({ field: props }) => {
                    const field = getFieldProps(props)
                    return (
                      <NumberFormat
                        {...field}
                        className='form-control'
                        id='penaltyInterestRate'
                        defaultValue={null}
                        onValueChange={(values) => {
                          const { value } = values
                          setFieldValue('penaltyInterestRate', value)
                        }}
                        name='penaltyInterestRate'
                        isNumericString
                        placeholder='0.00'
                        decimalScale={4}
                      />
                    )
                  }}
                />
                {errors.penaltyInterestRate && touched.penaltyInterestRate && (
                  <div className='invalid-feedback d-block'>
                    {errors.penaltyInterestRate}
                  </div>
                )}
              </FormGroup>
            </Colxx>

            <Colxx xxs='12' lg='3' className='mb-2'>
              <FormGroup>
                <Label for='interest-basis'>
                  <IntlMessages id='pages.claims.price-and-rating.interest-basis' />
                </Label>
                <Field
                  id='interestBasis'
                  name='interestBasis'
                  render={({ field: props }) => {
                    const field = getFieldProps(props)
                    return (
                      <NumberFormat
                        {...field}
                        className='form-control'
                        id='interestBasis'
                        defaultValue={null}
                        onValueChange={(values) => {
                          const { value } = values
                          setFieldValue('interestBasis', value)
                        }}
                        name='interestBasis'
                        isNumericString
                        placeholder='0'
                        decimalScale={0}
                      />
                    )
                  }}
                />
                {errors.interestBasis && touched.interestBasis && (
                  <div className='invalid-feedback d-block'>
                    {errors.interestBasis}
                  </div>
                )}
              </FormGroup>
            </Colxx>

            <Colxx xxs='12' lg='3' className='mb-2'>
              <FormGroup>
                <Label for='white-label'>
                  <IntlMessages id='pages.claims.price-and-rating.white-label' />
                </Label>
                <div className='mt-2'>
                  <IntlMessages id='pages.claims.price-and-rating.false' />
                  <Field
                    id='whiteLabel'
                    name='whiteLabel'
                    render={({ field: props }) => {
                      const field = getFieldProps(props)

                      return (
                        <InlineSwitch
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...field}
                          defaultChecked={values.whiteLabel}
                          onChange={(value) => setFieldValue('whiteLabel', value)}
                          className='custom-switch custom-switch-primary custom-switch-small ml-3 mr-3'
                        />
                      )
                    }}
                  />
                  <IntlMessages id='pages.claims.price-and-rating.true' />
                </div>
                {errors.whiteLabel && touched.whiteLabel && (
                  <div className='invalid-feedback d-block'>
                    {errors.whiteLabel}
                  </div>
                )}
              </FormGroup>
            </Colxx>

            <Colxx xxs='12' lg='3' className='mb-2'>
              <FormGroup>
                <div>
                  <Label for='repayment-probability'>
                    <IntlMessages id='pages.claims.price-and-rating.repayment-probability' />
                  </Label>
                  <i id='help-percent3' style={tooltipStyle} className='simple-icon-question' />
                  <UncontrolledTooltip placement='top' target='help-percent3'>
                    Example: Enter 0.0523 to get 5.23 %
                  </UncontrolledTooltip>
                </div>
                <Field
                  id='repayment-probability'
                  name='repaymentProbability'
                  render={({ field: props }) => {
                    const field = getFieldProps(props)
                    return (
                      <NumberFormat
                        {...field}
                        className='form-control'
                        id='repaymentProbability'
                        defaultValue={null}
                        onValueChange={(values) => {
                          const { value } = values
                          setFieldValue('repaymentProbability', value)
                        }}
                        name='repaymentProbability'
                        isNumericString
                        placeholder='0'
                        decimalScale={2}
                        thousandSeparator
                      />
                    )
                  }}
                />
                {errors.repaymentProbability
                  && touched.repaymentProbability && (
                    <div className='invalid-feedback d-block'>
                      {errors.repaymentProbability}
                    </div>
                )}
              </FormGroup>
            </Colxx>

            <Colxx xxs='12' lg='3' className='mb-2'>
              <FormGroup>
                <Label for='category'>
                  <IntlMessages id='pages.claims.price-and-rating.category' />
                </Label>
                <Select
                  id='category'
                  name='category'
                  className='react-select'
                  classNamePrefix='react-select'
                  options={claimCategories}
                  value={values.category}
                  onChange={(option) => setFieldValue('category', option.value)}
                />
                {errors.category && touched.category && (
                  <div className='invalid-feedback d-block'>
                    {errors.category}
                  </div>
                )}
              </FormGroup>
            </Colxx>
          </Row>

          <div className='w-100 text-right d-inline-block mb-3'>
            <Button
              outline={!loadingUpdateClaim}
              color='success'
              size='lg'
              disabled={loadingUpdateClaim}
              onClick={handleSubmit}
            >
              {loadingUpdateClaim ? (
                <Loader size={20} />
              ) : (
                <IntlMessages id='pages.claims.save-button' />
              )}
            </Button>
          </div>
        </>
      )}
    </Formik>
  )
}

PriceAndRating.propTypes = {
  claim: object
}

export default PriceAndRating
