import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import CustomPagination from '@/components/CustomPagination.vue'

describe('CustomPagination', () => {
  it('renders correct number of pages', () => {
    const wrapper = mount(CustomPagination, {
      props: {
        totalPages: 5,
        currentPage: 1,
      },
    })

    const pageButtons = wrapper.findAll('button').length
    expect(pageButtons).toBe(7) // 5 pages + 2 navigation buttons
  })

  it('emits page-change event when clicking page', async () => {
    const wrapper = mount(CustomPagination, {
      props: {
        totalPages: 5,
        currentPage: 1,
      },
    })

    // Click page 2
    await wrapper.findAll('button')[2].trigger('click')

    expect(wrapper.emitted('page-change')).toBeTruthy()
    expect(wrapper.emitted('page-change')[0]).toEqual([2])
  })

  it('disables previous button on first page', () => {
    const wrapper = mount(CustomPagination, {
      props: {
        totalPages: 5,
        currentPage: 1,
      },
    })

    const prevButton = wrapper.find('button:first-child')
    expect(prevButton.attributes('disabled')).toBeDefined()
  })
})
