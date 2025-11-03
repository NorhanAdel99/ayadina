<template>
  <ui-main-title> {{ $t("Modify_a_skill") }}</ui-main-title>
  <div class="row justify-content-center">
    <div class="col-md-10">
      <form
        @submit.prevent="editSkills"
        enctype="multipart/form-data"
        ref="editSkill"
      >
        <inputs-form-control id="nameAr" type="text" v-model="name">
          {{ $t("Skill_name") }}
        </inputs-form-control>

      

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

        <div class="form-group">
          <label class="form-label">
            <span class="m-end-5"> {{ $t("Subsection") }}</span>
            <span class="text-danger">*</span>
          </label>
          <Dropdown
            v-model="selectsubCategory"
            :options="subCategories"
            optionLabel="name"
            class="w-100 form-control d-flex justify-content-between"
          />
        </div>
        <div class="form-group">
          <label class="form-label">
            <span class="m-end-5"> {{ $t("citySkills") }} </span>

            <span class="text-danger">*</span>
          </label>
          <!-- @change="selectRegions" -->
          <MultiSelect
            v-model="selectedCities"
            :options="cities"
            optionLabel="name"
            :maxSelectedLabels="8"
           
            class="w-100"
          />
        </div>
        <!-- <div class="form-group">
          <label class="form-label">
            <span class="m-end-5">{{ $t("Regions") }}</span>
            <span class="text-danger">*</span>
          </label>

          <MultiSelect
            v-model="selectedRegions"
            :options="regions"
            optionLabel="name"
            :maxSelectedLabels="8"
            class="w-100"
          />
        </div> -->
        <inputs-form-control textarea id="descripe" v-model="description">
          {{ $t("Description_of_the_skill") }}
        </inputs-form-control>

       
        <inputs-img-preview-multi
          :key="images"
          :onRemove="handleImageRemove"
          :modelValue="images"
          @updateMyImgs="handleImageUpdate"
          :images="images"
          edit
          class="base-image-inputSm "
        />

        <div class="flex-center">
          <ui-base-button class="main_btn lg" label="Show">
            {{ $t("Save_skill") }}
          </ui-base-button>
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
    <h6 class="text-center mb-3">
      {{ $t("The_skill_has_been_edit_successfully") }}
    </h6>
    <div class="flex-center">
      <ui-base-button
        mode="main_btn"
        @click="visible = false"
        link
        :to="'/profile/skills/' + this.selectedSkill.id"
      >
        {{ $t("back") }}
      </ui-base-button>
    </div>
  </Dialog>
</template>

<script>
import multiSelect from "../../../components/inputs/multiSelect.vue";
import Dialog from "primevue/dialog";
import { useAuthStore } from "@/store/authStore";
definePageMeta({
  middleware: "check-auth",
});
export default {
  props: ["id"],
  components: {
    multiSelect,
    Dialog,
  },
  data() {
    return {
      axios: useNuxtApp().$axios,
      visible: false,
      name: "",
      enName: "",
      mainSection: "",
      subSection: "",
      descripe: "",
      selectedCities: null,
      selectedRegions: null,
      images: [],
      selectedImages: [],
      cities: [],
      regions: [],
      selectedSkill: "",
      formdata: "",
      cityName: null,
      regionsName: [],
      lang: useNuxtApp().$i18n.locale,
      selectedCityIds: [],
      selectedCategory: null,
      selectsubCategory: null,
      subCategories: [],
      categories: [],
      nameAr: "",
      nameEn: "",
      description: "",
      descriptionEn: "",
      // selectedCityIds: null,
    };
  },

  methods: {
    handleImageUpdate(updatedImages) {
      this.selectedImages = updatedImages;
    },

    handleImageRemove(index) {
      console.log(index)
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
    // selectRegions() {
    //   (this.selectedRegions = null),
    //     (this.selectedCityIds = this.selectedCities.map((city) => city.id));
    //   this.regions = [];
    //   for (const cityId of this.selectedCityIds) {
    //     this.axios
    //       .get(`regions/${cityId}`)
    //       .then((response) => {
    //         const regionsForCity = response.data.data;
    //         this.regions.push(...regionsForCity);
    //       })
    //       .catch((error) => {
    //         console.error(error);
    //       });
    //   }
    // },
    async editSkills() {
      const formData = new FormData(this.$refs.editSkill);

      // Append other form data fields
      formData.append("title", this.name);
      formData.append("description", this.description);
      formData.append("category_id", this.selectedCategory.id);
      formData.append("sub_category_id", this.selectsubCategory.id);

      for (let i = 0; i < this.selectedImages.length; i++) {
        this.selectedImages[i].file
          ? formData.append("images[]", this.selectedImages[i].file)
          : "";
      }

      // console.log(this.selectedImages);

      for (let i = 0; i < this.selectedCities.length; i++) {
        formData.append("city_ids[]", this.selectedCities[i].id);
      }

      // Append region_ids
      // for (let i = 0; i < this.selectedRegions.length; i++) {
      //   formData.append("region_ids[]", this.selectedRegions[i].id);
      // }
      await this.axios
        .post(`edit-skill/${useRoute().params.id}`, formData, {
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
          console.log(error);
        });
    },
  },

  mounted() {
    this.token = useAuthStore().token;
    this.axios
      .get("/cities")
      .then((response) => {
        this.cities = response.data.data;
        // console.log(this.cities);
      })
      .catch(function (error) {
        console.log(error);
      });

    this.axios
      .get("/categories")
      .then((response) => {
        this.categories = response.data.data.categories;
        // console.log(this.categories);
      })
      .catch(function (error) {
        console.log(error);
      });

    this.axios
      .get(`skill-details/${useRoute().params.id}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) => {
        this.selectedSkill = response.data.data;
        this.name = this.selectedSkill.title;
        this.description = this.selectedSkill.description;
        // this.descriptionEn = this.selectedSkill.description.en;
        this.selectedCategory = this.selectedSkill.category;
        this.selectsubCategory = this.selectedSkill.sub_category;
        this.selectedRegions = this.selectedSkill.regions;
        this.selectedCities = this.selectedSkill.cities;
        this.images = this.selectedSkill.images;
        this.selectedCityIds = this.selectedCities.map((city) => city.id);
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

        this.axios
          .get(`sub-categories/${this.selectedCategory.id}`)
          .then((response) => {
            this.subCategories = response.data.data;
            // console.log(this.subCategories);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
    // console.log(this.selectedSkill.sub_category);
  },
};
</script>

<style>
.base-image-inputSm  .base-image-input {
  width: 100px !important;
  height: 100px !important;
  margin: 0 !important;
}
textarea{
  max-height: 100px !important;
}
/* ..base-image-input { */
</style>
