<template>
   
    <div class="row justify-content-center">
        <div class="col-md-7">
            <ui-breadCrumb :to="localePath('/profile/settings')">
                <template v-slot:mainPage>    {{ $t("Settings") }} </template>
                <template v-slot:currentPage>  {{ $t("edit_password") }} </template>
            </ui-breadCrumb>
            <ui-base-card class="p-5 rounded-4">
                <form  @submit.prevent="updatePassword">
                    <inputs-form-control mode="form-control" id="passpassword1" v-model="old_password"> {{ $t("Current_Password") }} </inputs-form-control>
                    <inputs-form-control mode="form-control" type="password" id="password2" v-model="password"> {{ $t("New_Password") }} </inputs-form-control>
                    <inputs-form-control mode="form-control" type="password" id="password3" v-model="ConfirmPassword"> {{ $t("Confirm_current_password") }}</inputs-form-control>
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
        <ui-base-button mode="main_btn" @click="visible = false" link  :to="localePath('/profile/settings')">   {{ $t("Settings") }}  </ui-base-button>
    </div>
</Dialog>
<toast />
</template>
<script>
import Dialog from 'primevue/dialog';
import { useAuthStore } from '@/store/authStore'

export default {
components:{Dialog},
data() {
    return {
        completed: false,
        visible: false,
        localePath: useLocalePath() ,
        axios: useNuxtApp().$axios,
        token:"",
        formData:"",
        old_password:"",
        password:"" ,
        ConfirmPassword:"",
        showSuccess:false,
        // toast :useToast()
    }
},
mounted() {
    this.token = useAuthStore().user.token
    },
methods:{
    async updatePassword() {
        this.formData = {
            old_password: this.old_password,
            password: this.password,
        };     
       await  this.axios.post('/update-passward', this.formData , {
        headers: {
                Authorization: `Bearer ${this.token}`,
            }
       })
            .then((response) => {
                if (response.data.key == "success") {
                        this.showSuccess = true ;
                        this.$toast.add({ detail: `${response.data.msg}`, life: 3000 });
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

