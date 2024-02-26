<template>
    <ui-breadCrumb to="/">
        <template v-slot:mainPage> الرئيسية </template>
        <template v-slot:currentPage> عمولة الموقع </template>
    </ui-breadCrumb>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <ui-base-card>
                <ui-main-title> برجاء ارفاق صورة الحوالة </ui-main-title>
                <form ref="payForm" @submit.prevent="payCommission">
                    <div class="row justify-content-center">
                        <div class="col-md-8">
                            <inputs-form-control type="text" id="ownerName" v-model.trim="name"> اسم صاحب المحل
                            </inputs-form-control>
                            <inputs-form-control type="number" id="number" v-model.trim="acccountNum"> رقم الحساب المحول منه
                            </inputs-form-control>
                            <inputs-form-control type="text" id="bankName" v-model="bankName"> اسم بنك الحساب المحول منه
                            </inputs-form-control>

                            <!-- <InputsImgInput
            :modelValue="userImg"
            id="profileImg"
            @update:modelValue="updateImageUrl"
            @removeImage="removeImage"
            :name="updateProfile"
          /> -->
                            <InputsImgInput :modelValue="img" @update:modelValue="updateImageUrl" @removeImage="removeImage"
                                name="image" id="image" />
                            <div class="flex-center">
                                <ui-base-button class="main_btn lg"> ارسال </ui-base-button>
                            </div>
                        </div>
                    </div>
                </form>
            </ui-base-card>
        </div>
    </div>
</template>
<script>
import { useAuthStore } from '@/store/authStore';
export default {
    data() {
        return {
            localePath: useLocalePath(),
            userId: '',
            formData: '',
            name: '',
            acccountNum: '',
            bankName: '',
            // axios: useNuxtApp().axios,
            token: null,
            // axios: useNuxtApp().axios,
        }
    },
    mounted() {
        this.token = useAuthStore().token

    },
    methods: {
        updateImageUrl(newImageUrl) {
            this.img = newImageUrl;
        },
        removeImage() {
            this.img = "";
        },
        async payCommission() {
            const fd = new FormData(this.$refs.payForm)
            fd.append('account_holder_name', this.name)
            fd.append('bank_name', this.bankName)
            fd.append('account_number', this.acccountNum)
            await this.$axios.post('/pay-commission', fd, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            })
                .then((response) => {
                    if (response.data.key === 'success') {
                        this.$toast.add({ detail: `${response.data.msg}`, life: 3000 });
                    }
                })
        }
    },

}
</script>
<style >
.base-image-input {
    border: 1px dashed #12a7d8 !important;
    margin: 0 !important;
}
</style>


