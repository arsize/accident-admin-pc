<script setup>
useHead({
  title: "联系我们-交通意外伤亡及工业伤亡支援中心",
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
      <div class="container mx-auto pl-5">聯絡我們</div>
    </div>
    <div class="bottom-round-bar"></div>
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
