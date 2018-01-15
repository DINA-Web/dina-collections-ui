/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import setupStorybookComponent from 'utilities/test/setupStorybookComponent'
import PageTemplate from './PageTemplate'

storiesOf('coreModules/commonUi/PageTemplate', module)
  .add('No fixed menu', context => {
    return setupStorybookComponent({
      component: (
        <PageTemplate hasFixedMenu={false}>
          <div>Page content</div>
        </PageTemplate>
      ),
      context,
    })
  })
  .add('Fixed menu', context => {
    return setupStorybookComponent({
      component: (
        <PageTemplate hasFixedMenu>
          <div>Page content</div>
        </PageTemplate>
      ),
      context,
    })
  })
