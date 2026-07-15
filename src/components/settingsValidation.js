export function validateName(value) {
  const trimmed = value.trim()
  if (!trimmed) return 'Name is required'
  if (trimmed.length < 2) return 'Name must be at least 2 characters'
  return ''
}

export function validateEmail(value) {
  const trimmed = value.trim()
  if (!trimmed) return 'Email is required'
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(trimmed)) return 'Please enter a valid email address'
  return ''
}

export function validatePhone(value) {
  const trimmed = value.trim()
  if (!trimmed) return ''
  if (!/^\d{10}$/.test(trimmed)) return 'Phone must be exactly 10 digits'
  return ''
}

export const validators = {
  name: validateName,
  email: validateEmail,
  phone: validatePhone,
}
