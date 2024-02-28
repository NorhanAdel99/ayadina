<template>
    <div class="row justify-content-center">
        <div class="col-md-7">
            <ui-breadCrumb :to="localePath('/profile/settings')">
                <template v-slot:mainPage>
                    {{ $t("Settings") }} 
                </template>
                <template v-slot:currentPage> {{ $t("edit_email") }}</template>
            </ui-breadCrumb>
            <ui-base-card class="p-5 rounded-4">
                <ui-main-title>
                    {{ $t( "Enter_your_new_mobile_number_and_email") }}
                                </ui-main-title>
                <form @submit.prevent="changeeEmailSendCode">
                    <inputs-form-control mode="form-control" type="password" id="password" v-model="password"> {{ $t("password") }}
                    </inputs-form-control>
                    <inputs-form-control mode="form-control" type="email" id="password" v-model="email">  {{ $t("New_email") }}
                    </inputs-form-control>
                    <div class="flex-center mb-3">
                        <ui-base-button mode="main_btn lg ">
                            {{ $t( "continuation") }}
                        </ui-base-button>
                    </div>
                </form>
                <toast />
            </ui-base-card>
        </div>
    </div>
  </template>
  <script>
  import { useAuthStore } from '@/store/authStore'
  definePageMeta({
  middleware: "check-auth",
})
  export default {
    data() {
        return {
            localePath: useLocalePath() ,
            axios: useNuxtApp().$axios,
            token:"",
            formData:"",
            password:"" ,
            email:"",
            // toast :useToast()
        }
    },
    mounted() {
        this.token = useAuthStore().user.token
        },
    methods:{
        async changeeEmailSendCode() {
            this.formData = {
                password: this.password,
                email:this.email
            };
        
           await  this.axios.post('/change-email-send-code', this.formData , {
            headers: {
                    Authorization:` Bearer ${this.token}`,
                }
           })
                .then((response) => {
                    if (response.data.key == "success") {
                        this.email=localStorage.setItem("newEmail" , this.email);
                        this.$toast.add({ detail: `${response.data.msg}`, life: 3000 });
                        useRouter().push({ path:'/profile/settings/email/otp' });
                    } 
                     else if (response.data.key == "exception") {
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
  