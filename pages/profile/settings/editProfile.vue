<template>
  <div class="row justify-content-center">
    <div class="col-md-5">
      <form @submit.prevent="updateProfile" ref="updateProfile">
        <div class="flex-center">
          <InputsImgInput :key="userImg" :modelValue="user.image" @update:modelValue="updateImageUrl"
            @removeImage="removeImage" name="image" id="img" />
        </div>
        <inputs-form-control id="name" v-model="name">
          {{ $t("name") }}
        </inputs-form-control>
        <div class="form-group">
          <label class="form-label">
            <span class="m-end-5"> {{ $t("city") }} </span>
            <span class="text-danger">*</span>
          </label>
          <Dropdown v-model="selectedCity" :options="cities" optionLabel="name"
            class="w-100 form-control d-flex justify-content-between" @change="selectRegions" />
        </div>
        <div class="form-group">
          <label class="form-label">
            <span class="m-end-5"> {{ $t("Region") }} </span>
            <span class="text-danger">*</span>
          </label>
          <Dropdown v-model="selectedRegion" :options="regions" optionLabel="name"
            class="w-100 form-control d-flex justify-content-between" />
        </div>
        <div class="form-group">
          <inputs-form-control textarea name="descripe" rows="5" v-model="description">
            {{ $t("description") }}
          </inputs-form-control>
        </div>
        <div class="flex-center">
          <ui-base-button mode="main_btn flex-50">
            {{ $t("save_edits") }}
          </ui-base-button>
        </div>
      </form>
      <toast />
    </div>
  </div>
</template>

<script>
import MultiSelect from "primevue/multiselect";
import { useAuthStore } from "@/store/authStore";
definePageMeta({
  middleware: "check-auth",
})
export default {
  components: {
    MultiSelect,
  },
  data() {
    return {
      axios: useNuxtApp().$axios,
      localePath: useLocalePath(),
      selectedCity: null,
      selectedRegion: null,
      userImg: null,
      description: "",
      name: "",
      cities: [],
      regions: [],
      user: "",
      formData: "",
      user: "",
      imgSrc: new URL("../../../assets/imgs/G2.png", import.meta.url),
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
      });
    this.axios
      .get("/profile", {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) => {
        this.user = response.data.data;
        this.userImg = this.user.image;
        this.name = this.user.name;
        this.selectedCity = this.user.city;
        this.selectedRegion = this.user.region;
        this.description = this.user.description;
        console.log(this.user.region);
        console.log(response);
        this.axios
          .get(`regions/${this.selectedCity.id}`)
          .then((response) => {
            this.regions = response.data.data;
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  methods: {
    updateImageUrl(newImageUrl) {
      this.userImg = newImageUrl;
    },
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

    async updateProfile() {
      const fd = new FormData(this.$refs.updateProfile);
      fd.append("name", this.name);
      fd.append("city_id", this.selectedCity.id);
      fd.append("region_id", this.selectedRegion.id);
      fd.append("description", this.description);

      try {
        await useAuthStore().updateProfile(fd);
      } catch (error) {
        console.error("Login error:", error);
      }
    },
  },
};
</script>

<style lang="scss">
.base-image-input {
  border-radius: 50% !important;

  .select {
    border-radius: 50% !important;
  }
}
</style>
