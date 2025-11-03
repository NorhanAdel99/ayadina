<template>
  <ui-breadCrumb to="/">
    <template v-slot:mainPage> {{ $t("home_title") }} </template>
    <template v-slot:currentPage> {{ $t("Site_commission") }} </template>
  </ui-breadCrumb>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <ui-base-card>
        <ui-main-title>
          {{ $t("Please_attach_a_copy_of_the_transfer") }}</ui-main-title
        >
        <form ref="payForm" @submit.prevent="payCommission" class="form">
          <div class="row justify-content-center">
            <div class="col-md-8">
              <inputs-form-control
                type="text"
                id="ownerName"
                v-model.trim="name"
              >
                {{ $t("Name_of_the_shop_owner") }}
              </inputs-form-control>
              <span class="text-danger"> {{   MsgName}} </span>
              <inputs-form-control
                type="number"
                id="number"
                ref="number"
                v-model.trim="acccountNum"
              >
                {{ $t("Account_number_transferred_from") }}
              </inputs-form-control>
              <div v-if="!isAccountNumberValid" class="error-message">
                {{ $t("Invalid_account_number_format_or_length") }}
              </div>
              <inputs-form-control type="text" id="bankName" v-model="bankName">
                {{ $t("Name_of_the_bank_the_account_is_transferred_from") }}
              </inputs-form-control>
              <span class="text-danger"> {{   MsgbankName}} </span>

              <div class="flex-center form-group inputImgsPay">
                <InputsImgInput
                  :modelValue="img"
                  @update:modelValue="updateImageUrl"
                  @removeImage="removeImage"
                  name="image"
                  id="image"
                />
              </div>
              <div class="flex-center">
                <ui-base-button class="main_btn lg">
                  {{ $t("send") }}
                </ui-base-button>
              </div>
            </div>
          </div>
        </form>
      </ui-base-card>
    </div>
  </div>
</template>
<script>
import { useAuthStore } from "@/store/authStore";
export default {
  data() {
    return {
      path: useLocalePath(),

      userId: "",
      formData: "",
      name: "",
      acccountNum: "",
      bankName: "",
      token: null,
      isAccountNumberValid: true,
    };
  },
  mounted() {
    this.token = useAuthStore().token;
    console.log(this.$refs.number);
  },

  methods: {
    validateBankAcc() {
      if(!this.name){
        this.MsgName = this.$t("Name_of_the_shop_owner")
      }
      if(!this.bankName){
        this.MsgbankName = this.$t("bankNameReq")
      }
      const accountNumber = this.acccountNum.toString();

      if (
        /^[0-9]+$/.test(accountNumber) &&
        accountNumber.length >= 16 &&
        accountNumber.length <= 24
      ) {
        this.isAccountNumberValid = true;
      } else {
        this.isAccountNumberValid = false;
      }
    },
    updateImageUrl(newImageUrl) {
      this.img = newImageUrl;
    },
    removeImage() {
      this.img = "";
    },
  
    async payCommission() {
        this.validateBankAcc()
      const fd = new FormData(this.$refs.payForm);
      fd.append("account_holder_name", this.name);
      fd.append("bank_name", this.bankName);
      fd.append("account_number", this.acccountNum);
      await this.$axios
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
              life: 3000,
            });
          } else {
            this.$toast.add({
              severity: "error",
              detail: `${response.data.msg}`,
              life: 3000,
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
};
</script>
<style lang="scss">
.inputImgsPay .removeSrc {
  top: 26px !important;
}

@media (max-width: 768px) {
  .form {
    font-size: 14px;
  }
}

</style>
