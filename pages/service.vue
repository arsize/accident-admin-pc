<script setup lang="ts">
import config from "~/utils/global"
import { useStore } from "~/store"
import type { MsgEnum } from "@/app.vue"
import type { CustomRes } from "@/types"

const msg = inject<(text?: string, type?: MsgEnum) => void>("message")

const store = useStore()

useHead({
  title: "服务范围-交通意外伤亡及工业伤亡支援中心",
  meta: [],
  bodyAttrs: {},
  script: [],
})
const selectedTab = ref(0)
const changeTab = (index: number) => {
  selectedTab.value = index
}
const scrollToTop = () => {
  document.getElementById("layout-box")?.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

// 获取服务列表
const serviceList = ref([])
const getServiceList = async () => {
  const { data } = await useFetch<CustomRes>(
    `${config.PROXY}/sys/service_type_info/list`,
    {
      method: "get",
      onRequest({ request, options }) {
        const headers = options?.headers
          ? new Headers(options.headers)
          : new Headers()
        if (!headers.has("Authorization")) {
          headers.set("Authorization", store.token)
        }
        options.headers = headers
      },
    }
  )
  if (data.value?.code === 0) {
  } else {
    if (msg) msg(data.value?.msg, "warning")
  }
  console.log(data.value)
}

getServiceList()

onMounted(() => {
  scrollToTop()
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
        <div class="w-full min-h-[200px]">
          <div
            @click="changeTab(0)"
            :class="{ activedTab: selectedTab === 0 }"
            class="w-full cursor-pointer h-12 tracking-widest flex justify-start pl-8 items-center rounded-lg"
          >
            交通意外伤亡支援
          </div>
          <div
            @click="changeTab(1)"
            :class="{ activedTab: selectedTab === 1 }"
            class="w-full cursor-pointer h-12 flex tracking-widest justify-start pl-8 items-center rounded-lg"
          >
            工业伤亡支援
          </div>
        </div>
        <div class="w-full pl-5">
          <div class="text-xl mb-10 text-custom-blue">相關法律知识</div>
          <div class="atc-item w-full" v-for="item in 5">
            <div class="w-full border h-40"></div>
            <div class="p-2 box-border font-light">
              文章标题文章标题文章标题文章标
            </div>
          </div>
        </div>
      </div>
      <div class="w-[50%]">markdown富文本</div>
      <div class="w-[20%]">内容概况</div>
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
