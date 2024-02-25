<template>
    <ui-breadCrumb to="/">
        <template v-slot:mainPage> الرئيسية </template>
        <template v-slot:currentPage> عمولة الموقع </template>
    </ui-breadCrumb>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <ui-base-card>
                <ui-main-title> برجاء ارفاق صورة الحوالة </ui-main-title>
                <form>
                    <div class="row justify-content-center">
                        <div class="col-md-8">
                            <inputs-form-control type="text" id="ownerName" v-model.trim="name"> اسم صاحب المحل
                            </inputs-form-control>
                            <inputs-form-control type="number" id="number" v-model.trim="acccountNum"> رقم الحساب المحول منه
                            </inputs-form-control>
                            <inputs-form-control type="text" id="bankName" v-model="bankName"> اسم بنك الحساب المحول منه
                            </inputs-form-control>

                            <inputs-imgInput> صورة التحويل </inputs-imgInput>
                            <div class="flex-center">
                                <ui-base-button link to="/" class="main_btn lg"> ارسال </ui-base-button>
                            </div>
                        </div>
                    </div>
                </form>
            </ui-base-card>
        </div>
    </div>
</template>
<script>
import nuxtStorage from 'nuxt-storage';
export default {
    data() {
        return {
            localePath: useLocalePath(),
            userId: '',
            formData: '',
            name: '',
            acccountNum: '',
            bankName: '',
        }
    },
    mounted() {
        this.userId = nuxtStorage.localStorage.getData('userId')
        if (!this.userId) {
            useRouter().push({ path: '/' })
            console.log('no')
        } else {
            console.log('yes')
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


