import { defineStore } from "pinia";
import { useAuthStore } from "@/store/authStore";

// import axios from "~/plugins/axios";
export const skillsStore = defineStore("skills", {
  state: () => ({
    axios: useNuxtApp().$axios,
    skills: [],
    token: "",
  }),
  actions: {
    getSkills() {
      this.token = useAuthStore().token;
      this.axios
        .get("/skills", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          console.log(response);
          this.skills = response.data.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
});
