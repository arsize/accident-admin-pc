<script setup>
const openurl = (type) => {
  if (type === "facebook") {
    window.open(
      "https://www.facebook.com/profile.php?id=100095069115429&mibextid=LQQJ4d"
    )
  }
  if (type === "whatsapp") {
    window.open("https://wa.me/85252146268")
  }
}
</script>

<template>
  <footer class="mt-40 mb-14 container mx-auto h-56 flex justify-between">
    <div class="w-[65%] flex justify-between">
      <div class="flex flex-col justify-between">
        <NuxtLink to="/">
          <img class="w-72" src="~/assets/images/image-05.png" alt="" />
        </NuxtLink>

        <div class="flex ml-5">
          <img
            @click="openurl('facebook')"
            class="w-12 h-12 mr-5 cursor-pointer"
            src="~/assets/images/image-06.png"
            alt=""
          />
          <img
            @click="openurl('whatsapp')"
            class="w-12 h-12 mr-5 cursor-pointer"
            src="~/assets/images/image-08.png"
            alt=""
          />
        </div>
      </div>
      <div class="pt-5 flex flex-col justify-between pb-5 text-custom-blue">
        <NuxtLink to="/service" class="cursor-pointer">服務範圍</NuxtLink>
        <NuxtLink to="/legal" class="cursor-pointer">法律小知識</NuxtLink>
        <NuxtLink to="/about" class="cursor-pointer">關於中心</NuxtLink>
        <NuxtLink to="/contact" class="cursor-pointer">聯絡我們</NuxtLink>
        <NuxtLink to="/" class="cursor-pointer">隱私條款</NuxtLink>
      </div>
      <div class="pt-5 pb-5 flex flex-col justify-between">
        <div class="font-medium">聯絡資料</div>
        <div class="flex items-center">
          <img
            class="w-10 h-10 mr-2"
            src="~/assets/images/image-11.png"
            alt=""
          />
          <div>52146268</div>
        </div>
        <div class="flex items-center">
          <img
            class="w-10 h-10 mr-2"
            src="~/assets/images/image-12.png"
            alt=""
          />
          <div>tinbokhongkong@gmail.com</div>
        </div>
        <div class="flex items-center">
          <img
            class="w-10 h-10 mr-2"
            src="~/assets/images/image-13.png"
            alt=""
          />
          <div>
            <div>星期一至五</div>
            <div>10:00 am - 6:00 pm</div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="2xl:w-[20%] w-[25%] flex flex-col justify-center items-center pt-5 pb-5"
    >
      <NuxtLink
        to="/appointment"
        class="cursor-pointer w-full font-semibold rounded-full 2xl:h-12 h-10 bg-[#DFEDDA] text-custom-blue flex justify-center items-center"
      >
        預約諮詢服務
      </NuxtLink>
    </div>
  </footer>
  <div
    class="w-full flex justify-center text-gray-400 mb-10 font-light text-[12px]"
  >
    ©2024 Tin Bok (HK) Limited.
  </div>
</template>

<style scoped></style>
