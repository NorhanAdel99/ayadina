<template>
  <ui-breadCrumb :to="path('/profile/specialOrders')">
    <template v-slot:mainPage>{{ $t("private_orders") }}</template>
    <template v-slot:currentPage>{{ $t("private_order") }}</template>
  </ui-breadCrumb>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <ui-base-card class="mb-3 provider">
        <div
          class="d-flex justify-content-between align-items-start gap-10 flex-wrap"
        >
          <div class="d-flex align-items-start gap-10 mb-3">
            <Skeleton shape="circle" size="5rem" v-if="loading" />
            <img
              :src="user.image"
              loading="lazy"
              class="circleImg"
              v-if="!loading"
              alt="user"
            />
            <div>
              <Skeleton
                width="10rem"
                height="1rem"
                class="mb-2"
                v-if="loading"
              />
              <div
                class="d-flex gap-30 align-items-center mb-2"
                v-if="!loading"
              >
                <h5 class="name">{{ user.name }}</h5>
                <div>
                  <span>{{ user.rate_average }}</span>
                  <font-awesome-icon
                    icon="fa-solid fa-star"
                    class="text-warning"
                  />
                </div>
              </div>
              <Skeleton
                width="5rem"
                height="1rem"
                class="mb-2"
                v-if="loading"
              />
              <div class="mb-2" v-if="!loading">
                <font-awesome-icon
                  icon="fa-solid fa-list-check"
                  class="m-end-5"
                />
                <span class="m-end-5">{{ user.membership_number }}</span>
              </div>
              <Skeleton
                width="7rem"
                height="1rem"
                class="mb-3"
                v-if="loading"
              />
              <div class="mb-2" v-if="!loading">
                <font-awesome-icon icon="fa-solid fa-phone" class="m-end-5" />
                <span>{{ user.phone }}</span>
              </div>
            </div>
          </div>
          <div class="d-flex align-items-center gap-10 mb-3">
            <Skeleton width="7rem" height="2rem" class="mb-3" v-if="loading" />
            <NuxtLink
              v-if="!loading"
              @click="chat"
              class="main_btn transparent_btn main_color gap-10"
            >
              <font-awesome-icon :icon="['fas', 'comments']" />
              <span>{{ $t("Messaging") }}</span>
            </NuxtLink>
            <Skeleton width="7rem" height="2rem" class="mb-3" v-if="loading" />
            <ui-base-button
              v-if="!loading"
              label="Show"
              icon="pi pi-external-link"
              @click="report_provider"
              class="border-danger main_btn transparent_btn text-danger gap-10"
            >
              <font-awesome-icon :icon="['fas', 'flag']" color="red" />
              <span class="text-danger">{{ $t("Report") }}</span>
            </ui-base-button>
          </div>
        </div>
        <Skeleton width="100%" height="1rem" class="mb-2" v-if="loading" />
        <p class="text-muted description" v-if="!loading">
          {{ user.description }}
        </p>
      </ui-base-card>
    </div>

    <div class="col-md-6">
      <ui-base-card>
        <Skeleton width="10rem" height="1rem" class="mb-3" v-if="loading" />
        <Skeleton width="100%" height="1rem" v-if="loading" />
        <h6 class="mb-3" v-if="!loading">{{ $t("order_description") }}</h6>
        <p class="text-muted" v-if="!loading">{{ order_description }}</p>
      </ui-base-card>
    </div>
  </div>
  <Dialog
    v-model:visible="visible"
    modal
    :header="$t('Report')"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div class="row justify-content-center">
      <div class="col-md-10">
        <div class="card p-3">
          <form @submit.prevent="complaint" ref="form">
            <div class="flex-center mb-3">
              <InputsImgInput id="profileImg" name="image" />
            </div>
            <inputsFormControl
              type="text"
              name="name"
              id="ownerName"
              v-model.trim="name"
              >{{ $t("name") }}</inputsFormControl
            >
            <inputsFormControl
              type="email"
              name="email"
              id="ownerName"
              v-model.trim="email"
              >{{ $t("email") }}</inputsFormControl
            >
            <div class="form-group">
              <label class="form-label" id="phone"
                >{{ $t("phoneNumber")
                }}<span class="text-danger"> *</span></label
              >
              <div class="with_cun_select">
                <input
                  type="number"
                  id="phone"
                  class="main_input form-control"
                  v-model="phone"
                />
                <div class="card d-flex justify-content-center dropdown_card">
                  <Dropdown
                    v-model="selectedCountry"
                    :options="countries"
                    optionLabel="name"
                  >
                    <template #value="slotProps">
                      <div v-if="slotProps.value" class="flex-group-me">
                        <img
                          :alt="slotProps.value.label"
                          :src="slotProps.value.image"
                          style="width: 24px"
                          alt="image"
                          loading="lazy"
                        />
                        <div>{{ slotProps.value.code }}</div>
                      </div>
                      <span v-else>{{ slotProps.placeholder }}</span>
                    </template>
                    <template #option="slotProps">
                      <div class="flex-group-me">
                        <img
                          :alt="slotProps.option.code"
                          :src="slotProps.option.image"
                          width="20rem"
                          alt="image"
                          loading="lazy"
                        />
                        <div>{{ slotProps.option.code }}</div>
                      </div>
                    </template>
                  </Dropdown>
                </div>
              </div>
            </div>
            <inputsFormControl
              type="text"
              id="bankName"
              textarea
              v-model.trim="messege"
              >{{ $t("Message_Subject") }}</inputsFormControl
            >
            <div class="flex-center">
              <ui-base-button class="main_btn">{{ $t("send") }}</ui-base-button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Dialog>
  <Dialog
    v-model:visible="showReport"
    modal
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <font-awesome-icon
      icon="fa-regular fa-circle-check"
      class="modal-exclam-mark mb-3 main_color"
    />
    <h6 class="text-center mb-3">
      {{ $t("Your_report_has_been_received_successfully") }}
    </h6>
    <div class="flex-center">
      <ui-base-button
        mode="main_btn"
        @click="showReport = false"
        link
        :to="path('/')"
        >{{ $t("home_title") }}</ui-base-button
      >
    </div>
  </Dialog>
