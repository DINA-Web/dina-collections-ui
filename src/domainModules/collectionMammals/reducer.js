import { createGetter, createSetter } from 'utilities/stateHelper'

import {
  COLLECTION_MAMMALS_CLEAR_SEARCH_PARAMETERS,
  COLLECTION_MAMMALS_GET_BY_CATALOG_NUMBER_SUCCESS,
  COLLECTION_MAMMALS_LOOKUP_MAMMALS_FAIL,
  COLLECTION_MAMMALS_LOOKUP_MAMMALS_SUCCESS,
  COLLECTION_MAMMALS_REGISTER_NEW_MAMMAL_SUCCESS,
  COLLECTION_MAMMALS_UPDATE_INDIVIDUAL_GROUP_SUCCESS,
  COLLECTION_MAMMALS_UPDATE_SEARCH_PARAMETER,
} from './actionTypes'

const setLookupError = createSetter(['lookup', 'error'])
const setLookupResult = createSetter(['lookup', 'result'])
const getLookupSearch = createGetter(['lookup', 'search'])
const setLookupSearch = createSetter(['lookup', 'search'])

const initialState = {
  individualGroups: {},
  lookup: {
    error: null,
    result: [],
    search: {},
  },
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case COLLECTION_MAMMALS_CLEAR_SEARCH_PARAMETERS: {
      return setLookupSearch(state, {})
    }

    case COLLECTION_MAMMALS_GET_BY_CATALOG_NUMBER_SUCCESS:
    case COLLECTION_MAMMALS_REGISTER_NEW_MAMMAL_SUCCESS:
    case COLLECTION_MAMMALS_UPDATE_INDIVIDUAL_GROUP_SUCCESS: {
      return {
        ...state,
        individualGroups: {
          ...state.individualGroups,
          [action.meta.catalogNumber]: action.payload,
        },
      }
    }

    case COLLECTION_MAMMALS_LOOKUP_MAMMALS_FAIL: {
      const emptyResultState = setLookupResult(state, [])
      return setLookupError(emptyResultState, action.payload.error)
    }

    case COLLECTION_MAMMALS_LOOKUP_MAMMALS_SUCCESS: {
      const emptyErrorState = setLookupError(state, [])
      return setLookupResult(emptyErrorState, action.payload.result)
    }

    case COLLECTION_MAMMALS_UPDATE_SEARCH_PARAMETER: {
      const newSearchState = {
        ...getLookupSearch(state),
        [action.payload.key]: action.payload.value,
      }

      return setLookupSearch(state, newSearchState)
    }

    default:
      return state
  }
}
