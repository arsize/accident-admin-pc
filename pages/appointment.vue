<script setup>
useHead({
  title: "预约咨询-交通意外伤亡及工业伤亡支援中心",
  meta: [],
  bodyAttrs: {},
  script: [],
})
</script>

<template>
  <div>
    <div
      class="bg-[#EEF8FE] 2xl:h-64 h-48 2xl:text-6xl text-5xl p text-custom-blue font-semibold font-NotoHk tracking-widest flex items-center"
    >
      <div class="container mx-auto pl-5">預約咨詢</div>
    </div>
    <div class="bottom-round-bar"></div>
    <div
      class="2xl:w-[800px] w-[800px] mx-auto mt-20 text-xl font-light tracking-widest flex justify-center"
    >
      歡迎你來預約咨詢，請先登入後或註冊後再進行預約
    </div>
    <div
      class="w-[200px] bg-[#DFEDDA] rounded-xl h-10 flex justify-center items-center mx-auto mt-20 cursor-pointer"
    >
      登入/登記
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
    background-color: #eef8fe;
  }
}
</style>
