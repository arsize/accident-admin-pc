<script setup lang="ts">
import config from "~/utils/global"
import { useStore } from "~/store"
import type { MsgEnum } from "@/app.vue"
import type { CustomRes, ServiceType, RelevantLaws, ContentMd } from "@/types"

const msg = inject<(text?: string, type?: MsgEnum) => void>("message")
const runtimeConfig = useRuntimeConfig()
const store = useStore()
const route = useRoute()

useHead({
  title: "服務範圍-交通意外傷亡及工業傷亡支援中心",
  meta: [],
  bodyAttrs: {},
  script: [],
})
const selectedTab = ref(2)
const changeTab = (index: number | undefined) => {
  selectedTab.value = index ?? -1
  getRecomList()
  getContentMd()
}
const scrollToTop = () => {
  document.getElementById("layout-box")?.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

// 获取服务列表
const serviceList = ref<ServiceType[]>([
  {
    id: 2,
    name: "交通意外傷亡支援",
  },
  {
    id: 3,
    name: "工業傷亡支援",
  },
])

// 相关法律知识
const someList = ref<RelevantLaws[]>([])
const getRecomList = async () => {
  const res = await $fetch<CustomRes>(
    `/sys/blog/relatedKnowledge/${selectedTab.value}`,
    {
      baseURL: runtimeConfig.public.apiBase,
      method: "get",
    }
  )
  if (res.code === 0) {
    someList.value = res.data ?? []
  }
}

// 查询服务内容
const contentMd = ref<ContentMd>({})
const getContentMd = async () => {
  const res = await $fetch<CustomRes>(
    `/sys/blog/serviceScope/${selectedTab.value}`,
    {
      baseURL: runtimeConfig.public.apiBase,
      method: "get",
    }
  )
  if (res.code === 0) {
    contentMd.value = res.data ?? {}
  }
}

onMounted(() => {
  scrollToTop()
  let type = route.query?.type
  if (type && typeof type === "string") {
    changeTab(parseInt(type))
  } else {
    changeTab(2)
  }
  getRecomList()
})
</script>

<template>
  <div>
    <div
      class="bg-[#ecf8e8] 2xl:h-64 h-48 2xl:text-6xl text-5xl p text-custom-blue font-semibold font-NotoHk tracking-widest flex items-center"
    >
      <div class="container mx-auto pl-5">服務範圍</div>
    </div>
    <div class="bottom-round-bar"></div>
    <div
      class="flex justify-between article container mx-auto py-20 px-5 box-border"
    >
      <div class="w-[15%] min-w-[220px]">
        <div class="w-full min-h-[200px] mb-10">
          <div
            v-for="(item, index) in serviceList"
            @click="changeTab(item.id)"
            :class="{ activedTab: selectedTab === item.id }"
            class="w-full cursor-pointer h-12 mb-5 tracking-widest flex justify-start pl-8 items-center rounded-lg"
          >
            {{ item.name }}
          </div>
        </div>
        <div class="w-full pl-5">
          <div class="text-xl mb-10 text-custom-blue">相關法律知识</div>
          <NuxtLink
            :to="`/legal/${item.id}`"
            class="atc-item w-full mb-5"
            v-for="(item, index) in someList"
          >
            <div class="w-full border rounded-md h-30 relative cursor-pointer">
              <img class="w-full h-full" :src="item.pictureUrl" alt="" />
              <div
                class="label absolute top-0 right-0 w-2/5 h-6 bg-[#DFEDDA] flex justify-center items-center rounded-md text-xs"
              >
                <div v-if="item.legalKnowledgeType === 2">交通意外</div>
                <div v-if="item.legalKnowledgeType === 3">工業傷亡</div>
              </div>
            </div>
            <div class="p-2 box-border font-light">
              {{ item.title }}
            </div>
          </NuxtLink>
        </div>
      </div>
      <div class="w-[50%]">
        <div class="flex items-center mb-5">
          <img
            class="w-[80px] h-[80px] mr-5"
            v-if="contentMd.serviceScopeType == 2"
            src="@/assets/images/car.png"
            alt=""
          />
          <img
            class="w-[80px] h-[80px] mr-5"
            v-else-if="contentMd.serviceScopeType == 3"
            src="@/assets/images/hat.png"
            alt=""
          />

          <div class="text-2xl font-semibold">{{ contentMd.title }}</div>
        </div>
        <div v-if="contentMd" v-html="contentMd.content"></div>
        <div
          v-if="contentMd?.extendedArticles"
          class="w-full bg-[#F7F7F7] p-3 mt-20 pl-5"
        >
          <div class="mb-5">延伸文章</div>
          <ul class="list-disc pl-5">
            <li
              class="mb-3 cursor-pointer"
              v-for="item in contentMd.extendedArticles"
            >
              <NuxtLink :to="`/legal/${item.id}`" style="color: #fa8216">{{
                item.title
              }}</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <div class="w-[20%]">
        <div class="mb-5 text-sm text-[#ACACAC]">內容概括</div>
        <div v-if="contentMd">
          <div v-html="contentMd.summary"></div>
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
    background-color: #ecf8e8;
  }
}
.activedTab {
  background-color: #fcb04c;
}
</style>
