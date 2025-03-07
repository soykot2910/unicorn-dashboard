<script setup>
import { ref, computed, watch } from 'vue'
import CloseIcon from '@/assets/icons/CloseIcon.vue'
import LoadingIcon from '@/assets/icons/LoadingIcon.vue'

// Props and emits
const props = defineProps({
  unicorn: {
    type: Object,
    default: null,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close', 'save'])

// Form data
const name = ref('')
const age = ref('')
const color = ref('')

// Form errors
const errors = ref({
  name: '',
  age: '',
  color: '',
})

// Computed properties
const isEditing = computed(() => !!props.unicorn)
const title = computed(() =>
  isEditing.value ? 'Edit Unicorn' : 'Create Unicorn',
)
const buttonText = computed(() => (isEditing.value ? 'Update' : 'Create'))

const validateForm = () => {
  let isValid = true
  errors.value = { name: '', age: '', color: '' }

  // Validate name
  if (!name.value.trim()) {
    errors.value.name = 'Name is required'
    isValid = false
  } else if (name.value.length < 2 || name.value.length > 50) {
    errors.value.name = 'Name must be between 2 and 50 characters'
    isValid = false
  }

  // Validate age
  if (!age.value) {
    errors.value.age = 'Age is required'
    isValid = false
  } else if (isNaN(age.value) || age.value < 0 || age.value > 100) {
    errors.value.age = 'Age must be a number between 0 and 100'
    isValid = false
  }

  // Validate color
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
      name: name.value.trim(),
      age: parseInt(age.value),
      color: color.value.trim(),
      //status: status.value,
    }
    if (isEditing.value) {
      unicornData._id = props.unicorn._id
    }
    emit('save', unicornData)
  }
}

const closePopup = () => {
  emit('close')
}

// Watch for changes in the unicorn prop
watch(
  () => props.unicorn,
  newUnicorn => {
    if (newUnicorn) {
      name.value = newUnicorn.name
      age.value = newUnicorn.age.toString()
      color.value = newUnicorn.color
    } else {
      name.value = ''
      age.value = ''
      color.value = ''
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
        <!-- Name input -->
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
            pattern="[A-Za-z\s-]+"
            @input="name = $event.target.value.replace(/[^A-Za-z\s-]/g, '')"
          />
          <p v-if="errors.name" class="mt-1 text-red-500 text-xs">
            {{ errors.name }}
          </p>
        </div>

        <!-- Age input -->
        <div class="mb-4">
          <label for="age" class="block text-sm font-medium text-[#4D5959] mb-1"
            >Age</label
          >
          <input
            v-model="age"
            type="number"
            id="age"
            min="0"
            max="100"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            :class="{ 'border-red-500': errors.age }"
            placeholder="Enter unicorn age"
          />
          <p v-if="errors.age" class="mt-1 text-red-500 text-xs">
            {{ errors.age }}
          </p>
        </div>

        <!-- Color input -->
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
            pattern="[A-Za-z\s-]+"
            @input="color = $event.target.value.replace(/[^A-Za-z\s-]/g, '')"
          />
          <p v-if="errors.color" class="mt-1 text-red-500 text-xs">
            {{ errors.color }}
          </p>
        </div>

        <!-- Form actions -->
        <div
          class="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2"
        >
          <button
            type="button"
            @click="closePopup"
            class="px-4 py-2 border border-black rounded-md font-bold text-black hover:bg-gray-100 w-full sm:w-auto"
            :disabled="props.isLoading"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-[#4E46B4] text-white rounded-md font-bold hover:bg-[#3d37a3] w-full sm:w-auto flex items-center justify-center"
            :disabled="props.isLoading"
          >
            <LoadingIcon v-if="props.isLoading" class="mr-2 h-5 w-5" />
            {{ props.isLoading ? 'Processing...' : buttonText }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
