export default function isKnownError(error) {
  /* eslint-disable no-underscore-dangle */
  return error && error._known
}
