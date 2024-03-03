<template>
  <div @click="switchLanguage('en')" v-if="lang == 'ar'" class="main_color">En</div>
  <div @click="switchLanguage('ar')" v-if="lang == 'en'" class="main_color">Ar</div>
</template>
<script>

import {useLangStore } from '@/store/langStore'

export default {
  data(){
    return{

    }
  },
  methods:{
  switchLanguage(locale) {
    const appStore = useLangStore();
    appStore.setLanguage(locale);
    this.$i18n.setLocale(locale);
  },

},
  computed:{
    lang() {
      return useLangStore().selectedLanguage

    }
  },

// computed: {
//     availableLocales() {
//       return this.$i18n.locales.filter(loc => loc.code !== this.$i18n.locale);
//     },

//   },
}
</script>

<style scoped></style>
