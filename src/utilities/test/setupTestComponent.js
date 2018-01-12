/* eslint-disable no-console */
import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { mount } from 'enzyme'
import createTestStore from 'utilities/test/createTestStore'
import defaultTestConfig from 'utilities/test/defaultTestConfig'
import I18nProvider from 'coreModules/i18n/components/I18nProvider'

const defaultConfig = defaultTestConfig()

export default function setupTestComponent({
  component,
  config: customConfig,
  fullExport = false,
  mount: mountComponent = false,
}) {
  const config = customConfig || defaultConfig
  const store = createTestStore({ config })

  let rootComponent = (
    <Provider store={store}>
      <ConnectedRouter history={config.routing}>
        <I18nProvider>{component}</I18nProvider>
      </ConnectedRouter>
    </Provider>
  )

  rootComponent = mountComponent ? mount(rootComponent) : rootComponent

  if (fullExport) {
    return {
      config,
      rootComponent,
      store,
    }
  }
  return rootComponent
}