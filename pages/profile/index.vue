<template>
  <ui-main-title>
    {{ $t("personalFile") }}
  </ui-main-title>
  <profile-tabs></profile-tabs>
  <div class="row">
    <div class="col-md-6">
      <div class="d-flex align-items-start gap-10 mb-3">
        <img :src="user.image" alt="profilePic" class="profilePic" />
        <ui-base-button mode="main_btn" link :to="localePath('/commision')">
          {{ $t("Commission_payment") }} </ui-base-button>
      </div>
      <toast />
      <div class="info_personal">
        <div class="card border-0 p-2 d-block mb-3">
          <span> {{ $t("name") }} : </span>
          <span> {{ user.name }}</span>
        </div>
        <div class="card border-0 p-2 d-block mb-3">
          <span> {{ $t("phoneNumber") }} : </span> <span>{{ user.phone }}</span>
        </div>
        <div class="card border-0 p-2 d-block mb-3">
          <span> {{ $t("email") }} : </span>
          <span> {{ user.email }}</span>
        </div>
        <div class="card border-0 p-2 d-block mb-3">
          <span> {{ $t("city") }} : </span>
          <span> {{ city }} </span>
        </div>
        <div class="card border-0 p-2 d-block mb-3">
          <span> {{ $t("Region") }} : </span>
          <span> {{ region }} </span>
        </div>
        <div class="card border-0 p-2 d-block mb-3">
          <span> {{ $t("MembershipNo") }} : </span>
          <span> {{ user.membership_number }} </span>
        </div>
        <div class="card border-0 p-2 d-block mb-3">
          <span> {{ $t("number_of_visits") }} : </span>
          <span> {{ user.email }} </span>
        </div>
        <div class="card border-0 p-2 d-block mb-3">
          <span> {{ $t("description") }} : </span>
          <p class="text-muted">
            {{ user.description }}
          </p>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="flex-center mb-3">
        <ui-base-button mode="main_btn" link :to="localePath('/profile/skills/add')">
          {{ $t("add_Skill") }}
        </ui-base-button>
      </div>
      <div v-for="skill in skills" :key="skill.id"
        class="card border-0 p-2 mb-3 flex-row gap-10 align-items-start showSkills">
        <div class="flex-grow-1">
          <NuxtLink :to="localePath('/profile/skills/' + `${skill.id}`)" class="text-dark">
            <h6 class="mb-2 font-bolder skill_title">{{ skill.title }}</h6>
            <p class="text-muted mb-2 skill_desc">
              {{ skill.description }}
            </p>
          </NuxtLink>

          <div class="text-start">
            <NuxtLink :to="localePath('/profile/skills/edit/' + `${skill.id}`)" class="text-dark m-end-10">
              <font-awesome-icon icon="fa-solid fa-pen" class="f-13" />
            </NuxtLink>
            <span class="cursor-pointer" label="Show" icon="pi pi-external-link" @click="confirmSkillRemoval(skill.id)">
              <!-- @click="visible = true" -->
              <font-awesome-icon :icon="['fas', 'trash-can']" class="f-13 text-danger" />
            </span>
          </div>
        </div>
        <div class="gallery">
          <img v-for="img in skill.images" :key="img" :src="img" class="profile-gallery" />
        </div>
      </div>
    </div>
  </div>
  <toast />
  <Dialog v-model:visible="visible" :header="$t('do_you_want_delete_skill')" modal :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <font-awesome-icon icon="fa-solid fa-triangle-exclamation" class="modal-exclam-mark mb-3" />

    <div class="flex-center gap-10">
      <button type="button" class="btn btn-danger main_btn" label="Show" @click="removeSkill">
       {{ $t("yes") }}
      </button>
      <button type="button" class="btn btn-primary main_btn" label="Show" @click="visible = false">
        {{ $t("no") }}

      </button>
    </div>
  </Dialog>
  <Dialog v-model:visible="visible2" modal :header="$t('delet_skills')" :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <font-awesome-icon icon="fa-solid fa-triangle-exclamation" class="modal-exclam-mark mb-3" />
  </Dialog>
</template>

<script>
definePageMeta({
  middleware: "check-auth",
})
import Dialog from "primevue/dialog";
import Toast from "primevue/toast";

import { useAuthStore } from "@/store/authStore";

export default {
  props: ["id"],
  components: {
    Dialog,
    Toast,
  },
  data() {
    return {
      visible: false,
      visible2: false,
      localePath: useLocalePath(),
      axios: useNuxtApp().$axios,
      user: [],
      token: "",
      skills: [],
      skillToRemoveId: null,
      // visible: false,
      region: '',
      city: '',
      img: ''
    };
  },

  mounted() {
    this.token = useAuthStore().user.token;
    console.log(this.token);
    this.axios
      .get("/profile", {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) => {
        if ((response.data.msg = "success")) {
          this.user = response.data.data;
          this.city = this.user.city.name;
          this.region = this.user.region.name
          this.img = this.user.image
          console.log(response)

          console.log(this.img)
        } else {
          this.$toast.add({
            severity: "info",
            summary: "Info",
            detail: `${response.data.msg}`,
            life: 3000,
          });
        }
      })
      .catch(function (error) {
        this.$toast.add({
          severity: "info",
          summary: "Info",
          detail: `${error}`,
          life: 3000,
        });
        console.log(error);
      });
    this.axios
      .get("/skills", {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) => {
        console.log(response.data.data.data);
        this.skills = response.data.data.data;
        console.log(response.data.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  methods: {

    confirmSkillRemoval(skillId) {
      this.skillToRemoveId = skillId;
      this.visible = true;
    },
    removeSkill() {
      if (this.skillToRemoveId) {
        console.log(this.skillToRemoveId)
        // Make API request to remove the skill using this.skillToRemoveId
        this.axios
          .delete(`/delete-skill/${this.skillToRemoveId}`, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
          .then((response) => {
            console.log(response);
            // Remove the skill from the skills array
            this.skills = this.skills.filter((skill) => skill.id !== this.skillToRemoveId);
          })
          .catch((error) => {
            console.error("Error removing skill:", error);
          })
          .finally(() => {
            // Reset the skillToRemoveId and hide the confirmation dialog
            this.skillToRemoveId = null;
            this.visible = false;
          });
      }
    },

  }
}
</script>
<style  lang="scss">
.main_btn{
  text-align: center;
}
@media (max-width:768px) {
  .info_personal {
    span {
      font-size: 14px;
    }
  }
  .showSkills {
    flex-direction: column !important;
  }
  .skill_title,
  .skill_desc {
    font-size: 14px;
  }
  .flex-grow-1 {
    width: 100%;
    align-items: center;
    display: flex;
    justify-content: space-between;
  }


}
@media (min-width:769px) and (max-width:992px) {
  .skill_title,
  .skill_desc{
    font-size: 14px;
  }

}
</style>