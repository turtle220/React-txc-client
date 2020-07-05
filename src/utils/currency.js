import numeral from 'numeral'

export const getEuroCurrencyFormat = (value = 0) => (
  `€ ${numeral(value).format('0.000,00')}`
)

export const getEuroCurrencyDisplayFormat = (value, digits = 0) => {

  const formatter = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: digits,
    currencyDisplay: "symbol"
  })
  return formatter.format(value)
}
