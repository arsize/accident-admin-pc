<script setup lang="ts">
import GlobalMsg from "@/components/GlobalMsg.vue"

const n: Ref<any> = ref(null)

export type MsgEnum = "error" | "ok" | "warning" | "success"

provide("message", (msg: string, type: MsgEnum) => {
  n.value.open(msg, type)
})
</script>

<template>
  <NuxtLayout id="layout-box">
    <NuxtPage />
  </NuxtLayout>
  <global-msg ref="n" />
</template>
