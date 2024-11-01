import { describe, it, expect } from 'vitest'
import { getUnicornStatus } from '@/utils/unicornUtils'

describe('getUnicornStatus', () => {
  it('returns Baby Unicorn for age 0-8', () => {
    expect(getUnicornStatus(0)).toBe('👶 Baby Unicorn')
    expect(getUnicornStatus(5)).toBe('👶 Baby Unicorn')
    expect(getUnicornStatus(8)).toBe('👶 Baby Unicorn')
  })

  it('returns Mature Unicorn for age 9-25', () => {
    expect(getUnicornStatus(9)).toBe('🦄 Mature Unicorn')
    expect(getUnicornStatus(15)).toBe('🦄 Mature Unicorn')
    expect(getUnicornStatus(25)).toBe('🦄 Mature Unicorn')
  })

  it('returns Old Unicorn for age 26+', () => {
    expect(getUnicornStatus(26)).toBe('👴 Old Unicorn')
    expect(getUnicornStatus(50)).toBe('👴 Old Unicorn')
  })

  it('handles invalid inputs', () => {
    expect(getUnicornStatus('invalid')).toBe('Unknown')
    expect(getUnicornStatus(-1)).toBe('Unknown')
  })
})
