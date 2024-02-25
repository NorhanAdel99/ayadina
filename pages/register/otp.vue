<template>
  <div class="row justify-content-center">
    <div class="col-md-5">
      <ui-main-title> كود التفعيل </ui-main-title>
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
        <!-- <h3> name:   {{ user.name }}</h3> -->
        <div class="flex-center mb-3">
          <ui-base-button mode="main_btn lg"> تأكد </ui-base-button>
        </div>
        <NuxtLink
          class="text-center d-block main_color"
          link
          :to="localePath('/login/otp')"
        >
          لم يصلك كود ؟
        </NuxtLink>
      </form>
      <Toast />
    </div>
  </div>
</template>
<script>
import VOtpInput from "vue3-otp-input";
import { useAuthStore } from "@/store/authStore";

export default {
  components: { VOtpInput },

  data() {
    return {
      localePath: useLocalePath(),
      axios: useNuxtApp().$axios,
      userMail: {},
      code: "",
      formData: "",
      value: "",
      token: "",
      user: "",
    };
  },
  mounted() {
    this.userMail = localStorage.getItem("email");
  },
  methods: {
    handleOnComplete(value) {
      console.log("OTP completed: ", value);
      this.code = value;
    },
    handleOnChange(value) {
      console.log("OTP changed: ", value);
    },
    async activation() {
            try {
                await useAuthStore().otp({ code: this.code, email: this.userMail});
               
            } catch (error) {
                console.error('Login error:', error);
            }
        },

  
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
</style>
