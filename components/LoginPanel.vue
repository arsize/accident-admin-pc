<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types"
import type { CustomRes, LoginInfo, UserInfo } from "@/types/index"
import type { MsgEnum } from "@/app.vue"
import { useStore } from "~/store"
import config from "~/utils/global"
const store = useStore()
import { inject } from "vue"

const msg = inject<(text?: string, type?: MsgEnum) => void>("message")

const emit = defineEmits(["update:showLoginPanel"])
const hideDialog = () => {
  emit("update:showLoginPanel", false)
}

// 登入
const loginState = reactive({
  email: undefined,
  password: undefined,
})
const validateLogin = (state: any): FormError[] => {
  const errors = []
  if (!state.email) errors.push({ path: "email", message: "請輸入電話/電郵" })
  if (!state.password) {
    errors.push({ path: "password", message: "請輸入密碼" })
  }
  return errors
}
const onLogin = async () => {
  const { data } = await useFetch<CustomRes>(
    `${config.APIURL}/sys/auth/account/login`,
    {
      method: "POST",
      body: {
        account: loginState.email,
        password: loginState.password,
      },
    }
  )
  if (data.value?.code !== 0) {
    if (msg) msg(data.value?.msg, "warning")
  } else {
    store.token = data.value?.data?.access_token ?? ""

    const _usfo = await useFetch<CustomRes>(`${config.APIURL}/sys/user/info`, {
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
    if (_usfo.data.value?.code !== 0) {
      if (msg) msg(_usfo.data.value?.msg, "warning")
    } else {
      store.userInfo = _usfo.data.value.data ?? null
      hideDialog()
    }
  }
}

// 注册
const registerState = reactive({
  firstName: undefined,
  surname: undefined,
  mobile: undefined,
  email: undefined,
  password: undefined,
  confirmPassword: undefined,
})
const validateRegister = (state: any): FormError[] => {
  const errors = []
  if (!state.email) {
    errors.push({ path: "email", message: "請輸入電郵地址" })
  }
  if (!state.mobile) {
    errors.push({ path: "mobile", message: "請輸入聯絡電話" })
  }
  if (!state.password) {
    errors.push({ path: "password", message: "請輸入密碼" })
  }
  if (!state.confirmPassword) {
    errors.push({ path: "confirmPassword", message: "請確認密碼" })
  }
  if (state.confirmPassword !== state.password) {
    errors.push({ path: "confirmPassword", message: "两次密碼不一致" })
  }
  return errors
}
const onRegister = async () => {
  const { data } = await useFetch<CustomRes>(
    `${config.APIURL}/sys/user/register`,
    {
      method: "POST",
      body: {
        surname: registerState.surname,
        firstName: registerState.firstName,
        email: registerState.email,
        mobile: registerState.mobile,
        password: registerState.password,
      },
    }
  )
  console.log("data.value?.code", data.value?.code)
  if (data.value?.code !== 0) {
    if (msg) msg(data.value?.msg, "warning")
  } else {
    if (msg) msg(data.value?.msg, "success")
    hideDialog()
  }
}
</script>

<template>
  <div
    style="z-index: 40"
    class="absolute 2xl:w-2/5 w-[850px] rounded-xl box-border bg-white 2xl:top-[15%] top-[15%] left-[50%] translate-x-[-50%]"
  >
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <div class="flex box-border pt-2">
        <div
          class="w-1/2 box-border border-r flex flex-col justify-start items-center"
        >
          <div class="w-[75%]">
            <div>帳戶登入</div>
            <UForm
              :validate="validateLogin"
              @submit="onLogin"
              :state="loginState"
              class="my-5 mb-5"
            >
              <UFormGroup name="email" class="2xl:mb-5 mb-3" required>
                <template #label>
                  <div class="text-gray-500 font-normal mb-2 inline-block">
                    電話/電郵
                  </div>
                </template>
                <UInput
                  placeholder="請輸入電話/電郵"
                  v-model="loginState.email"
                />
              </UFormGroup>

              <UFormGroup name="password" required>
                <template #label>
                  <div class="text-gray-500 font-normal mb-2 inline-block">
                    帳戶密碼
                  </div>
                </template>
                <UInput
                  placeholder="請輸入賬戶密碼"
                  v-model="loginState.password"
                  type="password"
                />
              </UFormGroup>

              <UButton
                type="submit"
                class="w-[90%] bg-[#DEECDB] hover:bg-[#E5F4E2] rounded-full h-10 flex justify-center items-center text-custom-blue mt-10 cursor-pointer"
              >
                登入
              </UButton>
            </UForm>
          </div>
        </div>
        <div class="w-1/2 box-border flex flex-col justify-start items-center">
          <div class="w-[75%]">
            <div>登記賬戶</div>
            <UForm
              @submit="onRegister"
              :validate="validateRegister"
              :state="registerState"
              class="my-5 2xl:mb-10 mb-5"
            >
              <div class="text-gray-500 font-normal mb-2 inline-block text-sm">
                你的姓稱
              </div>
              <div class="flex justify-between items-center w-[100%] mb-3">
                <UFormGroup name="firstName" class="w-[49%]" required>
                  <UInput
                    class="w-[100%]"
                    v-model="registerState.firstName"
                    placeholder="姓"
                  />
                </UFormGroup>
                <UFormGroup class="w-[49%]" name="surname">
                  <UInput
                    class="w-[100%]"
                    v-model="registerState.surname"
                    placeholder="名"
                  />
                </UFormGroup>
              </div>

              <UFormGroup name="mobile" class="2xl:mb-5 mb-3" required>
                <template #label>
                  <div class="text-gray-500 font-normal mb-2 inline-block">
                    聯絡電話
                  </div>
                </template>
                <UInput
                  v-model="registerState.mobile"
                  placeholder="請輸入聯絡電話"
                />
              </UFormGroup>
              <UFormGroup name="email" class="2xl:mb-5 mb-3" required>
                <template #label>
                  <div class="text-gray-500 font-normal mb-2 inline-block">
                    電郵地址
                  </div>
                </template>
                <UInput
                  v-model="registerState.email"
                  placeholder="請輸入電郵地址"
                />
              </UFormGroup>
              <UFormGroup name="password" class="2xl:mb-5 mb-3" required>
                <template #label>
                  <div class="text-gray-500 font-normal mb-2 inline-block">
                    輸入密碼
                  </div>
                </template>
                <UInput
                  v-model="registerState.password"
                  placeholder="請輸入密碼"
                  type="password"
                />
              </UFormGroup>
              <UFormGroup name="confirmPassword" required>
                <template #label>
                  <div class="text-gray-500 font-normal mb-2 inline-block">
                    確認密碼
                  </div>
                </template>
                <UInput
                  v-model="registerState.confirmPassword"
                  placeholder="請確認密碼"
                  type="password"
                />
              </UFormGroup>

              <UButton
                type="submit"
                class="w-[90%] bg-[#85C8EE] hover:bg-[#88CCF3] rounded-full h-10 flex justify-center items-center text-custom-blue 2xl:mt-10 mt-5 cursor-pointer"
              >
                登記
              </UButton>
            </UForm>
          </div>
        </div>
      </div>
      <UButton
        color="gray"
        variant="ghost"
        icon="i-heroicons-x-mark-20-solid"
        class="absolute top-3 right-3 cursor-pointer"
        @click="hideDialog"
      />
    </UCard>
  </div>

  <div class="mask" @click="hideDialog"></div>
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
</style>
