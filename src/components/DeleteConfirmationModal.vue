<script setup>
defineProps({
  unicornName: {
    type: String,
    required: true,
  },
})

defineEmits(['confirm', 'cancel'])
</script>

<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg p-6 max-w-sm w-full">
      <h2 class="text-xl font-bold mb-4">Confirm Deletion</h2>
      <p class="mb-6">Are you sure you want to delete {{ unicornName }}?</p>
      <div class="flex justify-end space-x-4">
        <button
          @click="$emit('cancel')"
          class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          @click="$emit('confirm')"
          class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
