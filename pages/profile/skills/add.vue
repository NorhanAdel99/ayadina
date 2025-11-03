<template>
  <ui-main-title>{{ $t("add_Skill") }} </ui-main-title>
  <div class="row justify-content-center">
    <div class="col-md-10">
      <form
        @submit.prevent="addSkill"
        enctype="multipart/form-data"
        ref="addSkill"
      >
        <inputs-form-control id="nameAr" type="text" v-model="name">
          {{ $t("Skill_name") }}
        </inputs-form-control>
        <div v-if="nameArvalid" class="error-message">
          {{ $t("skillValidAr") }}
        </div>
       
        <div class="form-group">
          <label class="form-label">
            <span class="m-end-5"> {{ $t("Main_section") }}</span>
            <span class="text-danger">*</span>
          </label>
          <Dropdown
            v-model="selectedCategory"
            :options="categories"
            optionLabel="name"
            class="w-100 form-control d-flex justify-content-between"
            @change="selectedsubCategory"
          />
        </div>
        <div v-if="selectedCategoryValid" class="error-message">
          {{ $t("selectedCategoryValid") }}
        </div>
        <div class="form-group">
          <label class="form-label">
            <span class="m-end-5"> {{ $t("Subsection") }} </span>
            <span class="text-danger">*</span>
          </label>
          <Dropdown
            v-model="selectsubCategory"
            :options="subCategories"
            optionLabel="name"
            class="w-100 form-control d-flex justify-content-between"
          />
        </div>
        <div v-if="selectsubCategoryvalid" class="error-message">
          {{ $t("selectsubCategoryvalid") }}
        </div>
        <div class="form-group">
          <label class="form-label">
            <span class="m-end-5">{{ $t("citySkills") }} </span>

            <span class="text-danger">*</span>
          </label>
          <MultiSelect
            v-model="selectedCities"
            :options="cities"
            optionLabel="name"
            :maxSelectedLabels="8"
            @change="selectRegions"
            class="w-100"
          />
        </div>
        <div v-if="selectedCitiesValid" class="error-message">
          {{ $t("selectedCitiesValid") }}
        </div>
        <!-- <div class="form-group">
          <label class="form-label">
            <span class="m-end-5">{{ $t("citySkills") }}</span>
            <span class="text-danger">*</span>
          </label>
          
          <MultiSelect v-model="selectedRegions" :options="regions" optionLabel="name" :maxSelectedLabels="8"
            class="w-100" />
        </div> -->
        <!-- <div v-if="selectedCitiesValid" class="error-message">
          {{ $t("selectedCitiesValid") }}
        </div> -->
        <inputs-form-control textarea id="descripe" v-model="descriptionAr">
          {{ $t("Description_of_the_skill_in_Arabic") }}
        </inputs-form-control>
        <div v-if="descripeValidAr" class="error-message">
          {{ $t("descripeValidAr") }}
        </div>
       

        <div class="d-flex flex-column align-items-start">
          <div>{{ $t("prevworkimg") }}</div>
          <inputs-img-preview-multi
            :key="images"
            :onRemove="handleImageRemove"
            :modelValue="images"
            @updateMyImgs="handleImageUpdate"
            :images="images"
            class="base-image-inputSm"
          />
        </div>
        <!-- <div v-if="fileValid" class="error-message">
          {{ $t("fileValid") }}
        </div> -->
        <div class="flex-center">
          <!-- @click="visible = true" label="Show" -->
          <ui-baseButton class="main_btn lg">
            {{ $t("add_Skill") }}</ui-baseButton
          >
        </div>
      </form>
      <toast />
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
    <h6 class="text-center mb-3">
      {{ $t("The_skill_has_been_added_successfully") }}
    </h6>
    <div class="flex-center">
      <ui-base-button
        mode="main_btn"
        @click="visible = false"
        link
        to="/profile"
      >
        {{ $t("back") }}
      </ui-base-button>
    </div>
  </Dialog>
