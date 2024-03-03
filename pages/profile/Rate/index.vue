<template>
    <ui-main-title>
        {{ $t('personalFile') }}
    </ui-main-title>
    <profile-tabs></profile-tabs>
    <div class="row justify-content-center">
        <div class="col-md-10">
            <ui-noData v-if="rates.length === 0">
                {{ $t('No_rates') }}

            </ui-noData>
            <ui-base-card v-else>
                <div v-for="rate in rates" :key="rate.id" class="mb-3 border-bottom mb-3">
                    <div class="flex-between mb-3">
                        <div class="d-flex gap-10">
                            <img :src="rate.img" class="circleImg">
                            <div>
                                <h6>{{ rate.user.name }}</h6>
                                <p> {{ rate.created_at }}</p>
                            </div>
                        </div>
                        <div class="report" label="Show" @click="report(rate.id)">
                            <font-awesome-icon icon="fa-solid fa-flag" />
                            <span> {{ $t('Report') }}
                            </span>
                        </div>
                    </div>
                    <Rating v-model="rate.rate" :cancel="false" class="mb-3" readonly />

                    <!-- rate -->
                    <p class="text-muted">
                        {{ rate.comment }}
                    </p>
                </div>


            </ui-base-card>

        </div>
    </div>


    <Dialog v-model:visible="visible" modal :header="$t('Report')" :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <div class="row justify-content-center">
            <div class="col-md-10">
                <form @submit.prevent="complaint">
                    <inputsFormControl type="text" name="name" id="ownerName" v-model.trim="name"> {{ $t('name') }}

                    </inputsFormControl>
                    <inputsFormControl type="email" name="email" id="ownerName" v-model.trim="email"> {{ $t("email") }}

                    </inputsFormControl>
                    <div class="form-group">
                        <label class="form-label" id="phone">
                            {{ $t('phoneNumber') }}

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
                                            <img :alt="slotProps.option.code" :src="slotProps.option.image" width="20rem" />
                                            <div>{{ slotProps.option.code }}</div>
                                        </div>
                                    </template>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                    <inputsFormControl type="text" id="bankName" textarea v-model.trim="messege"> {{ $t('Message_Subject')
                    }}

                    </inputsFormControl>

                    <div class="flex-center">
                        <ui-base-button class="main_btn">
                            {{ $t('send') }}

                        </ui-base-button>
                    </div>
                    </form>
                    <!-- <span v-else>
                      {{ slotProps.placeholder }}
                    </span> -->

                    <!-- </template>
                  <template #option="slotProps">
                    <div class="flex-group-me">
                      <img
                        :alt="slotProps.option.code"
                        :src="slotProps.option.image"
                        width="20rem"
                      />
                      <div>{{ slotProps.option.code }}</div>
                    </div>
                  </template>
                </Dropdown>-->
            </div>
</div>
    </Dialog>
    <!-- certain -->
    <Dialog v-model:visible="visible2" modal :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <font-awesome-icon icon="fa-regular fa-circle-check" class="modal-exclam-mark mb-3 main_color" />
        <h6 class="text-center mb-3"> {{ msg }}</h6>
        <div class="flex-center">
            <ui-base-button mode="main_btn" @click="visible2 = false"> {{ $t('myRates') }} </ui-base-button>
        </div>
    </Dialog>
    <toast />
</template>

<script>
definePageMeta({
    middleware: "check-auth",
})

import Dialog from 'primevue/dialog';

import { useAuthStore } from '@/store/authStore';

export default {
    components: {
        Dialog,
    },

    data() {
        return {
            axios: useNuxtApp().$axios,
            commentId: null,
            visible: false,
            visible2: false,
            value: null,
            countries: [],
            code: '',
            selectedCountry: {
                code: "+966",
                // image: require("@/assets/images/Flag.webp"),
            },
            rates: [],
            msg: '',
        }

    },
    mounted() {
        this.value = this.rates.map(item => item.rate);
        this.token = useAuthStore().token

        this.axios.get('/my-ratings', {
            headers: {
                Authorization: `Bearer ${this.token}`,
            }
        })
            .then((res) => {
                this.rates = res.data.data.data
                console.log(res.data.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
        /////// country-code 
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
        report(id) {
            this.commentId = id
            // console.log(this.commentId)
            this.visible = true
        },
        async complaint() {
            this.code = this.selectedCountry.code.replace(/\+/g, '')
            this.formData = {
                user_name: this.name,
                phone: this.phone,
                complaint: this.messege,
                country_code: this.code,
                email: this.email,
                comment_id: this.commentId
            };
            await this.axios.post('/complaint', this.formData, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                }
            })
                .then((response) => {
                    if (response.data.key == "success") {
                        this.msg = response.data.msg
                        this.visible2 = true,
                            this.visible = false
                    } else {
                        this.$toast.add({ detail: `${response.data.msg}`, life: 3000, severity: 'info' });
                    }
                })
                .catch(function (error) {
                    this.$toast.add({ detail: `${error}`, life: 3000, severity: 'info' });

                })
        }
    }


}

</script>
<style >
.p-rating:not(.p-disabled):not(.p-readonly) .p-rating-item:hover .p-rating-icon,
.p-rating .p-rating-item.p-rating-item-active .p-rating-icon {
    color: rgb(255, 221, 0) !important;
}
</style>
