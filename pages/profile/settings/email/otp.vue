<template>
    <div class="row justify-content-center">
      <div class="col-md-7">
        <UiBreadCrumb  :to="localePath('/')">
          <template v-slot:mainPage>  {{ $t("Settings") }}</template>
          <template v-slot:currentPage>  {{ $t("edit_email") }}</template>
        </UiBreadCrumb>
        <ui-base-card class="p-5">
          <ui-main-title class="mb-5">  {{ $t("Enter_the_verification_code_sent_to_your_mobile_phone") }}</ui-main-title>
          <form  @submit.prevent="changeEmailCheckCode">
          <div class="contain-otp flex-center mb-3">
    
          <v-otp-input
              ref="otpInput"
              input-classes="otp-input"
              separator="-"
              :num-inputs="4"
              :should-auto-focus="true"
              :is-input-num="true"
              :conditionalClass="['one', 'two', 'three', 'four']"
              :placeholder="['', '', '', '']"
              @on-change="handleOnChange"
              @on-complete="handleOnComplete"
            />
          </div>
          <div class="flex-center">
            <ui-base-button class=" main_btn w-50">
              {{ $t("continuation") }}
            </ui-base-button>
          </div>
        </form>
        <toast />
        </ui-base-card>
      </div>
    </div>
    </template>
    
    <script >
    
    import VOtpInput from "vue3-otp-input";
    import { useAuthStore } from '@/store/authStore'
    
    
    export default{
    
    components: {
          VOtpInput
      },
      data() {
          return {
              completed: false,
              visible: false,
              visible2: false,
              localePath: useLocalePath(),
             
              axios: useNuxtApp().$axios,
              token:"",
              email:"",
              code:"",
          }
      },
      mounted() {
          this.token = useAuthStore().user.token
          this.email=localStorage.getItem("newEmail");
    
          },
      methods:{
        handleOnComplete(value) {
        console.log("OTP completed: ", value);
        this.code = value;
      },
      handleOnChange(value) {
        console.log("OTP changed: ", value);
      },
      async changeEmailCheckCode() {
              this.formData = {
                  code: this.code,
                  email:this.email
              };
          
             await  this.axios.post('/change-email-check-code', this.formData , {
              headers: {
                      Authorization: `Bearer ${this.token}`,
                  }
             })
                  .then((response) => {
                      if (response.data.key == "success") {
                        this.$toast.add({ detail: `${response.data.msg}`, life: 3000 });
                          useRouter().push({ path:'/' });
                      } 
                       else if (response.data.key == "exception") {
                          this.$toast.add({ detail: `${response.data.msg}`, life: 3000 });
                      }
                      else if (response.data.key == "fail") {
                        this.$toast.add({ detail: `${response.data.msg}`, life: 3000 });
                      }
                      else {
                        this.$toast.add({ detail: `${response.data.msg}`, life: 3000 });
                      }
                  })
                  .catch(function (error) {
                    this.$toast.add({ detail: `${error}`, life: 3000 });
                  })
          }
      }
    }
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