</template>
<script>
import multiSelect from "../../components/inputs/multiSelect.vue";
import Dialog from "primevue/dialog";
import { useAuthStore } from "~/store/authStore";
definePageMeta({
  middleware: "check-auth",
});
export default {
  components: {
    multiSelect,
    Dialog,
  },
  data() {
    return {
      axios: useNuxtApp().$axios,
      visible: false,
      arName: "",
      enName: "",
      mainSection: "",
      subSection: "",
      descripe: "",
      selectedCities: null,
      selectedRegions: null,
      cities: [],
      regions: [],
      selectedSkill: "",
      filePreview: "",
      fileName: "",
      formdata: "",
      cityName: null,
      regionsName: [],
      lang: useNuxtApp().$i18n.locale,
      selectedCityIds: [],
      selectedCategory: null,
      selectsubCategory: null,
      subCategories: [],
      categories: [],
      name: "",
      nameEn: "",
      descriptionAr: "",
      descriptionEn: "",
      token: "",
      images: [],
      selectedCitiesIds: [],
      selectedImages: [],
      nameArvalid: false,
      descripeValidAr: false,
      selectedCategoryValid: false,
      selectsubCategoryvalid: false,
      selectedCitiesValid: false,
      selectedRegionsValid: false,
      // fileValid: false,
    };
  },
  mounted() {
    this.token = useAuthStore().user.token;

    this.axios
      .get("/cities")
      .then((response) => {
        this.cities = response.data.data;
      })
      .catch(function (error) {
        console.log(error);
      }),
      this.axios
        .get("/categories")
        .then((response) => {
          this.categories = response.data.data.categories;
        })
        .catch(function (error) {
          console.log(error);
        });
  },
  methods: {
    validation() {
      if (this.name == "") {
        this.nameArvalid = true;
      } else {
        this.nameArvalid = false;
      }

      if (this.selectsubCategory == null) {
        this.selectsubCategoryvalid = true;
      } else {
        this.selectsubCategoryvalid = false;
      }
      if (this.selectedCategory == null) {
        this.selectedCategoryValid = true;
      } else {
        this.selectedCategoryValid = false;
      }
      if (this.descriptionAr == "") {
        this.descripeValidAr = true;
      } else {
        this.descripeValidAr = false;
      }
      if (this.selectedCities == null) {
        this.selectedCitiesValid = true;
      } else {
        this.selectedCitiesValid = false;
      }
      // if (this.selectedRegions == null) {
      //   this.selectedCitiesValid = true;
      // } else {
      //   this.selectedCitiesValid = false;
      // }
      // if(this.images.length === 0){
      //   this.fileValid = true
      // }else{
      //   this.fileValid = false
      // }
    },
    updateImageUrl(newImageUrl) {
      this.images = newImageUrl;
    },
    handleImageUpdate(updatedImages) {
      this.selectedImages = updatedImages;
    },
    handleImageRemove(index) {
      this.selectedImages.splice(index, 1);
      this.$emit("updateMyImgs", this.selectedImages);
    },

    selectedsubCategory() {
      this.axios
        .get(`sub-categories/${this.selectedCategory.id}`)
        .then((response) => {
          this.subCategories = response.data.data;
          // console.log(this.subCategories);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    selectRegions() {
      (this.selectedRegions = null),
        (this.selectedCityIds = this.selectedCities.map((city) => city.id));
      this.regions = [];
      for (const cityId of this.selectedCityIds) {
        this.axios
          .get(`regions/${cityId}`)
          .then((response) => {
            const regionsForCity = response.data.data;

            // Push the regions for the current city to the allRegions array
            this.regions.push(...regionsForCity);
          })
          .catch((error) => {
            console.error(error);
          });
      }
      // Make the API request to fetch regions based on selected cities
    },

    async addSkill() {
      this.validation();
      const formData = new FormData(this.$refs.addSkill);
      formData.append("title", this.name);
   
      formData.append("description", this.descriptionAr);
      // formData.append("description[en]", this.descriptionEn);
      formData.append("category_id", this.selectedCategory.id);
      formData.append("sub_category_id", this.selectsubCategory.id);

      for (let i = 0; i < this.selectedImages.length; i++) {
        this.selectedImages[i].file
          ? formData.append("images[]", this.selectedImages[i].file)
          : "";
      }

      for (let i = 0; i < this.selectedCities.length; i++) {
        formData.append("city_ids[]", this.selectedCities[i].id);
      }

      // Append region_ids
      for (let i = 0; i < this.selectedRegions?.length; i++) {
        formData.append("region_ids[]", this.selectedRegions[i].id);
      }
      // console.log(formData)
      if (
        this.nameArvalid == false &&
        this.descripeValidAr == false &&
        this.selectedCategoryValid == false &&
        this.selectsubCategoryvalid == false &&
        this.selectedRegionsValid == false
        // this.images.length !== 0
      ) {
        await this.axios
          .post("/create-skill", formData, {
            headers: {
              Authorization: `Bearer ${this.token}`,
              "Content-Type": "image/*",
            },
          })
          .then((res) => {
            if (res.data.key === "success") {
              this.$toast.add({
                detail: `${res.data.msg}`,
                life: 3000,
                severity: "success",
              });
              this.visible = true;
            } else {
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
      } else {
        return;
      }
    },
  },
};
</script>
<style>
.base-image-inputSm .base-image-input {
  width: 100px !important;
  height: 100px !important;
  margin: 0 !important;
}
textarea {
  max-height: 100px !important;
}
/* ..base-image-input { */
</style>
