<script setup>
import SidebarMenu from './components/SidebarMenu.vue'
import MainHeader from './components/MainHeader.vue'
import UnicornCard from './components/UnicornCard.vue'
</script>

<template>
  <div class="flex">
    <SidebarMenu />

    <div class="flex-1 p-6 bg-[#F6F6F6]">
      <MainHeader />

      <!-- Unicorn List -->
      <div class="w-full mt-6">
        <UnicornCard />
      </div>

      <!-- Pagination -->
      <!-- <Pagination :totalPages="totalPages" :currentPage="currentPage" /> -->
    </div>
  </div>
</template>
