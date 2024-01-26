<script setup lang="ts">
import type { CustomRes, SlideItem } from "@/types"

useHead({
  title: "交通意外傷亡及工業傷亡支援中心",
  meta: [],
  bodyAttrs: {},
  script: [],
})
const runtimeConfig = useRuntimeConfig()

// 法律小知识
const ledgeObj = ref()
const getLegalKnowledge = async () => {
  const res = await $fetch<CustomRes>(`/sys/blog/knowledge`, {
    baseURL: runtimeConfig.public.apiBase,
  })
  if (res.code === 0) {
    ledgeObj.value = res.data ?? {}
    if (ledgeObj.value && Object.keys(ledgeObj.value).length > 0) {
      selectTab(Object.keys(ledgeObj.value)[0])
    }
  }
}

const currentShowTab = ref("")
const currentShowList = ref<SlideItem[]>([])
const selectTab = (active: string) => {
  currentShowTab.value = active
  currentShowList.value = ledgeObj.value[currentShowTab.value]
}
const scrollToHash = () => {
  document.getElementById("layout-box")?.scrollTo({
    top: 800,
    behavior: "smooth",
  })
}

// 轮播
let mySwiper: any = null
const slideSwiper = (type: string) => {
  if (type === "next") {
    mySwiper.slideNext()
  } else {
    mySwiper.slidePrev()
  }
}

const onSwiper = (swiper: any) => {
  mySwiper = swiper
}

getLegalKnowledge()
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
          專門為意外受害人士提供諮詢服務
        </div>
        <NuxtLink
          to="/appointment"
          class="2xl:mt-20 mt-10 2xl:w-72 w-64 2xl:h-16 h-14 rounded-3xl bg-[#E0EEDA] flex justify-center items-center text-xl text-custom-blue font-bold tracking-widest cursor-pointer shadow-xl"
        >
          預約諮詢服務
        </NuxtLink>
        <img
          class="w-96 2xl:w-1/3 xl:w-1/3 absolute top-20 right-0"
          src="~/assets/images/people.png"
          alt=""
        />
        <NuxtLink @click="scrollToHash">
          <div
            class="w-44 h-12 flex justify-center items-center rounded-3xl absolute bottom-0 left-[50%] text-[#77AEEA] translate-x-[-50%] font-semibold bg-white cursor-pointer"
          >
            <img
              class="wow animate_animated animate__fadeInDown w-[15px] absolute top-0 left-8"
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
      class="text-custom-blue 2xl:text-4xl text-3xl font-semibold font-NotoHk tracking-widest 2xl:h-60 h-52 flex justify-center items-center"
    >
      服務範圍
    </div>
    <div class="flex justify-between container mx-auto">
      <NuxtLink
        :to="{ path: '/service', query: { type: 2 } }"
        class="w-[48%] mb-5 border border-slate-300 rounded-xl p-6 cursor-pointer"
      >
        <div class="flex items-center">
          <img class="w-20 h-20 mr-5" src="~/assets/images/car.png" alt="" />
          <div class="text-xl">交通意外傷亡支援</div>
        </div>
        <div class="mt-5 text-gray-500 font-normal">
          專為交通意外傷者及其家人提供法律支援服務，幫助他們瞭解自己在交通意外中的法律權益，以及應該如何處理此類意外的步驟和注意事項。
          <div class="mt-1">
            此外，我們還提供一些小貼士和建議，以幫助受傷者更有效地應對交通意外並保障自己的權益。另一方面，我們亦會協助傷者了解政府的交通意外賠償計劃資訊，讓傷者可從多方面了解自己可能獲得的援助。透過我們的專業分析和建議，
            能夠幫助傷者選擇合適的解決方案。
          </div>
        </div>
      </NuxtLink>

      <NuxtLink
        :to="{ path: '/service', query: { type: 3 } }"
        class="w-[48%] mb-5 border border-slate-300 rounded-xl p-6 cursor-pointer"
      >
        <div class="flex items-center">
          <img class="w-20 h-20 mr-5" src="~/assets/images/hat.png" alt="" />
          <div class="text-xl">工業傷亡支援</div>
        </div>
        <div class="mt-5 text-gray-500 font-normal">
          專為工傷意外傷者及家人提供相關的法律權益、法律程序以及應該注意的事項和一些小貼士。我們亦可以協助傷者了解法律援助署所提供的法律服務，
          幫助工傷受害者分析如何尋找合適的法律專業人士並提供支援。
        </div>
      </NuxtLink>
    </div>
    <div
      class="text-custom-blue 2xl:text-4xl text-3xl font-semibold font-NotoHk tracking-widest 2xl:h-60 h-52 flex justify-center items-center"
    >
      法律小知識
    </div>
    <div class="flex container mx-auto">
      <div v-if="ledgeObj" class="flex mx-auto">
        <div
          v-for="(item, index) in Object.keys(ledgeObj)"
          @click="selectTab(item)"
          :class="{ active: currentShowTab === item }"
          class="tab"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <div class="container mx-auto mt-14" v-if="currentShowList?.length > 0">
      <Swiper
        ref="mySwiperRef"
        :modules="[SwiperAutoplay, SwiperNavigation, SwiperPagination]"
        :spaceBetween="30"
        :loop="true"
        @swiper="onSwiper"
        :autoplay="{
          delay: 5000,
          disableOnInteraction: true,
        }"
        :pagination="{ clickable: true, el: '.swiper-pagination-box' }"
        :slides-per-view="3"
      >
        <SwiperSlide class="shadow-md" v-for="slide in currentShowList">
          <NuxtLink :to="`/legal/${slide.id}`">
            <div class="doc-box w-[100%] border rounded-lg overflow-hidden">
              <img :src="slide.pictureUrl" alt="" />
              <div class="sub-text p-5">
                <div class="text-lg font-bold mb-5">{{ slide.title }}</div>
                <div class="textOVerThree">{{ slide.introduction }}...</div>
              </div>
            </div>
          </NuxtLink>
        </SwiperSlide>
      </Swiper>
      <div
        v-if="currentShowList.length > 3"
        class="flex justify-between h-24 items-center"
      >
        <img
          @click="slideSwiper('pre')"
          class="swiper-button-prev-box cursor-pointer w-[60px]"
          src="~/assets/images/04.jpg"
          alt=""
        />
        <div class="swiper-pagination-box"></div>
        <img
          @click="slideSwiper('next')"
          class="swiper-button-next-box cursor-pointer w-[60px]"
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
  margin-right: 30px;
  &:last-child {
    margin-right: 0;
  }
}
.swiper-pagination-box {
  display: flex;
  justify-content: center;
}
.active {
  background-color: #fcb04c;
}
.doc-box {
  border-radius: 10px;
}

.textOVerThree {
  display: -webkit-box;

  overflow: hidden;

  white-space: normal !important;

  text-overflow: ellipsis;

  word-wrap: break-word;

  -webkit-line-clamp: 3;

  -webkit-box-orient: vertical;
}
</style>
