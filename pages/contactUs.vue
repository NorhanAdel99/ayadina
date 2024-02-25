<template>
    <ui-main-title> تواصل معنا </ui-main-title>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <img src="../assets/imgs/Phone customization-rafiki 1.png" alt="" class="aboutSectionImg">
            <form ref="formData" @submit.prevent="contact">
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <inputsFormControl type="text" name="name" id="ownerName" v-model.trim="name"> الاسم
                        </inputsFormControl>
                        <div class="form-group">
                            <label class="form-label" id="phone">
                                رقم الجوال
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
                        <inputsFormControl type="text" id="bankName" textarea v-model.trim="messege"> موضوع الرسالة
                        </inputsFormControl>
                        <div class="flex-center">
                            <ui-base-button class="main_btn lg" label="Show" icon="pi pi-external-link"
                                @click="visible = true"> ارسال </ui-base-button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <Dialog v-model:visible="visible" modal :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <font-awesome-icon icon="fa-regular fa-circle-check" class="modal-exclam-mark mb-3 main_color" />
        <skelton v-if="!msg" class="m-auto w-25"></skelton>
        <h6 class="text-center mb-3" v-else>
            {{ msg }}
        </h6>
        <h6 class="text-center mb-3"> سيتم التواصل معك من خلال مقدمي الخدمات</h6>
        <div class="flex-center">
            <ui-base-button mode="main_btn" @click="visible = false" link :to="localePath('/')"> رجوع للقسم
            </ui-base-button>
        </div>
    </Dialog>
</template>
<script>
import Dialog from 'primevue/dialog';
import ImgInput from '~/components/inputs/imgInput.vue';
import Dropdown from 'primevue/dropdown';

export default {
    components: {
        Dialog,
        ImgInput,
        Dropdown,

    },
    data() {
        return {
            visible: false,
            axios: useNuxtApp().$axios,
            localePath: useLocalePath(),
            nodes: null,
            selectedValue: null,
            name: '',
            phone: '',
            messege: '',
            formData: '',
            querystring: '',
            countries: [],
            code: '',
            selectedCountry: {
                code: "+966",
                // image: require("@/assets/images/Flag.webp"),
            },
            msg: ''
        }
    },

    mounted() {
        this.axios.get('/country-code')
            .then((response) => {
                console.log('response: ', response.data.data)
                this.countries = response.data.data
            })
            .catch(function (error) {
                console.log(error);
            })

    },
    methods: {

        async contact() {
            this.code = this.selectedCountry.code.replace(/\+/g, '')
            this.formData = {
                name: this.name,
                phone: this.phone,
                message: this.messege,
                country_code: this.code
            };
           await  this.axios.post('/send-contact', this.formData)
                .then((response) => {

                    console.log(response.data.key);
                    if (response.data.key == "success") {
                        console.log('msg: ', response.data.msg)
                        console.log('msg: ', response.data.data)
                        this.msg = response.data.msg
                    } else {
                        console.log('error');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
        }

    }
}


</script>
<style lang="scss" >
// .base-image-input {
//     border: 1px dashed #12a7d8 !important;
//     margin: 0 !important;
// }
</style>
