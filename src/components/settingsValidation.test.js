import { describe, expect, it } from 'vitest'
import { validateEmail, validateName, validatePhone } from './settingsValidation'

describe('validateName', () => {
  it('returns required error for empty value', () => {
    expect(validateName('')).toBe('Name is required')
    expect(validateName('   ')).toBe('Name is required')
  })

  it('returns min length error for single character', () => {
    expect(validateName('A')).toBe('Name must be at least 2 characters')
  })

  it('returns empty string for valid names', () => {
    expect(validateName('Jo')).toBe('')
    expect(validateName('  Jane Doe  ')).toBe('')
  })
})

describe('validateEmail', () => {
  it('returns required error for empty value', () => {
    expect(validateEmail('')).toBe('Email is required')
  })

  it('returns format error for invalid email', () => {
    expect(validateEmail('not-an-email')).toBe('Please enter a valid email address')
    expect(validateEmail('missing@domain')).toBe('Please enter a valid email address')
  })

  it('returns empty string for valid email', () => {
    expect(validateEmail('user@example.com')).toBe('')
  })
})

describe('validatePhone', () => {
  it('returns empty string when phone is omitted', () => {
    expect(validatePhone('')).toBe('')
    expect(validatePhone('   ')).toBe('')
  })

  it('returns error when phone is not exactly 10 digits', () => {
    expect(validatePhone('12345')).toBe('Phone must be exactly 10 digits')
    expect(validatePhone('12345678901')).toBe('Phone must be exactly 10 digits')
    expect(validatePhone('123-456-7890')).toBe('Phone must be exactly 10 digits')
  })

  it('returns empty string for valid 10-digit phone', () => {
    expect(validatePhone('9876543210')).toBe('')
  })
})
