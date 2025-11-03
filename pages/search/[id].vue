<template>
  <div class="containProviderDetails">
    <div class="row">
      <div class="col-6">
        <div class="providerCard mb-3">
          <span class="text-nowrap"> {{ $t("name") }} :</span>
          <span> {{ providerDetails?.name }}</span>
        </div>
        <div class="providerCard mb-3">
          <span class="text-nowrap"> {{ $t("phoneNumber") }} :</span>
          <span> {{ providerDetails?.phone }}</span>
        </div>
        <div class="providerCard mb-3">
          <span class="text-nowrap"> {{ $t("MembershipNo") }} :</span>
          <span> {{ providerDetails?.membership_number }}</span>
        </div>
        <div class="providerCard mb-3">
          <span class="text-nowrap"> {{ $t("number_of_visits") }} :</span>
          <span> {{ providerDetails?.views }}</span>
        </div>
        <div class="providerCard mb-3">
          <span class="text-nowrap"> {{ $t("description") }} :</span>
          <span> {{ providerDetails?.description }}</span>
        </div>
      </div>
      <div class="col-6">
        <div v-if="!loading && providerDetails.skills.length == 0">
        <div class="p-5 text-center">
          <h5 class="mb-3">{{ $t("noSkills") }}</h5>
          <img src="/imgs/no-connection.png" alt="no_data"  loading="lazy" class="nodataImg" />
        </div>
      </div>
        <NuxtLink
          class="providerCard mb-3 text-dark"
          v-for="skill in providerDetails?.skills"
          :key="skill.id"
          :to="'/search/provider/' + providerDetails.id"
        >
          <img :src="skill.image" class="skillImage" alt="skill_img" />
          <span> {{ skill.name }} </span>
        </NuxtLink>
       
      </div>
    </div>
  </div>
</template>
<script>
definePageMeta({
    middleware: "check-auth",
})
import { useAuthStore } from "~/store/authStore";

export default {
  data() {
    return {
      axios: useNuxtApp().$axios,
      providerDetails: "",
      providerId: "",
      token: "",
      loading: true,
    };
  },
  mounted() {
    //  {
    //     headers: {
    //       Authorization: `Bearer ${this.token}`,
    //     },
    //   }
    this.token = useAuthStore().token;
    this.axios
      .get(`/provider-search-profile/${useRoute().params.id}`)
      .then((response) => {
        this.providerDetails = response.data.data;
        this.loading = false
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  onUnmounted() {
    useAuthStore().setSearchData(null);

  },
};
</script>

<style>
.providerCard {
  padding: 10px 20px;
  border-radius: 10px;
  background: white;
  min-height: 70px;
  /* height: 100%; */
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
  font-weight: 500;
  font-size: 13px;
  flex-wrap: wrap;
}
.skillImage {
  width: 50px;
  height: 50px;
  border-radius: 20px;
}
.selectSkill {
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--bs-body-color);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: var(--bs-body-bg);
  background-clip: padding-box;
  border: var(--bs-border-width) solid var(--bs-border-color);
  border-radius: var(--bs-border-radius);
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  margin-bottom: 20px;
}
.p-rating {
  margin-bottom: 20px;
}
.rateDialog .p-rating .p-rating-icon {
  color: #dee2e6;
  width: 20px !important;
  height: 20px !important;
}
</style>
