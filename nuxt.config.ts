export default defineNuxtConfig({
  
  devtools: { enabled: true },
  modules: [
    "nuxt-primevue",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  imports: {
    dirs: ['./stores'],
  },
 
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },
  app: {
    head: {
      title: "Ayadina",
    },
  },

  i18n: {
    lazy: true,
    langDir: "locales",
    strategy: "prefix_except_default",
    locales: [
      {
        code: "en",
        name: "En",
        file: "en.json",
        iso: 'en-US',
        dir: "ltr",
      },
      {
        code: "ar",
        name: "Ar",
        file: "ar.json",
        iso: 'ar-AR',
        dir: "rtl",
      },
    ],
    defaultLocale: "ar",
    // vueI18n: {
    //   fallbackLocale: "en",
    //   locale : 'ar'  || defaultLocale ,
     
    // },
  },
  build: {
    transpile: [
      "@fortawesome/vue-fontawesome",
      "@fortawesome/fontawesome-svg-core",
      "@fortawesome/free-solid-svg-icons",
      "@fortawesome/free-regular-svg-icons",
      "@fortawesome/free-brands-svg-icons",
      'vue-toastification'
    ],
  },
  css: [
    "primevue/resources/themes/lara-light-green/theme.css",
    "bootstrap/dist/css/bootstrap.css",
    "assets/sass/main.scss",
  ],
  primevue: {
    cssLayerOrder: "reset,primevue",
  },
 
  plugins: [
    "./composables/toastServics.js",
    "./plugins/firebase.js",
    '~/plugins/checkAuth.js',
    ],
  
});

