<script setup lang="ts">
import LoginPanel from "@/components/LoginPanel.vue"
import { useStore } from "~/store"
const store = useStore()

useHead({
  title: "预约咨询-交通意外伤亡及工业伤亡支援中心",
  meta: [],
  bodyAttrs: {},
  script: [],
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
  <div>
    <div
      class="bg-[#EEF8FE] 2xl:h-64 h-48 2xl:text-6xl text-5xl p text-custom-blue font-semibold font-NotoHk tracking-widest flex items-center"
    >
      <div class="container mx-auto pl-5">預約咨詢</div>
    </div>
    <div class="bottom-round-bar"></div>
    <div v-if="!store.token">
      <div
        class="2xl:w-[800px] w-[800px] mx-auto mt-20 text-xl font-light tracking-widest flex justify-center"
      >
        歡迎你來預約咨詢，請先登入後或註冊後再進行預約
      </div>
      <div
        @click="login"
        class="w-[200px] bg-[#DFEDDA] hover:bg-[#E5F4E2] rounded-xl h-10 flex justify-center items-center mx-auto 2xl:mt-20 mt-14 cursor-pointer"
      >
        登入/登記
      </div>
    </div>
    <div v-else class="flex container justify-between mx-auto mt-[80px] px-5">
      <div class="left w-1/4" v-if="store.userInfo">
        <div class="text-2xl font-semibold mb-5">
          你好，{{ `${store.userInfo.firstName}先生` }}
        </div>
        <div>
          歡迎你來預約諮詢。請填寫右方表格進
          行預約，當我方接收到你的預約訊息時，
          會再聯絡你確實預約詳情。你亦可前往
          <span class="text-custom-blue font-bold cursor-pointer"
            >管理預約申請&nbsp;</span
          >查看過往的紀錄。
        </div>
        <div
          class="bg-[#85C8EE] text-custom-blue w-[90%] mt-20 cursor-pointer font-bold h-[40px] flex justify-center items-center rounded-full"
        >
          管理預約申請
        </div>
      </div>
      <div class="right p-10 w-2/3 pt-10 box-border border rounded-2xl">
        <div>預約諮詢服務</div>
        <div></div>
        <div>确定预约</div>
      </div>
    </div>

    <LoginPanel v-if="showLoginPanel" @update:showLoginPanel="handleUpdate" />
  </div>
</template>

<style lang="scss" scoped>
.bottom-round-bar {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 80px;
  background-color: #fff;

  &::after {
    content: "";
    width: 120%;
    height: 320px;
    position: absolute;
    left: -10%;
    bottom: 0;
    border-radius: 0 0 50% 50%;
    background-color: #eef8fe;
  }
}
</style>
