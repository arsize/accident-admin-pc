<script setup lang="ts">
// const switchLocalePath = useSwitchLocalePath()
import type { Props } from "~/layouts/MainLayout.vue"
import LoginPanel from "./LoginPanel.vue"
import { ref } from "vue"

const props = withDefaults(defineProps<Props>(), {
  topNavBgColor: "#fff",
})

// 登入
const showLoginPanel = ref(false)
const login = () => {
  showLoginPanel.value = true
}
const handleUpdate = (nmesg: boolean) => {
  showLoginPanel.value = nmesg
}
</script>

<template>
  <header
    :style="`background-color:${props.topNavBgColor}`"
    class="navbar h-24 px-10 box-border"
  >
    <div class="mx-auto container flex justify-between items-center py-5">
      <NuxtLink to="/">
        <img
          class="2xl:max-w-80 lg:max-w-60 max-w-52"
          src="~/assets/images/logo.png"
          alt=""
        />
      </NuxtLink>
      <div
        class="flex text-custom-blue items-center w-[70%] justify-between 2xl:text-2xl xl:text-lg md:text-base font-normal"
      >
        <div class="cursor-pointer">{{ $t("ScopeOfService") }}</div>
        <div class="cursor-pointer">{{ $t("LegalKnowledge") }}</div>
        <div class="cursor-pointer">{{ $t("AboutTheCenter") }}</div>
        <div class="cursor-pointer">{{ $t("ContactUs") }}</div>
        <div class="cursor-pointer">{{ $t("AppointmentConsultation") }}</div>
        <div @click="login" class="cursor-pointer">
          {{ $t("LogInAndRegister") }}
        </div>

        <!-- <div class="flex w-16 justify-between cursor-pointer">
                <NuxtLink :to="switchLocalePath('cn')">中</NuxtLink>
                <div class="font-normal">|</div>
                <NuxtLink class="font-normal text-gray-500" :to="switchLocalePath('en')">
                    英
                </NuxtLink>

            </div> -->
      </div>
    </div>
  </header>
  <LoginPanel v-if="showLoginPanel" @update:showLoginPanel="handleUpdate" />
</template>
