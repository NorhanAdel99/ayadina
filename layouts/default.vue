<template>
  <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
    <Toast />
    <header>
      <div class="container">
        <div class="flex-between py-3">
          <div class="d-flex gap-20 align-items-end order-md-2-n">
            <img src="../assets/imgs/logo2.png" alt="" class="logotext" />

            <h4 class="headerTitle">{{ $t("passion") }}</h4>

            <div class="main_menu burger-icon wh-color" @click="toggleActive">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <NuxtLink :to="localePath('/')" class="containLogo">
            <img src="../assets/imgs/logo1.png" alt="logo" class="logo" />
          </NuxtLink>
          <!--check for user -->

          <ul
            class="d-flex align-items-center gap-20 project-nav"
            v-if="isAuthenticated"
          >
            <li>
              <NuxtLink :to="localePath('/')" class="main_color">
                {{ $t("home_title") }}</NuxtLink
              >
            </li>
            <li>
              <NuxtLink :to="localePath('/profile')" class="main_color">{{
                $t("personalFile")
              }}</NuxtLink>
            </li>
            <li>
              <lang-switcher></lang-switcher>
            </li>
            <li>
              <NuxtLink
                :to="localePath('/notification')"
                class="notificationBox"
              >
                <font-awesome-icon icon="fa-solid fa-bell"></font-awesome-icon>
                <Badge :value="count" severity="danger" v-if="count > 0">
                </Badge>
              </NuxtLink>
            </li>
            <li>
              <div @click="logOut" mode=" btn main_btn sm">
                <font-awesome-icon
                  :icon="['fas', 'right-from-bracket']"
                  class="text-danger"
                />
              </div>
            </li>
          </ul>
          <!-- check if not -->
          <ul
            class="d-flex align-items-center gap-20 project-nav"
            v-else-if="!isAuthenticated"
          >
            <li>
              <NuxtLink :to="localePath('/')" class="main_color">
                {{ $t("home_title") }}</NuxtLink
              >
            </li>
            <li>
              <NuxtLink :to="localePath('/login')" class="main_color">
                {{ $t("login") }}</NuxtLink
              >
            </li>
            <li>
              <lang-switcher></lang-switcher>
            </li>
          </ul>
        </div>
      </div>
    </header>
    <div class="container">
      <div class="s-space">
        <!-- <h1 class="text-danger">{{ $t("home_title") }}</h1> -->
        <NuxtPage />
      </div>
    </div>

    <footer>
      <div class="footer-content py-5">
        <div class="container">
          <div class="row">
            <div class="col-md-3">
              <h4 class="mb-3">{{ $t("links") }}</h4>
              <ul>
                <li class="mb-2">
                  <NuxtLink :to="localePath('/')" class="text-dark">{{
                    $t("home_title")
                  }}</NuxtLink>
                </li>
                <li class="mb-2">
                  <NuxtLink :to="localePath('/commision')" class="text-dark">
                    {{ $t("commission") }}
                  </NuxtLink>
                </li>
                <li class="mb-2">
                  <NuxtLink :to="localePath('/contactUs')" class="text-dark">
                    {{ $t("contact_us") }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
            <div class="col-md-3">
              <h4 class="mb-3">{{ $t("links") }}</h4>
              <ul>
                <li class="mb-2">
                  <NuxtLink :to="localePath('/aboutUs')" class="text-dark">
                    {{ $t("aboutWebsite") }}
                  </NuxtLink>
                </li>
                <li class="mb-2">
                  <NuxtLink :to="localePath('/fqs')" class="text-dark">
                    {{ $t("fqs") }}</NuxtLink
                  >
                </li>
                <li class="mb-1">
                  <NuxtLink
                    :to="localePath('/termsAndConditions')"
                    class="text-dark"
                  >
                    {{ $t("termsAndConditions") }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
            <div class="col-md-3">
              <h4 class="mb-3">{{ $t("clintServ") }}</h4>
              <a href="mailto:norhanadel@gmail.com" class="text-dark mb-3">
                <font-awesome-icon
                  icon="fa-regular fa-envelope"
                  class="m-end-10"
                />
                <span>norhanadel@gmail.com </span>
              </a>
            </div>
            <div class="col-md-3">
              <h4 class="mb-3">تابعنا علي</h4>
              <ul class="d-flex align-items-center gap-10">
                <li class="mb-2">
                  <a
                    href="https://twitter.com/intent/tweet"
                    class="footerCircleLink"
                    target="_blank"
                  >
                    <font-awesome-icon icon="fa-brands fa-twitter" />
                  </a>
                </li>
                <li class="mb-2">
                  <a
                    href="https://tiktok.com/"
                    class="footerCircleLink"
                    target="_blank"
                  >
                    <font-awesome-icon icon="fa-brands fa-tiktok" />
                  </a>
                </li>
                <li class="mb-2">
                  <a
                    href="https://facebook.com"
                    class="footerCircleLink"
                    target="_blank"
                  >
                    <font-awesome-icon icon="fa-brands fa-facebook-f" />
                  </a>
                </li>
                <li class="mb-2">
                  <a
                    href="/https://instagram.com"
                    class="footerCircleLink"
                    target="_blank"
                  >
                    <font-awesome-icon icon="fa-brands fa-instagram" />
                  </a>
                </li>
                <li class="mb-2">
                  <a
                    href="https://snapchat.com"
                    class="footerCircleLink"
                    target="_blank"
                  >
                    <font-awesome-icon icon="fa-brands fa-snapchat" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="p-3 text-center border-top">
        {{ $t("descriptionWEB") }}
      </div>
    </footer>
  </Html>
</template>

<script>
import { useAuthStore } from "@/store/authStore";
import Toast from "primevue/toast";
import Badge from "primevue/badge";

export default {
  data() {
    return {
      localePath: useLocalePath(),
      axios: useNuxtApp().$axios,
      head: useLocaleHead({
        addDirAttribute: true,
        identifierAttribute: "id",
        addSeoAttributes: true,
        lang: "",
        testUTH: null,
        token: "",
        count: "",
      }),
    };
  },
  computed: {
    isAuthenticated() {
      if (process.client) {
        // Code specific to the client side
        return useAuthStore().isAuthenticated;
      }
      // Handle SSR or return a default value
      return false;
    },
  },
  mounted() {
    this.user = useAuthStore().user;
    this.token = useAuthStore().user.token;
    this.CountNotifecation();
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
          this.count = res.data.data.count;
          console.log(res.data.data);
        });
    },
    logOut() {
      useAuthStore().logOut();
      console.log(useAuthStore().user);
      console.log(useAuthStore().isAuthenticated);
    },
    toggleActive(e) {
      let nav = document.querySelector(".project-nav");
      let burgerIcon = document.querySelector(".burger-icon");
      nav.classList.toggle("active");
      burgerIcon.classList.toggle("active");
      e.stopPropagation();
    },
    stopPropagation(e) {
      e.stopPropagation();
    },
  },
  setup() {
    const tesAuth = computed(() => {
      return useAuthStore();
    });
  },
};
</script>