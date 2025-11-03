<template>
  <ui-base-container>
    <div class="row justify-content-center">
      <div class="col-md-5">
        <steps></steps>
        <form @submit.prevent="completeForm" ref="form">
          <div class="flex-center">
            <InputsImgInput
            
              id="profileImg"
              @removeImage="removeImage"
              name="image"
            />
          </div>
          <div v-if="fileValid" class="error-message">
            {{ $t("imageValid") }}
          </div>

          <div class="form-group">
            <label class="form-label">
              <span class="m-end-5">
                {{ $t("city") }}
              </span>
              <span class="text-danger">*</span>
            </label>
            <Dropdown
              v-model="selectedCity"
              :options="cities"
              optionLabel="name"
              class="w-100 form-control d-flex justify-content-between"
              @change="selectRegions"
            />
          </div>
       
          <div v-if="cityValid" class="error-message">
            {{ $t("cityValid") }}
          </div>
          <div class="form-group">
            <label for="descripe" class="form-label">
              <span class="m-end-5">
                {{ $t("description") }}
              </span>
              <span class="text-danger">*</span>
            </label>
            <textarea
              name="description"
              v-model="description"
              id="descripe"
              class="form-control"
              rows="5"
            ></textarea>
          </div>
          <div v-if="descripeValid" class="error-message">
            {{ $t("descripeValid") }}
          </div>
          <div class="d-flex gap-10">
            <ui-base-button mode="main_btn flex-50">
              {{ $t("Create_account") }}
            </ui-base-button>
            <ui-base-button
              link
              to="/homepage"
              mode="main_btn transparent_btn flex-50"
            >
              {{ $t("skip") }}
            </ui-base-button>
          </div>
        </form>
        <toast />
      </div>
    </div>
  </ui-base-container>
  <footer-component></footer-component>
</template>
<script>
import { useAuthStore } from "@/store/authStore";

import MultiSelect from "primevue/multiselect";
export default {
  components: {
    MultiSelect,
  },
  data() {
    return {
      selectedValue: null,
      img: "",
      axios: useNuxtApp().$axios,
      formData: "",
      img2: "/imgs/logo1.png",
      selectedCity: null,
      selectedRegion: null,
      cities: [],
      regions: [],
      userImg: "",
      token: "",
      description: "",
      fileValid: false,
      cityValid: false,
      regionValid: false,
      descripeValid: false,
    };
  },
  mounted() {
    this.token = useAuthStore().user.token;
    // console.log(this.token);
    this.axios
      .get("/cities")
      .then((response) => {
        this.cities = response.data.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  methods: {
    // updateImageUrl(newImageUrl) {
    //   this.userImg = newImageUrl;
    // },
    removeImage() {
      this.userImg = "";
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
    validation() {
    
      if (this.selectedCity === null) {
        this.cityValid = true;
      } else {
        this.cityValid = false;
      }
      if (this.description === "") {
        this.descripeValid = true;
      } else {
        this.descripeValid = false;
      }
    },
    completeForm() {
      this.validation();

      const formData = new FormData(this.$refs.form);
      formData.append("city_id", this.selectedCity?.id);
     
      // Make the API request using axios
      if (
        this.fileValid == false   &&
        this.cityValid == false   &&
        this.descripeValid == false
      ) {
        // this.completeForm()
        this.axios
          .post("/complete-info", formData, {
            headers: {
              Authorization: `Bearer ${this.token}`,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            // console.log(useAuthStore().user)
            if (res.data.key === "success") {
              // console.log(useAuthStore().user)
              this.$toast.add({ detail: `${res.data.msg}`, life: 3000 , severity: "success"});
                useRouter().push({ path: "/" });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        return;
      }
    },
  },
};
</script>
