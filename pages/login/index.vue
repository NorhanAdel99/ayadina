<template>
  <div class="auth">
    <ui-main-title auth> {{ $t("login") }} </ui-main-title>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <form @submit.prevent="login" ref="formData">
          <div class="form-group">
            <label class="form-label" id="phone">
              {{ $t("phoneNumber") }}
              <span class="text-danger"> * </span>
            </label>
            <div class="with_cun_select">
              <input
                type="number"
                id="phone"
                class="main_input form-control"
                v-model="phone"
              />
              <div class="card d-flex justify-content-center dropdown_card">
                <Dropdown
                  v-model="selectedCountry"
                  :options="countries"
                  optionLabel="name"
                >
                  <template #value="slotProps">
                    <div v-if="slotProps.value" class="flex-group-me">
                      <img
                        :alt="slotProps.value.label"
                        :src="slotProps.value.image"
                        style="width: 24px"
                      />
                      <div>{{ slotProps.value.code }}</div>
                    </div>
                    <span v-else>
                      {{ slotProps.placeholder }}
                    </span>
                  </template>
                  <template #option="slotProps">
                    <div class="flex-group-me">
                      <img
                        :alt="slotProps.option.code"
                        :src="slotProps.option.image"
                        width="20rem"
                      />
                      <div>{{ slotProps.option.code }}</div>
                    </div>
                  </template>
                </Dropdown>
              </div>
            </div>
          </div>
          <div v-if="phoneValid" class="error-message">
            {{ $t("phoneValid") }}
          </div>
          <inputs-form-control
            mode="form-control"
            :type="showPassword ? 'text' : 'password'"
            id="password1"
            v-model.trim="password"
            icon
          >
            {{ $t("password") }}
            <template #icon>
              <!-- add an icon inside the input if supported -->
              <font-awesome-icon
                :icon="showPassword ? 'fa-eye-slash' : 'fa-eye'"
                @click="password != '' ? (showPassword = !showPassword) : null"
                style="cursor: pointer; margin-left: 8px"
              ></font-awesome-icon>
            </template>
          </inputs-form-control>
          <div v-if="passwordValid" class="error-message">
            {{ $t("passwordValid") }}
          </div>
          <NuxtLink
            :to="path('/login/forget_password')"
            class="main_color text-start d-block forgetPassword"
          >
            {{ $t("did_you_forget_your_password?") }}
          </NuxtLink>
          <div class="flex-center mb-3">
            <ui-base-button mode="main_btn lg sure_login my-2">
              {{ $t("Confirm_entry") }}
            </ui-base-button>

            <Toast />
          </div>
          <div class="text-center">
            <NuxtLink :to="path('/register')" class="font-bolder">
              <span class="text-dark">
                {{ $t("you_dont_have_an_account?") }}
              </span>
              <span class="main_color"> {{ $t("create_acc") }} </span>
            </NuxtLink>
          </div>
        </form>
      </div>
    </div>
    <Toast />
  </div>
</template>

<script>
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Dropdown from "primevue/dropdown";
import Toast from "primevue/toast";
import { useAuthStore } from "@/store/authStore";

export default {
  components: {
    TabView,
    TabPanel,
    Dropdown,
    Toast,
    userId: "",
  },
  data() {
    return {
      path: useLocalePath(),

      axios: useNuxtApp().$axios,
      email: "",
      password: "",
      showPassword: false,
      form: "",
      code: "",
      userMail: "",
      device_id: "",
      emailValid: false,
      phoneValid: false,
      passwordValid: false,
      phone: "",
      countries: [],
      selectedCountry: {
        code: "+966",
      },
    };
  },

  mounted() {
    this.device_id = localStorage.getItem("device_id");
    this.axios
      .get("/country-code")
      .then((response) => {
        // console.log('response: ', response.data.data)
        this.countries = response.data.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  methods: {
    validation() {
      if (this.email === "") {
        this.emailValid = true;
      } else {
        this.emailValid = false;
      }
      if (this.phone === "") {
        this.phoneValid = true;
      } else {
        this.phoneValid = false;
      }
      if (this.password === "") {
        this.passwordValid = true;
      } else {
        this.passwordValid = false;
      }
    },
    async login() {
      this.validation();
      this.code = this.selectedCountry.code.replace(/\+/g, "");
      try {
        if (this.phone) {
          this.emailValid = false;
          await useAuthStore().signIn({
            phone: this.phone,
            password: this.password,
            country_code: this.code,
            // device_id: useAuthStore(). ,
            device_type: "web",
          });
        } else if (this.email) {
          this.phoneValid = false;
          await useAuthStore().signIn({
            email: this.email,
            password: this.password,
            device_type: "web",
          });
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.p-tabview-nav {
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .auth {
    font-size: 14px;

    .p-tabview-nav {
      flex-wrap: wrap;
    }

    .p-tabview-header {
      width: 100%;
    }

    .p-tabview-header a {
      font-size: 14px;
    }

    .sure_login {
      font-size: 14px;
    }
  }
}
.back-button {
  display: none !important;
}
</style>
