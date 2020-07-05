import * as COLORS from './constants/colors'
import * as TYPOGRAPHY from './constants/typography'
import * as LAYOUT from './constants/layout'

const txc = {
  name: 'txc',
  layout: {
    ...LAYOUT
  },
  colors: {
    ...COLORS
  },
  typography: {
    ...TYPOGRAPHY
  }
}

const txcDark = {
  ...txc,
  name: 'txc',
  colors: {
    ...txc.colors,
    $separator_color_light: '#313131',
    $separator_color: '#424242',
    $background_color: 'rgb(8, 8, 8)',
    $foreground_color: 'rgb(39, 46, 54)',
    $input_background: 'rgb(39, 46, 54)',

    $dark_btn_background: '#8d8d8d',
    $light_btn_background: '#e4e4e4',
    $button_text_color: '#d0d0d0',

    $theme_color_1: '#145388',
    $theme_color_2: '#3582b3',
    $theme_color_3: '#6c90a1',
    $theme_color_4: '#365573',
    $theme_color_5: '#47799a',
    $theme_color_6: '#8e9599',

    $primary_color: '#E5E5E5',
    $cerved_shaded_cell: '#10151B',
    $secondary_color: '#E5E5E5',
    $muted_color: '#5a5a5a',

    $gradient_color_1: '#225986',
    $gradient_color_2: '#1a3a53',
    $gradient_color_3: '#145388'
  },
  typography: {
    ...txc.typography,
    LINE_HEIGHT_LOOSE: 1.7,
    LINE_HEIGHT_DEFAULT: 1.5,
    LINE_HEIGHT_TIGHT: 1.3,

    FONT_WEIGHT_DEFAULT: 500,
    FONT_WEIGHT_MEDIUM: 600,
    FONT_WEIGHT_SEMIBOLD: 700,
    FONT_WEIGHT_BOLD: 800,

    LETTER_SPACING_DEFAULT: '0.025ch'
  }
}

export { txc, txcDark }
