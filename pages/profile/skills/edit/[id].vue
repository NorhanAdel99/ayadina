<template>
  <ui-main-title> {{ $t("Modify_a_skill") }}</ui-main-title>
  <div class="row justify-content-center">
    <div class="col-md-10">
      <form @submit.prevent="editSkills" enctype="multipart/form-data" ref="editSkill">
        <inputs-form-control id="nameAr" type="text" v-model="nameAr">
          {{ $t("Skill_name_in_Arabic") }}
        </inputs-form-control>
        <inputs-form-control id="nameEn" type="text" v-model="nameEn">
          {{ $t("Skill_name_in_English") }}
        </inputs-form-control>

        <div class="form-group">
          <label class="form-label">
            <span class="m-end-5"> {{ $t("Main_section") }}</span>
            <span class="text-danger">*</span>
          </label>
          <Dropdown v-model="selectedCategory" :options="categories" optionLabel="name"
            class="w-100 form-control d-flex justify-content-between" @change="selectedsubCategory" />
        </div>
        <div class="form-group">
          <label class="form-label">
            <span class="m-end-5"> {{ $t("Subsection") }}</span>
            <span class="text-danger">*</span>
          </label>
          <Dropdown v-model="selectsubCategory" :options="subCategories" optionLabel="name"
            class="w-100 form-control d-flex justify-content-between" />
        </div>

        <inputs-form-control textarea id="descripe" v-model="descriptionAr">
          {{ $t("Description_of_the_skill_in_english") }}

        </inputs-form-control>
        <inputs-form-control textarea id="descripe" v-model="descriptionEn">
          {{ $t("Description_of_the_skill_in_Arabic") }}
        </inputs-form-control>
        <div class="form-group">
          <label class="form-label">
            <span class="m-end-5"> {{ $t("city") }}
            </span>

            <span class="text-danger">*</span>
          </label>
          <MultiSelect v-model="selectedCities" :options="cities" optionLabel="name" :maxSelectedLabels="8"
            @change="selectRegions" class="w-100" />
        </div>
        <div class="form-group">
          <label class="form-label">
            <span class="m-end-5">{{ $t("Regions") }}</span>
            <span class="text-danger">*</span>
          </label>

          <MultiSelect v-model="selectedRegions" :options="regions" optionLabel="name" :maxSelectedLabels="8"
            class="w-100" />
        </div>
        <div>
        </div>

        <!-- @update:images="handleImageUpdate"  -->
        <inputs-img-preview-multi
          :key="images"
          :onRemove="handleImageRemove"
          :modelValue="images"
          @update="updateImageUrl"
          :images="images"
        />

        <div class="flex-center">
          <ui-base-button class="main_btn lg" label="Show">
              {{ $t("Save_skill") }} </ui-base-button
          >

        </div>
      </form>
    </div>
  </div>
  <Dialog v-model:visible="visible" modal :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <font-awesome-icon icon="fa-regular fa-circle-check" class="modal-exclam-mark mb-3 main_color" />
    <h6 class="text-center mb-3"> {{ $t("The_skill_has_been_edit_successfully") }}
    </h6>
    <div class="flex-center">
      <ui-base-button mode="main_btn" @click="visible = false" link :to="'/profile/skills/' + this.selectedSkill.id">
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
      arName: "",
      enName: "",
      mainSection: "",
      subSection: "",
      descripe: "",
      selectedCities: null,
      selectedRegions: null,
      images: [],
      cities: [],
      regions: [],
      selectedSkill: "",
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
      descriptionAr: "",
      descriptionEn: "",
      selectedCityIds: null,
    };
  },

  methods: {

    updateImageUrl(newImageUrl) {
      this.images = newImageUrl;
      console.log(this.images);
    },
 
    handleImageRemove(index) {
      console.log(`Image at index ${index} removed`);
    },

    selectedsubCategory() {
      this.axios
        .get(`sub-categories/${this.selectedCategory.id}`)
        .then((response) => {
          this.subCategories = response.data.data;
          console.log(this.subCategories);
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
    async editSkills() {
      const formData = new FormData(this.$refs.editSkill);

      // Append other form data fields
      formData.append("title[ar]", this.nameAr);
      formData.append("title[en]", this.nameEn);
      formData.append("description[ar]", this.descriptionAr);
      formData.append("description[en]", this.descriptionEn);
      formData.append("category_id", this.selectedCategory.id);
      formData.append("sub_category_id", this.selectsubCategory.id);

      for (let i = 0; i < this.images.length; i++) {
        formData.append("images[]", this.images[i]);
      }


      for (let i = 0; i < this.selectedCities.length; i++) {
        formData.append("city_ids[]", this.selectedCities[i].id);
      }

      // Append region_ids
      for (let i = 0; i < this.selectedRegions.length; i++) {
        formData.append("region_ids[]", this.selectedRegions[i].id);
      }
      await this.axios
        .post(`edit-skill/${useRoute().params.id}`, formData, {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type' : 'image/*'
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
        console.log(this.cities);
      })
      .catch(function (error) {
        console.log(error);
      });

    this.axios
      .get("/categories")
      .then((response) => {
        this.categories = response.data.data.categories;
        console.log(this.categories);
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
        this.nameAr = this.selectedSkill.title.ar;
        this.nameEn = this.selectedSkill.title.en;
        this.descriptionAr = this.selectedSkill.description.ar;
        this.descriptionEn = this.selectedSkill.description.en;
        this.selectedCategory = this.selectedSkill.category;
        this.selectsubCategory = this.selectedSkill.sub_category;
        this.selectedRegions = this.selectedSkill.regions;
        this.selectedCities = this.selectedSkill.cities;
        this.images = this.selectedSkill.images;
        console.log(this.images);
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
            console.log(this.subCategories);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(this.selectedSkill.sub_category);
  },
};
</script>

<style scoped>
.base-image-input {
  width: 130px;
  height: 130px;
  margin: 0 !important;
}
</style>
