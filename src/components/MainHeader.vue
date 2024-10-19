<script setup>
import BoundingBoxIcon from '@/assets/icons/BoundingBoxIcon.vue'
import MenuIcon from '@/assets/icons/MenuIcon.vue'

const emit = defineEmits(['open-unicorn-popup', 'toggle-sidebar'])

const openCreatePopup = () => {
  emit('open-unicorn-popup')
}

const toggleSidebar = () => {
  emit('toggle-sidebar')
}
</script>

<template>
  <div class="flex justify-between items-center mb-6">
    <div class="flex items-center">
      <button @click="toggleSidebar" class="mr-4 md:hidden">
        <MenuIcon />
      </button>
      <h1
        class="text-2xl sm:text-[32px] hidden sm:block text-[#4D5959] font-bold"
      >
        Welcome John Doe
      </h1>
    </div>
    <button
      @click="openCreatePopup"
      class="bg-[#4E46B4] text-white rounded flex items-center py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base"
    >
      <BoundingBoxIcon class="w-5 h-5 sm:w-6 sm:h-6" />
      <span class="ml-2 font-bold">Create Unicorn</span>
    </button>
  </div>
</template>
