<template>
    <ui-breadCrumb to="/">
        <template v-slot:mainPage> {{ $t('home_title') }} </template>
        <template v-slot:currentPage> {{ $t('Site_commission') }} </template>
    </ui-breadCrumb>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <ui-base-card>
                <ui-main-title> {{ $t("Please_attach_a_copy_of_the_transfer") }}</ui-main-title>
                <form ref="payForm" @submit.prevent="payCommission" class="form">
                    <div class="row justify-content-center">
                        <div class="col-md-8">
                            <inputs-form-control type="text" id="ownerName" v-model.trim="name"> {{ $t(
                                "Name_of_the_shop_owner") }}
                            </inputs-form-control>
                            <inputs-form-control type="number" id="number" v-model.trim="acccountNum">
                                {{ $t("Account_number_transferred_from") }}
                            </inputs-form-control>
                            <inputs-form-control type="text" id="bankName" v-model="bankName"> {{ $t(
                                "Name_of_the_bank_the_account_is_transferred_from") }}
                            </inputs-form-control>
                            <InputsImgInput :modelValue="img" @update:modelValue="updateImageUrl" @removeImage="removeImage"
                                name="image" id="image" />
                            <div class="flex-center">
                                <ui-base-button class="main_btn lg"> {{ $t("send") }} </ui-base-button>
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
                    }else{
                        this.$toast.add({ detail: `${response.data.msg}`, life: 3000 });
                    }
                }).catch((error) => {
                    this.$toast.add({ detail: `${response.data.msg}`, life: 3000 });
                })
        }
    },

}
</script>
<style  lang="scss" scoped>
.base-image-input {
    border: 1px dashed #12a7d8 !important;
    margin: 0 !important;
}

@media (max-width:768px) {
.form{
    font-size: 14px;
}
  
}</style>


