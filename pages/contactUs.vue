<template>
  <ui-main-title> {{ $t("contact_us") }}</ui-main-title>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <img
        src="/imgs/mult_usage.webp"
        alt="contact_us"
        loading="lazy"
        class="aboutSectionImg"
      />
      <form ref="formData" @submit.prevent="contact">
        <div class="row justify-content-center">
          <div class="col-md-8">
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
            <!-- <div v-if="phoneValid" class="error-message">
              {{ $t("phoneValid") }}
            </div> -->
            <div v-if="isphoneNumberValid" class="error-message">
              {{ $t("phoneValidate") }}
            </div>
            <inputsFormControl
              type="text"
              id="bankName"
              textarea
              v-model.trim="messege"
            >
              {{ $t("Message_Subject") }}
            </inputsFormControl>
            <div v-if="msgValid" class="error-message">
              {{ $t("msgValid") }}
            </div>
            <div class="flex-center">
              <ui-base-button mode="main_btn lg">
                {{ $t("send") }}
              </ui-base-button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
  <Dialog
    v-model:visible="visible"
    modal
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <font-awesome-icon
      icon="fa-regular fa-circle-check"
      class="modal-exclam-mark mb-3 main_color"
    />
    <skelton v-if="!msg" class="m-auto w-25"></skelton>
    <h6 class="text-center mb-3" v-else>
      {{ msg }}
    </h6>
    <h6 class="text-center mb-3">
      {{ $t("You_will_be_contacted_through_service_providers") }}
    </h6>
    <div class="flex-center">
      <ui-base-button
        mode="main_btn"
        @click="visible = false"
        link
        :to="path('/')"
      >
        {{ $t("Back_to_the_section") }}
      </ui-base-button>
    </div>
  </Dialog>
</template>
<script>
import Dialog from "primevue/dialog";
import ImgInput from "~/components/inputs/imgInput.vue";
import Dropdown from "primevue/dropdown";
import { useAuthStore } from "@/store/authStore";

export default {
  components: {
    Dialog,
    ImgInput,
    Dropdown,
  },
  data() {
    return {
      visible: false,
      axios: useNuxtApp().$axios,
      path: useLocalePath(),

      nodes: null,
      selectedValue: null,
      name: "",
      phone: "",
      messege: "",
      formData: "",
      querystring: "",
      countries: [],
      code: "",
      selectedCountry: {
        code: "+966",
        // image: require("@/assets/images/Flag.webp"),
      },
      msg: "",
      nameValid: false,
      phoneValid: false,
      msgValid: false,
      isphoneNumberValid: false,
      config:{}
    };
  },

  mounted() {

    this.token = useAuthStore().user?.token;
 if (this.token) {
  this.config.headers = {
    Authorization: `Bearer ${this.token}`,
  };
}
    this.axios
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
      if (this.name === "") {
        this.nameValid = true;
      } else {
        this.nameValid = false;
      }
      
      if (this.messege === "") {
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
    async contact() {
      this.validation();
      this.code = this.selectedCountry.code.replace(/\+/g, "");
      this.formData = {
        name: this.name,
        phone: this.phone,
        message: this.messege,
        country_code: this.code,
      };
      if (
        this.nameValid == false &&
        this.msgValid == false &&
        this.isphoneNumberValid == false
      ) {
        await this.axios
          .post("/send-contact", this.formData , this.config)
          .then((response) => {
            // console.log(response.data.key);
            if (response.data.key == "success") {
              this.visible = true;
              this.msg = response.data.msg;
              this.$toast.add({ detail: `${res.data.msg}`, life: 3000 , severity: "success"});
            } else {
              console.log("error");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        // return,
        console.log(
          this.nameValid,
          this.phoneValid,
          this.msgValid,
          this.isphoneNumberValid
        );
      }
    },
  },
};
</script>
<style lang="scss">
// .base-image-input {
//     border: 1px dashed #12a7d8 !important;
//     margin: 0 !important;
// }
</style>
