import { defineStore } from 'pinia';

export const useLangStore = defineStore('app', {
  state: () => ({
    selectedLanguage: 'ar', // Default language
  }),

  actions: {
    setLanguage(language) {
      this.selectedLanguage = language;
    },
  },
  persist: {
    storage: persistedState.cookiesWithOptions({
      sameSite: "strict",
    }),
  },
});
