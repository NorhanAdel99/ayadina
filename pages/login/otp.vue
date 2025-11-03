<template>
  <div class="row justify-content-center">
    <div class="col-md-5">
      <ui-main-title> {{ $t("activation_code") }} </ui-main-title>
      <form @submit.prevent="activation">
        <div class="contain-otp flex-center mb-3">
          <v-otp-input
            ref="otpInput"
            input-classes="otp-input"
            separator="-"
            :num-inputs="4"
            :should-auto-focus="true"
            :is-input-num="true"
            :conditionalClass="['one', 'two', 'three', 'four']"
            :placeholder="['*', '*', '*', '*']"
            @on-change="handleOnChange"
            @on-complete="handleOnComplete"
          />
        </div>
        <div class="flex-center mb-3">
          <ui-base-button mode="main_btn lg">
            {{ $t("Make_sure") }}
          </ui-base-button>
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
import { useAuthStore } from "~/store/authStore";
export default {
  components: { VOtpInput },

  data() {
    return {
      axios: useNuxtApp().$axios,
      email: "",
      code: "",
      formData: "",
      value: "",
      timer: 60, // Initial timer value (seconds)
      timerRunning: false, // Flag to track if the timer is running
      disabledBtn: false,
      phone: "",
      country_code: "",
    };
  },
  methods: {
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
    handleOnComplete(value) {
      // console.log("OTP completed: ", value);
      this.code = value;
    },
    handleOnChange(value) {
      // console.log("OTP changed: ", value);

      this.code = value;
    },
    // forget-password-check-code
    async activation() {
      this.formData = {
        phone: this.phone,
        country_code: this.country_code,
        code: this.code,
        device_id: "11111",
      };
      await this.axios
        .post("/activate", this.formData)
        .then((response) => {
          // this.timerRunning = false;
          // this.timer = 60; // Reset timer to initial value
          if (response.data.key == "success") {
            localStorage.setItem("codeReset", this.code);
            this.$toast.add({
              detail: `${response.data.msg}`,
              life: 3000,
              severity: "success",
            });
            // useAuthStore().update_token(response.data.data.token);
            if ((response.data.data.is_completed = "true")) {
              useRouter().push({ path: "/" });
            } else {
              useRouter().push({ path: "/register/step2" });
            }
            useAuthStore().set_user(response.data.data);
          } else if (response.data.key == "fail") {
            this.$toast.add({
              detail: `${response.data.msg}`,
              life: 3000,
              severity: "error",
            });
            useRouter().push({ path: "/login" });
          } else {
            this.$toast.add({
              detail: `${response.data.msg}`,
              life: 3000,
              severity: "error",
            });
          }
        })
        .catch(function (error) {
          this.timerRunning = false;
          this.timer = 60; // Reset timer to initial value
          this.$toast.add({
            detail: `${error}`,
            life: 3000,
            severity: "error",
          });
        });
    },

    async resendCode() {
      this.disabledBtn = true;
      this.$axios
        .get(`/resend-code?email=${this.email}`)
        .then((res) => {
          if (res.data.key == "success") {
            this.$toast.add({
              detail: `${res.data.msg}`,
              life: 3000,
              severity: "success",
            });
            this.timer = 60;
            this.startTimer();
          } else {
            this.$toast.add({
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
  mounted() {
    (this.phone = useAuthStore().phone),
      (this.country_code = useAuthStore().country_code),
      this.startTimer();
  },
};
</script>

<style>
.otp-input {
  width: 46px;
  height: 40px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgb(0 0 0 / 10%);
  text-align: center;
}

/* Background colour of an input field with value */
.otp-input.is-complete {
  background-color: #e4e4e4;
}

.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.contain-otp span {
  display: none;
}

.otp-input::placeholder {
  visibility: hidden;
  font-size: 15px;
  text-align: center;
  font-weight: 600;
  color: red;
}
button:disabled,
.resendCodeBtn {
  background: transparent !important;
  border: transparent !important;
  border: unset !important;
  cursor: not-allowed;
  color: gray;
  padding: unset;
}
.resendCodeBtn {
  cursor: pointer;

  color: black;
}
</style>
