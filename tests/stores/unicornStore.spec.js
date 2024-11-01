import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUnicornStore } from '@/stores/unicornStore'

describe('Unicorn Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    window.fetch = vi.fn()
  })

  it('fetches unicorns successfully', async () => {
    const store = useUnicornStore()
    const mockUnicorns = [{ name: 'Test Unicorn' }]

    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockUnicorns),
    })

    await store.fetchUnicorns()

    expect(store.unicorns).toEqual(mockUnicorns)
    expect(store.error).toBeNull()
    expect(store.isLoading).toBe(false)
  })

  it('handles fetch errors', async () => {
    const store = useUnicornStore()

    window.fetch.mockResolvedValueOnce({
      ok: false,
    })

    await store.fetchUnicorns()

    expect(store.error).toBeTruthy()
    expect(store.isLoading).toBe(false)
  })

  it('sorts unicorns correctly', () => {
    const store = useUnicornStore()
    store.unicorns = [{ name: 'Zebra' }, { name: 'Alpha' }]
    store.sortField = 'name'
    store.sortOrder = 'asc'

    expect(store.sortedUnicorns[0].name).toBe('Alpha')
    expect(store.sortedUnicorns[1].name).toBe('Zebra')
  })

  it('paginates unicorns correctly', () => {
    const store = useUnicornStore()
    store.unicorns = Array.from({ length: 7 }, (_, i) => ({
      name: `Unicorn ${i}`,
    }))
    store.currentPage = 2

    expect(store.paginatedUnicorns.length).toBe(2) // Second page with 2 items
  })

  it('sorts unicorns by age correctly', () => {
    const store = useUnicornStore()
    store.unicorns = [
      { name: 'Old', age: 30 },
      { name: 'Young', age: 5 },
      { name: 'Middle', age: 15 },
    ]
    store.sortField = 'age'
    store.sortOrder = 'asc'

    expect(store.sortedUnicorns[0].age).toBe(5)
    expect(store.sortedUnicorns[1].age).toBe(15)
    expect(store.sortedUnicorns[2].age).toBe(30)

    // Test descending order
    store.sortOrder = 'desc'
    expect(store.sortedUnicorns[0].age).toBe(30)
    expect(store.sortedUnicorns[1].age).toBe(15)
    expect(store.sortedUnicorns[2].age).toBe(5)
  })
})
