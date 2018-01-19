/* eslint-disable import/no-extraneous-dependencies, react/style-prop-object */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import createStoryDecorator from 'utilities/test/createStoryDecorator'
import { action } from '@storybook/addon-actions'
import withInfo from 'utilities/test/customStorybookWithInfo'
import FlashWithI18n, { Flash } from './Flash'

storiesOf('coreModules/notifications/Flash', module)
  .addDecorator(createStoryDecorator({ wrap: false }))
  .add(
    'Default',
    withInfo({ propTables: [Flash], propTablesExclude: [FlashWithI18n] })(
      () => {
        return (
          <FlashWithI18n
            descriptionKey="descriptionKey"
            headerKey="headerKey"
            removeNotification={action('removeNotification')}
            sequentialId={1}
            showShortcutInfo
          />
        )
      }
    )
  )
  .add(
    'Info',
    withInfo({ propTables: [Flash], propTablesExclude: [FlashWithI18n] })(
      () => {
        return (
          <FlashWithI18n
            descriptionKey="descriptionKey"
            headerKey="headerKey"
            removeNotification={action('removeNotification')}
            sequentialId={1}
            showShortcutInfo
            style="info"
          />
        )
      }
    )
  )
  .add(
    'Error',
    withInfo({ propTables: [Flash], propTablesExclude: [FlashWithI18n] })(
      () => {
        return (
          <FlashWithI18n
            descriptionKey="descriptionKey"
            headerKey="headerKey"
            removeNotification={action('removeNotification')}
            sequentialId={1}
            showShortcutInfo
            style="error"
          />
        )
      }
    )
  )
  .add(
    'Success',
    withInfo({ propTables: [Flash], propTablesExclude: [FlashWithI18n] })(
      () => {
        return (
          <FlashWithI18n
            descriptionKey="descriptionKey"
            headerKey="headerKey"
            removeNotification={action('removeNotification')}
            sequentialId={1}
            showShortcutInfo
            style="success"
          />
        )
      }
    )
  )
  .add(
    'Warning',
    withInfo({ propTables: [Flash], propTablesExclude: [FlashWithI18n] })(
      () => {
        return (
          <FlashWithI18n
            descriptionKey="descriptionKey"
            headerKey="headerKey"
            removeNotification={action('removeNotification')}
            sequentialId={1}
            showShortcutInfo
            style="warning"
          />
        )
      }
    )
  )
