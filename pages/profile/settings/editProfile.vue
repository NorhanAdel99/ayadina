<template>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="flex-between">
        <div>
   
          <ui-breadCrumb :to="path('/profile/settings')">
            <template v-slot:mainPage>{{ $t("Settings") }}</template>
            <template v-slot:currentPage> {{ $t("edit_profile") }} </template>
        </ui-breadCrumb>
        </div>
        <div>
          <label  for="checkbox"  class="d-flex align-items-center gap-1">

            <!-- <input type="checkbox" id="checkbox" hidden  @change="visiplePhone" /> -->
            <input type="checkbox" id="checkbox" :checked="isPhoneVisible" @change="visiplePhone" hidden/>
            <div class="visiblebtnShape">
              <span></span>
            </div>
            <div> {{ $t('visible_phone') }}</div>
          </label>
        </div>
      </div>

    </div>
    <div class="col-md-5">

      <form @submit.prevent="validate" ref="updateProfile">
        <div class="flex-center">
          <InputsImgInput :key="userImg" :modelValue="userImg" @removeImage="removeImage" name="image" id="img"
            class="imgInputRounded" />
        </div>
        <inputs-form-control id="name" v-model="name">
          {{ $t("name") }}
        </inputs-form-control>
        <inputs-form-control id="phone" v-model="phone" v-if="isPhoneVisible">
          {{ $t("phoneNumber") }}
        </inputs-form-control>
        <span class="text-danger"> {{ nameMsg }}</span>

        <div class="form-group">
          <label class="form-label">
            <span class="m-end-5"> {{ $t("city") }} </span>
            <span class="text-danger">*</span>
          </label>
          <!-- @change="selectRegions" -->
          <Dropdown v-model="selectedCity" :options="cities" optionLabel="name"
            class="w-100 form-control d-flex justify-content-between" />
        </div>
        <span class="text-danger"> {{ cityMsg }}</span>

        <!-- <div class="form-group">
          <label class="form-label">
            <span class="m-end-5"> {{ $t("Region") }} </span>
            <span class="text-danger">*</span>
          </label>
          <Dropdown v-model="selectedRegion" :options="regions" optionLabel="name"
            class="w-100 form-control d-flex justify-content-between" />
        </div> -->
        <span class="text-danger"> {{ regionMsg }}</span>

        <div class="form-group">
          <inputs-form-control textarea name="descripe" rows="5" v-model="description" not_required>
            {{ $t("description") }}
          </inputs-form-control>
        </div>
        <!-- <span class="text-danger"> {{ desMsg }}</span> -->

        <span class="text-danger"> {{ fill_data }}</span>


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
      selectedCity: null,
      selectedRegion: null,
      userImg: null,
      description: "",
      name: "",
      cities: [],
      regions: [],
      user: "",
      formData: "",
      nameMsg: "",
      cityMsg: "",
      regionMsg: "",
      desMsg: "",
      fill_data: "",
      phone: "",
      imgSrc: new URL("..//imgs/G2.png", import.meta.url),
      isPhoneVisible: false,
      path: useLocalePath(),

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
        this.phone = this.user.phone;
        // this.selectedRegion = this.user.region;
        this.description = this.user.description;
        this.isPhoneVisible = this.user.is_phone_visible

        // console.log(this.user.region);
        // console.log(response);
        // this.axios
        //   .get(`regions/${this.selectedCity.id}`)
        //   .then((response) => {
        //     this.regions = response.data.data;
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
      })
      .catch(function (error) {
        console.log(error);
      });
      // this.visiplePhone()
  },

  methods: {
    visiplePhone() {
      // this.isPhoneVisible = !this.isPhoneVisible;
      this.axios.post('switch-phone-visibility', '', {
        headers: {
          Authorization: `Bearer ${this.token}`,
        }
      }
      )

      .then((response) => {
        // this.$toast.add({ detail: `${response.data.msg}`, life: 3000, severity: "success" });
        if(response.data.data.is_phone_visible === true) {
          this.isPhoneVisible = true
          
        }else{
          this.isPhoneVisible = false
        }
      })
       

    },
    validate() {
      if (!this.name || !this.selectedCity ) {
        this.fill_data = this.$t("fill_data")
        return;
      }
      this.updateProfile()
    },
    updateImageUrl(newImageUrl) {

      this.userImg = newImageUrl;
      console.log(this.userImg)


    },
    removeImage() {
      this.userImg = "";
    },
    async updateProfile() {
      const fd = new FormData(this.$refs.updateProfile);
      // fd.append("name", this.name);
      // fd.append("city_id", this.selectedCity.id);
      // fd.append("region_id", this.selectedRegion.id);
      if( this.isPhoneVisible ) {
      fd.append("phone", this.phone);
      fd.append("name", this.name);
      fd.append("city_id", this.selectedCity.id);
      fd.append("description", this.description);

      }else{
        fd.append("name", this.name);
      fd.append("city_id", this.selectedCity.id);
      fd.append("description", this.description);
      }

      try {
        useAuthStore().updateProfile(fd);
      } catch (error) {
        // Profile update failed, handle the error
        console.error("Profile update error:", error);
        // Rollback changes or show an error message, e.g., reset userImg to the previous value
        this.userImg = this.user.image; // Set userImg back to the previous value
        // Show an error message to the user, you can use a toast or another method
        // this.$t("profileUpdateError")
        this.$toast.add({ detail: 'cant update', life: 3000, severity: "error" });

      }
    },
  },
};
</script>