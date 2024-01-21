<script setup lang="ts">
import type { CustomRes, SlideItem } from "@/types"
const runtimeConfig = useRuntimeConfig()

useHead({
  title: "法律小知识-交通意外伤亡及工业伤亡支援中心",
  meta: [],
  bodyAttrs: {},
  script: [],
})

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

const scrollToTop = () => {
  document.getElementById("layout-box")?.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

// 显示详情
const showDetail = () => {}

onMounted(() => {
  getLegalKnowledge()
  scrollToTop()
})
</script>

<template>
  <div>
    <div
      class="bg-[#FFFCF2] 2xl:h-64 h-48 2xl:text-6xl text-5xl p text-custom-blue font-semibold font-NotoHk tracking-widest flex items-center"
    >
      <div class="container mx-auto pl-5">法律小知識</div>
    </div>
    <div class="bottom-round-bar"></div>

    <div>
      <div class="flex container mx-auto h-48 items-center">
        <div v-if="ledgeObj" class="flex mx-auto">
          <div
            v-for="(item, index) in Object.keys(ledgeObj)"
            @click="selectTab(item)"
            :class="{ active: currentShowTab === item }"
            class="tab mr-20"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div
        v-if="currentShowList && currentShowList.length > 0"
        class="flex flex-wrap container mx-auto justify-between"
      >
        <NuxtLink
          :to="`/legal/${slide.id}`"
          @click="showDetail"
          class="w-[31%] flex cursor-pointer"
          v-for="slide in currentShowList"
        >
          <div
            class="doc-box shadow-md mb-10 w-[100%] border rounded-2xl overflow-hidden"
          >
            <img class="w-full" :src="slide.pictureUrl" alt="" />
            <div class="sub-text p-5">
              <div class="text-lg font-bold mb-5">{{ slide.title }}</div>
              <div class="textOVerThree" v-html="slide.content"></div>
            </div>
          </div>
        </NuxtLink>
      </div>
      <div v-else class="flex container mx-auto justify-between items-center">
        <img
          class="w-[50px] mx-auto"
          src="@/assets/images/fade-stagger-circles.png"
          alt=""
        />
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
    background-color: #fffcf2;
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
  &:last-child {
    margin-right: 0;
  }
}
.active {
  background-color: #fcb04c;
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
