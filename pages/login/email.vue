<template>
    <div class="row justify-content-center">
        <div class="col-md-5">
            <ui-main-title> {{ $t('Restore_password')}} </ui-main-title>
            <form @submit.prevent="ResetPassword">
                <inputs-form-control mode="form-control" ref="mail" type="email" id="email" v-model.trim="email"> البريد
                    {{ $t('email')}} 
                </inputs-form-control>
                <div class="flex-center mb-3">
                    <ui-base-button mode="main_btn"> {{ $t('Back_to_the_section')}} 
                    </ui-base-button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            localePath: useLocalePath(),
            axios: useNuxtApp().$axios,
            email: ''
        }
    },
    methods: {
        async ResetPassword() {
            this.formData = {
                email: this.email,
            };
            await this.axios.post('/forget-password-send-code', this.formData)
                .then((response) => {
                    if (response.data.key == "success") {
                        localStorage.setItem("emilReset",this.email);
                        this.$toast.add({ detail: `${response.data.msg}`, life: 3000 });
                        useRouter().push({ path: '/login/otp' })

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
