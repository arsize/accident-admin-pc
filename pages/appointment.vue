<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types"
import LoginPanel from "@/components/LoginPanel.vue"
import { useStore } from "~/store"
import type { CustomRes, ServiceType, DateTimes } from "@/types"
import type { MsgEnum } from "@/app.vue"
const store = useStore()
import VueDatePicker from "@vuepic/vue-datepicker"
import "@vuepic/vue-datepicker/dist/main.css"
import { useRouter } from "vue-router"

const router = useRouter()
const runtimeConfig = useRuntimeConfig()
const msg = inject<(text?: string, type?: MsgEnum) => void>("message")

useHead({
  title: "預約諮詢-交通意外傷亡及工業傷亡支援中心",
  meta: [],
  bodyAttrs: {},
  script: [],
})

const state = reactive<{
  [key: string]: any
}>({
  surname: undefined,
  firstName: undefined,
  email: undefined,
  telephone: undefined,
  serviceTypeId: undefined,
  serviceTypeName: "",
  caseDate: undefined,
  consultDate: undefined,
  consultTime: [],
  describeInfo: undefined,
})

const timeOptions = ref<any>([])
const getDic = async () => {
  let _temp = ""
  timeOptions.value = []
  state.consultTime = []
  if (state.consultDate) {
    let day = state.consultDate.getDate()
    let mon = state.consultDate.getMonth() + 1
    let ye = state.consultDate.getFullYear()
    _temp = `${day}/${mon}/${ye}`
  }

  if (state.serviceTypeId) {
    state.serviceTypeId = parseInt(state.serviceTypeId)
  }
  const res = await $fetch<CustomRes>(
    `/sys/appointment_record_info/queryAvailablePeriods`,
    {
      baseURL: runtimeConfig.public.apiBase,
      method: "get",
      query: {
        serviceTypeId: state.serviceTypeId,
        consultDate: _temp,
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
// 登入
const showLoginPanel = ref(false)
const login = () => {
  showLoginPanel.value = true
}
const handleUpdate = (nmesg: boolean) => {
  showLoginPanel.value = nmesg
}

// 预约
async function onSubmit(event: FormSubmitEvent<any>) {
  if (!state.firstName) {
    if (msg) msg("请填写姓", "warning")
    return
  }
  if (!state.surname) {
    if (msg) msg("请填写名", "warning")
    return
  }
  if (!state.email) {
    if (msg) msg("请填写電郵地址", "warning")
    return
  }
  if (!state.telephone) {
    if (msg) msg("请填写聯絡電話", "warning")
    return
  }
  if (!state.serviceTypeId) {
    if (msg) msg("请選擇諮詢類型", "warning")
    return
  }
  if (!state.consultDate) {
    if (msg) msg("请選擇諮詢日期", "warning")
    return
  }

  // 咨询类型
  state.serviceTypeId = parseInt(state.serviceTypeId)
  serviceTypeOptions.value.map((k) => {
    if (k.id === state.serviceTypeId) {
      state.serviceTypeName = k.name ?? ""
    }
  })

  if (state.consultDate) {
    let day = state.consultDate.getDate()
    let mon = state.consultDate.getMonth() + 1
    let ye = state.consultDate.getFullYear()
    state.consultDate = `${day}/${mon}/${ye}`
  }

  // 日期时间
  if (state.caseDate) {
    state.caseDate = `${state.caseDate.getDate()}/${
      state.caseDate.getMonth() + 1
    }/${state.caseDate.getFullYear()}`
  }

  // 预约时间
  console.log("xxxxxxxxxxxxxxxxx", state.consultTime)
  console.log("yyyyyyyyyy", state.consultTime.length)
  if (state.consultTime?.length > 0) {
    if (state.consultTime?.length == 1) {
      timeOptions.value.map((k: any) => {
        if (k.id == state.consultTime[0]) {
          state.consultTime = k.times
        }
      })
    } else if (state.consultTime?.length == 2) {
      let _result = ""
      timeOptions.value.map((k: any) => {
        if (k.id == state.consultTime[0]) {
          _result = k.times
        }
      })
      timeOptions.value.map((k: any) => {
        if (k.id == state.consultTime[1]) {
          _result = _result + "," + k.times
        }
      })
      state.consultTime = _result
    }
  }

  let json = {
    surname: state.surname,
    firstName: state.firstName,
    email: state.email,
    telephone: state.telephone,
    serviceTypeId: state.serviceTypeId,
    serviceTypeName: state.serviceTypeName,
    caseDate: state.caseDate,
    consultDate: state.consultDate,
    consultTime: state.consultTime,
    describeInfo: state.describeInfo,
  }

  console.log(JSON.stringify(json))

  const stateRes: any = await $fetch<CustomRes>(
    `/sys/appointment_record_info`,
    {
      baseURL: runtimeConfig.public.apiBase,
      method: "post",
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
    }
  )

  if (stateRes.code === 0) {
    if (msg) {
      msg("预约成功", "success")
    }
    router.push({
      path: "/manageAppoint",
    })
  } else {
    if (msg) {
      msg(stateRes.msg, "warning")
    }
  }
}

// 选择日期
// 100天内
const allowedDates = computed(() => {
  let allowD = [new Date()]
  for (let i = 1; i < 300; i++) {
    allowD.push(new Date(new Date().setDate(new Date().getDate() + i)))
  }
  return allowD
})

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
    console.log("serviceTypeOptions", serviceTypeOptions.value)
  }
}

const scrollToTop = () => {
  document.getElementById("layout-box")?.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

const initializationData = () => {
  state.firstName = store.userInfo?.firstName
  state.surname = store.userInfo?.surname
  state.email = store.userInfo?.email
  state.telephone = store.userInfo?.mobile
}

const formatDefault = (date: any) => {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

watch(
  () => state.consultDate,
  (val) => {
    if (state.consultDate && state.serviceTypeId) {
      getDic()
    }
  },
  {
    deep: true,
  }
)
watch(
  () => state.serviceTypeId,
  (val) => {
    if (state.consultDate && state.serviceTypeId) {
      getDic()
    }
  },
  {
    deep: true,
  }
)

watch(
  () => state.consultTime,
  (val) => {
    console.log("state.consultTime", state.consultTime)
    if (state.consultTime?.length == 0) {
      console.log("1")
      timeOptions.value.map((k: any) => {
        k.disabled = false
      })
    }
    if (state.consultTime?.length == 1) {
      console.log("2")
      timeOptions.value.map((k: any) => {
        if (
          !state.consultTime.includes(k.id) &&
          k.id != state.consultTime[0] + 1
        ) {
          k.disabled = true
        }
      })
    }
    if (state.consultTime?.length == 2) {
      console.log("3")
      timeOptions.value.map((k: any) => {
        if (!state.consultTime.includes(k.id)) {
          k.disabled = true
        }
      })
    }
  },
  {
    deep: true,
  }
)

onMounted(() => {
  scrollToTop()
  getServiceOptions()
  initializationData()
})
</script>

<template>
  <div>
    <div
      class="bg-[#EEF8FE] 2xl:h-64 h-48 2xl:text-6xl text-5xl p text-custom-blue font-semibold font-NotoHk tracking-widest flex items-center"
    >
      <div class="container mx-auto pl-5">預約諮詢</div>
    </div>
    <div class="bottom-round-bar"></div>
    <div v-if="!store.token">
      <div
        class="2xl:w-[800px] w-[800px] mx-auto mt-20 text-xl font-light tracking-widest flex justify-center"
      >
        歡迎你來預約諮詢，請先登入後或註冊後再進行預約
      </div>
      <div
        @click="login"
        class="w-[200px] bg-[#DFEDDA] hover:bg-[#E5F4E2] rounded-xl h-10 flex justify-center items-center mx-auto 2xl:mt-20 mt-14 cursor-pointer"
      >
        登入/登記
      </div>
    </div>
    <div v-else class="flex container justify-between mx-auto mt-[80px] px-5">
      <div class="left w-1/3" v-if="store.userInfo">
        <div class="text-3xl font-semibold mb-5">
          你好，{{ `${store.userInfo.realName}` }}
        </div>
        <div class="leading-loose text-[#707070]">
          歡迎你來預約諮詢。請填寫右方表格進
          行預約，當我方接收到你的預約訊息時，
          會再聯絡你確實預約詳情。你亦可前往
          <span class="text-custom-blue font-bold cursor-pointer"
            >管理預約申請&nbsp;</span
          >查看過往的紀錄。
        </div>
        <NuxtLink
          to="/manageAppoint"
          class="bg-[#85C8EE] text-custom-blue w-[90%] mt-20 cursor-pointer font-bold h-[40px] flex justify-center items-center rounded-full"
        >
          管理預約申請
        </NuxtLink>
      </div>
      <div class="right p-8 w-[55%] pt-10 box-border border rounded-2xl">
        <div class="font-bold">預約諮詢服務</div>
        <div>
          <UForm :state="state" class="space-y-4" @submit="onSubmit">
            <div class="w-full flex my-5 justify-between">
              <div class="w-[48%]">
                <div class="flex justify-between w-full">
                  <UFormGroup
                    label="你的姓名"
                    class="w-[49%]"
                    name="firstName"
                    required
                  >
                    <UInput
                      size="lg"
                      v-model="state.firstName"
                      placeholder="姓"
                    />
                  </UFormGroup>
                  <UFormGroup name="surname" class="w-[49%]">
                    <template #label>
                      <div class="h-[24px]"></div>
                    </template>
                    <UInput
                      size="lg"
                      v-model="state.surname"
                      placeholder="名"
                    />
                  </UFormGroup>
                </div>
                <div class="mt-3">
                  <UFormGroup label="聯絡電話" name="telephone" required>
                    <UInput size="lg" v-model="state.telephone" />
                  </UFormGroup>
                </div>
                <div class="h-[40px]"></div>
                <div class="mt-2">
                  <UFormGroup label="諮詢類型" name="serviceTypeId" required>
                    <USelect
                      size="lg"
                      v-model="state.serviceTypeId"
                      :options="serviceTypeOptions"
                      option-attribute="name"
                      placeholder="選擇項目"
                    />
                  </UFormGroup>
                </div>
                <div class="mt-3">
                  <UFormGroup label="諮詢時間" name="consultDate" required>
                    <VueDatePicker
                      :format="formatDefault"
                      v-model="state.consultDate"
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
                      size="lg"
                      multiple
                      v-model="state.consultTime"
                      :options="timeOptions"
                      value-attribute="id"
                      option-attribute="times"
                      placeholder="選擇時段"
                    >
                      <template #empty> 无数据 </template></USelectMenu
                    >
                  </UFormGroup>
                </div>
              </div>
              <div class="w-[48%]">
                <UFormGroup label="電郵地址" name="email" required>
                  <UInput
                    size="lg"
                    v-model="state.email"
                    placeholder="電郵地址"
                  />
                </UFormGroup>
                <div class="h-[110px]"></div>
                <div class="mt-4">
                  <UFormGroup label="案件日期" name="caseDate">
                    <VueDatePicker
                      :format="formatDefault"
                      v-model="state.caseDate"
                      placeholder="選擇日期"
                      :enable-time-picker="false"
                      locale="cn"
                    ></VueDatePicker>
                  </UFormGroup>
                </div>
                <div class="mt-4">
                  <UFormGroup label="事件描述" name="describeInfo">
                    <UTextarea size="lg" v-model="state.describeInfo" />
                  </UFormGroup>
                </div>
              </div>
            </div>
            <div class="w-full flex justify-end">
              <button
                type="submit"
                class="bg-[#DEECDB] w-40 py-2 rounded-full text-md font-semibold flex justify-center items-center cursor-pointer"
              >
                确定预约
              </button>
            </div>
          </UForm>
        </div>
      </div>
    </div>

    <LoginPanel v-if="showLoginPanel" @update:showLoginPanel="handleUpdate" />
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
