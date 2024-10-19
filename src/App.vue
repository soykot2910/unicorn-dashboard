<script setup>
import { ref, computed, onMounted } from 'vue'
import SidebarMenu from './components/SidebarMenu.vue'
import MainHeader from './components/MainHeader.vue'
import UnicornCard from './components/UnicornCard.vue'
import CustomPagination from './components/CustomPagination.vue'
import LoadingIcon from './assets/icons/LoadingIcon.vue'
import UnicornFormPopup from './components/UnicornFormPopup.vue'

const unicorns = ref([])
const isLoading = ref(true)
const error = ref(null)
const currentPage = ref(1)
const itemsPerPage = 5
const showUnicornPopup = ref(false)
const editingUnicorn = ref(null)

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
    } else {
      const index = unicorns.value.findIndex(u => u._id === unicornData._id)
      if (index !== -1) {
        unicorns.value[index] = { ...unicorns.value[index], ...unicornData }
      }
    }
    closeUnicornPopup()
  } catch (err) {
    error.value = err.message
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

const totalPages = computed(() =>
  Math.ceil(unicorns.value.length / itemsPerPage),
)

const paginatedUnicorns = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return unicorns.value.slice(start, end)
})

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
  } catch (err) {
    error.value = err.message
  }
}

const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
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
