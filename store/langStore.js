import { defineStore } from 'pinia';

export const useLangStore = defineStore('app', {
  state: () => ({
    selectedLanguage: 'ar', // Default language
  }),

  actions: {
    setLanguage(language) {
      this.selectedLanguage = language;
    },

    getLanguageDirection(lang) {
      // Provide the direction based on language 
      return lang === "ar" ? "rtl" : "ltr";
    },
  },
  persist: {
    storage: persistedState.cookiesWithOptions({
      sameSite: "strict",
    }),
  },
});
