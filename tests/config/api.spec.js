import { describe, it, expect, vi } from 'vitest'
import { createApiClient } from '../../src/config/api'

describe('API Client', () => {
  it('handles successful API calls', async () => {
    window.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ name: 'Test Unicorn' }]),
      }),
    )

    const apiClient = createApiClient()
    const result = await apiClient.get('/unicorns')

    expect(result).toEqual([{ name: 'Test Unicorn' }])
    expect(window.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/unicorns'),
      expect.any(Object),
    )
  })

  it('handles API errors', async () => {
    window.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      }),
    )

    const apiClient = createApiClient()
    await expect(apiClient.get('/unicorns')).rejects.toThrow('API Error')
  })
})
