<template>
    <ui-base-container>
        <div class="row justify-content-center">
            <div class="col-md-5">
                <ui-main-title> {{ $t("Restore_password") }}</ui-main-title>
                <form @submit.prevent="ConfirmResetPassword">
                    <inputs-form-control mode="form-control" type="password" id="password" v-model="password"> {{ $t("New_Password") }}</inputs-form-control>
                    <inputs-form-control mode="form-control" type="password" id="password_confirm" v-model="password_confirm"> {{ $t("Confirm_the_new_password") }}
                    </inputs-form-control>
                    <div class="flex-center mb-3">
                        <ui-base-button mode="main_btn lg ">
                            {{ $t("Make_sure") }}
                        </ui-base-button>
                    </div>
                </form>
            </div>
        </div>
    </ui-base-container>
</template>
<script>
export default {
    data(){
        return {
            localePath: useLocalePath(),
            axios: useNuxtApp().$axios,
            formData:"",
            email:"",
            code:"",
            password:"",
            password_confirm:""

        }
    },
    mounted() {
    this.email = localStorage.getItem("emilReset");
    this.code=localStorage.getItem("codeReset")
  },
    methods:{
        async ConfirmResetPassword() {
        this.formData = {
                email: this.email,
                code :this.code ,
                password:this.password,
                password_confirm:this.password_confirm
            };
            await this.axios.post('/reset-password', this.formData)
                .then((response) => {
                    if (response.data.key == "success") {
                        this.$toast.add({ detail: `${response.data.msg}`, life: 3000 });
                        useRouter().push({ path: '/login' })

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