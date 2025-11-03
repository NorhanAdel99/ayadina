<template>
  <div>
    <div class="row" v-if="loading">
      <div class="col-md-6" v-for="i in 6" :key="i">
        <Skeleton width="100%" height="2rem" class="mb-3"></Skeleton>
      </div>
    </div>
    <div class="row" v-else-if="user">
      <div class="col-md-6">
        <div class="d-flex align-items-start gap-10 mb-3">
          <img :src="img" alt="profilePic"  loading="lazy" class="profilePic" />
        </div>
        <Toast />
        <div class="info_personal">
          <div class="card border-0 p-2 d-block mb-3" v-for="(value, key) in userInfo" :key="key">
            <span> {{ $t(key) }} : </span>
            <span> {{ value }}</span>
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
        <div v-for="skill in skills" :key="skill.id" class="card border-0 p-2 mb-3 flex-row gap-10 align-items-start showSkills">
          <div class="flex-grow-1">
            <NuxtLink :to="path('/profile/skills/' + skill.id)" class="text-dark">
              <h6 class="mb-2 font-bolder skill_title">{{ skill.title }}</h6>
              <p class="text-muted mb-2 skill_desc">{{ skill.description }}</p>
            </NuxtLink>
          </div>
          <div class="gallery">
            <img v-for="img in skill.images" :key="img" :src="img" alt="skill_img"  loading="lazy" class="profile-gallery" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="noData">
      <div class="p-5 text-center">
        <h5 class="mb-3">{{ $t('no_data') }}</h5>
        <img src="/imgs/no-connection.png" alt="no_data"  loading="lazy" class="nodataImg" />
      </div>
    </div>
    <toast />
    <Dialog v-model:visible="visible" :header="$t('do_you_want_delete_skill')" modal :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <font-awesome-icon icon="fa-solid fa-triangle-exclamation" class="modal-exclam-mark mb-3" />
      <div class="flex-center gap-10">
        <button type="button" class="btn main_btn btn-danger" @click="removeSkill">{{ $t('yes') }}</button>
        <button type="button" class="btn main_btn btn-primary" @click="visible = false">{{ $t('no') }}</button>
      </div>
    </Dialog>
    <Dialog v-model:visible="visible2" modal :header="$t('delete_skills')" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <font-awesome-icon icon="fa-solid fa-triangle-exclamation" class="modal-exclam-mark mb-3" />
    </Dialog>
  </div>
</template>

<script>
definePageMeta({
  middleware: 'check-auth',
});

import Dialog from 'primevue/dialog';
import Toast from 'primevue/toast';
import { useAuthStore } from '@/store/authStore';

export default {
  props: ['id'],
  data() {
    return {
      visible: false,
      visible2: false,
      path: useLocalePath(),
      axios: useNuxtApp().$axios,
      user: null,
      token: '',
      skills: [],
      skillToRemoveId: null,
      loading: true,
      city: '',
      img: '',
      noData: false,
      id: this.$route.params.id,
    };
  },
  computed: {
    userInfo() {
      return this.user ? {
        name: this.user.name,
        phoneNumber: this.user.phone,
        city: this.city,
        MembershipNo: this.user.membership_number,
        number_of_visits: this.user.views,
      } : {};
    },
  },
  mounted() {
    this.token = useAuthStore().user?.token || '';

    this.axios.get(`/show-site-profile?user-id=${this.id}&secret-key=2024_backend_admin`)
      .then((response) => {
        if (response.data.key === 'success') {
          this.loading = false;
          this.user = response.data.data;
          this.city = this.user.city.name;
          this.img = this.user.image;
        } else if (response.data.key === 'exception') {
          this.loading = false;
          this.user = null;
          this.noData = true;
        }
      })
      .catch((error) => {
        console.error(error);
        this.loading = false;
        this.noData = true;
      });

    this.axios.get('/skills', {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
      .then((response) => {
       if(response.data.key === 'success') {
        this.skills = response.data.data.data;
       }
      })
      .catch((error) => {
        console.error(error);
      });
 
  

  },
  methods: {
    confirmSkillRemoval(skillId) {
      this.skillToRemoveId = skillId;
      this.visible = true;
    },
    removeSkill() {
      if (this.skillToRemoveId) {
        this.axios.delete(`/delete-skill/${this.skillToRemoveId}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
          .then(() => {
            this.skills = this.skills.filter(skill => skill.id !== this.skillToRemoveId);
          })
          .catch((error) => {
            this.$toast.add({
              severity: 'error',
              detail: error.message,
              life: 3000,
            });
          })
          .finally(() => {
            this.skillToRemoveId = null;
            this.visible = false;
          });
      }
    },
  },
};
</script>

<style lang="scss">
.main_btn {
  text-align: center;
}
@media (max-width: 768px) {
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
@media (min-width: 769px) and (max-width: 992px) {
  .skill_title,
  .skill_desc {
    font-size: 14px;
  }
}
</style>
