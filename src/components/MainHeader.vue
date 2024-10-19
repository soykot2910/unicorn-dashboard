<script setup>
import BoundingBoxIcon from '@/assets/icons/BoundingBoxIcon.vue'
import MenuIcon from '@/assets/icons/MenuIcon.vue'
import SortIcon from '@/assets/icons/SortIcon.vue'

const emit = defineEmits([
  'open-unicorn-popup',
  'toggle-sidebar',
  'change-sorting',
])

const openCreatePopup = () => emit('open-unicorn-popup')
const toggleSidebar = () => emit('toggle-sidebar')
const changeSorting = field => emit('change-sorting', field)
</script>

<template>
  <div
    class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6"
  >
    <div class="flex items-center mb-4 sm:mb-0">
      <button @click="toggleSidebar" class="mr-4 md:hidden">
        <MenuIcon />
      </button>
      <h1 class="md:text-2xl lg:text-3xl text-xl text-[#4D5959] font-bold">
        Welcome John Doe
      </h1>
    </div>
    <div class="flex items-center space-x-4">
      <div class="flex space-x-2">
        <button
          @click="changeSorting('name')"
          class="px-3 py-1 bg-gray-100 border border-[#595D62] rounded text-black text-sm font-bold flex items-center"
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
          class="px-3 py-1 bg-gray-100 border border-[#595D62] rounded text-black text-sm font-bold flex items-center"
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
        <BoundingBoxIcon class="w-5 h-5 sm:w-6 sm:h-6" />
        <span class="ml-2 font-bold">Create Unicorn</span>
      </button>
    </div>
  </div>
</template>
