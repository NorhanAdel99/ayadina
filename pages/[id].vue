<template>
  <!-- <div class="text-center" >ddddd</div> -->
  <div class="text-center name">{{ name }}</div>
  <div v-if="loading" class="d-flex flex-wrap mb-3 flex-between">
    <Skeleton
      height="3rem"
      width="23%"
      class="rounded-20 mb-3 mx-auto"
    ></Skeleton>
    <Skeleton
      height="3rem"
      width="23%"
      class="rounded-20 mb-3 mx-auto"
    ></Skeleton>
    <Skeleton
      height="3rem"
      width="23%"
      class="rounded-20 mb-3 mx-auto"
    ></Skeleton>
    <Skeleton
      height="3rem"
      width="23%"
      class="rounded-20 mb-3 mx-auto"
    ></Skeleton>
  </div>

  <categoryCarousel
    @selectCategory="selectCategory"
    v-if="!loading"
  ></categoryCarousel>

  <div class="row flex-wrap continFilter">
    <div class="col-lg-8">
      <div
        class="flex-between flex-wrap border-bottom mb-3 pb-3 gap-2"
        v-if="loading"
      >
        <Skeleton
          height="1.5rem"
          width="23%"
          class="rounded-20 mb-2 mx-auto"
          v-if="loading"
        ></Skeleton>
        <Skeleton
          height="1.5rem"
          width="50%"
          class="rounded-20 mb-2 mx-auto"
        ></Skeleton>
      </div>
      <div
        class="flex-between flex-wrap border-bottom title-border mb-3 pb-3 gap-2"
        v-if="!loading"
      >
        <h6 class="lg main_color font-bolder">
          {{ $t("Service_providers") }}
        </h6>

        <div
          class="d-flex align-items-center gap-10 flex-wrap contain_trans_city"
        >
          <Dropdown
            v-model="selectedCity"
            :options="cities"
            optionLabel="name"
            ref="selectAll"
            :placeholder="$t('city')"
            class="form-control d-flex justify-content-between fixedBox multi_select flex-row-reverse gap-2"
            @change="onCityChange($event.value)"
          />
          <input
            type="search"
            class="form-control fixedBox search"
            :placeholder="$t('Searchbyname')"
            v-model="searchProviders"
            @input="handleSearch"
            style="font-weight: 700"
          />
        </div>
      </div>
      <div
        v-if="loading || loading_providers"
        class="d-flex gap-20 flex-wrap mb-3 flex-between"
      >
        <Skeleton
          height="13rem"
          width="22%"
          class="rounded-20 mb-2 mx-auto"
        ></Skeleton>
        <Skeleton
          height="13rem"
          width="22%"
          class="rounded-20 mb-2 mx-auto"
        ></Skeleton>
        <Skeleton
          height="13rem"
          width="22%"
          class="rounded-20 mb-2 mx-auto"
        ></Skeleton>
        <Skeleton
          height="13rem"
          width="22%"
          class="rounded-20 mb-2 mx-auto"
        ></Skeleton>
        <Skeleton
          height="13rem"
          width="22%"
          class="rounded-20 mb-2 mx-auto"
        ></Skeleton>
        <Skeleton
          height="13rem"
          width="22%"
          class="rounded-20 mb-2 mx-auto"
        ></Skeleton>
        <Skeleton
          height="13rem"
          width="22%"
          class="rounded-20 mb-2 mx-auto"
        ></Skeleton>
        <Skeleton
          height="13rem"
          width="22%"
          class="rounded-20 mb-2 mx-auto"
        ></Skeleton>
      </div>
      <div class="row">
        <div
          class="col-lg-3 col-6 mb-3"
          v-for="provider in providers"
          :key="provider.id"
        >
          <div v-if="!loading">
            <div
              @click="routeToProvider(provider.id)"
              class="rounded-2 main_border overflow-auto d-block text-dark providerCardSm cursor-pointer"
            >
              <img
                :src="provider.image"
                alt="provider"
                loading="lazy"
                class="providerImg"
              />
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
            </div>
          </div>
        </div>

        <ui-no-data class="d-none noData">
          <span v-if="providers.length === 0">{{ $t("noProviders") }}</span>
        </ui-no-data>
      </div>
      <div v-if="showPaginate">
        <Paginator
          :rows="pageLimit"
          @page="onPaginate"
          :totalRecords="totalPage"
          class="mt-5"
          dir="ltr"
        />
      </div>
    </div>
    <div class="col-lg-4">
      <div v-for="i in 3" :key="i">
        <Skeleton
          height="3rem"
          width="100%"
          class="rounded-20 mb-2 mx-auto"
          v-if="loading"
        ></Skeleton>
      </div>

      <div class="rounded-2 p-2 main_border mb-3" v-if="!loading">
        <div class="flex-between border-bottom mb-3 py-3">
          <h6 class="title-border main_color font-bolder">
            {{ $t("private_order") }}
          </h6>
        </div>
        <ui-base-button
          mode="btn main_btn lg mx-auto mb-3"
          @click="visible3 = true"
        >
          {{ $t("Add_a_special_request") }}
        </ui-base-button>

        <NuxtLink
          v-for="order in mySpecialOrders"
          class="rounded-3 p-2 main_border douple mb-3 d-block"
          :key="order.id"
          @click="go_to_order_details(order.id)"
        >
          <div class="flex-between">
            <div>
              <!-- <h6 class="mb-2 main_color font-bold">{{ order.title }}</h6> -->
              <h6 class="mb-2 main_color font-bold">
                {{ order.description }}
              </h6>
            </div>

            <div class="text-gray">
              <font-awesome-icon icon="fa-solid fa-chevron-left" />
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
  <Dialog
    v-model:visible="visible3"
    modal
    :header="$t('special_order')"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div class="row justify-content-center">
      <div class="col-md-10">
        <form @submit.prevent="createSpecialOrder">
          <div class="form-group">
            <label class="form-label">
              <span class="m-end-5"> {{ $t("Main_section") }} </span>
              <span class="text-danger">*</span>
            </label>
            <!-- @change="selectId" -->
            <Dropdown
              v-model="selectCategoryId"
              :options="categories"
              optionLabel="name"
              class="w-100 form-control d-flex justify-content-between"
            />
          </div>
          <inputs-form-control
            id="text"
            type="text"
            textarea
            v-model.trim="description"
          >
            {{ $t("the_description") }}
          </inputs-form-control>
          <div v-if="msgValid" class="error-message">
            {{ $t("msgValid") }}
          </div>
          <div class="flex-center mb-3">
            <ui-base-button
              icon="pi pi-check"
              aria-label="Close"
              class="main_btn"
            >
              {{ $t("Post_the_request") }}
            </ui-base-button>
          </div>
        </form>
      </div>
    </div>
  </Dialog>
  <Dialog
    v-model:visible="visible4"
    modal
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <font-awesome-icon
      icon="fa-regular fa-circle-check"
      class="modal-exclam-mark mb-3 main_color"
    />
    <h6 class="text-center mb-3">{{ $t("Your_request") }}</h6>
    <h6 class="text-center mb-3">{{ $t("You_will_be_contacted") }}</h6>
    <div class="flex-center mb-3">
      <ui-base-button
        icon="pi pi-check"
        aria-label="Close"
        type="button"
        class="main_btn"
        @click="visible4 = false"
      >
        {{ $t("Back_to_the_section") }}
      </ui-base-button>
    </div>
  </Dialog>
  <toast />
