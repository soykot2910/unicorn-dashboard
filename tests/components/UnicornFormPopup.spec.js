import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import UnicornFormPopup from '@/components/UnicornFormPopup.vue'

describe('UnicornFormPopup', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(UnicornFormPopup, {
      props: {
        isLoading: false,
      },
    })
  })

  it('validates required fields', async () => {
    // Try to submit empty form
    await wrapper.find('form').trigger('submit')

    // Check error messages
    const errors = wrapper.findAll('.text-red-500')
    expect(errors.length).toBeGreaterThan(0)
    expect(wrapper.text()).toContain('Name is required')
  })

  it('emits save event with valid data', async () => {
    // Fill form with valid data
    await wrapper.find('#name').setValue('Rainbow')
    await wrapper.find('#age').setValue('5')
    await wrapper.find('#color').setValue('Purple')

    // Submit form
    await wrapper.find('form').trigger('submit')

    // Check emitted events
    expect(wrapper.emitted('save')).toBeTruthy()
    expect(wrapper.emitted('save')[0][0]).toEqual({
      name: 'Rainbow',
      age: 5,
      color: 'Purple',
    })
  })

  it('populates form when editing existing unicorn', async () => {
    const unicorn = {
      _id: '123',
      name: 'Star',
      age: 3,
      color: 'Gold',
    }

    wrapper = mount(UnicornFormPopup, {
      props: {
        unicorn,
        isLoading: false,
      },
    })

    // Check if form is populated
    expect(wrapper.find('#name').element.value).toBe('Star')
    expect(wrapper.find('#age').element.value).toBe('3')
    expect(wrapper.find('#color').element.value).toBe('Gold')
  })

  it('disables form submission when loading', async () => {
    wrapper = mount(UnicornFormPopup, {
      props: {
        isLoading: true,
      },
    })

    const submitButton = wrapper.find('button[type="submit"]')
    expect(submitButton.attributes('disabled')).toBeDefined()
    expect(submitButton.text()).toContain('Processing')
  })
})
