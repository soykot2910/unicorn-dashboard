<script setup>
import { ref, computed, onMounted } from 'vue'
import SidebarMenu from './components/SidebarMenu.vue'
import MainHeader from './components/MainHeader.vue'
import UnicornCard from './components/UnicornCard.vue'
import CustomePagination from './components/CustomePagination.vue'
const unicorns = ref([])
const isLoading = ref(true)
const error = ref(null)
const currentPage = ref(1)
const itemsPerPage = 5

const fetchUnicorns = async () => {
  try {
    const response = await fetch(
      'https://crudcrud.com/api/b6903567853741d68dd8f8cfe8fe8c54/unicorns',
    )
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

onMounted(() => {
  fetchUnicorns()
})
</script>

<template>
  <div class="flex">
    <SidebarMenu />

    <div class="flex-1 p-6 bg-[#F6F6F6]">
      <MainHeader />

      <!-- Unicorn List -->
      <div v-if="isLoading" class="mt-6 text-center">Loading...</div>
      <div v-else-if="error" class="mt-6 text-center text-red-500">
        {{ error }}
      </div>
      <div v-else class="w-full mt-6 space-y-4">
        <UnicornCard
          v-for="(unicorn, index) in paginatedUnicorns"
          :key="unicorn._id"
          :unicorn="unicorn"
          :index="index + (currentPage - 1) * itemsPerPage"
        />
      </div>

      <!-- Pagination -->
      <CustomePagination
        v-if="!isLoading && !error"
        :totalPages="totalPages"
        :currentPage="currentPage"
        @page-change="changePage"
      />
    </div>
  </div>
</template>
