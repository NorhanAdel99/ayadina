<template>

    <div class="row justify-content-center">
        <div class="col-md-7">
            <ui-breadCrumb :to="path('/profile/settings')">
                <template v-slot:mainPage> {{ $t("Settings") }} </template>
                <template v-slot:currentPage> {{ $t("edit_password") }} </template>
            </ui-breadCrumb>
            <ui-base-card class="p-5 rounded-4">
                <form @submit.prevent="validateAndSendEmail">
                    <inputs-form-control mode="form-control" type="password" id="passpassword1" v-model="old_password"> {{
                $t("Current_Password") }}
                    </inputs-form-control>
                    <span class="text-danger"> {{ oldpasswordMsg }}</span>
                    <inputs-form-control mode="form-control" type="password" id="password2" v-model="password"> {{
                $t("New_Password") }} </inputs-form-control>
                    <span class="text-danger"> {{ passwordMsg }}</span>

                    <inputs-form-control mode="form-control" type="password" id="password3" v-model="ConfirmPassword">
                        {{
                $t("Confirm_current_password") }}</inputs-form-control>
                    <span class="text-danger"> {{ ConfirmPasswordMsg }}</span>

                    <span class="text-danger"> {{ msg }}</span>

                    <div class="flex-center mb-3">
                        <ui-base-button mode="main_btn lg">
                            {{ $t("save") }}
                        </ui-base-button>
                    </div>
                </form>
            </ui-base-card>
        </div>
    </div>
    <Dialog v-model:visible="showSuccess" modal :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <font-awesome-icon icon="fa-regular fa-circle-check" class="modal-exclam-mark mb-3 main_color" />
        <h6 class="text-center mb-3">
            {{ $t("The_password_has_been_changed_successfully") }}
        </h6>
        <div class="flex-center">
            <ui-base-button mode="main_btn" @click="visible = false" link :to="path('/profile/settings')"> {{
                $t("Settings") }} </ui-base-button>
        </div>
    </Dialog>
    <toast />
</template>
<script>
import Dialog from 'primevue/dialog';
import { useAuthStore } from '@/store/authStore'
definePageMeta({
    middleware: "check-auth",
})
export default {
    components: { Dialog },
    data() {
        return {
            completed: false,
            visible: false,
            path: useLocalePath(),
            axios: useNuxtApp().$axios,
            token: "",
            formData: "",
            old_password: "",
            password: "",
            ConfirmPassword: "",
            showSuccess: false,
            ConfirmPasswordMsg: "",
            passwordMsg: "",
            oldpasswordMsg: "",
            msg: ""
            // toast :useToast()
        }
    },
    mounted() {
        this.token = useAuthStore().user.token
    },
    methods: {
        validateAndSendEmail() {
            if (!this.ConfirmPassword && !this.password && !this.old_password) {
                this.msg = this.$t("fill_data")
                return;
            }
            if (!this.ConfirmPassword) {
                this.ConfirmPasswordMsg = this.$t("Requir_password")
                return;
            }
            if (!this.password) {
                this.passwordMsg = this.$t("Requir_password")
                return;
            }
            if (!this.old_password) {
                this.oldpasswordMsg = this.$t("Requir_password")
                return;
            }

            this.updatePassword();
        },
        async updatePassword() {
            this.formData = {
                old_password: this.old_password,
                password: this.password,
                password_confirm: this.ConfirmPassword
            };
            await this.axios.post('/update-passward', this.formData, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                }
            })
                .then((response) => {
                    if (response.data.key == "success") {
                        this.showSuccess = true;
                        this.$toast.add({ detail: `${response.data.msg}`, life: 3000 , severity: "success"});
                    }
                    else if (response.data.key == "fail") {
                        this.$toast.add({ detail: `${response.data.msg}`, life: 3000 , severity: "error"});
                    }
                    else {
                        this.$toast.add({ detail: `${response.data.msg}`, life: 3000 , severity: "error" });
                    }
                })
                .catch(function (error) {
                    this.$toast.add({ detail: `${error}`, life: 3000 , severity: "error" });
                })
        }
    }
}
</script>