</template>
<script>
import { useRoute } from "vue-router";
import { useAuthStore } from "~/store/authStore";

export default {
  data() {
    return {
      path: useLocalePath(),
      fd: null,
      selectedCity: null,
      cities: null,
      searchProviders: "",
      mySpecialOrders: [],
      providers: [],
      pagination: "",
      visible3: false,
      title: "",
      token: "",
      description: "",
      loading: true,
      loading_providers: false,
      msgValid: false,
      currentPage: 1,
      totalPage: "",
      pageLimit: "",
      categories: [],
      selectCategoryId: null,
      sub_category_id: null,
      route: useRoute(),
    };
  },
  computed: {
    showPaginate() {
      return this.totalPage > this.pageLimit;
    },
  },

  mounted() {
    // Initialize the token
    this.token = useAuthStore().token || "";
    this.getProviders();
    this.name = localStorage.getItem("categoryName");
    this.getSpecialOrders();
    this.fetchCategories();
    useAuthStore().setSubCategoryId("");
    useAuthStore().setcategoryId("");
    this.fetchCities();
    localStorage.setItem("sub_category_id", this.route.params.id);
  },
  methods: {
    onCityChange(value) {
      this.loading_providers = true;
      this.selectCategory(this.sub_category_id);
    },
    routeToProvider(id) {
      if (!this.sub_category_id) {
        this.$toast.add({
          detail: this.$t("selectCategory"),
          life: 3000,
          severity: "error",
        });
        return;
      }
      useAuthStore().setcategoryId(id);
      this.$router.push({ path: `/provider/${id}` });
    },
    go_to_order_details(id) {
      if (!this.token) {
        this.$toast.add({
          detail: this.$t("loginMessage"),
          life: 3000,
          severity: "error",
        });
        return;
      } else {
        this.$router.push({ path: `/specialOrdersDetails/${id}` });
      }
    },
    getProviders() {
      // Initialize the token

      this.$axios
        .post(
          `/filter-providers?page=${this.currentPage}`,
          { category_id: this.route.params.id },
          {
            headers: {
              Authorization: `Bearer ${this.token ? this.token : ""}`,
            },
          }
        )
        .then((response) => {
          if (response.data.key === "success") {
            this.totalPage = response.data.data.pagination.total_items;
            this.pageLimit = response.data.data.pagination.per_page;
            this.providers = response.data.data.providers;
            if (this.providers.length === 0) {
              document.querySelector(".noData").classList.remove("d-none");
            } else {
              document.querySelector(".noData").classList.add("d-none");
            }
            this.loading = false;
          } else {
            // Handle other response keys if necessary
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async fetchCities() {
      try {
        const response = await this.$axios.get("/cities");
        this.cities = response.data.data;
        this.cities.unshift({ id: "all", name: "كل المدن" });
      } catch (error) {
        console.error(error);
      }
    },

    async fetchCategories() {
      try {
        const response = await this.$axios.get("/categories");
        this.categories = response.data.data.categories;
      } catch (error) {
        console.error(error);
      }
    },
    validation() {
      if (!this.description.trim()) {
        this.msgValid = true;
      } else {
        this.msgValid = false;
      }
    },
    orderDet(title, id) {
      this.title = title;
      localStorage.setItem("titleProvidor", this.title);

      const localePath = useLocalePath();
      const path = localePath(`/specialOrdersDetails/${id}`);

      useRouter().push(path);
    },
    async getSpecialOrders() {
      try {
        const response = await this.$axios.get(
          `/special-orders/${this.route.params.id}`
        );
        this.mySpecialOrders = response.data.data.special_orders;
      } catch (error) {
        console.error(error);
      }
    },
    async createSpecialOrder() {
      this.validation();
      if (this.msgValid) return;

      const formData = {
        category_id: this.selectCategoryId.id,
        description: this.description,
      };

      try {
        const response = await this.$axios.post("/create-order", formData, {
          headers: { Authorization: `Bearer ${this.token}` },
        });

        this.visible3 = false;
        this.$toast.add({
          detail: response.data.msg,
          life: 3000,
          severity: response.data.key === "success" ? "info" : "error",
        });

        if (response.data.key === "success") {
          this.getSpecialOrders();
          this.description = "";
        }
      } catch (error) {
        this.$toast.add({
          detail: error.message,
          life: 3000,
          severity: "error",
        });
      }
    },
    async selectCategory(subCategoryId) {
      this.sub_category_id = subCategoryId;
      this.providers = [];
      localStorage.setItem("sub_category_id", subCategoryId);
      // localStorage.setItem("category_id", this.route.params.id);
      const formData = new FormData();
      if (this.selectedCity) {
        formData.append("category_id", this.route.params.id);
        if (this.selectedCity.id !== "all") {
          formData.append("city_id[]", this.selectedCity.id);
        }
        if (this.sub_category_id) {
          formData.append("sub_category_id", this.sub_category_id);
        }
      } else {
        formData.append("category_id", this.route.params.id);
        if (this.sub_category_id) {
          formData.append("sub_category_id", this.sub_category_id);
        }
      }

      if (this.searchProviders.trim()) {
        formData.append("search", this.searchProviders.trim());
      }

      try {
        const response = await this.$axios.post(
          `/filter-providers?page=${this.currentPage}`,
          formData,
          {
            headers: { Authorization: `Bearer ${this.token}` },
          }
        );

        if (response.data.key === "success") {
          this.providers = response.data.data.providers;
          console.log(this.providers, "f");
          this.pagination = response.data.data.pagination;
          this.totalPage = response.data.data.pagination.total_items;
          this.pageLimit = response.data.data.pagination.per_page;

          if (this.providers.length === 0) {
            document.querySelector(".noData").classList.remove("d-none");
          } else {
            document.querySelector(".noData").classList.add("d-none");
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.loading_providers = false;
      }
    },

    handleSearch() {
      this.selectCategory(this.selectCategoryId?.id);
      //  this.selectCategory(this.searchProviders);
    },
    async onPaginate(event) {
      this.currentPage = event.page + 1;
      await this.selectCategory();
    },
  },
  watch: {
    selectedCity(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.currentPage = 1; // reset to first page
        this.selectCategory(this.sub_category_id); // re-fetch providers
      }
    },
  },
};
</script>

<style lang="scss">
.p-skeleton {
  &.mx-auto {
    margin-right: unset !important;
    margin-left: unset !important;
  }
}

.text-gray {
  color: #b6b2b2;
}

.main_border.douple {
  border-width: 1.5px;
}

.providerImg {
  @media (max-width: 768px) {
    height: 100px;
  }
}

.p-dropdown-trigger {
  width: fit-content !important;
}

.p-inputtext {
  font-size: 13px;
}

.fixedBox {
  width: fit-content !important;
}

.contain_trans_city .p-dropdown {
  background: transparent;
  border-radius: 10px !important;
  border-color: #b1aeae !important;
}

.search.form-control {
  border-radius: 10px !important;
  background: transparent;
  border-color: #b1aeae !important;
}

.title-border::after {
  bottom: -1.1rem;
}

@media (max-width: 768px) {
  .title-border.lg::after {
    bottom: -3.8rem;
  }
}

.name {
  margin-top: -10px;
  font-weight: bold;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-top: -20px;
  }
}

.p-dropdown-label {
  font-family: inherit !important;
  font-weight: bold;
  font-size: 13px;
}

.bgray {
  color: #494949;
}

.providerCardSm {
  min-height: 280px;
  height: 100%;

  @media (max-width: 768px) {
    min-height: 200px;
    height: 100%;
  }
}

.surface-border.active {
  img {
    filter: brightness(0) invert(1);
  }
}

.tabImg[src=""] {
  visibility: hidden !important;
  width: 0;
}

.p-paginator.p-component {
  background: transparent !important;
}

.p-paginator .p-paginator-pages .p-paginator-page {
  background: transparent !important;
  border-radius: 5px;
  padding: unset !important;
  width: 30px;
  height: 30px;
  border: 1px solid #12a7d8;
  color: #12a7d8;
  min-width: 30px;
  margin: 0 5px;

  &.p-highlight {
    background: #12a7d8 !important;
    color: white;
  }
}

.p-paginator-prev.p-paginator-element,
.p-paginator-next .p-paginator-element .p-link {
  color: #12a7d8;
}

.p-paginator-prev.p-paginator-element.p-link,
.p-paginator-last.p-paginator-element {
  display: none;
}
.p-dropdown-item {
  padding: 5px !important;
}
.fixedBox.multi_select {
  min-width: 120px;
  text-align: center;
}
.p-dropdown-item {
  cursor: pointer;
  font-weight: normal;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    padding: 5px;
  }
}
.p-dropdown-item {
  .p-dropdown-item-label {
    width: 90% !important;
    text-align: center;
    padding: 5px 10px;
  }
}
.p-dropdown-item.p-focus {
  background: transparent !important;

  .p-dropdown-item-label {
    background: #d5ebf2 !important;
    border-radius: 5px;
  }
}
.form-control.fixedBox {
  line-height: 2;
}
</style>
