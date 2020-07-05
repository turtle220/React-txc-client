import { isMultiColorActive, defaultColor } from '../constants/defaultValues'

/**
 * exporting the color so that it can be accessed in AppRenderer for
 * the theme provider (style components)
 */
const color = isMultiColorActive && localStorage.getItem('themeColor')
  ? localStorage.getItem('themeColor')
  : defaultColor

/**
 * creating a simple function to call from index.js
 * to make sure that the color is loaded before the renderer
 */
const getColor = () => Promise.resolve(color)


localStorage.setItem('themeColor', color)

export {
  color,
  getColor
}
