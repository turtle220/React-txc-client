import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { ThemeProvider } from 'styled-components'
import { baseTheme, negativeTheme } from './themes'
import { color } from './utils/theme.utils'

import * as serviceWorker from './serviceWorker'
import { configureStore } from './redux/store'

import App from './App'

const AppRenderer = () => {
  const themeMode = color === 'light.blue' ? baseTheme : negativeTheme

  return (
    <Provider store={configureStore()}>
      <ThemeProvider theme={themeMode}>
        <ToastContainer />
        <App />
      </ThemeProvider>
    </Provider>
  )
}

ReactDOM.render(
  <AppRenderer />,
  document.getElementById('root')
)
/*
 * If you want your app to work offline and load faster, you can change
 * unregister() to register() below. Note this comes with some pitfalls.
 * Learn more about service workers: https://bit.ly/CRA-PWA
 */
serviceWorker.unregister()
