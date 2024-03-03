<template>
  <categoryCarousel @selectCategory="selectCategory"></categoryCarousel>
  <div class="text-center">
    <!-- {{ $t('hello') }} -->
  </div>
  <div class="row flex-wrap">
    <div class="col-lg-8">
      <div class="flex-between flex-wrap border-bottom mb-3 pb-3 gap-5">
        <h6 class="title-border lg">مقدمي الخدمة</h6>
        <div class="d-flex align-items-center gap-10 flex-wrap">
          <Dropdown v-model="selectedCity" :options="cities" optionLabel="name" placeholder="select a city"
            class="form-control d-flex justify-content-between fixedBox" @change="onCityChange" />
          <Dropdown v-model="selectedRegion" :options="regions" optionLabel="name" placeholder="select a region"
            class="form-control d-flex justify-content-between fixedBox" @change="onRegionChange" />
          <input type="search" class="form-control fixedBox" v-model="searchProviders" @input="handleSearch" />
        </div>
      </div>
      <div class="row">
        <div class="col-lg-3 col-sm-6" v-for="provider in providers" :key="provider.id">
          <NuxtLink :to="'/provider/' + provider.id" class="rounded-2 main_border overflow-auto mb-3 d-block text-dark">
            <img :src="provider.image" alt="" class="providerImg" />
            <div class="p-2">
              <h6 class="mb-2">{{ provider.name }}</h6>
              <div class="flex-between">
                <div>
                  <font-awesome-icon icon="fa-solid fa-list-check" class="m-end-5" />
                  <span> {{ provider.membership_number }} </span>
                </div>
                <div>
                  <span class="m-end-5">{{ provider.rate_average }}</span>
                  <font-awesome-icon icon="fa-solid fa-star" class="text-warning" />
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
        <ui-no-data class="d-none noData"> {{ $t('noProviders') }}</ui-no-data>
      </div>
    </div>
    <div class="col-lg-4">
      <div class="rounded-2 p-2 main_border mb-3">
        <div class="flex-between border-bottom mb-3 py-3">
          <h6 class="title-border main_color">الطلبات الخاصة</h6>
        </div>
        <div v-for="order in mySpecialOrders" :key="order.id" class="rounded-2 p-2 main_border mb-3">
          <div class="flex-between">
            <div>
              <h6 class="mb-2 main_color">{{ order.title }}</h6>
              <h6>{{ order.region }}</h6>
            </div>

            <NuxtLink :to="'/specialOrder/' + order.id" class="text-muted">
              <font-awesome-icon icon="fa-solid fa-chevron-left" />
            </NuxtLink>
          </div>
        </div>
        <ui-base-button mode="btn main_btn lg mx-auto" @click="visible3 = true">
          {{ $t('Add_a_special_request') }}
        </ui-base-button>
      </div>
    </div>
  </div>
  <Dialog v-model:visible="visible3" modal :header="$t('Report')" :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <form @submit.prevent="createSpecialOrder">
          <inputs-form-control type="text" :id="name" v-model.trim="title">
            {{ $t('Order_address') }}
          </inputs-form-control>
          <inputs-form-control id="text" type="text" textarea v-model.trim="description">
            {{ $t('the_description') }}

          </inputs-form-control>

          <div class="flex-center mb-3">
            <ui-base-button icon="pi pi-check" aria-label="Close" class="main_btn">
              {{ $t('Post_the_request') }}
            </ui-base-button>
          </div>
        </form>
      </div>
    </div>
  </Dialog>
  <Dialog v-model:visible="visible4" modal :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <font-awesome-icon icon="fa-regular fa-circle-check" class="modal-exclam-mark mb-3 main_color" />
    <h6 class="text-center mb-3"> {{ $t('Your_request') }}
    </h6>
    <h6 class="text-center mb-3"> {{ $t('You_will_be_contacted') }}
    </h6>
    <div class="flex-center mb-3">
      <ui-base-button icon="pi pi-check" aria-label="Close" type="button" class="main_btn" @click="visible4 = false">
        {{ $t('Back_to_the_section') }}

      </ui-base-button>
    </div>
  </Dialog>
  <toast />
