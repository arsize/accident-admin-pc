<template>
  <div class="loading-indicator" :class="{ show: isLoading }"></div>
</template>

<script setup>
const nuxtApp = useNuxtApp()
const isLoading = ref(false)

nuxtApp.hook("page:start", () => {
  isLoading.value = true
})

nuxtApp.hook("page:finish", () => {
  setTimeout(() => {
    isLoading.value = false
  }, 200)
})
</script>

<style lang="scss" scoped>
.loading-indicator {
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  position: absolute;
  top: 50%;
  left: 50%;

  &.show {
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
  }
}
</style>
