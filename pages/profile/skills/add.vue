<template>
  <ui-main-title> إضافة مهارة </ui-main-title>
 
  <div class="row justify-content-center">
    <div class="col-md-10">
      <form @submit.prevent="addSkill" enctype="multipart/form-data" ref="addSkill">
        <inputs-form-control id="nameAr" type="text" v-model="nameAr">
          اسم المهارة باللغة العربية
        </inputs-form-control>
        <inputs-form-control id="nameEn" type="text" v-model="nameEn">
          اسم المهارة باللغة الانجليزية
        </inputs-form-control>

        <div class="form-group">
          <label class="form-label">
            <span class="m-end-5"> القسم الرئيسيي</span>
            <span class="text-danger">*</span>
          </label>
          <Dropdown v-model="selectedCategory" :options="categories" optionLabel="name"
            class="w-100 form-control d-flex justify-content-between" @change="selectedsubCategory" />
        </div>
        <div class="form-group">
          <label class="form-label">
            <span class="m-end-5"> القسم الفرعي </span>
            <span class="text-danger">*</span>
          </label>
          <Dropdown v-model="selectsubCategory" :options="subCategories" optionLabel="name"
            class="w-100 form-control d-flex justify-content-between" />
        </div>

        <inputs-form-control textarea id="descripe" v-model="descriptionAr">
          وصف المهارة
        </inputs-form-control>
        <inputs-form-control textarea id="descripe" v-model="descriptionEn">
          وصف المهارة
        </inputs-form-control>
        <div class="form-group">
          <label class="form-label">
            <span class="m-end-5">المدينة</span>

            <span class="text-danger">*</span>
          </label>
          <MultiSelect v-model="selectedCities" :options="cities" optionLabel="name" :maxSelectedLabels="8"
            @change="selectRegions" class="w-100" />
        </div>
        <div class="form-group">
          <label class="form-label">
            <span class="m-end-5">المناطق</span>
            <span class="text-danger">*</span>
          </label>

          <MultiSelect v-model="selectedRegions" :options="regions" optionLabel="name" :maxSelectedLabels="8"
            class="w-100" />
        </div>

        <div class="d-flex align-items-center gap-10 flex-wrap mb-3">
          <inputs-img-preview-multi name="images[]" :onRemove="handleImageRemove" @update:images="handleImageUpdate" />
        </div>
        <div class="flex-center">
          <!-- @click="visible = true" label="Show" -->
          <ui-baseButton class="main_btn lg">
            تعديل مهارة</ui-baseButton>
        </div>
      </form>
      <toast />
    </div>
  </div>
  <Dialog v-model:visible="visible" modal :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <font-awesome-icon icon="fa-regular fa-circle-check" class="modal-exclam-mark mb-3 main_color" />
    <h6 class="text-center mb-3">تم إضافة المهارة بنجاح</h6>
    <div class="flex-center">
      <ui-base-button mode="main_btn" @click="visible = false" link to="/profile">
        رجوع
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
})
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
      images: [],
      imgs: [],
      cities: [],
      regions: [],
      selectedSkill: "",
      filePreview: "",
      fileName: "",
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
      token: "",
      images: [],
      img: "",
      img2: "",
      img3: "",
      img4: "",
      img5: "",
      selectedCitiesIds: [],
      selectedCitiesIds: [],
    };
  },
  mounted() {
    this.token = useAuthStore().user.token;
    console.log(this.token)
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
    handleImageUpdate(updatedImages) {
      // Handle the updated images in the parent component
      this.images = updatedImages;
    },

    handleImageRemove(index) {
      // Handle image removal logic here
      console.log(`Image at index ${index} removed`);
    },


    removeImage(index) {
      // Handle image removal logic
      console.log(`Removing image at index ${index}`);
      // this.images.splice(index, 1);
      // this.selectedSkill.images.splice(index, 1);
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
            F;
          });
      }
      // Make the API request to fetch regions based on selected cities
    },

    async addSkill() {

      const formData = new FormData(this.$refs.addSkill);
      formData.append("title[ar]", this.nameAr);
      formData.append("title[en]", this.nameEn);
      formData.append("description[ar]", this.descriptionAr);
      formData.append("description[en]", this.descriptionEn);
      formData.append("category_id", this.selectedCategory.id);
      formData.append("sub_category_id", this.selectsubCategory.id);

      for (let i = 0; i < this.selectedCities.length; i++) {
        formData.append("city_ids[]", this.selectedCities[i].id);
      }

      // Append region_ids
      for (let i = 0; i < this.selectedRegions.length; i++) {
        formData.append("region_ids[]", this.selectedRegions[i].id);
      }
      console.log(formData)
      await this.axios
        .post(
          "/create-skill", formData,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
              'Content-Type': 'multipart/form-data',
            },
          }

        )
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
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
