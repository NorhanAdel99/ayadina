<template>
  <div class="row justify-content-center">
    <div class="col-md-5">
      <ui-main-title> {{ $t("Restore_password") }} </ui-main-title>
      <form @submit.prevent="ResetPassword">
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
        <div class="flex-center mb-3">
          <ui-base-button mode="main_btn"> {{ $t("send") }} </ui-base-button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { useAuthStore } from "~/store/authStore";

export default {
  data() {
    return {
      path: useLocalePath(),

      axios: useNuxtApp().$axios,
      phone: "",
      countries: [],
      selectedCountry: {
        code: "966",
      },
    };
  },
  methods: {
    async ResetPassword() {
      this.formData = {
        phone: this.phone,
        country_code: this.selectedCountry.code
      };
      await this.axios
        .post("/forget-password-send-code", this.formData)
        .then((response) => {
          if (response.data.key == "success") {
            localStorage.setItem("emilReset", this.email);
            useAuthStore().setPhone(this.phone , this.selectedCountry.code);
            this.$toast.add({
              detail: `${response.data.msg}`,
              life: 3000,
              severity: "success",
            });
            useRouter().push({ path: "/login/forget_pass_otp" });
          } else if (response.data.key == "fail") {
            this.$toast.add({
              detail: `${response.data.msg}`,
              life: 3000,
              severity: "error",
            });
          } else {
            this.$toast.add({
              detail: `${response.data.msg}`,
              life: 3000,
              severity: "error",
            });
          }
        })
        .catch(function (error) {
          this.$toast.add({
            detail: `${error}`,
            life: 3000,
            severity: "error",
          });
        });
    },
  },
  mounted() {
    this.device_id = localStorage.getItem("device_id");
    this.axios
      .get("/country-code")
      .then((response) => {
        this.countries = response.data.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>
