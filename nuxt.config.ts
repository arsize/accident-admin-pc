// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  css: ["~/assets/css/main.css", "~/assets/css/animation.css"],
  modules: [
    "nuxt-icon",
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@nuxtjs/google-fonts",
    "nuxt-swiper",
    "nuxt-aos",
    "v-wave/nuxt",
  ],
  ssr: true,
  vWave: {
    color: "#BDC9B9",
    easing: "ease-in",
    initialOpcity: 0.1,
  },
  typescript: {
    typeCheck: false,
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
    locales: ["cn", "en"],
    defaultLocale: "cn",
    vueI18n: "./i18n.config.ts",
  },
  swiper: {
    modules: ["navigation", "pagination", "effect-creative"],
  },
  plugins: [
    // 在plugins中封装百度 谷歌 等统计脚本，可在次引入
  ],
})
