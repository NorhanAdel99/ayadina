<template>
  <div class="row justify-content-center">
    <div class="col-md-10">
      <div v-if="!commision">
        <skeleton class="mb-3 m-auto" width="100%" v-for="i in 12" :key="i" />
      </div>

      <div v-else>
        <p v-html="commision" class="mb-3" style="line-height: 30px"></p>

        <div v-if="!pledge" class="mb-3">
          <skeleton class="mb-3" />
          <skeleton width="50%" />
        </div>
        <p
          v-html="pledge"
          class="mb-10 mb-3 ayat text-center"
          style="line-height: 30px"
          v-else
        ></p>
        <div v-if="!rate" class="main_color m-auto">
          <skeleton width="10rem" class="mb-3 m-auto" />
        </div>
        <p class="main_color mb-3 font-bolder text-center" v-else>
          <span> {{ $t("Management_ratio") }}: </span>
          <span> {{ rate[0] }} </span>
        </p>
        <h6 class="mb-3 text-center font-bolder">{{ $t("rate_desc") }}</h6>
        <form @submit.prevent="payCommission">
          <div
            class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2"
          >
            <div
              class="d-flex align-items-center gap-2 fb-40 justify-content-between"
            >
              <label for="amount" class="text-nowrap">
                {{ $t("amount_label") }}
              </label>
              <input
                type="number"
                id="amount"
                class="amount form-control"
                placeholder=""
                v-model="price"
              />
            </div>
            <div
              class="d-flex align-items-center gap-2 fb-40 justify-content-between"
            >
              <label for="tax" class="text-nowrap">
                {{ $t("tax_label") }}
              </label>
              <input
                type="text"
                id="tax"
                class="amount form-control"
                disabled
                placeholder=""
                v-model="tax"
              />
            </div>
          </div>
          <h6 class="mb-3 text-center font-bolder">{{ $t("pay_desc") }}</h6>
          <div
            class="d-flex align-items-around justify-content-around flex-wrap gap-4"
          >
            <label for="mada">
              <input
                type="radio"
                hidden
                name="goup"
                value="mada"
                v-model="payment_method"
                id="mada"
                class="pay_input"
              />
              <img src="../../public/imgs/mada.webp"  class="pay_img"  loading="lazy" alt="commmision" />
            </label>
            <label for="stc">
              <input
                type="radio"
                hidden
                name="goup"
                value="stcpay"
                v-model="payment_method"
                id="stc"
                class="pay_input"
              />
              <img src="../../public/imgs/stc.webp"  class="pay_img"  loading="lazy" alt="commmision" />
            </label>
            <label for="pay">
              <input
                type="radio"
                hidden
                name="goup"
                value="applepay"
                v-model="payment_method"
                id="pay"
                class="pay_input"
              />
              <img src="../../public/imgs/pay.webp"  class="pay_img"  loading="lazy" alt="commmision" />
            </label>
          </div>
        </form>
      </div>
      <!-- certain -->
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
        <h6 class="text-center mb-3">{{ $t("pay_done") }}</h6>
        <div class="flex-center"></div>
      </Dialog>
    </div>
  </div>
</template>

<script>
definePageMeta({
  middleware: "check-auth",
});
import { useAuthStore } from "@/store/authStore";

export default {
  data() {
    return {
      axios: useNuxtApp().$axios,
      pledge: "",
      commision: "",
      rate: [],
      banksDetails: "",
      path: useLocalePath(),
      payment_method: "",
      price: "",
      tax: "",
      token: null,
      userId: "",
      visible: false,
    };
  },
  mounted() {
    this.token = useAuthStore().token;

    this.axios
      .get("/pledge")
      .then((response) => {
        // console.log('response: ', response.data.data)
        this.pledge = response.data.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    this.axios
      .get("/commission")
      .then((response) => {
        // console.log('response: ', response.data.data)
        this.commision = response.data.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    this.axios
      .get("/Commission_rate")
      .then((response) => {
        // console.log('response: ', response.data.data)
        this.rate = response.data.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    this.axios
      .get("/bank-details")
      .then((response) => {
        // console.log('response: ', response.data.data)
        this.banksDetails = response.data.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  methods: {
    payment() {
      const fd = new FormData(this.$refs.payForm);
      fd.append("price", this.price);
      fd.append("payment_method", this.payment_method);
      this.$axios
        .post("/pay-commission", fd, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          if (response.data.key === "success") {
            this.$toast.add({
              severity: "success",
              detail: `${response.data.msg}`,
              life: 2000,
            });
            const url = response.data.data.InvoiceURL;
            const newWindow = window.open(url, "_blank");
            if (!newWindow) {
              window.location.href = url; // fallback لو المتصفح منعه
            }
          } else {
            this.$toast.add({
              severity: "error",
              detail: `${response.data.msg}`,
              life: 2000,
            });
          }
        })
        .catch((error) => {
          this.$toast.add({
            severity: "error",
            detail: `${error}`,
            life: 3000,
          });
        });
    },
  },
  watch: {
    payment_method(newVal) {
      if (newVal && /^\d{2,}$/.test(this.price)) {
        this.payment();
      }
    },

    price(newVal) {
      if (newVal) {
        this.tax = parseFloat(newVal) * 0.05;

        if (this.payment_method) {
          this.payment();
        }
      } else {
        this.tax = ""; // clear tax if input is less than 2 digits
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@media (max-width: 768px) {
  .bank_details,
  .ayat {
    font-size: 14px;
  }
}
</style>
