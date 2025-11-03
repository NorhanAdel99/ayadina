import axios from "axios";
import { useLangStore } from "@/store/langStore";

export default defineNuxtPlugin((nuxtApp) => {
  const defaultUrl = "https://backend.swaedtmkeen.com/api/"; 
  const langStore = useLangStore();
  let api = axios.create({
    baseURL: defaultUrl,
  });
  api.interceptors.request.use((config) => {
    config.headers["Accept-Language"] = langStore.selectedLanguage;
    config.headers["Lang"] = langStore.selectedLanguage;

    return config;
  });

  return {
    provide: {
      axios: api,
    },
  };
});