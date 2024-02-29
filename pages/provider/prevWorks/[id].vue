<template>
    <ui-base-container>
        <ui-breadCrumb to="/">
            <template v-slot:mainPage> محمد أحمد </template>
            <template v-slot:currentPage> الأعمال السابقة </template>
        </ui-breadCrumb>
        <div class="row">
            <div v-if="images.length === 0">
                {{ $t("There_are_no_previous_works") }}
            </div>
            <div class="col-md-3 col-6" v-for="img in images" :key="img + 1" v-else>
                <img :src="img" alt="image" class="previousWorkImg mb-4">
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
            images: []
        }
    },
    mounted() {
        this.provider_images()
    },
    methods: {
        provider_images() {
            this.axios.get(`provider-images/ ${this.id}`)
                .then((response) => {
                    this.images = response.data.data.images;
                    console.log(this.images)
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    }

}
</script>