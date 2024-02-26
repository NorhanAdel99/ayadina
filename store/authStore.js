// authStore.js
import { defineStore } from "pinia";
import toastMsg from "../composables/ToastMsg.js";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      token: null,
      user: null,
      axios: useNuxtApp().$axios,
      isAuthenticated: false,
      name: "",
      toast: toastMsg(),
    };
  },
  actions: {
    async signIn({ email, phone, password, country_code , device_id , device_type }) {
      try {
        let loginData = {};

        if (email) {
          loginData = { log: email, password ,  device_id , device_type };
        } else if (phone) {
          loginData = { log: phone, password, country_code: country_code ,device_id  , device_type };
        }

        const res = await this.axios.post("/sign-in", loginData);

        console.log(res);

        if (res.data.key === "success") {
          this.token = res.data.data.token;
          this.isAuthenticated = true;

          this.user = res.data.data;

          this.toast.successToast(res.data.msg);
          useRouter().push({ path: "/" });
        } else if (res.data.key === "needActive") {
          this.toast.errorToast(res.data.msg);
          useRouter().push({ path: "/login/otp" });
          this.isAuthenticated = false;
        } else if (res.data.key === "fail") {
          this.toast.errorToast(res.data.msg);
        }
      } catch (error) {
        this.toast.errorToast(error);
      }
    },
    async signUp({ name, email, phone, country_code, password, password_confirm }) {
      this.axios
        .post("/sign-up", { name, email, phone, country_code, password , password_confirm })
        .then((response) => {
          if (response.data.key === "success") {
            this.toast.successToast(response.data.msg);
            useRouter().push({ path: "/register/otp" });
          } else if(response.data.key = 'fail') {
            this.toast.errorToast(response.data.msg);
          }
        })
        .catch((error) => {
          this.toast.errorToast(error);
        });
    },
    async otp({ code, email }) {
      this.axios
        .post("/activate", { code, email })
        .then((response) => {
          if (response.data.key === "success") {
            this.isAuthenticated = true;
            this.user = response.data.data;
            this.toast.successToast(response.data.msg);
            useRouter().push({ path: "/register/step2" });
          } else {
            this.toast.successToast(response.data.msg);
          }
        })
        .catch((error) => {
          this.toast.errorToast(error);
        });
    },
    // // profile
    async updateProfile(fd) {
      try {
        const res = await this.axios.post("/update-profile", fd, {
          headers: {
            Authorization: `Bearer ${this.user.token}`,
          },
        });
        if (res.data.key === "success") {
          this.toast.successToast(res.data.msg);
          this.user = res.data.data;
          this.isAuthenticated = true;
        } else {
          this.toast.errorToast(res.data.msg);
        }
      } catch (error) {
        this.toast.errorToast(error);
      }
    },

    // // signOut
    async signOut() {
      try {
        const res = await this.axios.delete("/sign-out");

        console.log(res);
        if (
          res.data.key === "success" ||
          res.data.key === "unauthenticated" ||
          res.data.key === "blocked"
        ) {
          this.user = null;
          this.isAuthenticated = false;
          this.toast.successToast('تم تسجيل الخروج بنجاح ');
          useRouter().push({ path: "/" });
        } else {
          this.toast.errorToast(res);
        }
      } catch (error) {
        this.toast.errorToast(error);
      }
    },
    async deleteAccount() {
      try {
        const res = await this.axios.delete("delete-account");

        console.log(res);
        if (
          res.data.key === "success" ||
          res.data.key === "unauthenticated" ||
          res.data.key === "blocked"
        ) {
          this.user = null;
          this.isAuthenticated = false;
          useRouter().push({ path: "/" });
          this.toast.successToast(res.data.msg);
        } else {
          this.toast.errorToast(res.data.msg);
        }
      } catch (error) {
        this.toast.errorToast(error);
      }
    },
  },
  persist: {
    storage: persistedState.cookiesWithOptions({
      sameSite: "strict",
    }),
  },
});
