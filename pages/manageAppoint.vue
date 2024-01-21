<script setup lang="ts">
import type { CustomRes } from "@/types"
import { useStore } from "~/store"

const store = useStore()

const runtimeConfig = useRuntimeConfig()
const selectedIndex = ref(0)
const selectedTabIndex = ref(0)
const selectedFn = (index: number) => {
  selectedIndex.value = index
}
const selectedTabFn = (index: number) => {
  selectedTabIndex.value = index
}
const columns = [
  {
    key: "id",
    label: "預約編號",
  },
  {
    key: "createDate",
    label: "下單日期",
  },
  {
    key: "stateDate",
    label: "預約日期",
  },
  {
    key: "serviceTypeId",
    label: "咨詢種類",
  },
  {
    key: "state",
    label: "預約狀況",
  },
  {
    key: "actions",
  },
]

// 获取数据
const table = ref([
  { id: 1, createDate: "1", stateDate: "2", serviceTypeId: 2, state: 1 },
  { id: 1, createDate: "1", stateDate: "2", serviceTypeId: 2, state: 1 },
  { id: 1, createDate: "1", stateDate: "2", serviceTypeId: 2, state: 1 },
  { id: 1, createDate: "1", stateDate: "2", serviceTypeId: 2, state: 1 },
  { id: 1, createDate: "1", stateDate: "2", serviceTypeId: 2, state: 1 },
  { id: 1, createDate: "1", stateDate: "2", serviceTypeId: 2, state: 1 },
  { id: 1, createDate: "1", stateDate: "2", serviceTypeId: 2, state: 1 },
  { id: 1, createDate: "1", stateDate: "2", serviceTypeId: 2, state: 1 },
  { id: 1, createDate: "1", stateDate: "2", serviceTypeId: 2, state: 1 },
  { id: 1, createDate: "1", stateDate: "2", serviceTypeId: 2, state: 1 },
  { id: 1, createDate: "1", stateDate: "2", serviceTypeId: 2, state: 1 },
  { id: 1, createDate: "1", stateDate: "2", serviceTypeId: 2, state: 1 },
  { id: 1, createDate: "1", stateDate: "2", serviceTypeId: 2, state: 1 },
  { id: 1, createDate: "1", stateDate: "2", serviceTypeId: 2, state: 1 },
  { id: 1, createDate: "1", stateDate: "2", serviceTypeId: 2, state: 1 },
  { id: 1, createDate: "1", stateDate: "2", serviceTypeId: 2, state: 1 },
])
const current = ref(1)
const total = ref(10)
const getData = async () => {
  const res = await $fetch<CustomRes>(`/sys/appointment_record_info/page`, {
    baseURL: runtimeConfig.public.apiBase,
    method: "get",
    query: {
      page: 1,
      limit: 10,
    },
    onRequest({ request, options }) {
      const headers = options?.headers
        ? new Headers(options.headers)
        : new Headers()
      if (!headers.has("Authorization")) {
        headers.set("Authorization", store.token)
      }
      options.headers = headers
    },
  })
  if (res.code === 0) {
    table.value = res.data
  }
}
const showDetail = ref(false)
const showDetailFn = () => {
  showDetail.value = true
}
const goback = () => {
  showDetail.value = false
}
onMounted(() => {
  getData()
})
</script>

