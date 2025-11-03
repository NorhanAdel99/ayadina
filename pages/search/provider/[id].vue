<template>
  <ui-base-container class="provider_d">
    <div class="row mb-3 justify-content-center">
      <div class="col-md-8">
        <ui-base-card class="mb-3 provider">
          <div
            class="d-flex justify-content-between align-items-start gap-10 flex-wrap"
          >
            <div class="d-flex align-items-start gap-10">
              <img
                :src="provider.image"
                alt="image"
                loading="lazy"
                class="circleImg"
              />
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
                    :icon="['fas', 'location-dot']"
                    class="m-end-5"
                  />
                  <span class="m-end-5">
                    {{ provider.location }}
                  </span>
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
                class="main_btn transparent_btn main_color gap-10 font-bolder"
              >
                <font-awesome-icon :icon="['fas', 'comments']" />
                <span>{{ $t("Messaging") }}</span>
              </NuxtLink>
              <ui-base-button
                label="Show"
                icon="pi pi-external-link"
                @click="report_provider"
                class="border-danger main_btn transparent_btn text-danger font-bolder gap-10"
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
                <img
                  src="/imgs/G2.png"
                  alt="image"
                  loading="lazy"
                  class="circleImg"
                />
                <div class="mb-3">
                  <h5 class="mb-2 name">{{ rate.user.name }}</h5>
                  <h6 class="text-muted">{{ rate.created_at }}</h6>
                </div>
              </div>

              <button
                label="Show"
                icon="pi pi-external-link"
                @click="ReportComment(rate.rate_id)"
                class="border-danger main_btn transparent_btn text-danger gap-10 font-bolder"
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
        <div class="p-3">
          <form @submit.prevent="complaint" ref="complaintForm">
            <div class="flex-center">
              <InputsImgInput
                :key="userImg"
                :modelValue="userImg"
                @removeImage="removeImage"
                name="image"
                id="img"
                class="imgInputRounded"
              />
            </div>
            <inputsFormControl
              type="text"
              name="name"
              id="ownerName"
              v-model.trim="name"
            >
              {{ $t("name") }}
            </inputsFormControl>
            <div v-if="nameValid" class="error-message">
              {{ $t("nameValid") }}
            </div>
            <inputsFormControl
              type="email"
              name="email"
              id="ownerName"
              v-model.trim="email"
            >
              {{ $t("email") }}
            </inputsFormControl>
            <div v-if="emailValid" class="error-message">
              {{ $t("emailValid") }}
            </div>
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
                          loading="lazy"
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
                          loading="lazy"
                        />
                        <div>{{ slotProps.option.code }}</div>
                      </div>
                    </template>
                  </Dropdown>
                </div>
              </div>
            </div>
            <div v-if="isphoneNumberValid" class="error-message">
              {{ $t("phoneValidate") }}
            </div>
            <inputsFormControl
              type="text"
              id="messege"
              textarea
              v-model.trim="messege"
            >
              {{ $t("Message_Subject") }}
            </inputsFormControl>
            <div v-if="msgValid" class="error-message">
              {{ $t("msgValid") }}
            </div>
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
    class="rateDialog"
  >
    <div class="row justify-content-center">
      <div class="col-md-10">
        <div class="p-3">
          <form @submit.prevent="addRate">
            <Dropdown
              v-model="selectedSkill"
              :options="skills"
              optionLabel="name"
              :placeholder="$t('selectSkill')"
              class="w-full md:w-14rem selectSkill"
            />

            <Rating v-model="RateValue" :cancel="false" />
            <inputsFormControl
              type="text"
              id="addComment"
              textarea
              v-model.trim="comment"
              class="mb-3"
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
        :to="path('/')"
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
        <form @submit.prevent="complaintOfComment" ref="complaintFormD">
          <div class="flex-center">
            <InputsImgInput id="profileImg" name="image" class="mb-3" />
          </div>
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
                        loading="lazy"
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
        :to="path('/')"
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
      path: useLocalePath(),
      selectedSkill: null,
      skills: [],
      countries: [],
      nameValid: false,
      phoneValid: false,
      msgValid: false,
      isphoneNumberValid: false,
      emailValid: false,
    };
  },
  mounted() {
    this.authMsg = this.$t("loginRequiredMessage");
    this.provider_details();
    this.token = useAuthStore().token;
    this.$axios
      .get("/country-code")
      .then((response) => {
        // console.log('response: ', response.data.data)
        this.countries = response.data.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  methods: {
    validation() {
      if (this.name == "") {
        this.nameValid = true;
      } else {
        this.nameValid = false;
      }

      if (this.email == "") {
        this.emailValid = true;
      } else {
        this.emailValid = false;
      }
      if (this.messege == "") {
        this.msgValid = true;
      } else {
        this.msgValid = false;
      }
      const phone = this.phone.toString();

      if (/^[0-9]+$/.test(phone) && phone.length >= 9 && phone.length <= 10) {
        this.isphoneNumberValid = false;
        console.log(phone);
      } else {
        this.isphoneNumberValid = true;
      }
    },
    provider_details() {
      this.axios
        .get(`provider-details?provider_id=${this.id}`)
        .then((response) => {
          this.provider = response.data.data.provider;
          console.log(this.provider);
          localStorage.setItem("namePovidor", this.provider.name);
          this.rating = response.data.data.ratings;
          this.provider_id = this.provider.id;
          this.skills = response.data.data.skills;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    complaint() {
      this.code = this.selectedCountry.code.replace(/\+/g, "");
      const formData = new FormData(this.$refs.complaintForm);
      formData.append("user_name", this.name);
      formData.append("phone", this.phone);
      formData.append("country_code", this.code);
      formData.append("email", this.email);
      formData.append("provider_id", this.provider_id);
      formData.append("complaint", this.messege);

      if (this.token == null) {
        this.$toast.add({
          detail: this.authMsg,
          life: 3000,
          severity: "error",
        });
        navigateTo("/");
      } else if (this.token != null) {
        this.validation();
        if (
          this.nameValid == false &&
          this.msgValid == false &&
          this.emailValid == false &&
          this.isphoneNumberValid == false
        ) {
          this.axios
            .post("/complaint", formData, {
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
                  severity: "error",
                });
              }
            })
            .catch(function (error) {
              this.$toast.add({
                detail: `${error}`,
                life: 3000,
                severity: "error",
              });
            });
        } else {
          return;
        }
      } else {
        return;
      }
    },
    async addRate() {
      this.formData = {
        provider_id: this.provider_id,
        rate: this.RateValue,
        comment: this.comment,
        skill_id: this.selectedSkill.id,
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
              severity: "success",
            });
          }
          if (res.data.key === "exception") {
            this.$toast.add({
              detail: `${res.data.msg}`,
              life: 3000,
              severity: "error",
            });
          }
          if (res.data.key === "unauthenticated") {
            this.$toast.add({
              detail: `${res.data.msg}`,
              life: 3000,
              severity: "error",
            });
            navigateTo("/login");
          }
          if (res.data.key === "fail") {
            this.$toast.add({
              detail: `${res.data.msg}`,
              life: 3000,
              severity: "error",
            });
          }
        })
        .catch(function (error) {
          this.$toast.add({
            detail: `${error}`,
            life: 3000,
            severity: "error",
          });
        });
    },

    async complaintOfComment() {
      this.code = this.selectedCountry.code.replace(/\+/g, "");
      const fd = new FormData(this.$refs.complaintFormD);
      fd.append("user_name", this.name);
      fd.append("complaint", this.messege);
      fd.append("country_code", this.code);
      fd.append("email", this.email);
      fd.append("comment_id", this.rate_id);
      fd.append("phone", this.phone);
      await this.axios
        .post("/complaint", fd, {
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
              severity: "error",
            });
          }
        })
        .catch(function (error) {
          this.$toast.add({
            detail: `${error}`,
            life: 3000,
            severity: "error",
          });
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
      const Token = useAuthStore().token;
      if (!Token) {
        this.$toast.add({
          detail: this.$t("loginMessage"),
          life: 3000,
          severity: "error",
        });
      }
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
          // console.log(response.data.data.room.id);
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
.provider_d .main_card {
  border-width: 1.5px;
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
.rateDialog .p-rating .p-rating-icon {
  color: #dee2e6;
  width: 20px !important;
  height: 20px !important;
}
</style>
