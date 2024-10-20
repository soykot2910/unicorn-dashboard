<script setup>
import { ref, watch } from 'vue'
import AnalyticsIcon from '@/assets/icons/AnalyticsIcon.vue'
import MainLogo from '@/assets/icons/MainLogo.vue'
import GroupIcon from '@/assets/icons/GroupIcon.vue'
import FolderIcon from '@/assets/icons/FolderIcon.vue'
import CalendarIcon from '@/assets/icons/CalendarIcon.vue'
import DocumentIcon from '@/assets/icons/DocumentIcon.vue'
import ProgressIndicatorIcon from '@/assets/icons/ProgressIndicatorIcon.vue'
import DIcon from '@/assets/icons/DIcon.vue'
import EIcon from '@/assets/icons/EIcon.vue'
import SpreadsheetIcon from '@/assets/icons/SpreadsheetIcon.vue'
import CloseIcon from '@/assets/icons/CloseIcon.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close'])

const isVisible = ref(props.isOpen)
const selectedItem = ref('Dashboard')

watch(
  () => props.isOpen,
  newValue => {
    isVisible.value = newValue
  },
)

const closeSidebar = () => emit('close')

const menuItems = [
  { icon: AnalyticsIcon, text: 'Dashboard' },
  { icon: GroupIcon, text: 'Team' },
  { icon: FolderIcon, text: 'Project' },
  { icon: CalendarIcon, text: 'Calendar' },
  { icon: DocumentIcon, text: 'Documents' },
  { icon: ProgressIndicatorIcon, text: 'Report' },
]

const teamItems = [
  { icon: DIcon, text: 'Design' },
  { icon: EIcon, text: 'Engineering' },
]

const reportItems = [
  { icon: SpreadsheetIcon, text: 'Month to Date' },
  { icon: SpreadsheetIcon, text: 'Year to Date' },
]

const selectItem = item => {
  selectedItem.value = item
}
</script>

<template>
  <div
    :class="[
      'fixed inset-y-0 left-0 z-30 w-64 bg-white text-black p-4 md:p-11 transition-transform duration-300 ease-in-out transform md:relative md:translate-x-0',
      isVisible ? 'translate-x-0' : '-translate-x-full',
    ]"
  >
    <button @click="closeSidebar" class="absolute top-4 right-4 md:hidden">
      <CloseIcon />
    </button>
    <div class="pb-6">
      <MainLogo class="w-full max-w-[150px]" />
    </div>
    <nav>
      <ul class="space-y-2">
        <li v-for="item in menuItems" :key="item.text">
          <a
            href="#"
            @click.prevent="selectItem(item.text)"
            :class="[
              'py-2 flex items-center px-4',
              selectedItem === item.text ? 'bg-gray-100 rounded-md' : '',
            ]"
          >
            <component :is="item.icon" />
            <span
              :class="[
                'ml-2 text-[14px]',
                selectedItem === item.text ? 'font-bold' : 'font-regular',
              ]"
            >
              {{ item.text }}
            </span>
          </a>
        </li>
      </ul>
    </nav>

    <div class="mt-6 px-4">
      <h3 class="text-[#595D62] text-[14px] font-normal mb-2">Your Teams</h3>
      <ul class="space-y-2">
        <li v-for="item in teamItems" :key="item.text">
          <a
            href="#"
            @click.prevent="selectItem(item.text)"
            :class="[
              'py-2 flex items-center',
              selectedItem === item.text ? 'bg-gray-100 rounded-md' : '',
            ]"
          >
            <component :is="item.icon" />
            <span
              :class="[
                'ml-2 text-[14px]',
                selectedItem === item.text ? 'font-bold' : 'font-regular',
              ]"
            >
              {{ item.text }}
            </span>
          </a>
        </li>
      </ul>
    </div>

    <div class="mt-6 px-4">
      <h3 class="text-[#595D62] text-[14px] font-normal mb-2">Reports</h3>
      <ul class="space-y-2">
        <li v-for="item in reportItems" :key="item.text">
          <a
            href="#"
            @click.prevent="selectItem(item.text)"
            :class="[
              'py-2 flex items-center',
              selectedItem === item.text ? 'bg-gray-100 rounded-md' : '',
            ]"
          >
            <component :is="item.icon" />
            <span
              :class="[
                'ml-2 text-[14px]',
                selectedItem === item.text ? 'font-bold' : 'font-regular',
              ]"
            >
              {{ item.text }}
            </span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
