import buildEndpointSpec from 'coreModules/api/endpointSpecFactory/client'
import { createLookupMammalsResponse, getIndividualGroup } from './mockData'

export const GET_INDIVIDUAL_GROUP_BY_CATALOG_NUMBER = buildEndpointSpec({
  mapResponse: result => {
    return result.data[0] // should only be one result, which holds for mammals
  },

  mock: ({ request: { queryParams } }) => {
    return { data: [getIndividualGroup(queryParams)] }
  },
  operationId: 'getIndividualGroups',
})

export const LOOKUP_MAMMALS = buildEndpointSpec({
  mock: createLookupMammalsResponse,
  operationId: 'getIndividualGroups',
})

export const REGISTER_MAMMAL = buildEndpointSpec({
  operationId: 'createIndividualGroup',
})

export const UPDATE_INDIVIDUAL_GROUP = buildEndpointSpec({
  operationId: 'updateIndividualGroup',
})
