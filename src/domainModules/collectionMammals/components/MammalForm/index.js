import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button, Form, Message, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {
  formValueSelector as formValueSelectorFactory,
  getFormSyncErrors,
  reduxForm,
  SubmissionError,
} from 'redux-form'
import { createFormModelSchemaValidator } from 'coreModules/error/utilities'
import { FormSchemaError } from 'coreModules/error/components'
import { clearTaxonSearch } from 'domainModules/taxonomy/actionCreators'
import createLog from 'utilities/log'
import { createModuleTranslate } from 'coreModules/i18n/components'
import SegmentCatalogedUnit from './SegmentCatalogedUnit'
import SegmentDetermination from './SegmentDetermination'
import SegmentFeatureObservations from './SegmentFeatureObservations'
import SegmentCollectingInformation from './SegmentCollectingInformation'
import SegmentPhysicalUnits from './SegmentPhysicalUnits'

const log = createLog('modules:collectionMammals:MammalForm')
const ModuleTranslate = createModuleTranslate('collectionMammals')

const FORM_NAME = 'mammalForm'
const TAXON_NAME_FIELD_KEY =
  'identifications[0].identifiedTaxonNameStandardized'

const formValueSelector = formValueSelectorFactory(FORM_NAME)
const getFormSyncErrorsSelector = getFormSyncErrors(FORM_NAME)

const INITIAL_VALUES = {
  featureObservations: [
    { featureObservationType: { featureObservationTypeName: 'sex', id: 1 } },
    { featureObservationType: { featureObservationTypeName: 'age', id: 2 } },
    {
      featureObservationType: {
        featureObservationTypeName: 'ageStage',
        id: 3,
      },
    },
    {
      featureObservationType: {
        featureObservationTypeName: 'conditionAtCollecting',
        id: 4,
      },
    },
  ],
  physicalUnits: [
    {
      catalogedUnit: {
        catalogNumber: '',
      },
    },
  ],
}

const mapStateToProps = state => {
  const syncErrors = getFormSyncErrorsSelector(state)

  return {
    // TODO: make this dynamic
    identifications: formValueSelector(state, 'identifications'),
    occurrences: formValueSelector(state, 'occurrences'),
    schemaErrors: syncErrors && syncErrors.schemaErrors,
  }
}

const mapDispatchToProps = {
  clearTaxonSearch,
}

const propTypes = {
  clearTaxonSearch: PropTypes.func.isRequired,
  error: PropTypes.string,
  handleFormSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  identifications: PropTypes.arrayOf(
    PropTypes.shape({
      identifiedDay: PropTypes.number,
      identifiedMonth: PropTypes.number,
      identifiedTaxonNameStandardized: PropTypes.string,
      identifiedYear: PropTypes.number,
    })
  ),
  individualGroup: PropTypes.shape({
    // TODO: define and possibly centralize propTypes for individualGroup
    identifications: PropTypes.arrayOf(
      PropTypes.shape({
        identifiedDay: PropTypes.number,
        identifiedMonth: PropTypes.number,
        identifiedTaxonNameStandardized: PropTypes.string,
        identifiedYear: PropTypes.number,
      })
    ).isRequired,
    physicalUnits: PropTypes.arrayOf(
      PropTypes.shape({
        catalogedUnit: PropTypes.shape({
          catalogNumber: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired
    ).isRequired,
  }),
  initialize: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  occurrences: PropTypes.arrayOf(
    PropTypes.shape({
      dayStart: PropTypes.number,
      monthStart: PropTypes.number,
      yearStart: PropTypes.number,
    })
  ),
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  schemaErrors: PropTypes.arrayOf(
    PropTypes.shape({ errorCode: PropTypes.string.isRequired })
  ),
  submitFailed: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
}

const defaultProps = {
  error: '',
  identifications: [],
  individualGroup: undefined,
  occurrences: [],
  schemaErrors: [],
}

class RawMammalForm extends Component {
  constructor(props) {
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.setInitialFormValues = this.setInitialFormValues.bind(this)
    this.setInitialFormValues(props.individualGroup || INITIAL_VALUES)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.individualGroup !== nextProps.individualGroup) {
      this.setInitialFormValues(nextProps.individualGroup)
    }
  }

  componentWillUnmount() {
    this.props.clearTaxonSearch()
  }

  setInitialFormValues(individualGroup) {
    this.props.initialize(individualGroup)
  }

  handleFormSubmit(data) {
    const patchedData = {
      ...data,
    }

    if (data.occurrences && data.occurrences.length) {
      patchedData.occurrences = data.occurrences.map(occurrence => {
        const { dayStart, monthStart, yearStart } = occurrence
        return {
          ...occurrence,
          dayEnd: dayStart,
          monthEnd: monthStart,
          yearEnd: yearStart,
        }
      })
    }

    return this.props.handleFormSubmit(patchedData).catch(error => {
      // prettier-ignore
      const errorMessage = `Status: ${error.status}, message: ${
        error.error.message
      }`
      throw new SubmissionError({
        _error: errorMessage,
      })
    })
  }

  render() {
    const {
      error,
      handleSubmit,
      identifications,
      invalid,
      occurrences,
      pristine,
      reset,
      schemaErrors,
      submitting,
      submitFailed,
      submitSucceeded,
    } = this.props

    log.render()
    return (
      <Form
        error={!!error || submitFailed}
        onSubmit={handleSubmit(this.handleFormSubmit)}
        success={submitSucceeded}
      >
        <SegmentCatalogedUnit />
        <SegmentDetermination
          identifications={identifications}
          taxonNameFieldKey={TAXON_NAME_FIELD_KEY}
        />
        <SegmentCollectingInformation occurrences={occurrences} />
        <SegmentFeatureObservations />
        <SegmentPhysicalUnits />

        <Segment>
          <div>
            <Button
              disabled={pristine || submitting}
              size="large"
              type="submit"
            >
              <ModuleTranslate textKey="save" />
            </Button>
            <Button
              basic
              disabled={pristine || submitting}
              onClick={reset}
              size="large"
            >
              <ModuleTranslate textKey="cancel" />
            </Button>
            {schemaErrors.length > 0 && (
              <FormSchemaError errors={schemaErrors} />
            )}
            {invalid &&
              !error &&
              submitFailed && (
                <Message
                  error
                  header={<ModuleTranslate textKey="formContainsErrors" />}
                />
              )}
            {submitFailed &&
              error && (
                <Message
                  content={error}
                  error
                  header={<ModuleTranslate textKey="submitFailed" />}
                />
              )}
            {submitSucceeded && (
              <Message header={<ModuleTranslate textKey="saved" />} success />
            )}
          </div>
        </Segment>
      </Form>
    )
  }
}

RawMammalForm.propTypes = propTypes
RawMammalForm.defaultProps = defaultProps

export const MammalForm = reduxForm({
  form: FORM_NAME,
  validate: createFormModelSchemaValidator({
    model: 'individualGroup',
  }),
})(RawMammalForm)

export default compose(connect(mapStateToProps, mapDispatchToProps))(MammalForm)
