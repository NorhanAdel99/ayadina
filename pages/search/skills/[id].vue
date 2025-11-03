<template>
    <ui-base-container>
        <ui-breadCrumb to="/">
            <template v-slot:mainPage>{{nameProvidor}}</template>
            <template v-slot:currentPage>  {{  $t("previous_works")}} </template>
        </ui-breadCrumb>
        <div class="row">
            <div v-if="images.length === 0">
                {{ $t("There_are_no_previous_works") }}
            </div>
            <div class="col-md-3 col-6" v-for="img in images" :key="img + 1" v-else>
                <Image :src="img" alt="Image" width="250" preview />
            </div>
        </div>
    </ui-base-container>
</template>
<script>
export default {
    data() {
        return {
            axios: useNuxtApp().$axios,
            id: useRoute().params.id,
            images: [] ,
            nameProvidor:"",
            fd: null
        }
    },
    mounted() {
        this.provider_images();
        this.nameProvidor = localStorage.getItem("namePovidor")
    },
    methods: {
        provider_images() {
            this.axios.get(`provider-images/ ${this.id}`)
                .then((response) => {
                    this.images = response.data.data.images;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

}
</script>
<style>
.p-image{
    overflow: auto !important;
}
.p-image img{
    width: 100% !important;
    height: 100% !important;

}


</style>