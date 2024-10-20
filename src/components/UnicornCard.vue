<script setup>
import { ref, computed } from 'vue'
import { useToast } from 'vue-toastification'
import DeleteIcon from '@/assets/icons/DeleteIcon.vue'
import ArrowUpIcon from '@/assets/icons/ArrowUpIcon.vue'
import ArrowDownIcon from '@/assets/icons/ArrowDownIcon.vue'
import { getUnicornStatus } from '@/utils/unicornUtils'
import DeleteConfirmationModal from './DeleteConfirmationModal.vue'
import LoadingIcon from '@/assets/icons/LoadingIcon.vue'

const toast = useToast()

const props = defineProps({
  unicorn: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  isDeleting: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['edit', 'delete'])

const isOpen = ref(false)

const toggleAccordion = () => {
  isOpen.value = !isOpen.value
}

const indicatorColor = computed(() => {
  const colors = ['#66368C', '#40A69F', '#2E7D32', '#FFB319']
  return colors[props.index % colors.length]
})

const status = computed(() => getUnicornStatus(props.unicorn.age))

const statusBadgeClass = computed(() => {
  switch (status.value) {
    case '👶 Baby Unicorn':
      return 'bg-[#FEF3C7] text-[#92400E]'
    case '🦄 Mature Unicorn':
      return 'bg-blue-100 text-[#2E7D32]'
    case '👴 Old Unicorn':
      return 'bg-purple-100 text-[#5C33CF]'
    default:
      return 'bg-gray-100 text-gray-800'
  }
})

const editUnicorn = () => {
  emit('edit', props.unicorn)
}

const showDeleteModal = ref(false)

const deleteUnicorn = () => {
  if (!props.isDeleting) {
    showDeleteModal.value = true
  }
}

const confirmDelete = () => {
  emit('delete', props.unicorn._id)
  toast.info(`Deleting ${props.unicorn.name}...`)
  showDeleteModal.value = false
}

const cancelDelete = () => {
  showDeleteModal.value = false
}
</script>

<template>
  <article class="bg-white rounded-xl shadow-sm p-4 relative overflow-hidden">
    <div
      class="absolute left-0 top-0 bottom-0 w-[6px]"
      :style="{ backgroundColor: indicatorColor }"
    ></div>
    <header
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center"
    >
      <dl
        class="flex flex-wrap items-start justify-between w-full sm:w-[60%] mb-4 sm:mb-0"
      >
        <div class="flex flex-col items-center mb-2 sm:mb-0">
          <dt class="text-sm font-normal text-[#838383]">No</dt>
          <dd class="text-base font-bold text-[#393F4C]">
            {{ props.index + 1 }}
          </dd>
        </div>
        <div class="mb-2 sm:mb-0">
          <dt class="text-sm font-normal text-[#838383]">Doctor Name</dt>
          <dd class="text-base font-bold text-[#393F4C]">
            {{ unicorn.name }}
          </dd>
        </div>
        <div class="mb-2 sm:mb-0">
          <dt class="text-sm font-normal text-[#838383]">Age</dt>
          <dd class="text-base font-bold text-[#393F4C]">{{ unicorn.age }}</dd>
        </div>
        <div class="mb-2 sm:mb-0">
          <dt class="text-sm font-normal text-[#838383]">Color</dt>
          <dd class="text-base font-bold text-[#393F4C]">
            {{ unicorn.color }}
          </dd>
        </div>
        <div class="mb-2 sm:mb-0">
          <dt class="text-sm font-normal text-[#838383]">Status</dt>
          <dd>
            <span
              :class="[
                'text-sm font-bold px-3 py-1.5 rounded-xl',
                statusBadgeClass,
              ]"
            >
              {{ status }}
            </span>
          </dd>
        </div>
      </dl>

      <div class="flex justify-end items-center space-x-2">
        <button
          @click="editUnicorn"
          class="px-3 py-1 w-[52px] h-[32px] bg-white border-[1px] border-black rounded-lg text-black text-sm font-bold"
          :disabled="props.isDeleting"
        >
          Edit
        </button>
        <button
          @click="deleteUnicorn"
          class="p-1"
          aria-label="Delete"
          :disabled="props.isDeleting"
        >
          <LoadingIcon v-if="props.isDeleting" class="h-5 w-5" />
          <DeleteIcon v-else />
        </button>
      </div>
    </header>

    <button
      v-if="!isOpen"
      @click="toggleAccordion"
      class="mt-4 text-sm font-bold text-[#595D62] flex items-center justify-end w-full"
      :aria-expanded="isOpen"
    >
      <span>Show details</span>
      <span class="ml-2">
        <ArrowDownIcon />
      </span>
    </button>

    <transition name="fade">
      <section v-if="isOpen" class="mt-4 bg-[#eae9f6] p-4 rounded-lg">
        <div class="text-center">
          <div class="text-purple-600 text-2xl" aria-hidden="true">⚙️</div>
          <p class="mt-2 text-gray-600">
            {{ unicorn.description || 'No additional details available.' }}
          </p>
        </div>
      </section>
    </transition>

    <button
      v-if="isOpen"
      @click="toggleAccordion"
      class="mt-4 text-sm font-bold text-[#595D62] flex items-center justify-end w-full"
      :aria-expanded="isOpen"
    >
      <span>Hide details</span>
      <span class="ml-2">
        <ArrowUpIcon />
      </span>
    </button>

    <DeleteConfirmationModal
      v-if="showDeleteModal"
      :unicorn-name="unicorn.name"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </article>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
