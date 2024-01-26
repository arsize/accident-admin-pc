<script setup lang="ts">
import type { CustomRes } from "@/types"
const runtimeConfig = useRuntimeConfig()
const route = useRoute()

useHead({
  title: "法律小知識-交通意外傷亡及工業傷亡支援中心",
  meta: [],
  bodyAttrs: {},
  script: [],
})
const ledgeObj = ref()
const titleKeys = ref<string[]>([])
const getLegalKnowledge = async () => {
  const res = await $fetch<CustomRes>(`/sys/blog/knowledge`, {
    baseURL: runtimeConfig.public.apiBase,
  })
  if (res.code === 0) {
    ledgeObj.value = res.data ?? {}
    titleKeys.value = Object.keys(res.data)
  }
}
// 文章内容
const contentObj = ref<any>(null)
const getContent = async () => {
  const res = await $fetch<CustomRes>(`/sys/blog/${route.params.id}`, {
    baseURL: runtimeConfig.public.apiBase,
    method: "get",
  })
  if (res.code === 0) {
    contentObj.value = res.data ?? {}
  }
}

const scrollToTop = () => {
  document.getElementById("layout-box")?.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

onMounted(() => {
  getLegalKnowledge()
  getContent()
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
    <div
      class="flex justify-between article container mx-auto py-20 px-5 box-border"
    >
      <div class="left w-[20%] min-w-[220px]">
        <div v-for="(k, i) in titleKeys" :key="i" class="w-full">
          <div
            class="w-full font-semibold text-lg bg-[#DFEDDA] rounded-md h-12 flex items-center pl-5"
          >
            {{ k }}
          </div>
          <div class="w-full p-3 box-border">
            <div
              v-for="(item, index) in ledgeObj[k]"
              class="border-b hover:text-[#85C8EE] px-1 py-3 cursor-pointer"
            >
              <NuxtLink :to="`/legal/${item.id}`" class="w-full h-full">
                {{ item.title }}</NuxtLink
              >
            </div>
            <NuxtLink
              to="/legal?type=2"
              v-if="k == '交通意外'"
              class="readmore text-custom-blue text-sm cursor-pointer w-full flex justify-end h-10 items-center"
            >
              查看更多
              <Icon name="i-heroicons-chevron-right-20-solid"></Icon>
            </NuxtLink>
            <NuxtLink
              to="/legal?type=3"
              v-else-if="k == '工業傷亡'"
              class="readmore text-custom-blue text-sm cursor-pointer w-full flex justify-end h-10 items-center"
            >
              查看更多
              <Icon name="i-heroicons-chevron-right-20-solid"></Icon>
            </NuxtLink>
            <NuxtLink
              to="/legal?type=4"
              v-else-if="k == '客戶案件分享'"
              class="readmore text-custom-blue text-sm cursor-pointer w-full flex justify-end h-10 items-center"
            >
              查看更多
              <Icon name="i-heroicons-chevron-right-20-solid"></Icon>
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="content w-[50%]">
        <div class="w-full" v-if="contentObj">
          <div class="text-2xl font-semibold">
            {{ contentObj.title }}
          </div>
          <div class="h-[80px] text-sm flex justify-between items-center">
            <div
              class="text-[#FFAD5A]"
              v-if="contentObj.legalKnowledgeType == 2"
            >
              交通意外
            </div>
            <div
              class="text-[#FFAD5A]"
              v-else-if="contentObj.legalKnowledgeType == 3"
            >
              工業傷亡
            </div>
            <div v-else></div>
            <div class="text-gray-400">{{ contentObj.publishDate }}</div>
          </div>
          <div v-html="contentObj.content"></div>
          <div
            v-if="contentObj?.extendedArticles"
            class="w-full bg-[#F7F7F7] p-3 mt-20 pl-5"
          >
            <div class="mb-5">延伸文章</div>
            <ul class="list-disc pl-5">
              <li
                class="mb-3 cursor-pointer"
                v-for="item in contentObj.extendedArticles"
              >
                <NuxtLink :to="`/legal/${item.id}`" style="color: #fa8216">{{
                  item.title
                }}</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="right w-[20%]">
        <div class="mb-5 text-sm text-[#ACACAC]">內容概括</div>
        <div v-if="contentObj">
          <div v-html="contentObj.summary"></div>
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
    background-color: #fffcf2;
  }
}
.readmore {
  display: flex;
  align-items: center;
}
</style>
