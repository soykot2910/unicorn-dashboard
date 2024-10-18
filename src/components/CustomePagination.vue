<script setup>
import { computed } from 'vue'
import ChevronLeftIcon from '@/assets/icons/ChevronLeftIcon.vue'
import ChevronRightIcon from '@/assets/icons/ChevronRightIcon.vue'

const props = defineProps({
  totalPages: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['page-change'])

const pages = computed(() => {
  const range = []
  for (let i = 1; i <= props.totalPages; i++) {
    range.push(i)
  }
  return range
})

const changePage = page => {
  if (page !== props.currentPage && page >= 1 && page <= props.totalPages) {
    emit('page-change', page)
  }
}

const isFirstPage = computed(() => props.currentPage === 1)
const isLastPage = computed(() => props.currentPage === props.totalPages)
</script>

<template>
  <div class="flex justify-center items-center space-x-2 mt-6">
    <button
      @click="changePage(currentPage - 1)"
      :disabled="isFirstPage"
      :class="[
        'p-2 rounded',
        isFirstPage
          ? 'text-gray-400 cursor-not-allowed'
          : 'text-blue-500 hover:bg-blue-100',
      ]"
    >
      <ChevronLeftIcon />
    </button>

    <button
      v-for="page in pages"
      :key="page"
      @click="changePage(page)"
      :class="[
        'px-3 py-1 rounded',
        page === currentPage
          ? 'bg-blue-500 text-white'
          : 'bg-white text-blue-500 hover:bg-blue-100',
      ]"
    >
      {{ page }}
    </button>

    <button
      @click="changePage(currentPage + 1)"
      :disabled="isLastPage"
      :class="[
        'p-2 rounded',
        isLastPage
          ? 'text-gray-400 cursor-not-allowed'
          : 'text-blue-500 hover:bg-blue-100',
      ]"
    >
      <ChevronRightIcon />
    </button>
  </div>
</template>
