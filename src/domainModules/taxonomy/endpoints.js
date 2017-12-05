import { buildEndpointSpec } from 'coreModules/api/endpointSpecFactory'
import { createDeleter, createSetter } from 'utilities/stateHelper'
import { taxonomyResponse } from './mockData'

const setScientificName = createSetter(['attributes', 'scientificName'])
const deleteScientificUnderscoreName = createDeleter([
  'attributes',
  'scientific_name',
])

const baseUrl = '/taxonomy'

export const TAXONOMY_SEARCH = buildEndpointSpec({
  baseUrl,
  mapResponse: json => {
    const parsedResult = {
      ...json,
      data:
        json.data &&
        json.data.map(item => {
          return deleteScientificUnderscoreName(
            setScientificName(item, item.attributes.scientific_name)
          )
        }),
    }

    return parsedResult
  },
  mock: () => {
    return taxonomyResponse
  },
  operationId: 'getTaxaByName',
})
