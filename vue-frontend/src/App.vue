<script setup lang="ts">
import { ref } from "vue"

import websitePage from "./components/modules/website.vue"
import topBar from "./components/molecules/top-bar.vue"
import signInPage from "./components/modules/signIn.vue"
import signUpPage from "./components/modules/signUp.vue"
import notFoundPage from "./components/modules/not-found.vue"

const routes: {[key: string]: any} = {
  "/": websitePage,
  "/sign-in": signInPage,
  "/sign-up": signUpPage,
  "/app": "",
}

const currentPath = ref(window.location.pathname)

window.addEventListener("popstate", () => {
  console.log("change", window.location.pathname)
  currentPath.value = window.location.pathname
})

const currentPage = routes[currentPath.value] || notFoundPage

</script>

<template>
  <topBar />
  <currentPage />
</template>

<style scoped>
</style>
