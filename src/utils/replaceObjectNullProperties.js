const replaceObjectNullProperties = (someObj, replaceValue = '') => {
  const replacer = (key, value) => (
    value === null || value === undefined ? replaceValue : value
  )
  return JSON.parse(JSON.stringify(someObj, replacer))
}

export default replaceObjectNullProperties
