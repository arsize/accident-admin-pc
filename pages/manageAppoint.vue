<script setup lang="ts">
import type { CustomRes, ServiceType } from "@/types"
import { useStore } from "~/store"
import { useRouter } from "vue-router"
import type { MsgEnum } from "@/app.vue"
import VueDatePicker from "@vuepic/vue-datepicker"
import "@vuepic/vue-datepicker/dist/main.css"

useHead({
  title: "預約記錄-交通意外傷亡及工業傷亡支援中心",
  meta: [],
  bodyAttrs: {},
  script: [],
})
const renameState = reactive<any>({
  mobile: undefined,
  email: undefined,
  firstName: undefined,
  surname: undefined,
  id: undefined,
})
const store = useStore()
const router = useRouter()
const msg = inject<(text?: string, type?: MsgEnum) => void>("message")
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
    key: "appointmentCode",
    label: "預約編號",
  },
  {
    key: "createDate",
    label: "下單日期",
  },
  {
    key: "consultDate",
    label: "預約日期",
  },
  {
    key: "serviceTypeId",
    label: "諮詢種類",
  },
  {
    key: "state",
    label: "預約狀況",
  },
  {
    key: "actions",
  },
]

// 修改密碼
const repwdopen = ref(false)
const rePwdState = ref({
  orgpwd: "",
  newpwd: "",
  checkpwd: "",
})
const rePaswd = () => {
  repwdopen.value = true
}
const onRePwd = async () => {
  if (rePwdState.value.checkpwd !== rePwdState.value.newpwd) {
    if (msg) msg("兩次密碼不一致", "warning")
    return
  }
  const res = await $fetch<CustomRes>(`/sys/user/password`, {
    baseURL: runtimeConfig.public.apiBase,
    method: "put",
    body: {
      password: rePwdState.value.orgpwd,
      newPassword: rePwdState.value.newpwd,
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
    if (msg) msg("修改成功", "success")
    repwdopen.value = false
  } else {
    if (msg) msg(res.msg, "warning")
  }
}

// 删除账户
const delisopen = ref(false)
const renameopen = ref(false)
const dels = () => {
  delisopen.value = true
}
const rename = () => {
  renameState.email = store.userInfo?.email ?? ""
  renameState.firstName = store.userInfo?.firstName
  renameState.surname = store.userInfo?.surname
  renameState.mobile = store.userInfo?.mobile
  renameState.id = store.userInfo?.id

  renameopen.value = true
}
const onRename = async () => {
  const res = await $fetch<CustomRes>(`/sys/user`, {
    baseURL: runtimeConfig.public.apiBase,
    method: "put",
    body: {
      surname: renameState.surname,
      firstName: renameState.firstName,
      mobile: renameState.mobile,
      email: renameState.email,
      id: renameState.id,
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
    if (store.userInfo) {
      store.userInfo.surname = renameState.surname
      store.userInfo.firstName = renameState.firstName
      store.userInfo.mobile = renameState.mobile
      store.userInfo.email = renameState.email
      store.userInfo.realName = renameState.firstName + renameState.surname
    }
    renameopen.value = false
    if (msg) msg("修改成功", "success")
  } else {
    if (msg) msg(res.msg, "warning")
  }
}
const confirmDel = async () => {
  const res = await $fetch<CustomRes>(`/sys/user/deleteAccount`, {
    baseURL: runtimeConfig.public.apiBase,
    method: "delete",
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
    store.token = ""
    router.push({
      path: "/appointment",
    })
  }
}

// 获取数据
const table = ref([])
const current = ref(1)
const total = ref(10)
const searchVal: any = ref("")
const getData = async () => {
  let query: any = {
    page: current.value,
    limit: 100,
  }
  if (selectedTabIndex.value === 0) {
    query.appointmentCode = searchVal.value
  }
  if (selectedTabIndex.value === 1) {
    let _temp = ""
    if (searchVal.value) {
      let day = searchVal.value.getDate()
      let mon = searchVal.value.getMonth() + 1
      let ye = searchVal.value.getFullYear()
      _temp = `${day}/${mon}/${ye}`
    }
    query.createDate = _temp
  }
  const res = await $fetch<CustomRes>(`/sys/appointment_record_info/page`, {
    baseURL: runtimeConfig.public.apiBase,
    method: "get",
    query: query,
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
    table.value = res.data.list
  } else {
    if (msg) msg(res.msg, "warning")
  }
}
const showDetail = ref(false)
const showDetailFn = (id: any) => {
  showDetail.value = true
  getDetailData(id)
}
const refrsh = () => {
  searchVal.value = ""
  getData()
}
const formatDefault = (date: any) => {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}
// 查询详情
const detailData: any = ref(null)
const getDetailData = async (id: number) => {
  const res = await $fetch<CustomRes>(`/sys/appointment_record_info/${id}`, {
    baseURL: runtimeConfig.public.apiBase,
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
  })
  if (res.code === 0) {
    detailData.value = res.data
  } else {
    if (msg) msg(res.msg, "warning")
  }
}
const goback = () => {
  showDetail.value = false
}
const hideDialog = () => {
  delisopen.value = false
  repwdopen.value = false
  renameopen.value = false
}
const printPage = () => {
  window.print()
}
// 修改
const disabledTime = ref(true)
const editState = ref<any>({
  id: "",
  serviceTypeName: "",
  serviceTypeId: "",
  consultDate: "",
  caseDate: "",
  consultTime: [],
  describeInfo: "",
})
const isEditOpen = ref(false)
const showMod = async () => {
  timeOptions.value = []
  await getServiceOptions()
  editState.value.id = detailData.value.id
  editState.value.serviceTypeName = detailData.value.serviceTypeName
  editState.value.serviceTypeId = detailData.value.serviceTypeId
  editState.value.consultDate = detailData.value.consultDate
  editState.value.caseDate = detailData.value.caseDate
  editState.value.describeInfo = detailData.value.describeInfo

  let _temps: any = []
  if (detailData.value.consultTime.includes(",")) {
    _temps = detailData.value.consultTime.split(",")
  } else {
    _temps.push(detailData.value.consultTime)
  }
  await getDic()

  timeOptions.value.map((k: any) => {
    if (_temps.includes(k.times)) {
      editState.value.consultTime.push(k.id)
    } else {
    }
  })
  disabledTime.value = false

  console.log("editStateuuu", editState.value.consultTime)
  console.log("timeOptions", timeOptions.value)

  isEditOpen.value = true
}
// 咨询类型
const serviceTypeOptions = ref<ServiceType[]>([])
const getServiceOptions = async () => {
  const res = await $fetch<CustomRes>(`/sys/service_type_info/list`, {
    baseURL: runtimeConfig.public.apiBase,
    method: "get",
  })
  if (res.code === 0) {
    serviceTypeOptions.value = res.data ?? []
    serviceTypeOptions.value.map((k) => {
      k.value = k.id
    })
  }
}
const allowedDates = computed(() => {
  let allowD = [new Date()]
  for (let i = 1; i < 300; i++) {
    allowD.push(new Date(new Date().setDate(new Date().getDate() + i)))
  }
  return allowD
})

const onEdit = async () => {
  // 预约时间
  if (editState.value.consultTime?.length <= 0) {
    if (msg) msg("請填寫預約時間段", "warning")
    return
  }
  if (editState.value.consultTime?.length > 0) {
    if (editState.value.consultTime?.length == 1) {
      timeOptions.value.map((k: any) => {
        if (k.id == editState.value.consultTime[0]) {
          editState.value.consultTime = k.times
        }
      })
    } else if (editState.value.consultTime?.length == 2) {
      let _result = ""
      timeOptions.value.map((k: any) => {
        if (k.id == editState.value.consultTime[0]) {
          _result = k.times
        }
      })
      timeOptions.value.map((k: any) => {
        if (k.id == editState.value.consultTime[1]) {
          _result = _result + "," + k.times
        }
      })
      editState.value.consultTime = _result
    } else {
      if (msg) msg("最多只能選擇連續兩段預約時間", "warning")
      return
    }
  }

  if (editState.value.caseDate) {
    editState.value.caseDate = `${editState.value.caseDate.getDate()}/${
      editState.value.caseDate.getMonth() + 1
    }/${editState.value.caseDate.getFullYear()}`
  }

  let json = {
    id: editState.value.id,
    serviceTypeId: editState.value.serviceTypeId,
    serviceTypeName: editState.value.serviceTypeName,
    caseDate: editState.value.caseDate,
    consultDate: editState.value.consultDate,
    consultTime: editState.value.consultTime,
    describeInfo: editState.value.describeInfo,
  }
  const stRes: any = await $fetch<CustomRes>(`/sys/appointment_record_info`, {
    baseURL: runtimeConfig.public.apiBase,
    method: "put",
    onRequest({ request, options }) {
      const headers = options?.headers
        ? new Headers(options.headers)
        : new Headers()
      if (!headers.has("Authorization")) {
        headers.set("Authorization", store.token)
      }
      options.headers = headers
    },
    body: json,
  })
  if (stRes.code === 0) {
    if (msg) {
      detailData.value.serviceTypeName = editState.value.serviceTypeName
      detailData.value.serviceTypeId = editState.value.serviceTypeId
      detailData.value.consultDate = editState.value.consultDate
      detailData.value.caseDate = editState.value.caseDate
      detailData.value.describeInfo = editState.value.describeInfo
      detailData.value.consultTime = editState.value.consultTime
      msg("修改成功", "success")
      closeEdit()
    }
  } else {
    if (msg) {
      msg(stRes.msg, "warning")
    }
  }
}
const closeEdit = () => {
  editState.value.serviceTypeName = ""
  editState.value.serviceTypeId = ""
  editState.value.consultDate = ""
  editState.value.caseDate = ""
  editState.value.consultTime = []
  editState.value.describeInfo = ""
  isEditOpen.value = false
}
const timeOptions = ref<any>([])
const getDic = async () => {
  timeOptions.value = []
  editState.value.consultTime = []
  let _temp = ""
  if (
    editState.value.consultDate &&
    typeof editState.value.consultDate !== "string"
  ) {
    let day = editState.value.consultDate.getDate()
    let mon = editState.value.consultDate.getMonth() + 1
    let ye = editState.value.consultDate.getFullYear()
    _temp = `${day}/${mon}/${ye}`
  } else {
    _temp = editState.value.consultDate
  }
  if (editState.value.serviceTypeId) {
    editState.value.serviceTypeId = parseInt(editState.value.serviceTypeId)
  }
  const res = await $fetch<CustomRes>(
    `/sys/appointment_record_info/queryAvailablePeriods`,
    {
      baseURL: runtimeConfig.public.apiBase,
      method: "get",
      query: {
        serviceTypeId: editState.value.serviceTypeId,
        consultDate: _temp,
        appointmentId: detailData.value.id,
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
    }
  )
  if (res.code === 0) {
    timeOptions.value = res.data
  } else {
    if (msg) msg(res.msg, "warning")
  }
}

watch(
  () => editState.value.consultDate,
  (val) => {
    if (editState.value.consultDate && editState.value.serviceTypeId) {
      getDic()
    }
  },
  {
    deep: true,
  }
)
watch(
  () => editState.value.serviceTypeId,
  (val) => {
    if (editState.value.consultDate && editState.value.serviceTypeId) {
      getDic()
    }
  },
  {
    deep: true,
  }
)
watch(
  () => editState.value.consultTime,
  (val) => {
    if (editState.value.consultTime?.length == 0) {
      timeOptions.value.map((k: any) => {
        k.disabled = false
      })
    }
    if (editState.value.consultTime?.length == 1) {
      timeOptions.value.map((k: any) => {
        if (
          !editState.value.consultTime.includes(k.id) &&
          k.id != editState.value.consultTime[0] + 1
        ) {
          k.disabled = true
        }
      })
    }
    if (editState.value.consultTime?.length == 2) {
      console.log("进来了")
      timeOptions.value.map((k: any) => {
        if (!editState.value.consultTime.includes(k.id)) {
          k.disabled = true
        }
      })
    }
  },
  {
    immediate: true,
    deep: true,
  }
)
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
      <div v-if="selectedIndex === 0" class="w-[70%]">
        <div v-if="showDetail" class="w-[100%]">
          <div class="flex items-center justify-between">
            <div @click="goback" class="flex items-center w-50 cursor-pointer">
              <Icon name="heroicons-outline:arrow-sm-left" class="mr-2" />
              <div class="ml-1">返回</div>
            </div>
            <div
              @click="printPage"
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
                <div class="text-md">{{ store.userInfo?.realName }}</div>
              </div>
              <div class="mb-5">
                <div class="text-[#8294BA] text-sm mb-[5px]">電郵地址:</div>
                <div class="text-md">{{ store.userInfo?.email }}</div>
              </div>
              <div>
                <div class="text-[#8294BA] text-sm mb-[5px]">聯絡電話:</div>
                <div class="text-md">{{ store.userInfo?.mobile }}</div>
              </div>
            </div>
            <div class="w-[65%]">
              <div>
                <div
                  class="bg-[#ECF8E9] w-full px-[20px] py-[10px] rounded-lg font-bold"
                >
                  預約記錄
                </div>
                <div class="py-5 px-5 w-[90%] flex justify-between">
                  <div class="mb-5">
                    <div class="mb-10">
                      <div class="text-[#8294BA] text-sm mb-[5px]">
                        預約編號:
                      </div>
                      <div v-if="detailData" class="text-md">
                        {{ detailData.appointmentCode }}
                      </div>
                    </div>
                    <div>
                      <div class="text-[#8294BA] text-sm mb-[5px]">
                        預約狀況:
                      </div>
                      <div
                        class="text-md"
                        v-if="detailData && detailData.state === 0"
                      >
                        未完成
                      </div>
                      <div
                        class="text-md"
                        v-else-if="detailData && detailData.state === 1"
                      >
                        已完成
                      </div>
                      <div
                        class="text-md"
                        v-else-if="detailData && detailData.state === 2"
                      >
                        已取消
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="text-[#8294BA] text-sm mb-[5px]">下單日期:</div>
                    <div v-if="detailData" class="text-md">
                      {{ detailData.createDate }}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div
                  class="bg-[#ECF8E9] w-full px-[20px] py-[10px] rounded-lg font-bold flex justify-between items-center"
                >
                  <div>諮詢資料</div>
                  <div
                    v-if="detailData && detailData.state == 0"
                    @click="showMod"
                    class="text-sm flex items-center text-[#6EA860] cursor-pointer"
                  >
                    <Icon name="material-symbols:edit"></Icon>
                    <div class="ml-1">更改</div>
                  </div>
                </div>
                <div class="py-5 px-5 w-[90%] flex justify-between">
                  <div class="mb-5">
                    <div class="mb-10">
                      <div class="text-[#8294BA] text-sm mb-[5px]">
                        諮詢類型:
                      </div>
                      <div v-if="detailData" class="text-md">
                        {{ detailData.serviceTypeName }}
                      </div>
                    </div>
                    <div>
                      <div class="text-[#8294BA] text-sm mb-[5px]">
                        案件日期:
                      </div>
                      <div v-if="detailData" class="text-md">
                        {{ detailData.caseDate }}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="text-[#8294BA] text-sm mb-[5px]">諮詢時間:</div>
                    <div v-if="detailData" class="text-md">
                      {{ detailData.consultDate }}
                    </div>
                    <div v-if="detailData" class="text-md">
                      {{ detailData.consultTime }}
                    </div>
                  </div>
                </div>
                <div class="px-5 w-[100%]">
                  <div>
                    <div class="text-[#8294BA] text-sm mb-[5px]">事件描述:</div>
                    <div v-if="detailData" class="text-md">
                      {{ detailData.describeInfo }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="w-[100%]">
          <div class="text-2xl font-bold">預約記錄</div>
          <div class="w-full mt-10 flex justify-between">
            <div class="w-[40%] flex items-center">
              <UInput
                v-if="selectedTabIndex == 0"
                v-model="searchVal"
                placeholder="搜尋"
                :ui="{ icon: { trailing: { pointer: '' } } }"
              >
                <template #trailing>
                  <UButton
                    v-show="true"
                    color="gray"
                    class="cursor-pointer"
                    variant="link"
                    icon="i-heroicons-arrow-long-right-20-solid"
                    :padded="false"
                    @click="getData"
                  />
                </template>
              </UInput>
              <VueDatePicker
                v-else
                :format="formatDefault"
                v-model="searchVal"
                placeholder="選擇日期"
                :enable-time-picker="false"
                locale="cn"
                cancel-text="close"
                select-text="select"
              ></VueDatePicker>
              <UButton
                v-show="true"
                color="gray"
                class="hover:text-white cursor-pointer bg-blue-400 px-3 py-2 text-sm text-white ml-5"
                variant="link"
                icon="i-heroicons-magnifying-glass-20-solid"
                :padded="false"
                @click="getData"
                >查詢</UButton
              >
              <UButton
                v-show="true"
                color="gray"
                class="hover:text-white cursor-pointer bg-[#FCB04C] px-3 py-2 text-sm text-white ml-5"
                variant="link"
                icon="i-heroicons-arrow-path-20-solid"
                :padded="false"
                @click="refrsh"
                >重置</UButton
              >
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
            <template #serviceTypeId-data="{ row }">
              <div>{{ row.serviceTypeName }}</div>
            </template>
            <template #state-data="{ row }">
              <div v-if="row.state === 0">未完成</div>
              <div v-else-if="row.state === 1">已完成</div>
              <div v-else-if="row.state === 2">已取消</div>
            </template>
            <template #actions-data="{ row }">
              <div
                @click="showDetailFn(row.id)"
                class="w-30 cursor-pointer px-2 h-8 flex justify-center items-center text-white bg-[#FCB04C]"
              >
                詳情
              </div>
            </template>
          </UTable>

          <div
            v-if="table.length > 10"
            class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
          >
            <UPagination
              :active-button="{ color: 'yellowbtn' }"
              v-model="current"
              :page-count="total"
              :total="table.length"
            />
          </div>
        </div>
      </div>
      <div v-else class="flex justify-start w-[70%]">
        <div class="w-[50%] flex flex-col bg-[#F7F7F7] p-5 py-10">
          <div class="text-xl mb-5">客戶資料</div>
          <div class="mb-5">
            <div class="text-[#8294BA] text-sm mb-[5px]">姓:</div>
            <div class="text-md">{{ store.userInfo?.surname }}</div>
          </div>
          <div class="mb-5">
            <div class="text-[#8294BA] text-sm mb-[5px]">名:</div>
            <div class="text-md">{{ store.userInfo?.firstName }}</div>
          </div>
          <div class="mb-5">
            <div class="text-[#8294BA] text-sm mb-[5px]">電郵地址:</div>
            <div class="text-md">{{ store.userInfo?.email }}</div>
          </div>
          <div>
            <div class="text-[#8294BA] text-sm mb-[5px]">聯絡電話:</div>
            <div class="text-md">{{ store.userInfo?.mobile }}</div>
          </div>

          <div
            class="w-full text-center flex items-center justify-center mt-10"
          >
            <div
              @click="rePaswd"
              class="py-2 text-sm px-3 border rounded-lg cursor-pointer mr-5"
            >
              修改密碼
            </div>
            <div
              @click="rename"
              class="py-2 text-sm px-3 border rounded-lg cursor-pointer mr-5"
            >
              修改帳戶
            </div>
            <div
              @click="dels"
              class="py-2 text-sm px-3 border rounded-lg cursor-pointer"
            >
              刪除帳戶
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="delisopen"
      class="absolute z-40 w-[400px] rounded-xl top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-5 px-10 box-border"
    >
      <div class="text-xl mb-10">刪除帳戶</div>
      <div class="font-normal">
        如刪除帳戶，你將無法再登入帳戶及查看過往記錄，請確認是否繼續
      </div>
      <div class="w-[80%] mx-auto flex justify-between mt-5">
        <div
          @click="delisopen = false"
          class="py-2 px-8 cursor-pointer bg-[#EAEAEA] flex justify-center items-center rounded-full"
        >
          取消
        </div>
        <div
          @click="confirmDel"
          class="py-2 px-10 cursor-pointer bg-[#DFEDDA] flex justify-center items-center rounded-full"
        >
          確認
        </div>
      </div>
    </div>
    <div
      v-if="renameopen"
      class="absolute z-40 2xl:w-[500px] w-[400px] rounded-xl top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-5 px-10 box-border"
    >
      <div class="text-xl mb-5">更改帳戶資料</div>
      <div class="font-normal">
        <UForm :state="renameState" class="my-3">
          <UFormGroup class="2xl:mb-5 mb-3">
            <template #label>
              <div class="text-gray-500 font-normal mb-2 inline-block">
                姓氏 名字
              </div>
            </template>
            <div class="flex items-center justify-between">
              <UInput
                class="w-[49%]"
                placeholder="姓"
                v-model="renameState.firstName"
              />
              <UInput
                class="w-[49%]"
                placeholder="名"
                v-model="renameState.surname"
              />
            </div>
          </UFormGroup>
          <UFormGroup name="mobile" class="2xl:mb-5 mb-3">
            <template #label>
              <div class="text-gray-500 font-normal mb-2 inline-block">
                聯絡電話
              </div>
            </template>
            <UInput placeholder="請輸入電話" v-model="renameState.mobile" />
          </UFormGroup>

          <UFormGroup name="email">
            <template #label>
              <div class="text-gray-500 font-normal mb-2 inline-block">
                電郵地址
              </div>
            </template>
            <UInput placeholder="請輸入電郵地址" v-model="renameState.email" />
          </UFormGroup>
        </UForm>
      </div>
      <div class="w-[100%] mx-auto flex justify-between mt-5">
        <div></div>
        <UButton
          @click="onRename"
          class="py-2 px-10 cursor-pointer flex justify-center items-center rounded-full"
        >
          確認
        </UButton>
      </div>
    </div>
    <div
      v-if="repwdopen"
      class="absolute z-40 2xl:w-[500px] w-[400px] rounded-xl top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-5 px-10 box-border"
    >
      <div class="text-xl mb-5">更改密碼</div>
      <div class="font-normal">
        <UForm :state="renameState" class="my-3">
          <UFormGroup required name="orgpwd" class="2xl:mb-5 mb-3">
            <template #label>
              <div class="text-gray-500 font-normal mb-2 inline-block">
                舊密碼
              </div>
            </template>
            <UInput
              class="w-[100%]"
              type="password"
              placeholder="請輸入舊密碼"
              v-model="rePwdState.orgpwd"
            />
          </UFormGroup>
          <UFormGroup required name="newpwd" class="2xl:mb-5 mb-3">
            <template #label>
              <div class="text-gray-500 font-normal mb-2 inline-block">
                新密碼
              </div>
            </template>
            <UInput
              type="password"
              placeholder="請輸入新密碼"
              v-model="rePwdState.newpwd"
            />
          </UFormGroup>

          <UFormGroup required name="checkpwd">
            <template #label>
              <div class="text-gray-500 font-normal mb-2 inline-block">
                確認密碼
              </div>
            </template>
            <UInput
              type="password"
              placeholder="請確認新密碼"
              v-model="rePwdState.checkpwd"
            />
          </UFormGroup>
        </UForm>
      </div>
      <div class="w-[100%] mx-auto flex justify-between mt-5">
        <div></div>
        <UButton
          @click="onRePwd"
          class="py-2 px-10 cursor-pointer flex justify-center items-center rounded-full"
        >
          確認
        </UButton>
      </div>
    </div>
    <div v-if="delisopen" class="mask" @click="hideDialog"></div>
    <div v-if="renameopen" class="mask" @click="hideDialog"></div>
    <div v-if="repwdopen" class="mask" @click="hideDialog"></div>

    <div
      v-if="isEditOpen"
      style="z-index: 40"
      class="absolute w-[550px] rounded-xl box-border bg-white 2xl:top-[15%] top-[15%] left-[50%] translate-x-[-50%]"
    >
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <div class="flex justify-end">
          <Icon
            @click="closeEdit"
            class="cursor-pointer"
            name="ic:outline-close"
          ></Icon>
        </div>
        <UForm @submit="onEdit" :state="editState" class="my-5 mb-5">
          <UFormGroup label="諮詢類型" name="serviceTypeId" required>
            <USelect
              size="lg"
              v-model="editState.serviceTypeId"
              :options="serviceTypeOptions"
              option-attribute="name"
              placeholder="選擇項目"
            />
          </UFormGroup>
          <div class="mt-3">
            <UFormGroup label="諮詢時間" name="consultDate" required>
              <VueDatePicker
                :format="formatDefault"
                v-model="editState.consultDate"
                placeholder="選擇日期"
                :allowed-dates="allowedDates"
                :enable-time-picker="false"
                locale="cn"
                cancel-text="close"
                select-text="select"
              ></VueDatePicker>
            </UFormGroup>
          </div>
          <div class="mt-3 flex justify-between">
            <UFormGroup class="w-[100%]" name="consultTime">
              <USelectMenu
                :disabled="disabledTime"
                size="lg"
                multiple
                v-model="editState.consultTime"
                :options="timeOptions"
                value-attribute="id"
                option-attribute="times"
                placeholder="選擇時段"
              >
                <template #empty> 无数据 </template></USelectMenu
              >
            </UFormGroup>
          </div>
          <div class="mt-4">
            <UFormGroup label="案件日期" name="caseDate">
              <VueDatePicker
                :format="formatDefault"
                v-model="editState.caseDate"
                placeholder="選擇日期"
                :enable-time-picker="false"
                locale="cn"
              ></VueDatePicker>
            </UFormGroup>
          </div>
          <div class="mt-4">
            <UFormGroup label="事件描述" name="describeInfo">
              <UTextarea size="lg" v-model="editState.describeInfo" />
            </UFormGroup>
          </div>
          <div class="w-full flex justify-end mt-5">
            <button
              type="submit"
              class="bg-[#DEECDB] w-40 py-2 rounded-full text-md font-semibold flex justify-center items-center cursor-pointer"
            >
              確認
            </button>
          </div>
        </UForm>
      </UCard>
    </div>
    <div v-if="isEditOpen" class="mask" @click="isEditOpen = false"></div>
  </div>
</template>

<style lang="scss" scoped>
.mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba($color: #000000, $alpha: 0.2);
  z-index: 30;
}
.active {
  background-color: #eaeff9;
}
.activeTab {
  border: 1px solid gray;
}
.mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba($color: #000000, $alpha: 0.2);
  z-index: 30;
}
</style>
