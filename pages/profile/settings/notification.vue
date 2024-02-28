<template>
    <header-component></header-component>
    <base-container>
        <ui-breadCrumb :to="localePath('/profile/settings')">
            <template v-slot:mainPage>{{ $t("Settings") }}</template>
            <template v-slot:currentPage> {{ $t("Notification_settings") }} </template>
        </ui-breadCrumb>
        <div class="row justify-content-center">
            <div class="col-md-8">
                <base-card class="p-5">
                    <form>
                        <div class="bg-light p-3 flex-between rounded-3 w-75 m-auto shadow-sm">
                            <h5> {{ $t("Activate_notifications") }}</h5>
                            <InputSwitch v-model="isNotify" @input="updateNotifyStatus" />
                        </div>
                    </form>

                </base-card>
            </div>
        </div>
    </base-container>
    <footer-component></footer-component>
</template>
<script>
import { useAuthStore } from '@/store/authStore'
definePageMeta({
  middleware: "check-auth",
})
export default {
    data() {
        return {
            localePath: useLocalePath(),
            axios: useNuxtApp().$axios,
            toast: useToast(),
            token: '',
            formData: '',
            isNotify: null
        }
    },
    methods: {

        async updateNotifyStatus() {
            // alert(this.token);
            const config = {
                headers: { Authorization: `Bearer ${this.token}` }
            }
            await this.axios.patch('switch-notify', '', config).then((res) => {
                let msg = res.data.msg
                if (res.data.key === 'success') {
                    alert(msg)

                    // this.toast.success(msg)
                    // this.isNotify = useAuthStore().user.is_notify
                } else {
                    // this.toast.error(msg)
                    alert(msg)
                }
            }).catch((error) => {
                console.log(error)
            })
        },
        async getProfile() {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${this.token}` }
                };
                await this.axios.get('profile', config).then((res) => {
                    this.isNotify = res.data.data.is_notify;
                    console.log(res.data.data.is_notify)

                })
            } catch (error) {
                console.log(error);
            }
        }

    },
    mounted() {
        this.token = useAuthStore().user.token
        console.log(this.token)
        this.getProfile()

    },



}
</script>
