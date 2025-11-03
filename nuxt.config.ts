// import re from "./deployment/_nuxt/CGgmE9Bj";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "nuxt-primevue",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  imports: {
    dirs: ["./stores"],
  },
  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },
  app: {
    head: {
      title: "سواعد التمكين ",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {name:"viewport"  , content:"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"}
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/imgs/logo2.png" },],
    },
  },
  experimental:{
    payloadExtraction: false
  },
  i18n: {
    lazy: true,
    langDir: "locales",
    locales: [
      {
        code: "ar",
        name: "Arabic",
        iso: "ar",
        file: "ar.json",
        dir: "rtl",
      },
      {
        code: "en",
        name: "English",
        iso: "en",
        file: "en.json",
        dir: "ltr",
      },
    ],
    defaultLocale: "ar",
    strategy: "prefix_except_default", // Prefix all except the default language
    detectBrowserLanguage: false,
  },
  build: {
    transpile: [
      "@fortawesome/vue-fontawesome",
      "@fortawesome/fontawesome-svg-core",
      "@fortawesome/free-solid-svg-icons",
      "@fortawesome/free-regular-svg-icons",
      "@fortawesome/free-brands-svg-icons",
      "vue-toastification",
    ],
  },
  css: [
    "bootstrap/dist/css/bootstrap.css",
    "primevue/resources/themes/lara-light-green/theme.css",
    "@/assets/sass/main.css"
  ],
  primevue: {
    cssLayerOrder: "reset,primevue",
  }
});
