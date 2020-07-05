/**
 *
 * @param {array} array - array of objects that you want to do the filters on
 * @param {string} key - the key on the array
 * @param {array} filters - they array of filters you want to check against
 */
export const filterObjectArray = (array, key, filters) => {
  const filtersArray = filters instanceof Array ? filters : [filters]
  return array.filter((arr) => filtersArray.includes(arr[key]))
}
