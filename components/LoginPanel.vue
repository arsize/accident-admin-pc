<script setup>
const emit = defineEmits("update:showLoginPanel")
const hideDialog = () => {
  emit("update:showLoginPanel", false)
}
</script>

<template>
  <div
    style="z-index: 100"
    class="absolute w-1/2 h-[350px] bg-white top-[30%] left-[50%] translate-x-[-50%]"
  >
    hello
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