</template>

<script>
import { useAuthStore } from "@/store/authStore";
definePageMeta({
  middleware: "check-auth",
});
// import { useLocalePath, useRoute, useRouter } from "nuxt3";
export default {
  data() {
    return {
      user: "",
      token: "",
      loading: true,
      path: useLocalePath(),
      order_description: "",
      visible: false,
      showReport: false,
      countries: [],
      selectedCountry: {
        code: "+966",
      },
      name: "",
      email: "",
      phone: "",
      messege: "",
    };
  },
  mounted() {
    this.titleProvidor = localStorage.getItem("titleProvidor");
    this.token = useAuthStore().token;
    this.fetchOrderDetails();
    this.fetchCountries();
  },
  methods: {
    fetchOrderDetails() {
      this.$axios
        .get(`show-order/${useRoute().params.id}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          this.user = response.data.data.user;
          this.order_description = response.data.data.order_description;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchCountries() {
      this.$axios
        .get("/country-code")
        .then((response) => {
          this.countries = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    report_provider() {
      this.visible = true;
    },
    async complaint() {
      const fd = new FormData(this.$refs.form);
      const code = this.selectedCountry.code.replace(/\+/g, "");
      fd.append("provider_id", this.user.id);
      fd.append("country_code", code);
      fd.append("phone", this.phone);
      fd.append("complaint", this.messege);
      fd.append("email", this.email);
      fd.append("user_name", this.name);

      try {
        const response = await this.$axios.post("/complaint", fd, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        if (response.data.key == "success") {
          this.msg = response.data.msg;
          this.visible = false;
          this.showReport = true;
        }
      } catch (error) {
        console.log(error);
      }
    },
    chat() {
      this.$router.push(`/profile/chat/${this.user.id}`);
    },
  },
};
</script>
