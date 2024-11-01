import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUnicornStore = defineStore('unicorn', () => {
  // State
  const unicorns = ref([])
  const isLoading = ref(true)
  const error = ref(null)
  const currentPage = ref(1)
  const itemsPerPage = 5
  const sortField = ref('name')
  const sortOrder = ref('asc')
  const isCreating = ref(false)
  const isEditing = ref(false)
  const isDeletingMap = ref({})

  // API URL
  const apiUrl = `https://crudcrud.com/api/${import.meta.env.VITE_API_ID}/unicorns`

  // Getters
  const sortedUnicorns = computed(() => {
    return [...unicorns.value].sort((a, b) => {
      const aValue = a[sortField.value]
      const bValue = b[sortField.value]

      // Handle numeric sorting for age
      if (sortField.value === 'age') {
        return sortOrder.value === 'asc'
          ? aValue - bValue // Numeric comparison for age
          : bValue - aValue
      }

      // String comparison for other fields
      return sortOrder.value === 'asc'
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue))
    })
  })

  const paginatedUnicorns = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return sortedUnicorns.value.slice(start, end)
  })

  const totalPages = computed(() =>
    Math.ceil(unicorns.value.length / itemsPerPage),
  )

  const hasUnicorns = computed(() => unicorns.value.length > 0)

  // Actions
  async function fetchUnicorns() {
    try {
      isLoading.value = true
      const response = await fetch(apiUrl)
      if (!response.ok) throw new Error('Network response was not ok')
      unicorns.value = await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  async function saveUnicorn(unicornData) {
    try {
      isCreating.value = !unicornData._id
      isEditing.value = !!unicornData._id

      const method = unicornData._id ? 'PUT' : 'POST'
      const url = unicornData._id ? `${apiUrl}/${unicornData._id}` : apiUrl

      const payload = { ...unicornData }
      if (method === 'PUT') {
        delete payload._id
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) throw new Error('Failed to save unicorn')

      await fetchUnicorns()
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      isCreating.value = false
      isEditing.value = false
    }
  }

  async function deleteUnicorn(id) {
    try {
      isDeletingMap.value[id] = true
      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete unicorn')
      await fetchUnicorns()
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      isDeletingMap.value[id] = false
    }
  }

  function updateSort(field) {
    if (field === sortField.value) {
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
    } else {
      sortField.value = field
      sortOrder.value = 'asc'
    }
  }

  function updatePage(page) {
    currentPage.value = page
  }

  return {
    // State
    unicorns,
    isLoading,
    error,
    currentPage,
    sortField,
    sortOrder,
    isCreating,
    isEditing,
    isDeletingMap,

    // Getters
    sortedUnicorns,
    paginatedUnicorns,
    totalPages,
    hasUnicorns,

    // Actions
    fetchUnicorns,
    saveUnicorn,
    deleteUnicorn,
    updateSort,
    updatePage,
  }
})
