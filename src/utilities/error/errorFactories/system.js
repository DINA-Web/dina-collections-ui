import { ERROR_CODES, ORIGINS, TYPES } from '../constants'

import createError from './base'

export default function createSystemError(error) {
  const errorCode =
    (error.errorCode && ERROR_CODES[error.errorCode]) ||
    ERROR_CODES.DEFAULT_SYSTEM
  const context = {
    errorCode, // import from consts
    origin: ORIGINS.CLIENT,
    statusCode: null,
    type: TYPES.SYSTEM,
  }
  return createError({
    context,
    error,
  })
}