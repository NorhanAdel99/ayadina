<template>
  <div v-if="loading" class="text-center">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="d-flex align-items-center justify-content-between">
          <Skeleton height="2rem" width="20%" class="mb-3"></Skeleton>
          <Skeleton height="2rem" width="20%" class="mb-3"></Skeleton>
        </div>
        <ui-base-card class="w-100">
          <Skeleton
            height="3rem"
            width="100%"
            class="mb-3"
            v-for="i in 4"
            :key="i"
          ></Skeleton>
        </ui-base-card>
      </div>
    </div>
  </div>

  <div class="row justify-content-center" v-else>
    <div class="col-md-8">
      <ui-main-title
        class="d-flex align-content-between justify-content-between"
      >
        {{ $t("Notification") }}
        <div class="cursor-pointer" @click="deleteAll()">
          {{ $t("Delete_notifications") }}
        </div>
      </ui-main-title>
      <ui-base-card>
        <transition-group name="fade">
          <div
            v-for="notify in notifecation"
            :key="notify.id"
            :class="[
              'border-bottom',
              notifecation.length === 1 ? 'mb-0' : 'mb-2',
            ]"
          >
            <div>
              <div
                class="d-flex align-content-between justify-content-between gap-2"
              >
                <div>
                  <NuxtLink
                    class="text-dark"
                    :to="path('/profile/Rate')"
                    v-if="notify.data.type === 'rate_notify'"
                  >
                    <h6 v-if="lang === 'ar'" class="mb-3">
                      {{ notify.data.title_ar }}
                    </h6>
                    <h6 v-if="lang === 'en'" class="mb-2">
                      {{ notify.data.title_en }}
                    </h6>
                    <p v-if="lang === 'ar'">{{ notify.data.body_ar }}</p>
                    <p v-if="lang === 'en'">{{ notify.data.body_en }}</p>
                  </NuxtLink>
                  <NuxtLink
                    class="text-dark"
                    :to="path('/profile')"
                    v-if="notify.data.type === 'password_notify'"
                  >
                    <h6 v-if="lang === 'ar'" class="cursor-pointer">
                      {{ notify.data.title_ar }}
                    </h6>
                    <h6 v-if="lang === 'en'" class="cursor-pointer">
                      {{ notify.data.title_en }}
                    </h6>
                    <p v-if="lang === 'ar'">{{ notify.data.body_ar }}</p>
                    <p v-if="lang === 'en'">{{ notify.data.body_en }}</p>
                  </NuxtLink>
                  <div
                    class="text-dark cursor-pointer"
                    @click="readNotify(notify)"
                    v-else-if="notify.data.type === 'admin_notify'"
                  >
                    <h6
                      v-if="lang === 'ar'"
                      class="cursor-pointer mb-2"
                      @click="readNotify(notify)"
                    >
                      {{ notify.data.title_ar }}
                    </h6>
                    <h6 v-if="lang === 'en'" class="cursor-pointer mb-2">
                      {{ notify.data.title_en }}
                    </h6>

                    <p v-if="lang === 'ar'">
                      {{ notify.data.body_ar.split(" ").slice(0, 3).join(" ") }}
                    </p>
                    <p v-if="lang === 'en'">
                      {{ notify.data.body_en.split(" ").slice(0, 3).join(" ") }}
                    </p>
                  </div>
                  <div
                    class="text-dark cursor-pointer"
                    v-else-if="notify.data.type === 'complaint_replay'"
                    @click="readNotify(notify)"
                  >
                    <h6 v-if="lang === 'ar'" class="mb-2">
                      {{ notify.data.title_ar }}
                    </h6>
                    <h6 v-if="lang === 'en'" class="mb-2">
                      {{ notify.data.title_en }}
                    </h6>
                    <p v-if="lang === 'ar'">
                      {{ notify.data.body_ar.split(" ").slice(0, 3).join(" ") }}
                    </p>
                    <p v-if="lang === 'en'">
                      {{ notify.data.body_en.split(" ").slice(0, 3).join(" ") }}
                    </p>
                  </div>
                  <div class="text-dark" v-else>
                    <h6 v-if="lang === 'ar'" class="mb-2">
                      {{ notify.data.title_ar }}
                    </h6>
                    <h6 v-if="lang === 'en'" class="mb-2">
                      {{ notify.data.title_en }}
                    </h6>
                    <p v-if="lang === 'ar'">{{ notify.data.body_ar }}</p>
                    <p v-if="lang === 'en'">{{ notify.data.body_en }}</p>
                  </div>
                  <small class="my-2 d-block"> {{ notify.created_at }}</small>
                </div>
                <div @click="deleteNotify(notify.id)" class="cursor-pointer">
                  <font-awesome-icon
                    :icon="['fas', 'trash-can']"
                    class="f-13 text-danger"
                  />
                </div>
              </div>
            </div>
          </div>
        </transition-group>
      </ui-base-card>
      <Dialog
        v-model:visible="visible"
        :header="lang === 'ar' ? notify.title_ar : notify.title_en"
        modal
        :style="{ width: '30rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        class="text-center"
      >
        <p v-if="lang === 'ar'" class="cursor-pointer">
          {{ notify.body_ar }}
        </p>
        <p v-if="lang === 'en'" class="cursor-pointer">
          {{ notify.body_en }}
        </p>
        <button
          type="button"
          class="btn main_btn w-75 m-0 mx-auto mt-4"
          @click="close_dialog"
        >
          {{ $t("back") }}
        </button>
      </Dialog>
    </div>
  </div>
  <div v-if="notifecation.length === 0 && !loading" class="text-center sm_page">
    <h4 class="mb-3">
      {{ $t("no_notification") }}
    </h4>
    <img src="../public/imgs/no-connection.png" alt="no_notification"  loading="lazy" class="nodataImg" />
  </div>
  <Toast />
