<template>
  <div class="containSearch position-relative mb-3 home_space">
    <input
      type="search"
      :placeholder="$t('Search by')"
      class="formControl search"
      v-model="searchProviders"
      @click="handleInput"
      @keydown.enter="handleInput"
    />
    <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="inputIcon" />
  </div>
  <div class="row" v-if="categories.length === 0">
    <div class="col-lg-2 col-md-4 col-6" v-for="n in skeletonCount" :key="n">
      <skeleton width="100%" class="mb-3" height="10rem" />
    </div>
  </div>

  <div class="row" v-else>
    <div
      class="col-lg-2 col-sm-4 col-6"
      v-for="category in categories"
      :key="category.id"
    >
      <NuxtLink
        :to="path('/' + category.id)"
        class="mainCard text-dark mb-4"
        @click="categoryName(category)"
      >
        <img :src="category.image" alt="category"  loading="lazy" class="rounded-50" />
        <h5 class="title">{{ category.name }}</h5>
      </NuxtLink>
    </div>
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
    };
  },
  computed: {
    token() {
      return useAuthStore().token || "";
    },
    skeletonCount() {
      // Check if we're on mobile (screen width less than 768px)
      if (process.client && window.innerWidth < 768) {
        return 8;
      }
      return 18;
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
    this.fetchCategories();
    useAuthStore().setSubCategoryId("");
    useAuthStore().setcategoryId("");
  },

  methods: {
    categoryName(category) {
      localStorage.setItem("categoryName", category.name);
          localStorage.setItem("category_id", category.id);

    },
    handleInput() {
      // this.providers = [];

      if (this.searchProviders.trim() !== "") {
        useAuthStore().setSearchData(this.searchProviders.trim());
        useRouter().push({ path: "/search/results" });
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
    async fetchCategories() {
      try {
        const response = await this.axios.get("/categories");
        this.categories = response.data.data.categories;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.p-skeleton {
  border-radius: 25px;
}
.containSearch {
  max-width: 32%;
  @media (max-width: 682px) {
    max-width: 85%;
  }
  color: #969696;
  .inputIcon {
    position: absolute;
    right: 10px;
    color: #969696;
    top: 9px;
  }
  .formControl.search {
    border: 1px solid #14a7d8;
    background: #e9e9e9;
    width: 100%;
    border-radius: 4px;
    padding-inline-start: 30px;
    &:focus-within {
      outline: unset;
    }
  }
}
</style>
