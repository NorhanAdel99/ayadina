import { defineStore } from 'pinia';

export const globalStore = defineStore('global', {
  state: () => ({
    socials: [], // Default language
  }),

  actions: {
     getSocials(){
      this.axios
      .get("/socials", {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        this.socials = res.data.data;
      });
     }
  },
  persist: {
    storage: persistedState.cookiesWithOptions({
      sameSite: "strict",
    }),
  },
});
