<template>
  <div class="row justify-content-center">
    <div class="col-md-5">
      <ui-main-title>{{ $t("Create_account") }}</ui-main-title>
      <form @submit.prevent="activation">
        <inputs-form-control type="number" id="number" v-model.trim="code">{{
          $t("validation_code")
        }}</inputs-form-control>
        <div class="flex-center mb-3">
          <ui-base-button mode="main_btn lg">{{ $t("send") }} </ui-base-button>
        </div>
        <div
          class="d-flex align-items-center justify-content-center gap-2 w-100"
        >
          <div class="text-center d-block main_color dontRecivecode">
            {{ $t("Didnot_you_receive_a_code?") }}
          </div>
          
          <div class="text-center" v-if="timerRunning">
            {{ timer }} {{ $t("seconds") }}
          </div>
          <button
          type="button"
            class="resendCodeBtn"
            :disabled="disabledBtn"
            @click="resendCode"
          >
            {{ $t("Resend") }}
          </button>
        </div>
      </form>
   
      <Toast />
    </div>
  </div>
</template>

<script>
import VOtpInput from "vue3-otp-input";
import { useAuthStore } from "@/store/authStore";

export default {
  data() {
    return {
      axios: useNuxtApp().$axios,
      userMail: {},
      code: "",
      formData: "",
      value: "",
      token: "",
      user: "",
      device_id: "",
      timer: 60, // Initial timer value (seconds)
      timerRunning: false, // Flag to track if the timer is running
      disabledBtn: false,
      phone: "",
      country_code: "",
    };
  },
  mounted() {
    this.phone = useAuthStore().user.phone,
    this.country_code = useAuthStore().user.country_code
    this.startTimer();
  },
  methods: {
    async activation() {
      this.btnDisables = true;

      try {
        await useAuthStore().otp({
          code: this.code,
        });
      } catch (error) {
        console.error("Login error:", error);
      }
    },

    startTimer() {
      this.timerRunning = true;
      this.disabledBtn = true;
      const interval = setInterval(() => {
        this.timer--;
        if (this.timer === 0) {
          clearInterval(interval);
          this.timerRunning = false;
          this.disabledBtn = false;
        }
      }, 1000);
    },
    async resendCode() {
      this.disabledBtn = true;
      this.$axios
        .get(`/resend-code?phone=${this.phone}&country_code=${this.country_code}`)
        .then((res) => {
          if (res.data.key == "success") {
            // this.$toast.add({ detail: `${res.data.msg}`, life: 3000, severity: "success" });
            this.timer = 60;
            this.startTimer();
          } else {
            this.$y.add({
              severity: "error",
              detail: `${res.data.msg}`,
              life: 3000,
            });
          }
        })
        .catch((err) => {
          this.$toast.add({ severity: "error", detail: `${err}`, life: 3000 });
        });
    },
  },
};
</script>

<style>
.dontRecivecode {
  cursor: pointer;
}
.resendCodeBtn{
  background-color: transparent;
  padding: 0;
  border: unset;
}
.resendCodeBtn:disabled{
  cursor: not-allowed;
  color: gray;
}

button:disabled , .resendCodeBtn {
  background: transparent !important;
  border: transparent !important;
  border: unset !important;
  cursor: not-allowed;
  color: gray;
  padding: unset;
}
.resendCodeBtn{
  cursor: pointer;

  color: black;
}

</style>
