<template>
  <ui-base-container>
    <div class="row mb-3 justify-content-center">
      <div class="col-md-8">
        <ui-base-card class="mb-3 provider">
          <div
            class="d-flex justify-content-between align-items-start gap-10 flex-wrap"
          >
            <div class="d-flex align-items-start gap-10">
              <img :src="provider.image" alt="image" class="circleImg" />
              <div>
                <div class="d-flex gap-30 align-items-center mb-2">
                  <h5 class="name">{{ provider.name }}</h5>
                  <div>
                    <span> {{ provider.rate_average }} </span>
                    <font-awesome-icon
                      icon="fa-solid fa-star"
                      class="text-warning"
                    />
                  </div>
                </div>
                <div class="mb-2">
                  <font-awesome-icon
                    icon="fa-solid fa-list-check"
                    class="m-end-5"
                  />
                  <span class="m-end-5">
                    {{ provider.membership_number }}
                  </span>
                </div>
                <div class="mb-2">
                  <font-awesome-icon icon="fa-solid fa-phone" class="m-end-5" />
                  <span>{{ provider.phone }}</span>
                </div>
              </div>
            </div>
            <div class="d-flex align-items-center gap-10">
              <NuxtLink
                @click="chat"
                class="main_btn transparent_btn main_color gap-10"
              >
                <font-awesome-icon :icon="['fas', 'comments']" />
                <span>{{ $t("Messaging") }}</span>
              </NuxtLink>
              <ui-base-button
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
          <p class="text-muted my-2 description">{{ provider.description }}</p>
        </ui-base-card>
        <!-- end show provider -->
        <div class="flex-center my-2">
          <ui-base-button
            mode="main_btn lg"
            link
            :to="`prevWorks/${provider.id}`"
          >
            {{ $t("See_previous_works") }}
          </ui-base-button>
        </div>
        <!--  start add rate -->
        <div class="evaluate">
          <ui-base-button mode="main_btn lg mb-3" @click="add_rate = true">
            {{ $t("Evaluate") }}</ui-base-button
          >
        </div>
        <!-- end add rate -->
        <ui-base-card
          v-for="rate in rating"
          :key="rate.rate_id"
          class="my-3 myRate"
        >
          <div>
            <div class="flex-between">
              <div class="d-flex align-items-center gap-10">
                <img src="../../assets/imgs/G2.png" alt="" class="circleImg" />
                <div class="mb-3">
                  <h5 class="mb-2 name">{{ rate.user.name }}</h5>
                  <h6 class="text-muted">{{ rate.created_at }}</h6>
                </div>
              </div>

              <button
                label="Show"
                icon="pi pi-external-link"
                @click="ReportComment(rate.rate_id)"
                class="border-danger main_btn transparent_btn text-danger gap-10"
              >
                <font-awesome-icon :icon="['fas', 'flag']" color="red" />
                <span class="text-danger">{{ $t("Report") }}</span>
              </button>
            </div>
            <Rating v-model="rate.rate" :cancel="false" class="mb-3" readonly />

            <p class="mb-3">
              {{ rate.comment }}
            </p>
          </div>
        </ui-base-card>
      </div>
    </div>
  </ui-base-container>
  <footer-component></footer-component>

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
          <form @submit.prevent="complaint">
            <inputsFormControl
              type="text"
              name="name"
              id="ownerName"
              v-model.trim="name"
            >
              {{ $t("name") }}
            </inputsFormControl>
            <inputsFormControl
              type="email"
              name="email"
              id="ownerName"
              v-model.trim="email"
            >
              {{ $t("email") }}
            </inputsFormControl>
            <div class="form-group">
              <label class="form-label" id="phone">
                {{ $t("phoneNumber") }}
                <span class="text-danger"> * </span>
              </label>
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
                        />
                        <div>{{ slotProps.value.code }}</div>
                      </div>
                      <span v-else>
                        {{ slotProps.placeholder }}
                      </span>
                    </template>
                    <template #option="slotProps">
                      <div class="flex-group-me">
                        <img
                          :alt="slotProps.option.code"
                          :src="slotProps.option.image"
                          width="20rem"
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
            >
              {{ $t("Message_Subject") }}
            </inputsFormControl>

            <div class="flex-center">
              <ui-base-button class="main_btn">
                {{ $t("send") }}
              </ui-base-button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Dialog>
  <Dialog
    v-model:visible="add_rate"
    modal
    :header="$t('Add_a_rating')"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div class="row justify-content-center">
      <div class="col-md-10">
        <div class="card p-3">
          <form @submit.prevent="addRate">
            <Rating v-model="RateValue" :cancel="false" />
            <inputsFormControl
              type="text"
              id="addComment"
              textarea
              v-model.trim="comment"
              class="my-2"
            >
              {{ $t("addComment") }}
            </inputsFormControl>
            <div class="flex-center">
              <ui-base-button mode="main_btn lg ">
                {{ $t("send") }}
              </ui-base-button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Dialog>
  <Dialog
    v-model:visible="successRate"
    modal
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <font-awesome-icon
      icon="fa-regular fa-circle-check"
      class="modal-exclam-mark mb-3 main_color"
    />
    <h6 class="text-center mb-3">
      {{ $t("Your_rating_has_been_sent_Thank_you") }}
    </h6>
    <div class="flex-center">
      <ui-base-button
        mode="main_btn"
        @click="visible = false"
        link
        :to="localePath('/')"
      >
        {{ $t("home_title") }}
      </ui-base-button>
    </div>
  </Dialog>
  <Dialog
    v-model:visible="showReportComment"
    modal
    :header="$t('Report')"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div class="row justify-content-center">
      <div class="col-md-10">
        <form @submit.prevent="complaintOfComment">
          <inputsFormControl
            type="text"
            name="name"
            id="ownerName"
            v-model.trim="name"
          >
            {{ $t("name") }}
          </inputsFormControl>
          <inputsFormControl
            type="email"
            name="email"
            id="ownerName"
            v-model.trim="email"
          >
            {{ $t("email") }}
          </inputsFormControl>
          <div class="form-group">
            <label class="form-label" id="phone">
              {{ $t("phoneNumber") }}
              <span class="text-danger"> * </span>
            </label>
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
                      />
                      <div>{{ slotProps.value.code }}</div>
                    </div>
                    <span v-else>
                      {{ slotProps.placeholder }}
                    </span>
                  </template>
                  <template #option="slotProps">
                    <div class="flex-group-me">
                      <img
                        :alt="slotProps.option.code"
                        :src="slotProps.option.image"
                        width="20rem"
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
          >
            {{ $t("Message_Subject") }}
          </inputsFormControl>

          <div class="flex-center">
            <ui-base-button class="main_btn">
              {{ $t("send") }}
            </ui-base-button>
          </div>
        </form>
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
        @click="visible = false"
        link
        :to="localePath('/')"
      >
        {{ $t("home_title") }}
      </ui-base-button>
    </div>
  </Dialog>
