export const formatType = (array) => {
  const newArray = array.map((item) => {
    let current = {}
    current = item
    current.id = parseInt(item.id, 10)
    return current
  })
  return newArray
}

export const numberFormat = (value) => {
  const formatter = new Intl.NumberFormat('en-IN')
  return formatter.format(value)
}


export const getPercentageDisplayFormat = (value) => {
  const percentage = value * 100
  const formatter = `${percentage.toFixed(2)}%`
  return formatter
}
