<script setup lang="ts">
import { ref } from "vue";
import iconVue from "../icons/logo.vue"
import iconUser from "../icons/user.vue"

const isDialogOpen = ref(false)
const dialogRef = ref(null)

function toogleDialog() {
  isDialogOpen.value = !isDialogOpen.value
}
</script>

<template>
  <header class="flex justify-between items-center p-4">
    <a href="/">
      <iconVue />
    </a>

    <div class="cursor-pointer relative">
      <div @click="toogleDialog">
        <iconUser />
      </div>

      <div 
        class="flex flex-col border absolute z-10 cursor-default top-[calc(100%_+4px)] right-0 py-2 rounded-md shadow-md"
        :class="{ flex: isDialogOpen, hidden: !isDialogOpen }"
        ref="dialogRef"
      >
        <a 
          class="duration-150 min-w-max px-4 py-2 bg-white hover:bg-zinc-200"
          href="/sign-in"
        >
          Sign-in
        </a>
      </div>
    </div>
  </header>
</template>

<style scoped></style>