<template>
  <div class="container mx-auto mt-16 p-5">
    <div class="flex justify-between">
      <div class="w-[20%]">
        <div
          @click="selectedFn(0)"
          :class="{ active: selectedIndex === 0 }"
          class="flex justify-start items-center w-full h-12 rounded-lg cursor-pointer pl-10"
        >
          <Icon name="heroicons-outline:document-duplicate" class="mr-3" />
          預約記錄
        </div>
        <div
          @click="selectedFn(1)"
          :class="{ active: selectedIndex === 1 }"
          class="flex justify-start items-center w-full h-12 rounded-lg cursor-pointer pl-10"
        >
          <Icon name="heroicons-outline:user" class="mr-3"></Icon> 帳戶資料
        </div>
      </div>
      <div v-if="showDetail" class="w-[70%]">
        <div class="flex items-center justify-between">
          <div @click="goback" class="flex items-center w-50 cursor-pointer">
            <Icon name="heroicons-outline:arrow-sm-left" class="mr-2" />
            <div class="ml-1">返回</div>
          </div>
          <div
            class="w-[150px] text-white flex justify-center items-center bg-[#FCB04C] text-sm h-9 cursor-pointer"
          >
            下載記錄
          </div>
        </div>
        <div class="flex justify-between mt-8 w-full">
          <div class="w-[30%] h-1/2 flex flex-col bg-[#F7F7F7] p-5 py-10">
            <div class="text-xl mb-5">客戶資料</div>
            <div class="mb-5">
              <div class="text-[#8294BA] text-sm mb-[5px]">姓名:</div>
              <div class="text-md">连答问</div>
            </div>
            <div class="mb-5">
              <div class="text-[#8294BA] text-sm mb-[5px]">電郵地址:</div>
              <div class="text-md">afafdf</div>
            </div>
            <div>
              <div class="text-[#8294BA] text-sm mb-[5px]">聯絡電話:</div>
              <div class="text-md">900000000000</div>
            </div>
          </div>
          <div class="w-[65%]">
            <div>
              <div
                class="bg-[#ECF8E9] w-full px-[20px] py-[10px] rounded-lg font-bold"
              >
                預約記錄
              </div>
              <div class="py-5 px-5 w-[70%] flex justify-between">
                <div class="mb-5">
                  <div class="mb-10">
                    <div class="text-[#8294BA] text-sm mb-[5px]">預約編號:</div>
                    <div class="text-md">3434343</div>
                  </div>
                  <div>
                    <div class="text-[#8294BA] text-sm mb-[5px]">預約狀況:</div>
                    <div class="text-md">3434343</div>
                  </div>
                </div>
                <div>
                  <div class="text-[#8294BA] text-sm mb-[5px]">下單日期:</div>
                  <div class="text-md">3434343</div>
                </div>
              </div>
            </div>
            <div>
              <div
                class="bg-[#ECF8E9] w-full px-[20px] py-[10px] rounded-lg font-bold"
              >
                咨詢資料
              </div>
              <div class="py-5 px-5 w-[70%] flex justify-between">
                <div class="mb-5">
                  <div class="mb-10">
                    <div class="text-[#8294BA] text-sm mb-[5px]">咨詢類型:</div>
                    <div class="text-md">3434343</div>
                  </div>
                  <div>
                    <div class="text-[#8294BA] text-sm mb-[5px]">案件日期:</div>
                    <div class="text-md">3434343</div>
                  </div>
                </div>
                <div>
                  <div class="text-[#8294BA] text-sm mb-[5px]">咨詢時間:</div>
                  <div class="text-md">3434343</div>
                </div>
              </div>
              <div class="px-5 w-[100%]">
                <div>
                  <div class="text-[#8294BA] text-sm mb-[5px]">事件描述:</div>
                  <div class="text-md">3434343</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="w-[70%]">
        <div class="text-2xl font-bold">預約記錄</div>
        <div class="w-full mt-10 flex justify-between">
          <div class="w-[40%]">
            <UInput placeholder="搜寻">
              <template #trailing>
                <Icon name="heroicons-outline:arrow-sm-right" class="mr-2" />
              </template>
            </UInput>
          </div>
          <div class="flex items-center text-sm">
            <div>篩選</div>
            <div
              @click="selectedTabFn(0)"
              :class="{ activeTab: selectedTabIndex === 0 }"
              class="px-3 py-2 rounded-md cursor-pointer mx-5"
            >
              預約編號
            </div>
            <div
              @click="selectedTabFn(1)"
              :class="{ activeTab: selectedTabIndex === 1 }"
              class="px-3 py-2 rounded-md cursor-pointer"
            >
              下單日期
            </div>
          </div>
        </div>

        <UTable
          :empty-state="{
            icon: 'i-heroicons-circle-stack-20-solid',
            label: '暫無數據',
          }"
          class="mt-10"
          :columns="columns"
          :rows="table"
        >
          <template #actions-data="{ row }">
            <div
              @click="showDetailFn"
              class="w-30 cursor-pointer h-8 flex justify-center items-center text-white bg-[#FCB04C]"
            >
              詳情
            </div>
          </template>
        </UTable>

        <div
          class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
        >
          <UPagination
            v-model="current"
            :page-count="total"
            :total="table.length"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.active {
  background-color: #eaeff9;
}
.activeTab {
  border: 1px solid gray;
}
</style>
