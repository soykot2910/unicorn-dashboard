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

watch(
  () => props.isOpen,
  newValue => {
    isVisible.value = newValue
  },
)

const closeSidebar = () => {
  emit('close')
}
</script>

<template>
  <div
    :class="[
      'fixed inset-y-0 left-0 z-30 w-32 bg-white text-black p-4 md:p-12 transition-transform duration-300 ease-in-out transform md:relative md:translate-x-0',
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
        <li>
          <a href="#" class="py-2 flex items-center">
            <AnalyticsIcon />
            <span class="ml-2 text-[14px] font-regular">Dashboard</span>
          </a>
        </li>
        <li>
          <a href="#" class="py-2 flex items-center">
            <GroupIcon />
            <span class="ml-2 text-[14px] font-regular">Team</span>
          </a>
        </li>
        <li>
          <a href="#" class="py-2 flex items-center">
            <FolderIcon />
            <span class="ml-2 text-[14px] font-regular">Project</span>
          </a>
        </li>
        <li>
          <a href="#" class="py-2 flex items-center">
            <CalendarIcon />
            <span class="ml-2 text-[14px] font-regular">Calendar</span>
          </a>
        </li>
        <li>
          <a href="#" class="py-2 flex items-center">
            <DocumentIcon />
            <span class="ml-2 text-[14px] font-regular">Documents</span>
          </a>
        </li>
        <li>
          <a href="#" class="py-2 flex items-center">
            <ProgressIndicatorIcon />
            <span class="ml-2 text-[14px] font-regular">Report</span>
          </a>
        </li>
      </ul>
    </nav>

    <div class="mt-6">
      <h3 class="text-[#595D62] text-[14px] font-normal mb-2">Your Teams</h3>
      <ul class="space-y-2">
        <li>
          <a href="#" class="py-2 flex items-center">
            <DIcon />
            <span class="ml-2 text-[14px] font-regular">Design</span>
          </a>
        </li>
        <li>
          <a href="#" class="py-2 flex items-center">
            <EIcon />
            <span class="ml-2 text-[14px] font-regular">Engineering</span>
          </a>
        </li>
      </ul>
    </div>

    <div class="mt-6">
      <h3 class="text-[#595D62] text-[14px] font-normal mb-2">Reports</h3>
      <ul class="space-y-2">
        <li>
          <a href="#" class="py-2 flex items-center">
            <SpreadsheetIcon />
            <span class="ml-2 text-[14px] font-regular">Month to Date</span>
          </a>
        </li>
        <li>
          <a href="#" class="py-2 flex items-center">
            <SpreadsheetIcon />
            <span class="ml-2 text-[14px] font-regular">Year to Date</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
