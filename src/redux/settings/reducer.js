
import { defaultLocale, localeOptions } from '../../constants/defaultValues'

import {
  CHANGE_LOCALE
} from '../types'

const currentLanguage = localStorage.getItem('currentLanguage')

const INIT_STATE = {
  locale: (currentLanguage && localeOptions.filter(
    (x) => x.id === currentLanguage
  ).length > 0) ? currentLanguage : defaultLocale,
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CHANGE_LOCALE:
      return { ...state, locale: action.payload }

    default: return { ...state }
  }
}
