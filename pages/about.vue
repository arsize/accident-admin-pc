<script setup lang="ts">
useHead({
  title: "關於中心-交通意外傷亡及工業傷亡支援中心",
  meta: [],
  bodyAttrs: {},
  script: [],
})
const scrollToTop = () => {
  document.getElementById("layout-box")?.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}
onMounted(() => {
  scrollToTop()
})
</script>

<template>
  <div>
    <div
      class="bg-[#F7F7F7] 2xl:h-64 h-48 2xl:text-6xl text-5xl p text-custom-blue font-semibold font-NotoHk tracking-widest flex items-center"
    >
      <div class="container mx-auto pl-5">關於中心</div>
    </div>
    <div class="bottom-round-bar"></div>
    <div class="2xl:w-[1500px] w-[1000px] mx-auto mt-20">
      <div class="font-normal leading-relaxed text-[#707070]">
        我們的交通意外及工傷賠償專頁致力為傷者及其家人提供免費法律知識和支援服務。我們明白當遇到交通事故或工傷意外時會感到無助和困惑，不清楚自己有哪些法律權益以及如何進行相關法律程序。因此，我們的專頁包括了以下內容：交通意外傷亡支援服務，專為交通意外傷者及其家人提供法律支援服務，幫助他們瞭解自己在交通意外中的法律權益，以及如何處理此類意外的步驟和注意事項。此外，我們還提供一些小貼士和建議，幫助傷者更有效地應對交通意外所需要處理的問題並保障自己的權益。
        <div class="h-10"></div>
        另一方面，我們亦會協助傷者了解政府的交通意外賠償計劃資訊，讓傷者可從多方面了解自己可能獲得的援助。透過我們的專業分析和建議，
        能夠幫助傷者選擇合適的解決方案。
        除此之外，我們的專頁也致力為工傷受害者及其家人提供法律支援服務。
        當中包括了工傷意外的法律權益，法律程序和步驟，以及應該注意的事項和一些小貼士。我們亦可以協助傷者了解法律援助署所提供的法律服務，
        幫助工傷受害者分析如何尋找合適的法律專業人士並提供支援。
        本專頁的創辦人曾於律師樓工作期間經歷過三次交通意外，因此深深理解一般市民在遇到交通意外或工傷時的無助感和困惑。他們可能會顧慮到雇佣律師的昂貴費用而不敢爭取自己應有的法律權益。
        <div class="h-10"></div>
        因此，創辦人除了在本地進修法律知識外，還希望可以透過這個免費的平台分享更多法律知識給大眾市民，並為傷者及其家人提供專業分析、
        尋找合適的法律支援。我們深信，本專頁能夠幫助大眾市民在面對交通意外或工傷時更清晰及有效地爭取應有的權益。
      </div>
      <img class="mt-10 w-full" src="~/assets/images/hand.jpg" alt="" />
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
    background-color: #f7f7f7;
  }
}
</style>
