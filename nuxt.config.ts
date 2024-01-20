import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  css: ["~/assets/css/main.css", "~/assets/css/animation.css"],
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@nuxtjs/google-fonts",
    "nuxt-swiper",
    "nuxt-aos",
    "v-wave/nuxt",
    "@nuxt/ui",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  colorMode: {
    preference: "light",
  },
  ssr: true,
  vWave: {
    color: "#000",
    easing: "ease-in",
    initialOpcity: 0.2,
    finalOpacity: 0.1,
  },
  typescript: {
    typeCheck: false,
  },
  nitro: {
    devProxy: {
      "/api": {
        target: "http://121.43.49.249:8080",
        changeOrigin: true,
      },
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  googleFonts: {
    families: {
      Roboto: true,
      Inter: [400, 700],
      "Open Sans": true,
    },
  },
  i18n: {
    locales: ["cn"],
    defaultLocale: "cn",
    vueI18n: "./i18n.config.ts",
  },
  swiper: {
    modules: ["navigation", "pagination", "effect-creative", "autoplay"],
  },
  plugins: [
    // 在plugins中封装百度 谷歌 等统计脚本，可在次引入
  ],
})
