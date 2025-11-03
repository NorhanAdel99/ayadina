<template>

    <h5 class="text-center mb-3">
        {{ $t('termsAndConditions') }}
    </h5>
    <div class="row justify-content-center">
        <div class="col-md-5">
            <img src="/imgs/mult_usage.webp" alt="terms_and_conditions"  loading="lazy" class="aboutSectionImg sm mb-2">
            
            <skeleton width="100%" class="d-block mb-3" v-if="!content" />
            <skeleton width="100%" class="d-block mb-3" v-if="!content" />
            <skeleton width="100%" class="d-block mb-3" v-if="!content" />
            <skeleton width="100%" class="d-block mb-3" v-if="!content" />
            <skeleton width="100%" class="d-block mb-3" v-if="!content" />

            <p class="text-justify  m-auto" v-html="content" v-else>
            </p>

        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            axios: useNuxtApp().$axios,
            content: '',

        }
    },
    mounted() {
        this.axios.get('/terms')
            .then((response) => {
                // console.log('response: ', response.data.data)
                this.content = response.data.data
            })
            .catch(function (error) {
                // console.log(error);
            });
    }
}
</script>
<style>
.base-image-input {
    border: 1px dashed #12a7d8 !important;
    margin: 0 !important;
}
</style>
