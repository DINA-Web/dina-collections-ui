import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Button, Grid, Input, Table } from 'semantic-ui-react'

import { TranslatedLabel } from 'coreModules/commonUi/components'
import { createModuleTranslate } from 'coreModules/i18n/components'
import createLog from 'utilities/log'
import {
  clearSearchParameters,
  lookupMammals,
  updateSearchParameter,
} from '../../actionCreators'
import selectors from '../../globalSelectors'

const log = createLog('modules:collectionMammals:LookupMammals')
const ModuleTranslate = createModuleTranslate('collectionMammals')

const CATALOG_NUMBER = 'catalogNumber'
const TAXON_NAME = 'taxonName'

const TABLE_COLUMNS = [CATALOG_NUMBER, TAXON_NAME]
const SEARCH_PARAMETERS = [CATALOG_NUMBER, TAXON_NAME]

const mapStateToProps = state => {
  return {
    result: selectors.getLookupResult(state),
    searchParameters: selectors.getLookupSearch(state),
  }
}
const mapDispatchToProps = {
  clearSearchParameters,
  lookupMammals,
  push,
  updateSearchParameter,
}

const propTypes = {
  clearSearchParameters: PropTypes.func.isRequired,
  lookupMammals: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  result: PropTypes.arrayOf(
    PropTypes.shape({
      catalogNumber: PropTypes.string.isRequired,
    })
  ).isRequired,
  searchParameters: PropTypes.shape({
    catalogNumber: PropTypes.string,
  }).isRequired,
  updateSearchParameter: PropTypes.func.isRequired,
}

class LookupMammals extends Component {
  constructor(props) {
    super(props)
    this.handleClearAll = this.handleClearAll.bind(this)
    this.handleLookup = this.handleLookup.bind(this)
    this.handleSearchUpdate = this.handleSearchUpdate.bind(this)
  }

  componentDidMount() {
    this.handleLookup()
  }

  handleClearAll() {
    this.props.clearSearchParameters()
    this.props.lookupMammals()
  }

  handleLookup() {
    this.props.lookupMammals(this.props.searchParameters)
  }

  handleRowClick(id) {
    this.props.push(`/app/mammals/${id}/edit`)
  }

  handleSearchUpdate(key, event) {
    this.props.updateSearchParameter(key, event.target.value)
  }

  render() {
    const { result, searchParameters } = this.props
    log.render()
    return (
      <div>
        <Grid textAlign="left" verticalAlign="middle">
          {SEARCH_PARAMETERS.map(parameterName => (
            <Grid.Row key={parameterName}>
              <Grid.Column computer={8} mobile={16} tablet={12}>
                <Input
                  action={{
                    children: <ModuleTranslate textKey="search" />,
                    color: 'green',
                    onClick: this.handleLookup,
                  }}
                  fluid
                  label={
                    <TranslatedLabel
                      textKey={`modules.collectionMammals.${parameterName}`}
                    />
                  }
                  onChange={event => {
                    this.handleSearchUpdate(parameterName, event)
                  }}
                  value={searchParameters[parameterName] || ''}
                />
              </Grid.Column>
            </Grid.Row>
          ))}
          <Grid.Row>
            <Grid.Column computer={8} mobile={16} tablet={12}>
              <Button basic onClick={this.handleClearAll}>
                <ModuleTranslate textKey="clearSearchParameters" />
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Table celled compact selectable striped>
          <Table.Header>
            <Table.Row>
              {TABLE_COLUMNS.map(columnName => (
                <Table.HeaderCell key={columnName}>
                  <ModuleTranslate textKey={columnName} />
                </Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          {result.length ? (
            <Table.Body>
              {result.map(mammal => {
                // assuming first column is unique id and can be used as key
                return (
                  <Table.Row
                    key={mammal[TABLE_COLUMNS[0]]}
                    onClick={() =>
                      this.handleRowClick(mammal[TABLE_COLUMNS[0]])}
                  >
                    {TABLE_COLUMNS.map(columnName => (
                      <Table.Cell key={columnName}>
                        {mammal[columnName]}
                      </Table.Cell>
                    ))}
                  </Table.Row>
                )
              })}
            </Table.Body>
          ) : (
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <ModuleTranslate textKey="noRecordsFound" />
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          )}
        </Table>
      </div>
    )
  }
}

LookupMammals.propTypes = propTypes

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  LookupMammals
)
