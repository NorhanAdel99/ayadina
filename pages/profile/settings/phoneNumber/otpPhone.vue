<template>
    <div class="row justify-content-center">
      <div class="col-md-7">
        <UiBreadCrumb  :to="localePath('/')">
          <template v-slot:mainPage>  {{ $t("Settings") }}</template>
          <template v-slot:currentPage>  {{ $t("edit_phone") }}</template>
        </UiBreadCrumb>
        <ui-base-card class="p-5">
          <ui-main-title class="mb-5">  {{ $t("Enter_the_verification_code_sent_to_your_mobile_phone") }}</ui-main-title>
          <form @submit.prevent="changePhoneCheckCode">
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
          <div class="flex-center">
            <!-- :disabled="!completed" -->
            <ui-base-button class=" main_btn w-50">
              {{ $t("continuation") }}
            </ui-base-button>
          </div>
        </form>
        </ui-base-card>
      </div>
    </div>
      <Dialog v-model:visible="showSuccess" modal :style="{ width: '50rem' }"
          :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"> 
          <font-awesome-icon icon="fa-regular fa-circle-check " class="modal-exclam-mark mb-3 main_color" />
          <h6 class="text-center mb-3">
            {{ $t("The_change_was_made_successfully") }}
          </h6>
          <div class="flex-center">
              <ui-base-button mode="main_btn" @click="visible = false" link :to="localePath('/profile/settings')">   {{ $t("Settings") }}  </ui-base-button>
          </div>
      </Dialog>
  </template>
    
  <script >
  
  import Dialog from 'primevue/dialog';
  import VOtpInput from "vue3-otp-input";
  import { useAuthStore } from '@/store/authStore'

  
  export default{
  
    components: {
          Dialog ,
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
            toast:useToast(),
              showSuccess:false,
              code:"",
              country_code:"",
              Newphone:""

          }
      },
      mounted() {
        this.token = useAuthStore().token
        this.country_code=localStorage.getItem("country_code");
        this.Newphone=localStorage.getItem("Newphone");


        },
      methods:{
        handleOnComplete(value) {
        console.log("OTP completed: ", value);
        this.code = value;
      },
      handleOnChange(value) {
        console.log("OTP changed: ", value);
      },
      async changePhoneCheckCode() {
              this.formData = {
                  code: this.code,
                  country_code:this.country_code,
                  phone:this.Newphone ,
              };
          
             await  this.axios.post('/change-phone-check-code', this.formData , {
              headers: {
                      Authorization: `Bearer ${this.token}`,
                  }
             })
                  .then((response) => {
                      if (response.data.key == "success") {
                        this.showSuccess=true
                      } 
                       else if (response.data.key == "exception") {
                          this.$toast.add({ detail: `${response.data.msg}`, life: 3000 });
                      }
                      else if (response.data.key == "fail") {
                        this.$toast.add({ detail: `${response.data.msg}`, life: 3000 });
                      }
                      else {
                        this.$toast.add({ detail: `${error}`, life: 3000 });
                      }
                  })
                  .catch(function (error) {
                      console.log(error);
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