</template>
<script>
import { useAuthStore } from "~/store/authStore";
export default {
  props: ["id"],
  data() {
    return {
      // categoryId: useRoute().params.id,
      axios: useNuxtApp().$axios,
      fd: null,
      selectedCity: null,
      selectedRegion: null,
      cities: [],
      regions: [],
      searchProviders: "",
      mySpecialOrders: [],
      providers: [],
      pagination: '',
      visible3: false,
      sub_category_id: null,
      title: "",
      description: "",
      token: "",
    };
  },
  async created() {
    await this.axios
      .post("/filter-providers", {
        category_id: useRoute().params.id,
        search: this.ser,
      })
      .then((response) => {
        if (response.data.key == "success") {
          this.providers = response.data.data.providers;
          if (this.providers.length == 0) {
            document.querySelector(".noData").classList.remove("d-none");
          } else {
            document.querySelector(".noData").classList.add("d-none");
          }
        } else {
          alert("noData");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },

  mounted() {
    this.token = useAuthStore().token;
    console.log(this.token);
    this.axios
      .get("/cities")
      .then((response) => {
        this.cities = response.data.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    this.getSpecialOrders()
  },
  methods: {
    getSpecialOrders() {
      this.axios
        .get(`/special-orders/${useRoute().params.id}`)
        .then((response) => {
          this.mySpecialOrders = response.data.data.special_orders;
        })
        .catch((error) => {
          console.log(error);
        });

    },
    createSpecialOrder() {
      const FormData = {
        category_id: useRoute().params.id,
        sub_category_id: this.sub_category_id,
        title: this.title,
        description: this.description,
      };
      this.axios
        .post("/create-order", FormData, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          console.log(response);
          this.visible3 = false;
          // this.visible4 = true
          if (response.data.key === "unauthenticated") {
            this.$toast.add({
              detail: `${response.data.msg}`,
              life: 3000,
              severity: "info",
            });
          } else {
            this.getSpecialOrders()
            this.$toast.add({
              detail: `${response.data.msg}`,
              life: 3000,
              severity: "info",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });

    },
    selectRegions() {
      this.axios
        .get(`regions/${this.selectedCity.id}`)
        .then((response) => {
          this.regions = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async selectCategory(id) {
      this.sub_category_id = id;
      if (this.selectedCity != null) {
        this.fd = {
          category_id: useRoute().params.id,
          sub_category_id: id,
          city_id: this.selectedCity.id,
        };
      } else if (this.selectedCity !== null && this.selectedRegions !== nul) {
        this.fd = {
          category_id: useRoute().params.id,
          sub_category_id: id,
          city_id: this.selectedCity.id,
          region_id: this.selectedRegion.id,
        };
      } else {
        this.fd = {
          category_id: useRoute().params.id,
          sub_category_id: id,
        };
      }
      if (this.searchProviders.trim() !== "") {
        this.fd.search = this.searchProviders.trim();
      }
      await this.axios
        .post("/filter-providers", this.fd)
        .then((response) => {
          console.log(response);
          if (response.data.key == "success") {
            this.providers = response.data.data.providers;
        
    this.pagination = response.data.data.pagination;
    console.log(this.pagination)
            if (this.providers.length == 0) {
              document.querySelector(".noData").classList.remove("d-none");
            } else {
              document.querySelector(".noData").classList.add("d-none");
            }
          } else {
            alert("noData");
            console.log(response);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onCityChange() {
      this.selectCategory();
      this.selectRegions();
    },
    onRegionChange() {
      this.selectCategory();
    },
    handleSearch() {
      this.selectCategory();
    },
  },
};
</script>
<style></style>
