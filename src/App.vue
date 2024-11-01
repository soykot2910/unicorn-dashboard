<script setup>
import { onMounted, ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useUnicornStore } from '@/stores/unicornStore'
import SidebarMenu from './components/SidebarMenu.vue'
import MainHeader from './components/MainHeader.vue'
import UnicornCard from './components/UnicornCard.vue'
import CustomPagination from './components/CustomPagination.vue'
import LoadingIcon from './assets/icons/LoadingIcon.vue'
import UnicornFormPopup from './components/UnicornFormPopup.vue'

const toast = useToast()
const store = useUnicornStore()
const showUnicornPopup = ref(false)
const editingUnicorn = ref(null)
const isSidebarOpen = ref(false)

const openUnicornPopup = (unicorn = null) => {
  editingUnicorn.value = unicorn
  showUnicornPopup.value = true
}

const closeUnicornPopup = () => {
  showUnicornPopup.value = false
  editingUnicorn.value = null
}

const handleSave = async unicornData => {
  const success = await store.saveUnicorn(unicornData)
  if (success) {
    toast.success(
      `Unicorn ${unicornData._id ? 'updated' : 'created'} successfully!`,
    )
    closeUnicornPopup()
  } else {
    toast.error('Failed to save unicorn')
  }
}

const handleDelete = async id => {
  const success = await store.deleteUnicorn(id)
  if (success) {
    toast.success('Unicorn deleted successfully!')
  } else {
    toast.error('Failed to delete unicorn')
  }
}

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

onMounted(() => {
  store.fetchUnicorns()
  isSidebarOpen.value = window.innerWidth >= 1024
})
</script>

<template>
  <div class="flex flex-col lg:flex-row min-h-screen">
    <SidebarMenu
      :is-open="isSidebarOpen"
      @close="isSidebarOpen = false"
      class="lg:block"
    />

    <div class="flex-1 p-4 lg:p-6 bg-[#F6F6F6]">
      <MainHeader
        @open-unicorn-popup="openUnicornPopup()"
        @toggle-sidebar="toggleSidebar"
        @change-sorting="store.updateSort"
        :sort-field="store.sortField"
        :sort-order="store.sortOrder"
      />

      <div
        v-if="store.isLoading"
        class="mt-6 text-center h-64 flex items-center justify-center"
      >
        <LoadingIcon />
      </div>
      <div
        v-else-if="store.error"
        class="mt-56 flex items-center justify-center text-center text-red-500"
      >
        {{ store.error }}
      </div>
      <div
        v-else-if="!store.hasUnicorns"
        class="mt-6 flex items-center justify-center h-64"
      >
        <p class="text-center text-gray-500 text-lg">
          No unicorns found. Create a new unicorn to get started!
        </p>
      </div>
      <div v-else class="w-full mt-6 space-y-4">
        <UnicornCard
          v-for="(unicorn, index) in store.paginatedUnicorns"
          :key="unicorn._id"
          :unicorn="unicorn"
          :index="index + (store.currentPage - 1) * 5"
          @edit="openUnicornPopup"
          @delete="handleDelete"
        />
      </div>

      <CustomPagination
        v-if="!store.isLoading && !store.error && store.hasUnicorns"
        :totalPages="store.totalPages"
        :currentPage="store.currentPage"
        @page-change="store.updatePage"
      />

      <UnicornFormPopup
        v-if="showUnicornPopup"
        :unicorn="editingUnicorn"
        :isLoading="store.isCreating || store.isEditing"
        @close="closeUnicornPopup"
        @save="handleSave"
      />
    </div>
  </div>
</template>
