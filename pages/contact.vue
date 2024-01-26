<script setup lang="ts">
useHead({
  title: "聯繫我們-交通意外傷亡及工業傷亡支援中心",
  meta: [],
  bodyAttrs: {},
  script: [],
})

const scrollToTop = () => {
  document.getElementById("layout-box")?.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

onMounted(() => {
  scrollToTop()
})
</script>

<template>
  <div>
    <div
      class="bg-[#EEF8FE] 2xl:h-64 h-48 2xl:text-6xl text-5xl p text-custom-blue font-semibold font-NotoHk tracking-widest flex items-center"
    >
      <div class="container mx-auto pl-5">聯絡我們</div>
    </div>
    <div class="bottom-round-bar"></div>
    <div
      class="2xl:w-[800px] w-[800px] mx-auto mt-20 text-xl font-light tracking-widest"
    >
      <div>
        如需要尋求交通意外傷亡或工業傷亡相關的法律支援，可透過<span
          class="text-custom-blue font-medium"
          >電話，Whatsapp及電郵</span
        >等方式聯絡我們，亦可於網站內直接預約資詢，當我們收到你的預約訊息時，會立即聯絡你及確認預約詳情。
      </div>
      <NuxtLink
        to="/appointment"
        class="text-custom-blue w-80 font-semibold 2xl:text-xl text-base bg-[#DFEDDA] flex justify-center items-center h-12 mt-20 mx-auto cursor-pointer rounded-full"
      >
        預約諮詢服務
      </NuxtLink>
      <div class="flex w-[80%] mx-auto justify-between 2xl:mt-28 mt-12">
        <div>
          <div class="font-normal mb-5 pl-5 2xl:text-lg text-base">
            聯絡方式
          </div>
          <div class="flex items-center 2xl:text-lg text-base 2xl:mb-5 mb-2">
            <img
              class="2xl:w-[40px] w-[30px]"
              src="~/assets/images/image-11.png"
              alt=""
            />
            <div>52146268</div>
          </div>
          <div class="flex items-center 2xl:text-lg text-base">
            <img
              class="2xl:w-[40px] w-[30px]"
              src="~/assets/images/image-12.png"
              alt=""
            />
            <div>tinbokhongkong@gmail.com</div>
          </div>
        </div>
        <div>
          <div class="font-normal mb-5 2xl:text-lg text-base">辦公室資料</div>
          <div class="flex items-start 2xl:text-lg text-base">
            <img
              class="2xl:w-[40px] w-[30px]"
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
    </div>
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
