<template>
    <ui-breadCrumb  :to="localePath('/subCategory')">
        <template v-slot:mainPage>طلباتي الخاصة </template>
        <template v-slot:currentPage> مطلوب مدرب سباحة </template>
    </ui-breadCrumb>
    <div class="row mb-3 justify-content-center">
        <div class="col-md-8">
            <ui-base-card class="mb-3">
                <div class="d-flex justify-content-between align-items-start gap-10 flex-wrap ">
                    <div class="d-flex align-items-start gap-10">
                        <img src="@/assets/imgs/G2.png" alt="" class="circleImg">
                        <div>
                            <div class="d-flex gap-30 align-items-center mb-2">
                                <h5 class="">محمد أحمد </h5>
                                <div>
                                    <span> 4.5 </span>
                                    <font-awesome-icon icon="fa-solid fa-star" class="text-warning " />
                                </div>
                            </div>
                            <div class="mb-2">
                                <font-awesome-icon icon="fa-solid fa-list-check" class="m-end-5" />
                                <span class="m-end-5"> 1233 </span>
                                <span class="m-end-5"> # </span>
                            </div>
                            <div class="mb-2">
                                <font-awesome-icon icon="fa-solid fa-phone" class="m-end-5" />
                                <span>19199191991</span>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex align-items-center gap-10">
                        <NuxtLink :to="localePath('chat/d2')" class="main_btn transparent_btn main_color gap-10">
                            <font-awesome-icon :icon="['fas', 'comments']" />
                            <span>مراسلة</span>
                        </NuxtLink>
                        <button label="Show" icon="pi pi-external-link" @click="visible = true"
                            class="border-danger  main_btn transparent_btn gap-10">
                            <font-awesome-icon :icon="['fas', 'flag']" class="text-danger" />
                            <span class="text-danger">إبلاغ</span>
                        </button>
                    </div>
                </div>
                <p class="text-muted"> هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن
                    يستبدل في نفس المساحة في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو
                    مثال لنص يمكن أن يستبدل في نفس المساحة</p>
            </ui-base-card>
        </div>
        <div class="col-md-10">
            <ui-base-card>
                <h6 class="mb-2"> وصف الطلب : </h6>
                <p class="text-muted">
                    هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس
                    المساحة في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن
                    أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص
                    يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة في نفس المساحة هذا
                    النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة
                    هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس
                    المساحة
                </p>
            </ui-base-card>
        </div>
    </div>
    <Dialog v-model:visible="visible" modal header="ابلاغ" :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <div class="row justify-content-center">
            <div class="col-md-10">
                <form @submit.prevent>
                    <inputs-form-control type="text" :id="name">الاسم</inputs-form-control>
                    <inputs-form-control id="num" type="number"> رقم الجوال </inputs-form-control>
                    <inputs-form-control id="email" type="email"> البريد الالكتروني </inputs-form-control>
                    <inputs-form-control textarea id="Report"> اكتب هنا</inputs-form-control>

                    <div class="flex-center">
                        <ui-base-button icon="pi pi-check" aria-label="Close" type="button" class=" main_btn lg "
                            @click=" visible = false, visible2 = true">
                            إرسال</ui-base-button>
                    </div>
                </form>

            </div>
        </div>
    </Dialog>
    <Dialog v-model:visible="visible2" modal :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <font-awesome-icon icon="fa-regular fa-circle-check" class="modal-exclam-mark mb-3 main_color" />
        <h6 class="text-center mb-3"> تم استقبال بلاغك بنجاح </h6>
    </Dialog>
</template>
<script>
import Dialog from 'primevue/dialog'

export default {
    components: {Dialog },
    data() {
        return {
            visible: false,
            visible2: false,
            localePath: useLocalePath()
        }
    }
}

</script>