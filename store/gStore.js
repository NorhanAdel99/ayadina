import { defineStore } from "pinia";
import { useAuthStore } from "@/store/authStore";

export const useGstore = defineStore("gStore", {
  state: () => ({
    socials: [],
    token: null,
  }),

  actions: {
    getSocials() {
      this.token = useAuthStore().token;
      console.log(this.token);

      
    },
  },
});
