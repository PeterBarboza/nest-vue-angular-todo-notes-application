<script setup lang="ts">
import { ref } from 'vue';

const emailValue = ref("")
const passwordValue = ref("")

function onSubmit() {
  console.log(emailValue.value)
  console.log(passwordValue.value)
}

</script>

<template>
  <div class="w-full min-h-[calc(100vh_-_60px)] flex justify-center items-center">
    <form 
      class="w-full max-w-lg flex flex-col gap-2 p-8 border border-zinc-400 rounded-lg"
      @submit.prevent="onSubmit"
    >
      <div class="w-full flex flex-col gap-1">
        <label for="">E-mail</label>
        <input 
          class="w-full p-2 rounded-md border border-zinc-400" 
          v-model="emailValue"
        />
      </div>
      <div class="w-full flex flex-col gap-1">
        <label for="">Password</label>
        <input 
          class="w-full p-2 rounded-md border border-zinc-400" 
          v-model="passwordValue"
        />
      </div>

      <div class="w-full flex justify-center">
        <a class="text-green-600" href="/sign-up">Sign-Up</a>
      </div>

      <input class="w-full bg-green-600 p-2 rounded-md mt-8 text-white font-bold" type="submit">
    </form>
  </div>
</template>
