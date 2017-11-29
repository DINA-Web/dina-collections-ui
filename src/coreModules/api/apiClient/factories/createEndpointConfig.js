export const endpointConfigSchema = {
  additionalProperties: false,
  properties: {
    mapBody: {
      not: {
        type: 'string',
      },
    },
    mapHeaders: {
      not: {
        type: 'string',
      },
    },
    mapResponse: {
      not: {
        type: 'string',
      },
    },
    mock: {
      not: {
        type: 'string',
      },
    },
    operationId: {
      type: 'string',
    },
    pathname: {
      type: 'string',
    },
    validateBody: {
      not: {
        type: 'string',
      },
    },
    validateResponse: {
      not: {
        type: 'string',
      },
    },
  },
  required: [],
}

export default function createEndpointConfig(
  endpointConfigInput,
  apiConfigInput
) {
  const { systemValidate } = apiConfigInput
  const error =
    systemValidate && systemValidate(endpointConfigInput, endpointConfigSchema)
  if (error) {
    throw error
  }
  return endpointConfigInput
}
