import numeral from 'numeral'

export const numberFormat = (number, format) => numeral(number).format(format)

export const getPercentDisplay = (number) => {
  if (number) {
    return `${parseFloat(number * 100).toFixed(3)}%`
  }
  return '-'
}
