<template>
  <!-- <ui-main-title> {{ $t("about_us_text") }}</ui-main-title>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <img
        src="/imgs/mult_usage.webp"
        alt=""
        class="aboutSectionImg sm mb-2"
      />
      <div class="text-center mb-3" v-if="!aboutUsContent">
        <skeleton width="100%" class="d-block mx-auto mb-3" />
        <skeleton width="100%" class="d-block mx-auto mb-3" />
        <skeleton width="100%" class="d-block mx-auto mb-3" />
        <skeleton width="100%" class="d-block mx-auto mb-3" />
        <skeleton width="100%" class="d-block mx-auto mb-3" />
 </div>
 </div> -->
    <ui-main-title> {{ $t('aboutUsTitle') }}</ui-main-title>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <img src="/imgs/mult_usage.webp" alt="about_us"   loading="lazy" class="aboutSectionImg sm mb-2" >
            <div class="text-center mb-3" v-if="!aboutUs">
                <skeleton width="100%" class="d-block mx-auto mb-3" />
                <skeleton width="100%" class="d-block mx-auto mb-3" />
                <skeleton width="100%" class="d-block mx-auto mb-3" />
            </div>
            <div class="text-justify text-muted"  v-html="aboutUs" v-else> </div> 
        </div>
    </div>
  <!-- </div> -->
</template>
<script>
export default {

  data() {
    return {
      axios: useNuxtApp().$axios,
      aboutUs: "",
    };
  },
  mounted() {
    this.axios
      .get("/about")
      .then((response) => {
        // console.log('response: ', response.data.data)
        // console.log('tokrn: ', response.data.token)
        this.aboutUs = response.data.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
}
</script>

<style>
.base-image-input {
  border: 1px dashed #12a7d8 !important;
  margin: 0 !important;
}
</style>
