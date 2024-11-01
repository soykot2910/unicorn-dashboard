import { vi, beforeAll, afterEach } from 'vitest'

// Setup global test utilities
beforeAll(() => {
  if (!window.fetch) {
    window.fetch = vi.fn()
  }
})

// Clear all mocks after each test
afterEach(() => {
  vi.clearAllMocks()
})
