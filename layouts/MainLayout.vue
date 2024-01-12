<script setup lang="ts">
export interface Props {
  topNavBgColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  topNavBgColor: "#fff",
})

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
    <TopNav :topNavBgColor="props.topNavBgColor" />
    <div>
      <slot></slot>
    </div>
    <FooterNav />
  </div>
</template>

<style scoped></style>
