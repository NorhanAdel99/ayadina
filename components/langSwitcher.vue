<template>
  <div @click="switchLanguage('en')" v-if="lang == 'ar'" class="main_color">English</div>
  <div @click="switchLanguage('ar')" v-if="lang == 'en'" class="main_color">عربي </div>
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
  
  let nav = document.querySelector(".project-nav");
    let burgerIcon = document.querySelector(".burger-icon");
    nav.classList.remove("active");
    burgerIcon.classList.remove("active");

  },

},
  computed:{
    lang() {
      return useLangStore().selectedLanguage

    }
  },
}
</script>

<style scoped></style>
