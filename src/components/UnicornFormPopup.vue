<script setup>
import { ref, computed, watch } from 'vue'
import CloseIcon from '@/assets/icons/CloseIcon.vue'
import { getUnicornStatus } from '@/utils/unicornUtils'

const props = defineProps({
  unicorn: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['close', 'save'])

const name = ref('')
const age = ref('')
const color = ref('')

const isEditing = computed(() => !!props.unicorn)
const title = computed(() =>
  isEditing.value ? 'Edit Unicorn' : 'Create Unicorn',
)
const buttonText = computed(() => (isEditing.value ? 'Update' : 'Create'))

const status = computed(() => getUnicornStatus(age.value))

const resetForm = () => {
  name.value = ''
  age.value = ''
  color.value = ''
}

const saveUnicorn = () => {
  if (name.value && age.value && color.value) {
    const unicornData = {
      doctor_name: name.value,
      age: parseInt(age.value),
      color: color.value,
      status: status.value,
    }
    if (isEditing.value) {
      unicornData._id = props.unicorn._id
    }
    emit('save', unicornData)
    resetForm()
  }
}

const closePopup = () => {
  resetForm()
  emit('close')
}

watch(
  () => props.unicorn,
  newUnicorn => {
    if (newUnicorn) {
      name.value = newUnicorn.doctor_name
      age.value = newUnicorn.age.toString()
      color.value = newUnicorn.color
    } else {
      resetForm()
    }
  },
  { immediate: true },
)
</script>

<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg p-6 w-[400px]">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold text-[#4D5959]">{{ title }}</h2>
        <button @click="closePopup" class="text-gray-500 hover:text-gray-700">
          <CloseIcon />
        </button>
      </div>
      <form @submit.prevent="saveUnicorn">
        <div class="mb-4">
          <label
            for="name"
            class="block text-sm font-medium text-[#4D5959] mb-1"
            >Name</label
          >
          <input
            v-model="name"
            type="text"
            id="name"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter unicorn name"
          />
        </div>
        <div class="mb-4">
          <label for="age" class="block text-sm font-medium text-[#4D5959] mb-1"
            >Age</label
          >
          <input
            v-model="age"
            type="number"
            id="age"
            required
            min="0"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter unicorn age"
          />
        </div>
        <div class="mb-6">
          <label
            for="color"
            class="block text-sm font-medium text-[#4D5959] mb-1"
            >Color</label
          >
          <input
            v-model="color"
            type="text"
            id="color"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter unicorn color"
          />
        </div>
        <div class="flex justify-end space-x-2">
          <button
            type="button"
            @click="closePopup"
            class="px-4 py-2 border border-gray-300 rounded-md text-[#4D5959] hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-[#4E46B4] text-white rounded-md hover:bg-[#3d37a3]"
          >
            {{ buttonText }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
