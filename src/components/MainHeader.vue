<script setup>
import BoundingBoxIcon from '@/assets/icons/BoundingBoxIcon.vue'
import SortIcon from '@/assets/icons/SortIcon.vue'
import MenuIcon from '@/assets/icons/MenuIcon.vue'
import { ref } from 'vue'

const emit = defineEmits([
  'open-unicorn-popup',
  'change-sorting',
  'toggle-sidebar',
])

const openCreatePopup = () => emit('open-unicorn-popup')
const toggleSidebar = () => emit('toggle-sidebar')

const activeSortField = ref(null)

const changeSorting = field => {
  activeSortField.value = field
  emit('change-sorting', field)
  setTimeout(() => {
    activeSortField.value = null
  }, 300) // Duration of the animation
}
</script>

<template>
  <div class="flex justify-between items-center mb-6">
    <div class="flex items-center">
      <button @click="toggleSidebar" class="mr-4 lg:hidden">
        <MenuIcon />
      </button>
      <h1
        class="hidden md:block text-xl lg:text-2xl xl:text-3xl text-[#4D5959] font-bold"
      >
        Welcome John Doe
      </h1>
    </div>
    <div class="flex items-center space-x-4">
      <div class="flex space-x-2">
        <button
          @click="changeSorting('name')"
          :class="[
            'px-3 py-1 bg-gray-100 border border-[#595D62] rounded text-black text-sm font-bold flex items-center transition-all duration-300',
            { 'animate-sort-pulse': activeSortField === 'name' },
          ]"
        >
          Name
          <SortIcon
            :class="[
              'ml-1',
              {
                'transform rotate-180':
                  sortField === 'name' && sortOrder === 'desc',
              },
            ]"
          />
        </button>
        <button
          @click="changeSorting('age')"
          :class="[
            'px-3 py-1 bg-gray-100 border border-[#595D62] rounded text-black text-sm font-bold flex items-center transition-all duration-300',
            { 'animate-sort-pulse': activeSortField === 'age' },
          ]"
        >
          Age
          <SortIcon
            :class="[
              'ml-1',
              {
                'transform rotate-180':
                  sortField === 'age' && sortOrder === 'desc',
              },
            ]"
          />
        </button>
      </div>
      <button
        @click="openCreatePopup"
        class="bg-[#4E46B4] text-white rounded flex items-center py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base"
      >
        <BoundingBoxIcon class="hidden md:block w-5 h-5 sm:w-6 sm:h-6" />
        <span class="ml-2 font-bold">Create Unicorn</span>
      </button>
    </div>
  </div>
</template>

<style>
@keyframes sort-pulse {
  0%,
  100% {
    transform: scale(1);
    background-color: #e5e7eb; /* gray-200 */
  }
  50% {
    transform: scale(1.05);
    background-color: #93c5fd; /* blue-300 */
  }
}

.animate-sort-pulse {
  animation: sort-pulse 0.3s ease-in-out;
}
</style>
