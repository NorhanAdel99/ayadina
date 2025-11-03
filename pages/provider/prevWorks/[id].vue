<template>
  <ui-base-container>
    <ui-breadCrumb to="/">
      <template v-slot:mainPage>{{ nameProvidor }}</template>
      <template v-slot:currentPage> {{ $t("previous_works") }} </template>
    </ui-breadCrumb>
    <div class="row" v-if="loading">
      <div class="col-md-3 col-6 mb-3" v-for="i in 9" :key="i">
        <Skeleton width="100%" height="10rem" />
      </div>
    </div>
    <div class="row" v-else>
      <div v-if="images.length === 0">
        {{ $t("There_are_no_previous_works") }}
      </div>

      <div class="col-md-3 col-6" v-for="img in images" :key="img + 1">
        <Image :src="img" alt="Image" width="250" preview  />
      </div>
    </div>
  </ui-base-container>
</template>
<script>
import { useAuthStore } from "@/store/authStore.js";
import skelton from "~/components/skelton.vue";
export default {
  components: { skelton },
  data() {
    return {
      axios: useNuxtApp().$axios,
      id: useRoute().params.id,
      images: [],
      nameProvidor: "",
      fd: null,
      loading: true,
      categoryId: null,
      sub_category_id: null
    };
  },
  mounted() {
    this.categoryId = useAuthStore().categoryId
    this.sub_category_id = useAuthStore().sub_category_id
    if (useAuthStore().categoryId) {
      this.categoryId = useAuthStore().categoryId;
    } else {
      return;
    }
    this.provider_images();
    this.nameProvidor = localStorage.getItem("namePovidor");
  },
  methods: {
    provider_images() {
      
        if(useAuthStore().sub_category_id != ''){
          this.axios
        .get(
          `provider-images?provider_id=${this.id}?sub_category_id=${this.sub_category_id} `
        )
        .then((response) => {
          this.images = response.data.data.images;
          this.loading = false;

        })
        .catch(function (error) {
          console.log(error);
        });
        }else if (useAuthStore().sub_category_id == '') {
          this.axios
        .get(
          `provider-images?provider_id=${this.id}?category_id=${this.categoryId} `
        )
        .then((response) => {
          this.images = response.data.data.images;
          this.loading = false;
        })
        .catch(function (error) {
          console.log(error);
        });
        }
    },
  },
};
</script>
<style>
.p-image {
  overflow: auto !important;
}
.p-image img {
  width: 100% !important;
  height: 100% !important;
}
.p-image {
  overflow: auto !important;
}
.p-image-preview-container {
  width: 100% !important;
  height: 200px;
}
.p-image img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover;
}
</style>