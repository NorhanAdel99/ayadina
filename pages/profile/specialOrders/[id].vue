<template>
    <ui-breadCrumb :to="localePath('/profile/specialOrders')">
        <template v-slot:mainPage> {{ $t("myorder") }} </template>
        <template v-slot:currentPage>  {{ $t("Order_details") }}   </template>
    </ui-breadCrumb>
    <div>
        <ui-base-card class="flex-between mb-3">
            <div>
                <span class="text-muted text-bold">  {{ $t("order_number") }} : </span>
                <span class="font-bold text-muted-d">{{ ordersDetails.order_number }}</span>
            </div>
            <div>
                <span class="cursor-pointer" label="Show" icon="pi pi-external-link" @click="visible = true">
                    <font-awesome-icon :icon="['fas', 'trash-can']" class="text-danger m-end-10 f-13" />
                </span>
                <span class="cursor-pointer" label="Show" icon="pi pi-external-link" @click="visible3 = true">
                    <font-awesome-icon :icon="['fas', 'pen']" class=" m-end-10 f-13" />
                </span>
            </div>
        </ui-base-card>
        <ui-base-card class="mb-3">
            <div>
                <span class="text-muted ">  {{ $t("Main_section") }} : </span>
                <span class="font-bold text-muted-d">{{ ordersDetails.category }}</span>
            </div>
        </ui-base-card>
        <ui-base-card class="mb-3">
            <div>
                <span class="text-muted">  {{ $t("Subsection") }}  : </span>
                <span class="font-bold text-muted-d">{{ ordersDetails.sub_category }}</span>
            </div>
        </ui-base-card>
        <ui-base-card class="mb-3">
            <div>
                <div class="text-muted-d font-bold mb-2">  {{ $t("Description_of_the_request") }} : </div>
                <p class="text-muted ">
                    {{ ordersDetails.description }}
                </p>

            </div>
        </ui-base-card>
    </div>


    <Dialog v-model:visible="visible" :header="$t('Do_you_really_want_to_delete_the_order')" modal :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <font-awesome-icon icon="fa-solid fa-triangle-exclamation" class="modal-exclam-mark mb-3" />

        <div class="flex-center gap-10">
            <button type="button" class="btn btn-danger main_btn" label="Show" @click="remove"> {{ $t("yes")  }}</button>
            <button type="button" class="btn btn-primary main_btn" label="Show" @click=" visible = false"> {{ $t("no")  }} </button>
        </div>
    </Dialog>
    <Dialog v-model:visible="visible2" modal :header="$t('The_request_has_been_successfully_deleted')" :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <font-awesome-icon icon="fa-solid fa-triangle-exclamation" class="modal-exclam-mark mb-3" />
    </Dialog>
    <Dialog v-model:visible="visible3" :header="$t('Description_of_the_request')" modal :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <form @submit.prevent="update">
            <InputsFormControl :placeholder="descripe" v-model.trim="ordersDetails.title">   {{ $t("nameofOrder") }}   
            </InputsFormControl>
            <InputsFormControl textarea v-model.trim="ordersDetails.description"> {{ $t("Description_of_the_request") }}  
            </InputsFormControl>
            <div class="flex-center">
                <ui-base-button mode="main_btn" @click=" visible3 = false, visible4 = true">  {{ $t("save_edits") }}  </ui-base-button>
            </div>
        </form>

    </Dialog>
    <Dialog v-model:visible="visible4" modal :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <font-awesome-icon icon="fa-regular fa-circle-check" class="modal-exclam-mark mb-5 main_color" />
        <div class="flex-center">
            <ui-base-button mode="main_btn" @click="visible4 = false"> {{ $t("Back_to_order") }} </ui-base-button>
        </div>
    </Dialog>
</template>
<script>

import Dialog from 'primevue/dialog';
import { useAuthStore } from '@/store/authStore';
definePageMeta({
  middleware: "check-auth",
})

export default {
    components: { Dialog },
    props: ['id'],
    data() {
        return {
            selectedOrder: '',
            visible: false,
            visible2: false,
            visible3: false,
            visible4: false,
            descripe: '',
            localePath: useLocalePath(),
            ordersDetails: [],
            axios: useNuxtApp().$axios,
            token: '',
            orders: [],

        }
    },
    mounted() {
        this.token = useAuthStore().token

        this.axios.get(`my-special-order/${useRoute().params.id}`, {
            headers: {
                Authorization: `Bearer ${this.token}`,
            }
        })
            .then((response) => {
                this.ordersDetails = response.data.data
                console.log(response.data.data)
            })
            .catch(function (error) {
                console.log(error);
            })
      
            this.axios.get('/my-special-orders', {
            headers: {
                Authorization: `Bearer ${this.token}`,
            }
        })
            .then((response) => {
                this.orders = response.data.data
                console.log(response);

            })
            .catch(function (error) {
                console.log(error);
            })
    },

    methods: {
        remove() {
            const id = useRoute().params.id;
            const orderIndex = this.orders.findIndex((order) => order.id === id);
            this.axios.delete(`delete-my-order/${id}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                }
            })
                .then(() => {
                    this.orders.splice(orderIndex, 1);
                    this.visible2 = true;
                    this.visible = false;
                    console.log(`Order with ID ${id} deleted successfully.`);
                    useRouter().push({ path: '/profile/specialOrders' })
                })
                .catch((error) => {
                    console.error('Error deleting order:', error);
                });

        },
        async update() {
            // edit-my-order


            this.updateForm = {
                order_id: useRoute().params.id,
                title: this.ordersDetails.title,
                description: this.ordersDetails.description
            }
            await this.axios.post('/edit-my-order', this.updateForm, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                }
            })
                .then((response) => {
                    console.log(response)
                }).catch((error) => {
                    console.log(error)
                }
                )


        }
    }

}
</script>