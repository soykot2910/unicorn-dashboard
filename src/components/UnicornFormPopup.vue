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

const errors = ref({
  name: '',
  age: '',
  color: '',
})

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
  errors.value = { name: '', age: '', color: '' }
}

const validateForm = () => {
  let isValid = true
  errors.value = { name: '', age: '', color: '' }

  if (!name.value.trim()) {
    errors.value.name = 'Name is required'
    isValid = false
  } else if (name.value.length < 2 || name.value.length > 50) {
    errors.value.name = 'Name must be between 2 and 50 characters'
    isValid = false
  }

  if (!age.value) {
    errors.value.age = 'Age is required'
    isValid = false
  } else if (isNaN(age.value) || age.value < 0 || age.value > 100) {
    errors.value.age = 'Age must be a number between 0 and 100'
    isValid = false
  }

  if (!color.value.trim()) {
    errors.value.color = 'Color is required'
    isValid = false
  } else if (color.value.length < 3 || color.value.length > 20) {
    errors.value.color = 'Color must be between 3 and 20 characters'
    isValid = false
  }

  return isValid
}

const saveUnicorn = () => {
  if (validateForm()) {
    const unicornData = {
      doctor_name: name.value.trim(),
      age: parseInt(age.value),
      color: color.value.trim(),
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
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
  >
    <div class="bg-white rounded-lg p-4 sm:p-6 w-full max-w-[400px]">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl sm:text-2xl font-bold text-[#4D5959]">
          {{ title }}
        </h2>
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
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            :class="{ 'border-red-500': errors.name }"
            placeholder="Enter unicorn name"
          />
          <p v-if="errors.name" class="mt-1 text-red-500 text-xs">
            {{ errors.name }}
          </p>
        </div>
        <div class="mb-4">
          <label for="age" class="block text-sm font-medium text-[#4D5959] mb-1"
            >Age</label
          >
          <input
            v-model="age"
            type="number"
            id="age"
            min="0"
            max="1000"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            :class="{ 'border-red-500': errors.age }"
            placeholder="Enter unicorn age"
          />
          <p v-if="errors.age" class="mt-1 text-red-500 text-xs">
            {{ errors.age }}
          </p>
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
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            :class="{ 'border-red-500': errors.color }"
            placeholder="Enter unicorn color"
          />
          <p v-if="errors.color" class="mt-1 text-red-500 text-xs">
            {{ errors.color }}
          </p>
        </div>
        <div
          class="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2"
        >
          <button
            type="button"
            @click="closePopup"
            class="px-4 py-2 border border-gray-300 rounded-md text-[#4D5959] hover:bg-gray-100 w-full sm:w-auto"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-[#4E46B4] text-white rounded-md hover:bg-[#3d37a3] w-full sm:w-auto"
          >
            {{ buttonText }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
