<template>
     <div class="text-center mb-3" v-if="!title">
       <skeleton width="10rem" class="d-block m-auto" />
    </div>
    <h5 class="text-center mb-3" v-html="title" v-else>
    </h5>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <img src="../assets/imgs/Phone customization-rafiki 1.png" alt="" class="aboutSectionImg sm">

            <p class="text-justify text-muted">هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن
                أن يستبدل في نفس المساحة في
                نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في
                نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في
                نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة في نفس المساحة هذا النص هو مثال لنص يمكن
                أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن
                يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن
                يستبدل في نفس المساحة في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال
                لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال
                لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة في نفس المساحة هذا
                النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا
                النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا
                النص هو مثال لنص يمكن أن يستبدل في نفس المساحة في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس
                المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس
                المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس
                المساحة في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن
                يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة </p>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            axios: useNuxtApp().$axios,
            title: '',

        }
    },
    mounted() {
        this.axios.get('/terms')
            .then((response) => {
                console.log('response: ', response.data.data)
                this.title = response.data.data
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
