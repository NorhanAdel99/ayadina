import axios from "axios";
import {useLangStore } from '@/store/langStore'

export default defineNuxtPlugin((nuxtApp) => {
  const defaultUrl = "https://backend.iadeena.com/api/";
  // backend.iadeena.com";
  const langStore = useLangStore();
  console.log(langStore.selectedLanguage)
  let api = axios.create({
    baseURL: defaultUrl,
  });
  api.interceptors.request.use((config) => {
    config.headers['Accept-Language'] = langStore.selectedLanguage;
    config.headers['Lang'] = langStore.selectedLanguage;

    return config;
  });

  return {
    provide: {
      axios: api,
    },
  };
});

// plugins/axios.js
