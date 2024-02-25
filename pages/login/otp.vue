<template>
    <div class="row justify-content-center">
        <div class="col-md-5">
            <ui-main-title> كود التفعيل </ui-main-title>
            <form @submit.prevent="activation">
                <div class="contain-otp flex-center mb-3">
                    <inputs-codeInput></inputs-codeInput>
                    <!-- <v-otp-input ref="otpInput" input-classes="otp-input" separator="-" :num-inputs="4"
                        :should-auto-focus="true" :is-input-num="true" :conditionalClass="['one', 'two', 'three', 'four']"
                        :placeholder="['*', '*', '*', '*']" @on-change="handleOnChange" @on-complete="handleOnComplete" /> -->
                    <!-- @complete="completed = true"  -->
                </div>
                <div class="flex-center mb-3">
                    <ui-base-button mode="main_btn lg">
                        تأكد
                    </ui-base-button>
                </div>
                <NuxtLink class="text-center d-block main_color" link :to="localePath('/login/otp')">
                    لم يصلك كود ؟
                </NuxtLink>
            </form>

        </div>
    </div>
</template>
<script>
import nuxtStorage from 'nuxt-storage';

export default {
    components: { nuxtStorage, },
    data() {
        return {
            localePath: useLocalePath(),
            axios: useNuxtApp().$axios,
            userMail: '',
            code: '',
            activateForm: ''
        }
    },
    mounted() {
        this.userMail = nuxtStorage.localStorage.getData('email')
        console.log(this.userMail)
    },
    methods: {
        handleOnComplete(value) {
            console.log('OTP completed: ', value);

        },
        handleOnChange(value) {
            console.log('OTP changed: ', value);
        },
        async activation() {
            this.code = nuxtStorage.localStorage.getData('code');
            this.activateForm = {
                code: this.code,
                email: this.userMail
            }
            await this.axios.post('/', this.activateForm)
                .then((response) => {
                    console.log(response.data.key)
                }).catch((error) => {
                    console.log(error)
                }
                )

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