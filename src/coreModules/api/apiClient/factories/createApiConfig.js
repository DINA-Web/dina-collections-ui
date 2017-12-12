const apiConfigSchema = {
  additionalProperties: false,
  properties: {
    baseUrl: {
      type: 'string',
    },
    cache: {
      type: 'object',
    },
    debug: {
      type: 'boolean',
    },
    enableEndpointMocks: {
      type: 'boolean',
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
      type: 'object',
    },
    systemValidate: {
      not: {
        type: 'string',
      },
    },
    throwOnValidationErrors: {
      type: 'boolean',
    },
    validateInput: {
      type: 'boolean',
    },
    validateOutput: {
      type: 'boolean',
    },
  },
  required: ['validateInput', 'validateOutput'],
}

module.exports = function createApiConfig(apiConfigInput = {}) {
  const apiConfig = {
    validateInput: true,
    validateOutput: true,
    ...apiConfigInput,
  }

  const { systemValidate } = apiConfig

  const error = systemValidate && systemValidate(apiConfig, apiConfigSchema)
  if (error) {
    throw error
  }
  return apiConfig
}
