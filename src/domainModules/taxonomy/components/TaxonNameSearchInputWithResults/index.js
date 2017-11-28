import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import SearchInputWithResults from 'coreModules/form/components/SearchInputWithResults'
import TaxonNameSearchResult from '../TaxonNameSearchResult'
import globalSelectors from '../../globalSelectors'
import {
  clearTaxonSearch,
  updateTaxonSearchFilterName,
} from '../../actionCreators'

const mapStateToProps = state => {
  return {
    taxonSearchName: globalSelectors.getLookupSearchFilterName(state),
    taxonSearchResults: globalSelectors.getLookupResult(state),
    taxonSearchResultsLoading: globalSelectors.getLookupLoading(state),
  }
}

const mapDispatchToProps = { clearTaxonSearch, updateTaxonSearchFilterName }

const propTypes = {
  clearTaxonSearch: PropTypes.func.isRequired,
  errorScope: PropTypes.string,
  helpText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  meta: PropTypes.shape({
    error: PropTypes.object,
    touched: PropTypes.bool.isRequired,
  }).isRequired,
  required: PropTypes.bool,
  taxonName: PropTypes.string.isRequired,
  taxonSearchName: PropTypes.string,
  taxonSearchResults: PropTypes.arrayOf(
    PropTypes.shape({
      attributes: PropTypes.shape({
        scientific_name: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  taxonSearchResultsLoading: PropTypes.bool.isRequired,
  updateTaxonSearchFilterName: PropTypes.func.isRequired,
}

const defaultProps = {
  errorScope: undefined,
  helpText: undefined,
  label: undefined,
  required: false,
  taxonSearchName: '',
}

class TaxonNameSearchInputWithResults extends Component {
  constructor(props) {
    super(props)
    this.handleResultSelect = this.handleResultSelect.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.getValue = this.getValue.bind(this)
  }

  componentDidMount() {
    if (this.props.taxonName && !this.props.input.value) {
      this.props.input.onChange(this.props.taxonName)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.taxonName !== nextProps.taxonName) {
      this.props.input.onChange(nextProps.taxonName)
    }
  }

  getValue() {
    const { taxonName, taxonSearchName } = this.props

    const searchIsNotNull = taxonSearchName !== null

    if (searchIsNotNull) {
      return taxonSearchName
    }

    return taxonName || ''
  }

  handleResultSelect(event, { result }) {
    // see Semantic docs for details: https://react.semantic-ui.com/modules/search
    if (
      result &&
      result.content &&
      result.content.attributes &&
      result.content.attributes.scientific_name
    ) {
      const value = result.content.attributes.scientific_name

      // keep search and name in sync to ensure that if the user focuses the
      // input again, it should show the current taxonName as suggestion instead
      // of "no results"
      this.props.updateTaxonSearchFilterName(value)
      this.props.input.onBlur(value)
    }
  }

  handleSearchChange(event, { value }) {
    // see Semantic docs for details: https://react.semantic-ui.com/modules/search
    this.props.updateTaxonSearchFilterName(value)

    if (this.props.taxonName) {
      // empty form value, if search is renewed after taxonName selected
      this.props.input.onChange('')
    }
  }

  render() {
    const {
      errorScope,
      helpText,
      input,
      label,
      meta,
      required,
      taxonName,
      taxonSearchName,
      taxonSearchResults,
      taxonSearchResultsLoading,
      ...rest
    } = this.props

    // do not pass on non-DOM props
    delete rest.clearTaxonSearch
    delete rest.updateTaxonSearchFilterName

    // patch each result with a key as required by SearchInputWithResults
    const results = taxonSearchResults.map(result => {
      return {
        ...result,
        key: result.id,
      }
    })

    return (
      <SearchInputWithResults
        errorScope={errorScope}
        handleResultSelect={this.handleResultSelect}
        handleSearchChange={this.handleSearchChange}
        helpText={helpText}
        input={{
          name: input.name,
          value: this.getValue(),
        }}
        isLoading={taxonSearchResultsLoading}
        label={label}
        meta={meta}
        required={required}
        resultRenderer={TaxonNameSearchResult}
        results={results}
        {...rest}
      />
    )
  }
}

TaxonNameSearchInputWithResults.propTypes = propTypes
TaxonNameSearchInputWithResults.defaultProps = defaultProps

export default connect(mapStateToProps, mapDispatchToProps)(
  TaxonNameSearchInputWithResults
)
