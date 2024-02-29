<template>
    <ui-main-title>  {{  $t('common_questions')}}</ui-main-title>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <img src="../assets/imgs/Phone customization-rafiki 1.png" alt="" class="aboutSectionImg sm">
            <ui-base-card>
                <div  v-if="fqs.length === 0">
                    <skeleton width="100%" class="mb-3"  />
                    <skeleton width="100%" class="mb-3"   />
                    <skeleton width="100%" class="mb-3"   />
                    <skeleton width="100%" />
                </div>
                <div v-for="item in fqs" :key="item.id" class="border-bottom pb-3 mb-3" v-else>
                    <h6 class="mb-2"> {{ item.question }} </h6>
                    <p class="text-muted"> {{ item.answer }}</p>
                </div>
            </ui-base-card>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            axios: useNuxtApp().$axios,
            fqs: []
        }
    },
    mounted() {
        this.axios.get('/fqss')
            .then((response) => {
                console.log('response: ', response.data.data)
                this.fqs = response.data.data
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
</script>
<style >
.base-image-input {
    border: 1px dashed #12a7d8 !important;
    margin: 0 !important;
}
</style>
