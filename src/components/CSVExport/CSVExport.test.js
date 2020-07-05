import React from 'react'
import { render } from '@testing-library/react'
import { IntlProvider } from 'react-intl'
import CSVExport from '.'

import AppLocale from '@/lang'

const data = [
  { details: { firstName: 'Fluffy', lastName: 'Unicorns' }, job: 'manager' },
  { details: { firstName: 'John', lastName: 'Smith' }, job: 'developer' }
]

const currentAppLocale = AppLocale.en

describe('CSV Export', () => {
  // checking for the component to match the snap shot
  it('renders the component', () => {
    const container = render(
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}
      >
        <CSVExport data={data} />
      </IntlProvider>
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  // @TODO test to make sure we can pass the values for filename, target, text
})