</template>
<script>
definePageMeta({
  middleware: "check-auth",
});
import { useAuthStore } from "@/store/authStore";
import { useLangStore } from "~/store/langStore";
import Skeleton from "~/components/skelton.vue";
export default {
  components: { Skeleton },
  data() {
    return {
      axios: useNuxtApp().$axios,
      token: "",
      notifecation: [],
      loading: true,
      lang: "",
      path: useLocalePath(),
      visible: false,
      notify: {},
    };
  },
  mounted() {
    this.token = useAuthStore().user.token;
    this.GetNotifcaion();
    this.lang = useLangStore().selectedLanguage;
  },
  methods: {
    CountNotifecation() {
      this.axios
        .get("/count-notifications", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          this.count = res?.data?.data?.count;
        });
    },
    GetNotifcaion() {
      this.loading = true;
      this.axios
        .get("/notifications", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          this.notifecation = res.data.data.notifications.data;
          useAuthStore().CountNotifecation();
        })
        .catch((error) => {
          console.error("Error fetching notifications:", error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    async deleteNotify(id) {
      try {
        const response = await this.$axios.delete(
          `/delete-notification/${id}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        if (response.data.key === "success") {
          this.$toast.add({
            detail: `${response.data.msg}`,
            life: 3000,
            severity: "success",
          });
          this.notifecation = this.notifecation.filter(
            (notify) => notify.id !== id
          );
        } else if (response.data.key === "unauthenticated") {
          this.$toast.add({
            detail: `${response.data.msg}`,
            life: 3000,
            severity: "warn",
          });
        } else if (response.data.key === "fail") {
          this.$toast.add({
            detail: `${response.data.msg}`,
            life: 3000,
            severity: "error",
          });
        }
      } catch (error) {
        this.$toast.add({ detail: `${error}`, life: 3000, severity: "error" });
      }
    },
    readNotify(notify_data) {
      this.notify = notify_data.data;
      this.visible = true;
    },
    async deleteAll() {
      try {
        const response = await this.$axios.delete("delete-notifications", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        if (response.data.key === "success") {
          this.$toast.add({
            detail: `${response.data.msg}`,
            life: 3000,
            severity: "success",
          });
          this.notifecation = [];
        } else if (response.data.key === "unauthenticated") {
          this.$toast.add({
            detail: `${response.data.msg}`,
            life: 3000,
            severity: "warn",
          });
        } else if (response.data.key === "fail") {
          this.$toast.add({
            detail: `${response.data.msg}`,
            life: 3000,
            severity: "error",
          });
        }
      } catch (error) {
        this.$toast.add({ detail: `${error}`, life: 3000, severity: "error" });
      }
    },
    close_dialog() {
      this.visible = false;
      this.notify = {};
    },
  },
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.sm_page {
  min-height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
