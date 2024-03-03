<template>
    <ui-base-container>
        <div class="row mb-3 justify-content-center">
            <div class="col-md-8">
                <ui-base-card class="mb-3">
                    <div class="d-flex justify-content-between align-items-start gap-10 flex-wrap ">
                        <div class="d-flex align-items-start gap-10">
                            <img src="../../assets/imgs/G2.png" alt="" class="circleImg">
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
                            <NuxtLink to="/chat/d2" class="main_btn transparent_btn main_color gap-10">
                                <font-awesome-icon :icon="['fas', 'comments']" />
                                <span>مراسلة</span>
                            </NuxtLink>
                            <ui-base-button label="Show" icon="pi pi-external-link" @click="visible = true"
                                class="border-danger main_btn transparent_btn text-danger gap-10">
                                <font-awesome-icon :icon="['fas', 'flag']" />
                                <span>إبلاغ</span>
                            </ui-base-button>
                        </div>
                    </div>
                    <p class="text-muted"> هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن
                        يستبدل في نفس المساحة في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو
                        مثال لنص يمكن أن يستبدل في نفس المساحة</p>
                </ui-base-card>
                <div class="flex-center">
                    <ui-base-button mode="main_btn lg" link to="/previousWork">رؤية الاعمال السابقة</ui-base-button>
                </div>
                <ui-base-button mode="main_btn lg mb-3" @click="visible = true"> قم بالتقييم </ui-base-button>
                <ui-base-card>
                    <div class="border-bottom">
                        <div class="flex-between">
                            <div class="d-flex align-items-center gap-10">
                                <img src="../../assets/imgs/G2.png" alt="" class="circleImg">
                                <div class="mb-3">
                                    <h5 class="mb-2">محمد أحمد </h5>
                                    <h6 class="text-muted"> 25/9/2023 </h6>
                                </div>
                            </div>
                            <button  label="Show" icon="pi pi-external-link" @click="visible3 = true" class="border-danger main_btn transparent_btn text-danger gap-10">
                                <font-awesome-icon :icon="['fas', 'flag']" />
                                <span>إبلاغ</span>
                            </button>
                        </div>
                        <div class="rate">
                                    <input type="radio" id="star5" name="rate" value="5" />
                                    <label for="star5" title="text">5 stars</label>
                                    <input type="radio" id="star4" name="rate" value="4" checked />
                                    <label for="star4" title="text">4 stars</label>
                                    <input type="radio" id="star3" name="rate" value="3"  />
                                    <label for="star3" title="text">3 stars</label>
                                    <input type="radio" id="star2" name="rate" value="2"  />
                                    <label for="star2" title="text">2 stars</label>
                                    <input type="radio" id="star1" name="rate" value="1" />
                                    <label for="star1" title="text">1 star</label>
                                </div>
                        <p class="mb-3">
                            هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس
                            المساحة في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص
                            يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة
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
                            <ui-base-button mode="main_btn lg " @click="visible = false, visible2 = true" type="button"> إرسال
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
                    <form-control  id="num" type="number">  رقم الجوال </form-control>
                    <form-control  id="email" type="email">  البريد الالكتروني   </form-control>
                    <form-control textarea id="Report"> اكتب هنا</form-control>

                    <div class="flex-center mb-3">
                        <ui-base-button icon="pi pi-check" aria-label="Close" type="button" class="main_btn"
                            @click=" visible3 = false , visible4 = true">
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
///////////////////////////////////////////////////////////////

import Dialog from 'primevue/dialog';

///////////////////////////////////////////////////////////////
export default {
    components: {Dialog},
    data() {
        return {
            visible: false,
            visible2: false,
            visible3: false,
            visible4: false,
        }
    }
}
</script>