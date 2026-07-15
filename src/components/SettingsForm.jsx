import { useState } from 'react'
import { validators } from './settingsValidation'

const initialValues = {
  name: '',
  email: '',
  phone: '',
}

function SettingsForm() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))

    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validators[name](value) }))
    }
  }

  const handleBlur = (event) => {
    const { name, value } = event.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: validators[name](value) }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = {
      name: validators.name(values.name),
      email: validators.email(values.email),
      phone: validators.phone(values.phone),
    }

    setErrors(nextErrors)
    setTouched({ name: true, email: true, phone: true })

    const hasErrors = Object.values(nextErrors).some(Boolean)
    if (!hasErrors) {
      // Form is valid — submit handler can be wired up by the parent later.
    }
  }

  const renderField = (name, label, type = 'text', required = false) => (
    <div className="settings-form__field">
      <label htmlFor={name}>
        {label}
        {required ? ' *' : ''}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={values[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-invalid={touched[name] && errors[name] ? 'true' : 'false'}
        aria-describedby={touched[name] && errors[name] ? `${name}-error` : undefined}
      />
      {touched[name] && errors[name] ? (
        <span id={`${name}-error`} className="settings-form__error" role="alert">
          {errors[name]}
        </span>
      ) : null}
    </div>
  )

  return (
    <form className="settings-form" onSubmit={handleSubmit} noValidate>
      <h2>Settings</h2>
      {renderField('name', 'Name', 'text', true)}
      {renderField('email', 'Email', 'email', true)}
      {renderField('phone', 'Phone', 'tel')}
      <button type="submit">Save Settings</button>
    </form>
  )
}

export default SettingsForm
