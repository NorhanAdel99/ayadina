<template>
    <div v-if="!title">
        <skeleton class="mb-3 m-auto" width="10rem" />
    </div>
    <ui-main-title v-else> {{ title }} </ui-main-title>
    <div class="row justify-content-center">
        <div class="col-md-10">
            <div v-if="!pledge" class="mb-3">
                <skeleton class="mb-3" />
                <skeleton width="50%" />
            </div>
            <p class="mb-10 mb-3" v-else>
                {{ pledge }}
            </p>
            <div v-if="!rate" class="main_color m-auto">
                <skeleton width="10rem" class="mb-3 m-auto" />
            </div>
            <h6 class="main_color mb-3 font-bolder text-center" v-else>
                <span> نسبة الادارة : </span>
                <span> {{ rate }} </span>
            </h6>
            <div v-if="banksDetails.length === 0">
                <Skeleton width="100%" height="4rem" class="mb-3" />
                <Skeleton width="100%" height="4rem" class="mb-3" />
                <Skeleton width="100%" height="4rem" class="mb-3" />

            </div>
            <div class="card p-3 rounded-3 border-0 gap-10 mb-3" v-for="bank in banksDetails" :key="bank.id">
                <h6 class="font-bolder"> بيانات الحساب البنكي </h6>
                <p>
                    <span> اسم البنك :</span>
                    <span> {{ bank.bank_name }} </span>
                </p>
                <p>
                    <span> اسم صاحب الحساب </span>
                    <span> {{ bank.account_name }} </span>
                </p>
                <p>
                    <span> رقم الحساب </span>
                    <span> {{ bank.account_number }}</span>
                </p>
                <p>
                    <span> رقم الآيبان </span>
                    <span> {{ bank.iban }} </span>
                </p>
            </div>

            <div class="flex-center">
                <ui-base-button link :to="localePath('/commision/pay')" class="main_btn"> دفع </ui-base-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            axios: useNuxtApp().$axios,
            pledge: '',
            title: '',
            rate: '',
            banksDetails: '',
            localePath: useLocalePath(),
            userId: ''
        }
    },
    mounted() {
       
        this.axios.get('/pledge')
            .then((response) => {
                console.log('response: ', response.data.data)
                this.pledge = response.data.data
            })
            .catch(function (error) {
                console.log(error);
            });

        this.axios.get('/commission')
            .then((response) => {
                console.log('response: ', response.data.data)
                this.title = response.data.data
            })
            .catch(function (error) {
                console.log(error);
            });

        this.axios.get('/Commission_rate')
            .then((response) => {
                console.log('response: ', response.data.data)
                this.rate = response.data.data
            })
            .catch(function (error) {
                console.log(error);
            });
        this.axios.get('/bank-details')
            .then((response) => {
                console.log('response: ', response.data.data)
                this.banksDetails = response.data.data
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
</script>
