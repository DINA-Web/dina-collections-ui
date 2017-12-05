import immutable from 'object-path-immutable'

import {
  COLLECTION_MAMMALS_UPDATE_INDIVIDUAL_GROUP_FAIL,
  COLLECTION_MAMMALS_UPDATE_INDIVIDUAL_GROUP_REQUEST,
  COLLECTION_MAMMALS_UPDATE_INDIVIDUAL_GROUP_SUCCESS,
} from '../actionTypes'
import { UPDATE_INDIVIDUAL_GROUP } from '../endpoints'

export default function updateIndividualGroup(formData, throwError = true) {
  const meta = {
    catalogNumber: formData.physicalUnits[0].catalogedUnit.catalogNumber,
    formData,
  }
  return (dispatch, getState, { apiClient }) => {
    dispatch({
      meta,
      type: COLLECTION_MAMMALS_UPDATE_INDIVIDUAL_GROUP_REQUEST,
    })

    let attributes = formData

    attributes = immutable.set(
      attributes,
      'featureObservations',
      formData.featureObservations.filter(featureObservation => {
        return featureObservation.featureObservationText
      })
    )

    attributes = {
      featureObservations: [],
      identifications: [],
      occurrences: [],
      physicalUnits: [],
      ...attributes,
    }

    const body = {
      data: {
        attributes,
      },
    }

    return apiClient
      .httpPatch(UPDATE_INDIVIDUAL_GROUP, {
        body,
      })
      .then(
        response => {
          dispatch({
            meta,
            payload: response,
            type: COLLECTION_MAMMALS_UPDATE_INDIVIDUAL_GROUP_SUCCESS,
          })
          return response
        },
        error => {
          dispatch({
            error: true,
            meta,
            payload: error,
            type: COLLECTION_MAMMALS_UPDATE_INDIVIDUAL_GROUP_FAIL,
          })
          // for redux form
          if (throwError) {
            throw error
          }
        }
      )
  }
}
