import { combineReducers } from 'redux'
import settings from './settings/reducer'
import menu from './menu/reducer'
import docusign from './docusign/reducer'

const reducers = combineReducers({
  menu,
  settings,
  docusign
})

export default reducers
