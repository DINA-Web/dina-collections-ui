import {
  COLLECTION_MAMMALS_REGISTER_NEW_MAMMAL_FAIL,
  COLLECTION_MAMMALS_REGISTER_NEW_MAMMAL_REQUEST,
  COLLECTION_MAMMALS_REGISTER_NEW_MAMMAL_SUCCESS,
} from '../actionTypes'
import { REGISTER_MAMMAL } from '../endpoints'

export default function registerMammal(
  { individualGroup, catalogedUnit },
  throwError = true
) {
  const meta = {
    catalogNumber: catalogedUnit.catalogNumber,
    individualGroup,
  }

  return (dispatch, getState, { apiClient }) => {
    dispatch({
      meta,
      type: COLLECTION_MAMMALS_REGISTER_NEW_MAMMAL_REQUEST,
    })

    const body = {
      data: {
        additionalData: [
          {
            attributes: catalogedUnit,
            type: 'catalogedUnit',
          },
        ],
        attributes: {
          ...individualGroup,
        },
      },
    }
    return apiClient
      .call(REGISTER_MAMMAL, {
        body,
      })
      .then(
        response => {
          dispatch({
            meta,
            payload: response,
            type: COLLECTION_MAMMALS_REGISTER_NEW_MAMMAL_SUCCESS,
          })
          return response
        },
        error => {
          dispatch({
            error: true,
            meta,
            payload: error,
            type: COLLECTION_MAMMALS_REGISTER_NEW_MAMMAL_FAIL,
          })
          // for redux form
          if (throwError) {
            throw error
          }
        }
      )
  }
}
