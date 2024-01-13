<script setup lang="ts">
useHead({
  title: "交通意外伤亡及工业伤亡支援中心",
  meta: [],
  bodyAttrs: {},
  script: [],
})

let currentShowTab = ref(0)

const selectTab = (active: number) => {
  currentShowTab.value = active
}
const scrollToHash = () => {
  document.getElementById("layout-box")?.scrollTo({
    top: 800,
    behavior: "smooth",
  })
}
</script>

<template>
  <div>
    <div class="top-block 2xl:h-[900px] xl:h-[630px] lg:h-[630px] h-[500px]">
      <div class="text-box container mx-auto 2xl:pt-24 px-12 relative h-full">
        <div
          class="2xl:text-6xl text-5xl p text-custom-blue font-semibold font-NotoHk tracking-widest pb-4 pt-40"
        >
          交通意外傷亡及
        </div>
        <div
          class="2xl:text-6xl text-5xl text-custom-blue font-semibold font-NotoHk tracking-widest"
        >
          工業傷亡支援中心
        </div>
        <div class="pt-5 2xl:text-2xl text-xl text-gray-400">
          專門為意外受害人士提供法律咨詢服務
        </div>
        <div
          v-wave
          class="2xl:mt-20 mt-10 2xl:w-72 w-64 2xl:h-16 h-14 rounded-3xl bg-[#E0EEDA] flex justify-center items-center text-xl text-custom-blue font-bold tracking-widest cursor-pointer shadow-xl"
        >
          預約咨詢服務
        </div>
        <img
          class="w-96 2xl:w-1/3 xl:w-2/5 absolute top-20 right-0"
          src="~/assets/images/people.png"
          alt=""
        />
        <NuxtLink @click="scrollToHash">
          <div
            class="w-44 h-12 flex justify-center items-center rounded-3xl absolute bottom-0 left-[50%] text-[#77AEEA] translate-x-[-50%] font-semibold bg-white cursor-pointer"
          >
            <img
              class="w-[15px] absolute top-0 left-8"
              src="~/assets/images/row_down.jpg"
              alt=""
            />
            <div style="padding-left: 20px">了解更多</div>
          </div>
        </NuxtLink>
      </div>
    </div>
    <div class="bottom-round-bar"></div>
    <div
      class="text-custom-blue 2xl:text-4xl text-3xl font-semibold font-NotoHk tracking-widest h-60 flex justify-center items-center"
    >
      服務範圍
    </div>
    <div class="flex justify-between container mx-auto">
      <div class="w-[48%] 2xl:h-80 h-64 border border-slate-300 rounded-xl p-6">
        <div class="flex items-center">
          <img class="w-20 h-20 mr-5" src="~/assets/images/car.png" alt="" />
          <div class="text-xl">交通意外傷亡支援</div>
        </div>
        <div class="mt-5 text-gray-500">
          服務范圍簡介服務范圍簡介服務范圍簡介服務范圍簡介服務范圍簡介服務范圍簡介服務范圍簡介服務范圍簡介服務范圍簡介服務范圍簡介服務范圍簡介服務范圍簡介服務范圍簡介服務范圍簡介服務范圍簡介服務范圍簡介
        </div>
      </div>
      <div class="w-[48%] 2xl:h-80 h-64 border border-slate-300 rounded-xl p-6">
        <div class="flex items-center">
          <img class="w-20 h-20 mr-5" src="~/assets/images/hat.png" alt="" />
          <div class="text-xl">工業傷亡支援</div>
        </div>
        <div class="mt-5 text-gray-500">
          服務范圍簡介服務范圍簡介服務范圍簡介服務范圍簡介服務范圍簡介服務范圍簡介服務范圍簡介服務范圍簡介服務范圍簡介服務范圍簡介服務范圍簡介服務范圍簡介服務范圍簡介服務范圍簡介服務范圍簡介服務范圍簡介
        </div>
      </div>
    </div>
    <div
      class="text-custom-blue 2xl:text-4xl text-3xl font-semibold font-NotoHk tracking-widest h-60 flex justify-center items-center"
    >
      法律小知識
    </div>
    <div class="flex container mx-auto">
      <div class="flex mx-auto">
        <div
          @click="selectTab(0)"
          :class="{ active: currentShowTab === 0 }"
          class="tab"
        >
          交通意外
        </div>
        <div
          @click="selectTab(1)"
          :class="{ active: currentShowTab === 1 }"
          class="tab mx-10"
        >
          工業傷亡
        </div>
        <div
          @click="selectTab(2)"
          :class="{ active: currentShowTab === 2 }"
          class="tab"
        >
          客户案件分享
        </div>
      </div>
    </div>
    <div class="container mx-auto mt-14">
      <Swiper
        :spaceBetween="30"
        :pagination="{ clickable: true }"
        :slides-per-view="3"
      >
        <SwiperSlide class="shadow-md" v-for="slide in 10" :key="slide">
          <div
            class="doc-box w-[100%] xl:h-[500px] h-[450px] border rounded-lg overflow-hidden"
          >
            <div
              class="img-top xl:h-2/3 h-3/5 bg-[url('~/assets/images/01.png')] bg-no-repeat bg-center bg-cover"
            ></div>
            <div class="sub-text p-5">
              <div class="text-2xl font-bold mb-5">文章标题</div>
              {{
                slide
              }}内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div class="flex justify-between h-24 items-center">
        <img
          class="cursor-pointer w-[60px]"
          src="~/assets/images/04.jpg"
          alt=""
        />
        <div class="flex">
          <div class="w-3 h-3 border rounded-full bg-black mr-5"></div>
          <div class="w-3 h-3 border rounded-full bg-gray-400 mr-5"></div>
          <div class="w-3 h-3 border rounded-full bg-gray-400 mr-5"></div>
          <div class="w-3 h-3 border rounded-full bg-gray-400"></div>
        </div>
        <img
          class="cursor-pointer w-[60px]"
          src="~/assets/images/03.jpg"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top-block {
  width: 100%;
  background-color: #eef8fe;
  min-width: 1080px;
}

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

.tab {
  width: 130px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.active {
  background-color: #fcb04c;
}
.doc-box {
  border-radius: 10px;
}
</style>
