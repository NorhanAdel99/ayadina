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
      isAuthenticated: true,
      name: "",
      toast: toastMsg(),
      count: "",
      Notify: "",
      device_id: null,
      password: "",
      email: "",
      categoryId: "",
      sub_category_id: "",
      searchData: null,
      phone: "",
      country_code: "",
    };
  },
  getters: {
    isAuth: (state) => state.isAuthenticated,
    iscount: (state) => state.count,
    isNotify: (state) => state.Notify,
    isdevice_id: (state) => state.device_id,
  },
  actions: {
    setDeviceId(device_id) {
      this.device_id = device_id;
    },
    async signIn({ phone, password, country_code, device_type }) {
      try {
        let loginData = {
          log: phone,
          password,
          country_code: country_code,
          device_id: localStorage.getItem("device_id") ,
          device_type,
        };

        const res = await this.axios.post("/sign-in", loginData);
        if (res.data.key === "success") {
          if ((res.data.data.is_completed == true)) {
            this.password = password;
            this.isAuthenticated = true;
            this.user = res.data.data;
            this.token = this.user.token;
            this.phone = this.user.phone;
            this.country_code = this.user.country_code;
            const localePath = useLocalePath();
            const path = localePath("/");
            this.toast.successToast(res.data.msg);
            useRouter().push(path);
          } else {
            this.password = password;
            this.isAuthenticated = true;
            this.user = res.data.data;
            this.token = this.user.token;
            this.phone = this.user.phone;
            this.country_code = this.user.country_code;
            const localePath = useLocalePath();
            const path = localePath("/register/step2");
            this.toast.successToast(res.data.msg);
            useRouter().push(path);
          }
        } else if (res.data.key === "needActive") {
          this.user = res.data.data.user;
          this.phone = this.user.phone;
          this.country_code = this.user.country_code;

          this.toast.errorToast(res.data.msg);
          const localePath = useLocalePath();
          const path = localePath("/login/otp");
          useRouter().push(path);
          this.isAuthenticated = false;
        } else if (res.data.key === "blocked") {
          this.toast.errorToast(res.data.msg);
        } else {
          this.toast.errorToast(res.data.msg);
        }
      } catch (error) {
        this.toast.errorToast(error);
      }
    },
    async signUp({
      name,
      email,
      phone,
      country_code,
      password,
      password_confirm,
    }) {
      this.axios
        .post("/sign-up", {
          name,
          email,
          phone,
          country_code,
          password,
          password_confirm,
        })
        .then((response) => {
          if (response.data.key === "success") {
            this.password = password;
            this.toast.successToast(response.data.msg);
            const localePath = useLocalePath();
            const path = localePath("/register/otp");
            useRouter().push(path);
            this.user = response.data.data;
            this.token = this.user.token;
            console.log(this.user);
          } else if ((response.data.key = "fail")) {
            this.toast.errorToast(response.data.msg);
          } else if ((response.data.key = "blocked")) {
            this.toast.errorToast(response.data.msg);
          }
        })
        .catch((error) => {
          this.toast.errorToast(error);
        });
    },
    async otp({ code }) {
      this.axios
        .post("/activate", {
          code,
          phone: this.user.phone,
          country_code: this.user.country_code,
          device_id: this.device_id || "11111",
        })
        .then((response) => {
          if (response.data.key === "success") {
            this.isAuthenticated = true;
            this.user = response.data.data;
            this.token = this.user.token;
            this.toast.successToast(response.data.msg);
            const localePath = useLocalePath();
            const path = localePath("/register/step2");
            useRouter().push(path);
          } else {
            this.toast.errorToast(response.data.msg);
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
          const localePath = useLocalePath();
          const path = localePath("/profile");
          useRouter().push(path);

          this.user = res.data.data;
          this.token = this.user.token;
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

        // console.log(res);
        if (
          res.data.key === "success" ||
          res.data.key === "unauthenticated" ||
          res.data.key === "blocked"
        ) {
          this.user = null;
          this.token = null;
          this.isAuthenticated = false;
          this.device_id = null;
          // localStorage.removeItem("device_id");
          this.toast.successToast("تم تسجيل الخروج بنجاح ");
          const localePath = useLocalePath();
          const path = localePath("/");
          useRouter().push(path);
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
          const localePath = useLocalePath();
          const path = localePath("/");
          useRouter().push(path);
          this.toast.successToast(res.data.msg);
        } else {
          this.toast.errorToast(res.data.msg);
        }
      } catch (error) {
        this.toast.errorToast(error);
      }
    },
    async CountNotifecation() {
      await this.axios
        .get("/count-notifications", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          this.count = res?.data?.data?.count;
          if( res.data.key === "unauthenticated"){
            this.signOut();
          }
        });
    },
    async getProfile() {
      try {
        const config = {
          headers: { Authorization: `Bearer ${this.token}` },
        };
        await this.axios.get("profile", config).then((res) => {
          this.Notify = res.data.data.is_notify;
          console.log(this.Notify);
          
        });
      } catch (error) {
        console.log(error);
      }
    },
    setPhone(phone, country_code) {
      this.phone = phone;
      this.country_code = country_code;
    },
    setcategoryId(id) {
      this.categoryId = id;
    },
    setSubCategoryId(id) {
      this.sub_category_id = id;
    },
    setSearchData(data) {
      this.searchData = data;
    },
    set_user(user) {
      this.user = user;
      this.isAuthenticated = true;
      this.user = user;
      this.token = this.user.token;
      this.phone = this.user.phone;
      this.country_code = this.user.country_code;
    },
  },
  persist: {
    storage: persistedState.cookiesWithOptions({
      sameSite: "strict",
    }),
  },
});
