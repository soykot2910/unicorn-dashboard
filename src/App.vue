<script setup>
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import SidebarMenu from './components/SidebarMenu.vue'
import MainHeader from './components/MainHeader.vue'
import UnicornCard from './components/UnicornCard.vue'
import CustomPagination from './components/CustomPagination.vue'
import LoadingIcon from './assets/icons/LoadingIcon.vue'
import UnicornFormPopup from './components/UnicornFormPopup.vue'

const toast = useToast()

const unicorns = ref([])
const isLoading = ref(true)
const error = ref(null)
const currentPage = ref(1)
const itemsPerPage = 5
const showUnicornPopup = ref(false)
const editingUnicorn = ref(null)
const sortField = ref('doctor_name')
const sortOrder = ref('asc')

const apiUrl = `https://crudcrud.com/api/${import.meta.env.VITE_API_ID}/unicorns`

const fetchUnicorns = async () => {
  try {
    const response = await fetch(apiUrl)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    unicorns.value = data
  } catch (err) {
    error.value = err.message
    toast.error(err.message)
  } finally {
    isLoading.value = false
  }
}

const saveUnicorn = async unicornData => {
  try {
    const method = unicornData._id ? 'PUT' : 'POST'
    const url = unicornData._id ? `${apiUrl}/${unicornData._id}` : apiUrl
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(unicornData),
    })
    if (!response.ok) {
      throw new Error(
        `Failed to ${method === 'PUT' ? 'update' : 'create'} unicorn`,
      )
    }
    if (method === 'POST') {
      const newUnicorn = await response.json()
      unicorns.value.push(newUnicorn)
      toast.success('Unicorn created successfully')
    } else {
      const index = unicorns.value.findIndex(u => u._id === unicornData._id)
      if (index !== -1) {
        unicorns.value[index] = { ...unicorns.value[index], ...unicornData }
      }
      toast.success('Unicorn updated successfully')
    }
    closeUnicornPopup()
  } catch (err) {
    error.value = err.message
    toast.error(err.message)
  }
}

const openUnicornPopup = (unicorn = null) => {
  editingUnicorn.value = unicorn
  showUnicornPopup.value = true
}

const closeUnicornPopup = () => {
  showUnicornPopup.value = false
  editingUnicorn.value = null
}

const sortedUnicorns = computed(() => {
  return [...unicorns.value].sort((a, b) => {
    let fieldA = a[sortField.value]
    let fieldB = b[sortField.value]

    if (sortField.value === 'doctor_name') {
      fieldA = fieldA.toLowerCase()
      fieldB = fieldB.toLowerCase()
    }

    if (fieldA < fieldB) return sortOrder.value === 'asc' ? -1 : 1
    if (fieldA > fieldB) return sortOrder.value === 'asc' ? 1 : -1
    return 0
  })
})

const paginatedUnicorns = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return sortedUnicorns.value.slice(start, end)
})

const totalPages = computed(() =>
  Math.ceil(sortedUnicorns.value.length / itemsPerPage),
)

const changePage = page => {
  currentPage.value = page
}

const deleteUnicorn = async unicornId => {
  try {
    const response = await fetch(`${apiUrl}/${unicornId}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error('Failed to delete unicorn')
    }
    unicorns.value = unicorns.value.filter(u => u._id !== unicornId)
    toast.success('Unicorn deleted successfully')
  } catch (err) {
    error.value = err.message
    toast.error(err.message)
  }
}

const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const changeSorting = field => {
  if (field === sortField.value) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortOrder.value = 'asc'
  }
}

onMounted(() => {
  fetchUnicorns()
})
</script>

<template>
  <div class="flex flex-col md:flex-row min-h-screen">
    <SidebarMenu
      :is-open="isSidebarOpen"
      @close="isSidebarOpen = false"
      class="md:w-64 md:min-h-screen"
    />

    <div class="flex-1 p-4 md:p-6 bg-[#F6F6F6]">
      <MainHeader
        @open-unicorn-popup="openUnicornPopup()"
        @toggle-sidebar="toggleSidebar"
        @change-sorting="changeSorting"
        :sort-field="sortField"
        :sort-order="sortOrder"
      />

      <div
        v-if="isLoading"
        class="mt-6 text-center h-64 flex items-center justify-center"
      >
        <LoadingIcon />
      </div>
      <div v-else-if="error" class="mt-6 text-center text-red-500">
        {{ error }}
      </div>
      <div v-else class="w-full mt-6 space-y-4">
        <UnicornCard
          v-for="(unicorn, index) in paginatedUnicorns"
          :key="unicorn._id"
          :unicorn="unicorn"
          :index="index + (currentPage - 1) * itemsPerPage"
          @edit="openUnicornPopup"
          @delete="deleteUnicorn"
        />
      </div>

      <CustomPagination
        v-if="!isLoading && !error"
        :totalPages="totalPages"
        :currentPage="currentPage"
        @page-change="changePage"
      />

      <UnicornFormPopup
        v-if="showUnicornPopup"
        :unicorn="editingUnicorn"
        @close="closeUnicornPopup"
        @save="saveUnicorn"
      />
    </div>
  </div>
</template>
