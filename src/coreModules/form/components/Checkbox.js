import React from 'react'
import PropTypes from 'prop-types'
import { Form, Checkbox } from 'semantic-ui-react'
import { FormFieldError } from '../../error/components'

const propTypes = {
  errorScope: PropTypes.string,
  helpText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  input: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  meta: PropTypes.shape({
    error: PropTypes.object,
    touched: PropTypes.bool.isRequired,
  }).isRequired,
  module: PropTypes.string.isRequired,
  required: PropTypes.bool,
  type: PropTypes.string.isRequired,
}
const defaultProps = {
  errorScope: undefined,
  helpText: undefined,
  label: undefined,
  required: false,
}

const Field = ({
  errorScope,
  label,
  input,
  meta: { touched, error },
  module,
  required,
  helpText,
  type,
  ...rest
}) => {
  const displayError = touched && !!error

  const { value, onChange: reduxFormOnChange, ...inputRest } = input

  return (
    <Form.Field
      error={displayError}
      required={required}
      style={{ position: 'relative' }}
    >
      {label && <label htmlFor={input.name}>{label}</label>}
      {helpText && <p>{helpText}</p>}
      <Checkbox
        checked={!!value}
        onChange={(event, data) => {
          reduxFormOnChange(data.checked)
        }}
        type={type}
        {...inputRest}
        {...rest}
      />
      {displayError && (
        <FormFieldError
          error={error}
          module={module}
          scope={errorScope || input.name}
        />
      )}
    </Form.Field>
  )
}

Field.propTypes = propTypes
Field.defaultProps = defaultProps

export default Field