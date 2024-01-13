<script setup></script>

<template>
  <footer class="mt-40 mb-14 container mx-auto h-56 flex justify-between">
    <div class="w-[65%] flex justify-between">
      <div class="flex flex-col justify-between">
        <NuxtLink to="/">
          <img class="w-72" src="~/assets/images/image-05.png" alt="" />
        </NuxtLink>

        <div class="flex ml-5">
          <img
            class="w-12 h-12 mr-5 cursor-pointer"
            src="~/assets/images/image-06.png"
            alt=""
          />
          <img
            class="w-12 h-12 mr-5 cursor-pointer"
            src="~/assets/images/image-07.png"
            alt=""
          />
          <img
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
          <div>6775 5327</div>
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
    <div class="2xl:w-[20%] w-[25%] flex flex-col justify-between pt-5 pb-5">
      <div
        class="cursor-pointer w-full font-semibold rounded-full 2xl:h-12 h-10 bg-[#DFEDDA] text-custom-blue flex justify-center items-center"
      >
        預約咨詢服務
      </div>
      <div>
        <div class="text-xl text-custom-blue">想取得最新的法律咨詢?</div>
        <div>來訂閱我們的電子郵報</div>
      </div>
      <div class="relative w-[90%] h-10">
        <input
          class="w-full border h-full rounded-md pl-5"
          type="text"
          placeholder="輸入電郵訂閱我們"
        />
        <img
          class="cursor-pointer absolute right-[5px] top-[50%] w-8 -translate-y-[50%]"
          src="~/assets/images/message.png"
          alt=""
        />
      </div>
    </div>
  </footer>
  <div class="w-full flex justify-center text-gray-400 mb-10 font-light">
    ©2022 公司名稱 版權所有
  </div>
</template>

<style scoped></style>
