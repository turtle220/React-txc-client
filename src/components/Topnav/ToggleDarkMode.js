import React, { useState } from 'react'
import { UncontrolledTooltip } from 'reactstrap'
import Switch from 'rc-switch'

import IntlMessages from '@/utils/IntlMessages'

const ToggleDarkMode = () => {
  // set a default in case something happens to localStorage
  const theme = localStorage.getItem('themeColor') || 'light'
  const darkTheme = theme && theme.includes('dark')

  const [darkMode, setDarkMode] = useState(darkTheme)

  const toggle = (checked) => {
    const theme = localStorage.getItem('themeColor')
    let newTheme = theme
    if (theme && theme.includes('light')) {
      newTheme = theme.replace('light', 'dark')
      console.log('light', 'dark')
    } else {
      newTheme = theme.replace('dark', 'light')
      console.log('dark', 'light')
    }

    localStorage.setItem('themeColor', newTheme)
    setDarkMode(checked)

    setTimeout(() => window.location.reload(), 350)
  }

  return (
    <>
      <Switch
        className="custom-switch custom-switch-primary custom-switch-small"
        checked={darkMode}
        onChange={toggle}
        id="tooltipDarkMode"
      />
      <UncontrolledTooltip placement="bottom" target="tooltipDarkMode">
        <IntlMessages id="general.toggle-dark-theme" />
      </UncontrolledTooltip>
    </>
  )
}

export default ToggleDarkMode
