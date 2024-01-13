<script setup lang="ts">
const { $wow } = useNuxtApp()

onMounted(() => {
  $wow().init()
})
</script>

<template>
  <div
    class="w-screen h-screen select-none overflow-y-scroll no-scrollbar"
    style="min-width: 1050px"
  >
    <TopNav />
    <slot></slot>
    <FooterNav />
  </div>
</template>

<style scoped></style>
