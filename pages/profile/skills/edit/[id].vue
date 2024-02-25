<template>
  <ui-main-title> تعديل مهارة </ui-main-title>
  <div class="row justify-content-center">
    <div class="col-md-10">
      <form
        @submit.prevent="editSkills"
        enctype="multipart/form-data"
        ref="editSkill"
      >
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
            <span class="m-end-5"> القسم الفرعي </span>
            <span class="text-danger">*</span>
          </label>
          <Dropdown
            v-model="selectsubCategory"
            :options="subCategories"
            optionLabel="name"
            class="w-100 form-control d-flex justify-content-between"
          />
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
          <MultiSelect
            v-model="selectedCities"
            :options="cities"
            optionLabel="name"
            :maxSelectedLabels="8"
            @change="selectRegions"
            class="w-100"
          />
        </div>
        <div class="form-group">
          <label class="form-label">
            <span class="m-end-5">المناطق</span>
            <span class="text-danger">*</span>
          </label>

          <MultiSelect
            v-model="selectedRegions"
            :options="regions"
            optionLabel="name"
            :maxSelectedLabels="8"
            class="w-100"
          />
        </div>
        <div v-if="imgs.length != 0">
          <div class="d-flex align-items-center gap-10 flex-wrap mb-3">
            <InputsImgInput
              v-for="(img, index) in imgs"
              :key="img.id"
              :index="index"
              :modelValue="img.image"
             
              @update:modelValue="updateImageUrl"
              @removeImage="removeImage"
              @change="handleImageUpload"
              :name="`img${index}`"
              :id="`img${index}`"

            />
          </div>
        </div>
        <div v-else>
          <div class="d-flex align-items-center gap-10 flex-wrap mb-3">
            <InputsImgInput
              v-for="i in 5"
              :key="`defaultImg${i}`"
              :modelValue="null"
              :index="i - 1"
              :id="`img${i}`"
              :name="`img${i}`"
              @update:modelValue="updateImageUrl"
              @removeImage="removeImage"
            />
          </div>
        </div>

        <div class="flex-center">
          <ui-base-button class="main_btn lg" @click="visible = true" label="Show">
            تعديل مهارة</ui-base-button>
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
    <h6 class="text-center mb-3">تم تعديل المهارة بنجاح</h6>
    <div class="flex-center">
      <ui-base-button
        mode="main_btn"
        @click="visible = false"
        link
        :to="'/profile/skills/' + this.selectedSkill.id"
      >
        رجوع
      </ui-base-button>
    </div>
  </Dialog>
</template>
<script>
import multiSelect from "../../../components/inputs/multiSelect.vue";
import Dialog from "primevue/dialog";
import { useAuthStore } from "@/store/authStore";

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
      selectedCategory: null ,
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
      this.imageUrl = newImageUrl;
    },
    removeImage(index) {
      this.imageUrl = "";
      this.selectedSkill.images.splice(index, 1);
      console.log(this.selectedSkill.images)
    },
    selectedsubCategory() {
      this.axios
        .get(`sub-categories/${this.selectedCategory.id}`)
        .then((response) => {
          this.subCategories = response.data.data;
          console.log(this.subCategories)
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
            console.error(
              error
            );
            F;
          });
      }
      // Make the API request to fetch regions based on selected cities
    },
    async editSkills() {
      // `edit-skill/useTouter`
       // this.selectedRegionsIds = this.selectedRegions.map((region) => region.id);
      // this.selectedCitiesIds = this.selectedCities.map((city) => city.id);
      console.log(this.selectedRegions, this.selectedCities)
      // this.imgsId = this.imgs.map((img) => img.id);
      // console.log(this.nameAr , this.nameEn , this.descriptionEn , this.descriptionEn , this.selectedCategory.id , this.selectedsubCategory.id , this.selectedRegionsIds);
      const formData = new FormData(this.$refs.editSkill);

      // Append other form data fields
      formData.append("title[ar]", this.nameAr);
      formData.append("title[en]", this.nameEn);
      formData.append("description[ar]", this.descriptionAr);
      formData.append("description[en]", this.descriptionEn);
      formData.append("category_id", this.selectedCategory.id);
      formData.append("sub_category_id", this.selectsubCategory.id);
      // formData.append("city_ids[]", this.selectedCities.map(city => city.id));
      // formData.append("region_ids[]", this.selectedRegions.map(region => region.id));
      for (let i = 0; i < this.selectedCities.length; i++) {
    formData.append("city_ids[]", this.selectedCities[i].id);
  }

  // Append region_ids
  for (let i = 0; i < this.selectedRegions.length; i++) {
    formData.append("region_ids[]", this.selectedRegions[i].id);
  }
      // formData.append("images", this.img.id);
      console.log(formData)
      await this.axios
        .post(
          `edit-skill/${useRoute().params.id}`, formData ,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }

        )
        .then((res) => {
          if(res.data.msg === success){
            alert('yes')
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
        .get('/categories')
        .then((response) => {
          this.categories = response.data.data.categories;
        console.log(this.categories)
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
        this.imgs = this.selectedSkill.images;

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
          console.log(this.subCategories)
        })
        .catch(function (error) {
          console.log(error);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
     console.log(this.selectedSkill.sub_category)

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
Sent 24m ago Write to
