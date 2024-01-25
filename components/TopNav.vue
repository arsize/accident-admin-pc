<script setup lang="ts">
import LoginPanel from "./LoginPanel.vue"
import { useStore } from "~/store"
const localePath = useLocalePath()

const switchLocalePath = useSwitchLocalePath()
const route = useRoute()
const store = useStore()
const router = useRouter()

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
const goout = () => {
  store.token = ""
  router.push({
    path: "/",
  })
}
</script>

<template>
  <header
    :style="`background-color:${bgColor}`"
    class="navbar 2xl:h-28 h-20 px-10 box-border"
  >
    <div class="mx-auto container flex justify-between items-center h-full">
      <NuxtLink :to="localePath('/')">
        <img
          class="2xl:max-w-80 lg:max-w-60 max-w-48"
          src="~/assets/images/logo.png"
          alt=""
        />
      </NuxtLink>
      <div
        class="flex text-custom-blue items-center w-[70%] h-full justify-between 2xl:text-xl xl:text-lg text-base font-normal"
      >
        <NuxtLink
          :to="localePath('/service')"
          :style="
            route.path.includes('service') ? 'background-color: #e0ebdd' : ''
          "
          class="cursor-pointer 2xl:py-2 2xl:px-8 py-1.5 px-5 rounded-full"
          >{{ $t("ScopeOfService") }}</NuxtLink
        >
        <NuxtLink
          :to="localePath('/legal')"
          :style="
            route.path.includes('legal') ? 'background-color: #f3efe6' : ''
          "
          class="cursor-pointer 2xl:py-2 2xl:px-8 py-1.5 px-5 rounded-full"
        >
          {{ $t("LegalKnowledge") }}
        </NuxtLink>
        <NuxtLink
          :to="localePath('/about')"
          :style="
            route.path.includes('about') ? 'background-color: #EAEAEA' : ''
          "
          class="cursor-pointer 2xl:py-2 2xl:px-8 py-1.5 px-5 rounded-full"
          >{{ $t("AboutTheCenter") }}</NuxtLink
        >
        <NuxtLink
          :to="localePath('/contact')"
          :style="
            route.path.includes('contact') ? 'background-color: #E2EBF1' : ''
          "
          class="cursor-pointer 2xl:py-2 2xl:px-8 py-1.5 px-5 rounded-full"
          >{{ $t("ContactUs") }}</NuxtLink
        >
        <NuxtLink
          :to="localePath('/appointment')"
          :style="
            route.path.includes('appointment')
              ? 'background-color: #E2EDF0'
              : ''
          "
          class="cursor-pointer 2xl:py-2 2xl:px-8 py-1.5 px-5 rounded-full"
          >{{ $t("AppointmentConsultation") }}</NuxtLink
        >
        <div v-if="store.token" class="cursor-pointer">
          <UPopover>
            <div class="flex items-center">
              <div class="mr-2 cursor-pointer">
                {{ `你好, ${store.userInfo?.realName}` }}
              </div>
              <Icon name="i-heroicons-chevron-down-20-solid">j</Icon>
            </div>

            <template #panel>
              <div
                @click="goout"
                class="py-4 flex items-center justify-center cursor-pointer"
              >
                <div class="hover:bg-[#eee] px-3 py-1">退出</div>
              </div>
            </template>
          </UPopover>
        </div>
        <div class="cursor-pointer" @click="login" v-else>
          {{ $t("LogInAndRegister") }}
        </div>
        <!-- 
        <div class="flex w-16 justify-between cursor-pointer ml-5">
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
