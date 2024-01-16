<script setup lang="ts">
import config from "~/utils/global"
const emit = defineEmits(["update:showLoginPanel"])
const hideDialog = () => {
  emit("update:showLoginPanel", false)
}

const state = reactive({
  email: undefined,
  password: undefined,
})

const register = async () => {
  console.log("register")
  const res = await useFetch(`${config.APIURL}/sys/user/register`, {
    method: "POST",
    body: {
      surname: "理员",
      firstName: "管",
      email: "1234567@qq.com",
      mobile: "13471254466",
      password: "123456",
    },
  })
}
const login = async () => {
  const res = await useFetch(`${config.APIURL}/sys/auth/account/login`, {
    method: "POST",
    body: {
      account: "13471254466",
      password: "123456",
    },
  })
}
</script>

<template>
  <div
    style="z-index: 100"
    class="absolute 2xl:w-2/5 w-[850px] rounded-xl box-border bg-white 2xl:top-[15%] top-[11%] left-[50%] translate-x-[-50%]"
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
            <UForm :state="state" class="my-5 mb-10">
              <UFormGroup name="email" class="mb-5">
                <template #label>
                  <div class="text-gray-500 font-normal mb-2">電話/電郵</div>
                </template>
                <UInput v-model="state.email" />
              </UFormGroup>

              <UFormGroup name="password">
                <template #label>
                  <div class="text-gray-500 font-normal mb-2">帳戶密碼</div>
                </template>
                <UInput v-model="state.password" type="password" />
              </UFormGroup>

              <div
                @click="login"
                class="w-[90%] bg-[#DEECDB] hover:bg-[#E5F4E2] rounded-full h-10 flex justify-center items-center text-custom-blue mt-10 cursor-pointer"
              >
                登入
              </div>
            </UForm>
          </div>
        </div>
        <div class="w-1/2 box-border flex flex-col justify-start items-center">
          <div class="w-[75%]">
            <div>登記賬戶</div>
            <UForm :state="state" class="my-5 mb-10">
              <UFormGroup name="email" class="mb-5">
                <template #label>
                  <div class="text-gray-500 font-normal mb-2">你的姓稱</div>
                </template>
                <div class="flex justify-between">
                  <UInput
                    class="w-[49%]"
                    v-model="state.email"
                    placeholder="姓"
                  />
                  <UInput
                    class="w-[49%]"
                    v-model="state.email"
                    placeholder="名"
                  />
                </div>
              </UFormGroup>

              <UFormGroup name="password" class="mb-5">
                <template #label>
                  <div class="text-gray-500 font-normal mb-2">聯絡電話</div>
                </template>
                <UInput v-model="state.password" type="password" />
              </UFormGroup>
              <UFormGroup name="password" class="mb-5">
                <template #label>
                  <div class="text-gray-500 font-normal mb-2">電郵地址</div>
                </template>
                <UInput v-model="state.password" type="password" />
              </UFormGroup>
              <UFormGroup name="password" class="mb-5">
                <template #label>
                  <div class="text-gray-500 font-normal mb-2">輸入密碼</div>
                </template>
                <UInput v-model="state.password" type="password" />
              </UFormGroup>
              <UFormGroup name="password">
                <template #label>
                  <div class="text-gray-500 font-normal mb-2">確認密碼</div>
                </template>
                <UInput v-model="state.password" type="password" />
              </UFormGroup>

              <div
                @click="register"
                class="w-[90%] bg-[#85C8EE] hover:bg-[#88CCF3] rounded-full h-10 flex justify-center items-center text-custom-blue mt-10 cursor-pointer"
              >
                登記
              </div>
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
  z-index: 50;
}
</style>
