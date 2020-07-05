const parseMoney = (value) => (
  parseFloat(
    value
      .toString()
      .replace('€ ', '')
      .replace(/\./g, '')
      .replace(',', '.')
  )
)

export default parseMoney
