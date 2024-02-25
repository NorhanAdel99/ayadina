<template>
        <div class="row justify-content-center">
            <div class="col-md-5">
                <ui-main-title> استعادة كلمة المرور </ui-main-title>
                <form>
                    <inputs-form-control mode="form-control" ref="mail" type="email" id="email" v-model.trim="email"> البريد
                        الالكتروني
                    </inputs-form-control>
                    <div class="flex-center mb-3">
                        <!-- <ui-base-button link mode="main_btn lg"  to="localePath('login/email/otp')" >
                        ارسال
                        </ui-base-button> -->
                        <ui-base-button mode="main_btn" link :to="localePath('/login/otp')"> رجوع للقسم
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
            email: ''
        }
    }
    // methods:{
    //     noRegister(){
    //         this.$store.dispatch('auth/logOut')
    //     }
    // }
}
</script>