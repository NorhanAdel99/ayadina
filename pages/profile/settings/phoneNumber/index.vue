<template>
    <div class="row justify-content-center">
        <div class="col-md-7">
            <UiBreadCrumb :to="localePath('/')">
                <template v-slot:mainPage> {{ $t("Settings") }} </template>
                <template v-slot:currentPage> {{ $t("edit_phone") }}</template>
            </UiBreadCrumb>
            <ui-base-card class="p-5 rounded-4">
            <ui-main-title>{{ $t("Enter_the_new_mobile_number_and_password") }}</ui-main-title>
                <form  @submit.prevent="changePhone">
                    <inputs-vefication-code />
                    <div class="form-group">
                        <label class="form-label" id="phone">
                            {{ $t("phoneNumber") }}
                            <span class="text-danger"> * </span>
                        </label>
                        <div class="with_cun_select">
                            <input type="number" id="phone" class="main_input form-control" v-model="phone">
                            <div class="card d-flex justify-content-center dropdown_card">
                                <Dropdown v-model="selectedCountry" :options="countries" optionLabel="name">
                                    <template #value="slotProps">
                                        <div v-if="slotProps.value" class="flex-group-me">
                                            <img :alt="slotProps.value.label" :src="slotProps.value.image"
                                                style="width: 24px" />
                                            <div>{{ slotProps.value.code }}</div>
                                        </div>
                                        <span v-else>
                                            {{ slotProps.placeholder }}
                                        </span>
                                    </template>
                                    <template #option="slotProps">
                                        <div class="flex-group-me">
                                            <img :alt="slotProps.option.code" :src="slotProps.option.image"
                                                width="20rem" />
                                            <div>{{ slotProps.option.code }}</div>
                                        </div>
                                    </template>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                    <inputs-form-control mode="form-control" type="password" id="password" v-model.trim="password"> {{ $t( "password") }} </inputs-form-control>

                    <div class="flex-center mb-3">
                        <ui-base-button mode="main_btn lg "  
                            > {{ $t( "continuation") }}
                        </ui-base-button>
                    </div>
                </form>
            </ui-base-card>
        </div>
    </div>
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
        countries:[],
        code: '',
        formData:'',
        selectedCountry: {
            code: "+966",
            // image: require("@/assets/images/Flag.webp"),
        },
        password: ''

    }
},
mounted() {
    this.token = useAuthStore().user.token
    this.user = useAuthStore().user

    this.axios.get('/country-code')
        .then((response) => {
            console.log('response: ', response.data.data)
            this.countries = response.data.data
        })
        .catch(function (error) {
            console.log(error);
        })

},
methods:{
    async changePhone() {
        this.code = this.selectedCountry.code.replace(/\+/g, '')
        this.formData = {
            phone: this.phone,
            password: this.password,
            country_code: this.code
        };
       await  this.axios.post('/change-phone-send-code', this.formData , {
        headers: {
                Authorization: `Bearer ${this.token}`,
            }
       })
            .then((response) => {
                if (response.data.key == "success") {
                    this.code=localStorage.setItem("country_code" ,this.code );
                    this.phone=localStorage.setItem("Newphone" ,this.phone );
                    this.$toast.add({ detail: `${response.data.msg}`, life: 3000 });
                    useRouter().push({ path:'/profile/settings/phoneNumber/otpPhone' });
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