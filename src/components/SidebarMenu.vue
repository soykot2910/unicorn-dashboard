<script setup>
import { ref } from 'vue'
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

const isOpen = ref(true)

// We'll keep this function, but mark it as unused for now
// eslint-disable-next-line no-unused-vars
const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div>
    <!-- Sidebar -->
    <div
      :class="[
        'bg-white text-black h-screen p-12 transition-all duration-300 ease-in-out',
        isOpen ? 'w-64' : 'w-0 overflow-hidden',
      ]"
    >
      <div class="pb-6">
        <MainLogo />
      </div>
      <nav>
        <ul>
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
        <h3 class="text-[#595D62] text-[14px] font-regular mb-2">Your Teams</h3>
        <ul>
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
        <h3 class="text-[#595D62] text-[14px] font-regular mb-2">Reports</h3>
        <ul>
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
  </div>
</template>