</template>
<script>
import { useRoute } from "vue-router";
import { useAuthStore } from "@/store/authStore";
export default {
  data() {
    return {
      axios: useNuxtApp().$axios,
      visible: false,
      visible3: false,
      showReport: false,
      add_rate: false,
      successRate: false,
      showReportComment: false,
      visible4: false,
      id: useRoute().params.id,
      selectedCountry: {
        code: "+966",
      },
      provider: "",
      formData: "",
      rating: [],
      name: "",
      email: "",
      phone: "",
      provider_id: "",
      messege: "",
      token: "",
      RateValue: "",
      comment: "",
      rate_id: "",
      localePath: useLocalePath(),
    };
  },
  mounted() {
    this.provider_details();
    this.token = useAuthStore().token;
  },
  methods: {
    provider_details() {
      this.axios
        .get(`provider-details/ ${this.id}`)
        .then((response) => {
          this.provider = response.data.data.provider;
          this.rating = response.data.data.ratings;
          this.provider_id = this.provider.id;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async complaint() {
      this.code = this.selectedCountry.code.replace(/\+/g, "");
      this.formData = {
        user_name: this.name,
        phone: this.phone,
        complaint: this.messege,
        country_code: this.code,
        email: this.email,
        provider_id: this.provider_id,
      };
      await this.axios
        .post("/complaint", this.formData, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          if (response.data.key == "success") {
            this.msg = response.data.msg;
            this.visible = false;
            this.showReport = true;
          } else {
            this.$toast.add({
              detail: `${response.data.msg}`,
              life: 3000,
              severity: "info",
            });
          }
        })
        .catch(function (error) {
          this.$toast.add({ detail: `${error}`, life: 3000, severity: "info" });
        });
    },
    async addRate() {
      this.formData = {
        provider_id: this.provider_id,
        rate: this.RateValue,
        comment: this.comment,
      };
      await this.axios
        .post("/add-rate", this.formData, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          if (res.data.key === "success") {
            this.add_rate = false;
            this.successRate = true;
            this.$toast.add({
              detail: `${res.data.msg}`,
              life: 3000,
              severity: "info",
            });
          }
          if (res.data.key === "exception") {
            this.$toast.add({
              detail: `${res.data.msg}`,
              life: 3000,
              severity: "error",
            });
          }
          if (res.data.key === "fail") {
            this.$toast.add({
              detail: `${res.data.msg}`,
              life: 3000,
              severity: "error",
            });
          }
        })
        .catch((error) => {
          this.$toast.add({
            detail: `${error}`,
            life: 3000,
            severity: "error",
          });
        });
    },
    async complaintOfComment() {
      this.code = this.selectedCountry.code.replace(/\+/g, "");
      this.formData = {
        user_name: this.name,
        phone: this.phone,
        complaint: this.messege,
        country_code: this.code,
        email: this.email,
        comment_id: this.rate_id,
      };
      await this.axios
        .post("/complaint", this.formData, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          if (response.data.key == "success") {
            this.msg = response.data.msg;
            this.showReportComment = false;
            this.showReport = true;
          } else {
            this.$toast.add({
              detail: `${response.data.msg}`,
              life: 3000,
              severity: "info",
            });
          }
        })
        .catch(function (error) {
          this.$toast.add({ detail: `${error}`, life: 3000, severity: "info" });
        });
    },
    // button_click method
    report_provider() {
      this.visible = true;
    },
    ReportComment(id) {
      this.showReportComment = true;
      this.rate_id = id;
    },
    async chat() {
      const fd = {
        memberable_id: this.id,
        memberable_type: "User",
      };
      await this.$axios
        .post("/create-private-room", fd, {
          headers: {
            Authorization: `Bearer ${useAuthStore().token}`,
          },
        })
        .then((response) => {
          console.log(response.data.data.room.id);
          if ((response.data.key = "success")) {
            // console.log(response.data.data.room.id)
            const roomId = response.data.data.room.id;
            // useRouter().push({'/profile/chat' + `${response.data.data.room.id}`})

            useRouter().push(`/profile/chat/${roomId}`);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style lang="scss">
.p-rating .p-rating-icon {
  color: var(--bs-warning);
}

@media (max-width: 600px) {
  .provider,
  .myRate {
    .name,
    .description {
      font-size: 14px;
    }

    button,
    a {
      font-size: 14px;
      width: 100px;
    }
  }
  .evaluate {
    display: flex;
    justify-content: center;
    align-content: center;
  }
}
</style>
