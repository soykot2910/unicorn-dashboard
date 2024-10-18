<script setup>
import { ref } from 'vue'
import DeleteIcon from '@/assets/icons/DeleteIcon.vue'
import ArrowUpIcon from '@/assets/icons/ArrowUpIcon.vue'
import ArrowDownIcon from '@/assets/icons/ArrowDownIcon.vue'

const isOpen = ref(false)

const toggleAccordion = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <article class="bg-white rounded-lg shadow-sm p-4">
    <header class="flex justify-between items-center">
      <dl class="flex items-center justify-between w-[50%]">
        <div class="flex flex-col items-center">
          <dt class="text-sm font-normal text-[#838383]">No</dt>
          <dd class="text-base font-bold text-[#393F4C]">1</dd>
        </div>
        <div>
          <dt class="text-sm font-normal text-[#838383]">Doctor Name</dt>
          <dd class="text-base font-bold text-[#393F4C]">Sparkle Angel</dd>
        </div>
        <div>
          <dt class="text-sm font-normal text-[#838383]">Age</dt>
          <dd class="text-base font-bold text-[#393F4C]">3</dd>
        </div>
        <div>
          <dt class="text-sm font-normal text-[#838383]">Status</dt>
          <dd>
            <span
              class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
              >Baby Unicorn</span
            >
          </dd>
        </div>
      </dl>

      <div class="flex space-x-2">
        <button
          class="px-3 py-1 bg-gray-100 border border-[#595D62] rounded text-black text-sm font-bold"
        >
          Edit
        </button>
        <button class="p-1" aria-label="Delete">
          <DeleteIcon />
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
            The body copy explains the empty state.<br />
            The icon relates to the situation.
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
