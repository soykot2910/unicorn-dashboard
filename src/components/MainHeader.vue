<script setup>
import BoundingBoxIcon from '@/assets/icons/BoundingBoxIcon.vue'

const emit = defineEmits(['openCreatePopup'])

const openCreatePopup = () => {
  emit('openCreatePopup')
}
</script>

<template>
  <div class="flex justify-between items-center">
    <h1 class="text-[32px] text-[#4D5959] font-bold">Welcome John Doe</h1>
    <button
      @click="openCreatePopup"
      class="bg-[#4E46B4] text-white rounded flex items-center py-3 pl-3 pr-4"
    >
      <BoundingBoxIcon />
      <span class="ml-2 text-[16px] font-bold">Create Unicorn</span>
    </button>
  </div>
</template>
