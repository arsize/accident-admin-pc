// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  css: [
    "~/assets/css/index.css",
    "~/assets/css/main.css",
    "~/assets/css/animation.css",
    "@vuepic/vue-datepicker/dist/main.css",
  ],
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
  build: {
    transpile: ["@vuepic/vue-datepicker"],
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
  runtimeConfig: {
    public: {
      apiBase: "/server",
      gtagId: "G-0W6FFPBY2X",
    },
  },
  nitro: {
    devProxy: {
      "/server": {
        target: "https://121.43.49.249/api",
        changeOrigin: true,
      },
    },
    routeRules: {
      "/server/**": {
        proxy: "https://121.43.49.249/api/**",
      },
      "/appointment": {
        ssr: false,
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
  swiper: {},
  plugins: [
    // 在plugins中封装百度 谷歌 等统计脚本，可在次引入
  ],
})
