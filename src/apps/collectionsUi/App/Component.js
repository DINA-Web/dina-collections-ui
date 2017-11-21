import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import {
  NavigationSidebar,
  Footer,
  ViewWrap,
} from 'coreModules/commonUi/components'
import { requireLoggedIn } from 'coreModules/user/higherOrderComponents'
import { ShortcutsDisplay } from 'coreModules/keyboardShortcuts/components'

import EditMammal from '../viewModules/editMammal/Async'
import Home from '../viewModules/home/Async'
import LookupMammals from '../viewModules/lookupMammals/Async'
import PageNotFound from '../viewModules/pageNotFound/Async'
import RegisterMammal from '../viewModules/registerMammal/Async'
import Settings from '../viewModules/settings/Async'

const NAVIGATION_SIDEBAR_ITEMS = [
  {
    exact: true,
    icon: 'home',
    name: 'home',
    path: '/app',
  },
  {
    exact: true,
    icon: 'plus',
    name: 'registerMammal',
    path: '/app/mammals/register',
  },
  {
    exact: true,
    icon: 'search',
    name: 'lookupMammals',
    path: '/app/mammals/lookup',
  },
  {
    exact: true,
    icon: 'setting',
    name: 'settings',
    path: '/app/settings',
    push: true,
  },
]

const propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
}

class App extends Component {
  render() {
    const { match } = this.props

    return (
      <div>
        <ViewWrap>
          <Switch>
            <Route component={Home} exact path={match.url} />
            <Route
              component={LookupMammals}
              exact
              path={`${match.url}/mammals/lookup`}
            />
            <Route
              component={RegisterMammal}
              exact
              path={`${match.url}/mammals/register`}
            />
            <Route
              component={EditMammal}
              path={`${match.url}/mammals/:id/edit`}
            />
            <Route component={Settings} exact path={`${match.url}/settings`} />
            <Route component={PageNotFound} />
          </Switch>
          <Footer />
        </ViewWrap>
        <NavigationSidebar navItems={NAVIGATION_SIDEBAR_ITEMS} />
        <ShortcutsDisplay />
      </div>
    )
  }
}

App.propTypes = propTypes

export default requireLoggedIn(App)
