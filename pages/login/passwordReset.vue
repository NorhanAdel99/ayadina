<template>
    <ui-base-container>
        <div class="row justify-content-center">
            <div class="col-md-5">
                <ui-main-title> كود التحقق </ui-main-title>
                <form>
                    <inputs-form-control mode="form-control" type="password" id="password"> كلمة المرور الجديدة </inputs-form-control>
                    <inputs-form-control mode="form-control" type="password" id="password2"> تأكيد كلمة المرور الجديدة
                    </inputs-form-control>
                    <div class="flex-center mb-3">
                        <ui-base-button mode="main_btn lg " link :to="localePath('/login')">
                            تأكيد
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
            localePath: useLocalePath()
        }
    },
}
</script>