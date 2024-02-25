<template>
  <categoryCarousel @selectCategory="selectCategory"></categoryCarousel>
  <div class="text-center">
    <!-- {{ $t('hello') }} -->
  </div>
  <div class="row flex-wrap-reverse">
    <div class="col-lg-8">
      <div class="flex-between border-bottom mb-3 pb-3">
        <h6 class="title-border">مقدمي الخدمة</h6>
        <div>
          <div class="">
            <Dropdown
              v-model="selectedCity"
              :options="cities"
              optionLabel="name"
              placeholder="select a city"
              class="w-100 form-control d-flex justify-content-between"
              @change="selectRegions"
            />
          </div>
          <div class="">
            <Dropdown
              v-model="selectedRegion"
              :options="regions"
              optionLabel="name"
              placeholder="select a region"
              class="w-100 form-control d-flex justify-content-between"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div
          class="col-lg-3 col-sm-6"
          v-for="provider in providers"
          :key="provider.id"
        >
          <NuxtLink
            :to="'/providerDetails/' + provider.id"
            class="rounded-2 main_border overflow-auto mb-3 d-block text-dark"
          >
            <img :src="provider.image" alt="" class="providerImg" />
            <div class="p-2">
              <h6 class="mb-2">{{ provider.name }}</h6>
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
        <ui-no-data class="d-none noData"> لا يوجد مقدمي خدمه </ui-no-data>
      </div>
    </div>
    <div class="col-lg-4">
      <div class="rounded-2 p-2 main_border mb-3">
        <div class="flex-between border-bottom mb-3 pb-3">
          <h6 class="title-border">الطلبات الخاصة</h6>
        </div>
        <div
          v-for="req in Requests"
          :key="req.id"
          class="rounded-2 p-2 main_border mb-3"
        >
          <div class="flex-between">
            <div>
              <h6 class="mb-2">{{ req.id }}</h6>
              <h6>{{ req.city }}</h6>
            </div>

            <NuxtLink :to="'/specialOrder/' + req.id" class="text-muted">
              <font-awesome-icon icon="fa-solid fa-chevron-left" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
  <footer-component></footer-component>
</template>
<script>
export default {
  props: ["id"],
  data() {
    return {
      // categoryId: useRoute().params.id,
      axios: useNuxtApp().$axios,
      Requests: [
        {
          id: "c1",
          title: "تمارين",
          city: "جدة",
          orderNumber: "17817178",
          descripe:
            "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة",
        },
        {
          id: "c2",
          mainSection: "تمارين",
          city: "جدة",

          orderNumber: "17817178",
          descripe:
            "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة",
        },
        {
          id: "c2",
          mainSection: "تمارين",
          city: "جدة",

          orderNumber: "17817178",
          descripe:
            "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة",
        },
      ],
      providers: [],
    };
  },
  async created() {
    await this.axios
      .post("/filter-providers", {
        category_id: useRoute().params.id,
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
  methods: {
    async selectCategory(id) {
      await this.axios
        .post("/filter-providers", {
          category_id: useRoute().params.id,
          sub_category_id: id,
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
  },
};
</script>
<style>
.p-listbox {
  border: 0;
  padding: 0;
  position: relative;
}

.p-listbox-header {
  padding: 0 !important;
}

.p-listbox-list-wrapper {
  position: absolute;
  top: 54px;
  z-index: 100;
  left: 0;
  right: 0;
  background: white;
  border-top: unset;
  border-radius: 10px;
  display: none;
}

.p-listbox-list-wrapper.active {
  display: block;
}

.p-listbox-filter:focus + .p-listbox-list-wrappe {
  display: block !important;
  /* background: red !important; */
}
.p-carousel-indicators {
  display: none !important;
}
</style>
