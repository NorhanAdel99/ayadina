<template>
    <ui-base-container>
        <div class="row mb-3 justify-content-center">
            <div class="col-md-8">
                <ui-base-card class="mb-3">
                    <div class="d-flex justify-content-between align-items-start gap-10 flex-wrap ">
                        <div class="d-flex align-items-start gap-10">
                            <img :src="provider.image" alt="image" class="circleImg">
                            <div>
                                <div class="d-flex gap-30 align-items-center mb-2">
                                    <h5 class=""> {{ provider.name }} </h5>
                                    <div>
                                        <span> {{ provider.rate_average }} </span>
                                        <font-awesome-icon icon="fa-solid fa-star" class="text-warning " />
                                    </div>
                                </div>
                                <div class="mb-2">
                                    <font-awesome-icon icon="fa-solid fa-list-check" class="m-end-5" />
                                    <span class="m-end-5"> {{ provider.membership_number }} </span>
                                </div>
                                <div class="mb-2">
                                    <font-awesome-icon icon="fa-solid fa-phone" class="m-end-5" />
                                    <span>{{  provider.phone}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex align-items-center gap-10">
                            <NuxtLink to="/chat/d2" class="main_btn transparent_btn main_color gap-10">
                                <font-awesome-icon :icon="['fas', 'comments']" />
                                <span>{{ $t("Messaging") }}</span>
                            </NuxtLink>
                            <ui-base-button label="Show" icon="pi pi-external-link" @click="visible = true"
                                class="border-danger main_btn transparent_btn text-danger gap-10">
                                <font-awesome-icon :icon="['fas', 'flag']" />
                                <span>{{ $t("Report") }}</span>
                            </ui-base-button>
                        </div>
                    </div>
                    <p class="text-muted"> {{  provider.description}}</p>
                </ui-base-card>
                <div class="flex-center">
                    <ui-base-button mode="main_btn lg" link to="/previousWork">  {{ $t("See_previous_works") }}</ui-base-button>
                </div>
                <ui-base-button mode="main_btn lg mb-3" @click="visible = true"> {{ $t("Evaluate") }}</ui-base-button>
                <ui-base-card v-for="rate in rating" :key="rate.rate_id" class="my-3">
                    <div>
                        <div class="flex-between">
                            <div class="d-flex align-items-center gap-10">
                                <img src="../../assets/imgs/G2.png" alt="" class="circleImg">
                                <div class="mb-3">
                                    <h5 class="mb-2"> {{  rate.user.name}} </h5>
                                    <h6 class="text-muted">{{  rate.created_at}} </h6>
                                </div>
                            </div>
                            
                            <button label="Show" icon="pi pi-external-link" @click="visible3 = true"
                                class="border-danger main_btn transparent_btn text-danger gap-10">
                                <font-awesome-icon :icon="['fas', 'flag']" />
                                <span>{{ $t("Report") }}</span>
                            </button>
                        </div>
                        <Rating v-model="rate.rate" :cancel="false" class="mb-3" readonly />

                        <p class="mb-3">
                            {{ rate.comment }}
                        </p>
                    </div>
                </ui-base-card>
            </div>
        </div>
    </ui-base-container>
    <footer-component></footer-component>

    <Dialog v-model:visible="visible" modal header="إضافة تقييم " :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <div class="row justify-content-center">
            <div class="col-md-10">
                <div class="card p-3">
                    <form>
                        <form-control textarea id="rate">أضف تعليقك</form-control>
                        <div class="flex-center">
                            <ui-base-button mode="main_btn lg " @click="visible = false, visible2 = true" type="button">
                                إرسال
                            </ui-base-button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </Dialog>
    <Dialog v-model:visible="visible2" modal :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <font-awesome-icon icon="fa-regular fa-circle-check" class="modal-exclam-mark mb-3 main_color" />
        <h6 class="text-center mb-3"> تم إرسال تقييمك شكرا لك </h6>
    </Dialog>
    <Dialog v-model:visible="visible3" modal header="ابلاغ" :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <div class="row justify-content-center">
            <div class="col-md-10">
                <form @submit.prevent>
                    <form-control type="text" :id="name">الاسم</form-control>
                    <form-control id="num" type="number"> رقم الجوال </form-control>
                    <form-control id="email" type="email"> البريد الالكتروني </form-control>
                    <form-control textarea id="Report"> اكتب هنا</form-control>

                    <div class="flex-center mb-3">
                        <ui-base-button icon="pi pi-check" aria-label="Close" type="button" class="main_btn"
                            @click=" visible3 = false, visible4 = true">
                            إرسال</ui-base-button>
                    </div>
                </form>

            </div>
        </div>
    </Dialog>
    <Dialog v-model:visible="visible4" modal :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <font-awesome-icon icon="fa-regular fa-circle-check" class="modal-exclam-mark mb-3 main_color" />
        <h6 class="text-center mb-3"> تم استقبال بلاغك بنجاح </h6>
    </Dialog>
</template>
<script>
import { useRoute } from 'vue-router';
export default {
    data() {
        return {
            axios: useNuxtApp().$axios,
            visible: false,
            visible2: false,
            visible3: false,
            visible4: false,
            id: useRoute().params.id,
            provider:"",
            rating:[]

        }
    },
    mounted() {
        this.provider_details()
    },
    methods: {
        provider_details() {
            this.axios.get(`provider-details/ ${this.id}`)
                .then((response) => {
                    this.provider=response.data.data.provider;
                    this.rating=response.data.data.ratings;
                    console.log(this.rating)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

}
</script>