<script setup lang="ts">
import LoginPanel from "./LoginPanel.vue"
import { ref } from "vue"

const switchLocalePath = useSwitchLocalePath()
const route = useRoute()

// 登入
const showLoginPanel = ref(false)
const login = () => {
  showLoginPanel.value = true
}
const handleUpdate = (nmesg: boolean) => {
  showLoginPanel.value = nmesg
}

// 背景颜色
const bgColor = computed(() => {
  let rp = route.path
  if (rp.includes("service")) {
    return "#ecf8e8"
  } else if (rp.includes("legal")) {
    return "#FFFCF2"
  } else if (rp.includes("about")) {
    return "#F7F7F7"
  } else if (rp.includes("contact")) {
    return "#EEF8FE"
  } else if (rp.includes("appointment")) {
    return "#EEF8FE"
  } else {
    return "#eef8fe"
  }
})
</script>

<template>
  <header
    :style="`background-color:${bgColor}`"
    class="navbar h-28 px-10 box-border"
  >
    <div class="mx-auto container flex justify-between items-center py-6">
      <NuxtLink to="/">
        <img
          class="2xl:max-w-80 lg:max-w-60 max-w-52"
          src="~/assets/images/logo.png"
          alt=""
        />
      </NuxtLink>
      <div
        class="flex text-custom-blue items-center w-[70%] justify-between 2xl:text-xl xl:text-lg text-base font-normal"
      >
        <NuxtLink
          to="/service"
          :style="
            route.path.includes('service') ? 'background-color: #e0ebdd' : ''
          "
          class="cursor-pointer 2xl:py-3 2xl:px-8 py-2 px-5 rounded-full"
          >{{ $t("ScopeOfService") }}</NuxtLink
        >
        <NuxtLink
          to="/legal"
          :style="
            route.path.includes('legal') ? 'background-color: #f3efe6' : ''
          "
          class="cursor-pointer 2xl:py-3 2xl:px-8 py-2 px-5 rounded-full"
        >
          {{ $t("LegalKnowledge") }}
        </NuxtLink>
        <NuxtLink
          to="/about"
          :style="
            route.path.includes('about') ? 'background-color: #EAEAEA' : ''
          "
          class="cursor-pointer 2xl:py-3 2xl:px-8 py-2 px-5 rounded-full"
          >{{ $t("AboutTheCenter") }}</NuxtLink
        >
        <NuxtLink
          to="/contact"
          :style="
            route.path.includes('contact') ? 'background-color: #E2EBF1' : ''
          "
          class="cursor-pointer 2xl:py-3 2xl:px-8 py-2 px-5 rounded-full"
          >{{ $t("ContactUs") }}</NuxtLink
        >
        <NuxtLink
          to="/appointment"
          :style="
            route.path.includes('appointment')
              ? 'background-color: #E2EDF0'
              : ''
          "
          class="cursor-pointer 2xl:py-3 2xl:px-8 py-2 px-5 rounded-full"
          >{{ $t("AppointmentConsultation") }}</NuxtLink
        >
        <div @click="login" class="cursor-pointer">
          {{ $t("LogInAndRegister") }}
        </div>

        <!-- <div class="flex w-16 justify-between cursor-pointer ml-5">
          <NuxtLink :to="switchLocalePath('cn')">中</NuxtLink>
          <div class="font-normal">|</div>
          <NuxtLink
            class="font-normal text-gray-500"
            :to="switchLocalePath('en')"
          >
            英
          </NuxtLink>
        </div> -->
      </div>
    </div>
    <LoginPanel v-if="showLoginPanel" @update:showLoginPanel="handleUpdate" />
  </header>
</template>

<style lang="scss"></style>
