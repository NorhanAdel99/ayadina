import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const defaultUrl = "https://iadeena.com/api/";

  let api = axios.create({
    baseURL: defaultUrl,

    headers: {
      common: {
        lang: useNuxtApp().$i18n.defaultLocale,
      },
    },
  });

  return {
    provide: {
      axios: api,
    },
  };
});
