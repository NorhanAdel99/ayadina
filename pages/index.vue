<template>
    <div class="row" v-if="categories.length === 0">
        <div class="col-lg-2  col-4 ">
            <skeleton width="100%" class="mb-3" id="categgory.id" />
        </div>
        <div class="col-lg-2  col-4 ">
            <skeleton width="100%" class="mb-3" id="categgory.id" />
        </div>
        <div class="col-lg-2  col-4 ">
            <skeleton width="100%" class="mb-3" id="categgory.id" />
        </div>
        <div class="col-lg-2  col-4 ">
            <skeleton width="100%" class="mb-3" id="categgory.id" />
        </div>
        <div class="col-lg-2  col-4 ">
            <skeleton width="100%" class="mb-3" id="categgory.id" />
        </div>
        <div class="col-lg-2  col-4 ">
            <skeleton width="100%" class="mb-3" id="categgory.id" />
        </div>
        <div class="col-lg-2  col-4 ">
            <skeleton width="100%" class="mb-3" id="categgory.id" />
        </div>
    </div>

    <div class="row" v-else>
        <div class="col-lg-2  col-sm-4  col-6" v-for="category in categories" :key="category.id">
            <NuxtLink :to="'/' + category.id" class="mainCard text-dark mb-4">
                <img :src="category.image" alt="" class="rounded-50">
                <h5 class="title"> {{ category.name }}</h5>
            </NuxtLink>
        </div>
    </div>
</template>
<script>

import { counterStore } from '@/store/counterStore'
export default {
    data() {
        return {
            axios: useNuxtApp().$axios,
            categories: [],
            counter: '',
            store: counterStore(),

        }
    },

    mounted() {
        this.axios.get('/categories')
            .then((response) => {
                this.categories = response.data.data.categories
            })
            .catch(function (error) {
                console.log(error);
            });
    },

}
</script>
<style scoped>
.p-skeleton {
    height: 180px !important;
    border-radius: 25px
}
</style>