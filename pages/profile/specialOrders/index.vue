<template>
    <ui-main-title>
        {{ $t("personalFile") }}
    </ui-main-title>
    <profile-tabs></profile-tabs>
    <div class="row justify-content-center">
        <div class="col-md-10">
            <div v-if="orders">
                <ui-base-card v-for="order in orders" :key="order.id" :id="order.id" class="mb-3 flex-between "
                    @click="selectId">
                    <div>
                        <span> {{ $t("order_number") }} : </span>
                        <span>{{ order.order_number }}</span>
                    </div>
                    <NuxtLink :to="localePath('/profile/specialOrders/' + `${order.id}`)" class="f-13 text-dark">
                        <font-awesome-icon icon="fa-solid fa-chevron-left " />
                    </NuxtLink>
                </ui-base-card>
            </div>
            <div v-else>
                <div class="text-danger">
                    {{ $t("no_orders_until_now") }}
                </div>
            </div>

        </div>
    </div>
</template>

<script>
definePageMeta({
  middleware: "check-auth",
})
import { useAuthStore } from '@/store/authStore';
export default {
    data() {
        return {
            axios: useNuxtApp().$axios,
            selectedOrder: '',
            localePath: useLocalePath(),
            orders: [],
            token: '',
        }
    },
    mounted() {
        this.token = useAuthStore().token
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
    }

}
</script>