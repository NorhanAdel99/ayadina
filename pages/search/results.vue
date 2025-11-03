<template>
  <div class="row" v-if="searchProviders.trim() !== ''">
    <div v-if="!loading && this.providers.length == 0">
        <div class="p-5 text-center">
          <h5 class="mb-3">{{ $t("noProviders") }}</h5>
          <img src="/imgs/no-connection.png" alt="no_data"  loading="lazy" class="nodataImg" />
        </div>
      </div>
    <div
      class="col-lg-3 col-6 mb-3"
      v-for="provider in providers"
      :key="provider.id"
    >
      <div v-if="loading">
        <skeleton width="100%" class="mb-3 rounded-3" height="10rem" />
      </div>
   
      <div v-if="!loading">
        <NuxtLink
          :to="path('/search/' + provider.id)"
          class="rounded-2 main_border overflow-auto d-block text-dark providerCardSm"
        >
          <img :src="provider.image" alt="" class="providerImg" />
          <div class="p-2">
            <h6 class="mb-2 font-bold">{{ provider.name }}</h6>
            <div class="flex-between">
              <div>
                <font-awesome-icon
                  icon="fa-solid fa-list-check"
                  class="m-end-5"
                />
                <span> {{ provider.membership_number }} </span>
              </div>
              <div>
                <span class="m-end-5">{{ provider.rate_average }}</span>
                <font-awesome-icon
                  icon="fa-solid fa-star"
                  class="text-warning"
                />
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>

    <ui-no-data class="d-none noData"> {{ $t("noProviders") }}</ui-no-data>
  </div>
</template>
<script>
import { useAuthStore } from "~/store/authStore";

export default {
  data() {
    return {
      axios: useNuxtApp().$axios,
      categories: [],
      providers: [],
      searchProviders: "",
      loading: true,
      path: useLocalePath(),
      noData: false,
    };
  },
  computed: {
    token() {
      return useAuthStore().token || "";
    },
  },
  // watch: {
  //   searchProviders(newVal) {
  //     if (newVal.trim() === "") {
  //       this.providers = [];
  //       console.log("clear");
  //     } else {
  //       this.handleSearch();
  //       console.log("fill");
  //     }
  //   },
  // },
  mounted() {
    this.searchProviders = useAuthStore().searchData;
    this.handleSearch();
    useAuthStore().setSubCategoryId("");
    useAuthStore().setcategoryId("");
  },

  methods: {
    handleInput() {
      if (this.searchProviders.trim() === "") {
        this.providers = [];
      }
    },
    async handleSearch() {
      if (this.searchProviders.trim() !== "") {
        const formData = new FormData();
        formData.append("search", this.searchProviders.trim());

        try {
          const response = await this.axios.post(
            "/filter-providers",
            formData,
            {
              headers: {
                Authorization: `Bearer ${this.token}`,
              },
            }
          );
          if (response.data.key === "success") {
            this.providers = response.data.data.providers;
            if (this.providers.length === 0) {
              this.noData = true;
            }
          }
        } catch (error) {
          console.error(error);
        } finally {
          this.loading = false;
        }
      } else {
        this.providers = [];
      }
    },
  },
};
</script>
