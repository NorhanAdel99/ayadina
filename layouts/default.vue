<template>
  <!-- <NuxtLoadingIndicator /> -->
  <Toast />
  <header>
    <div class="container">
      <div class="py-4 d-flex align-items-center justify-content-between">
        <!-- order-md-2-n -->
        <div class="d-flex gap-lg-4 gap-2 gn align-items-end">
          <img src="/imgs/logo2.webp" alt="logo" class="logotext" />

          <h3 class="mainTitle">{{ $t("passion") }}</h3>

          <div class="main_menu burger-icon wh-color" @click="toggleActive" :class="{ active: menuActive }">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <NuxtLink :to="path('/')" class="containLogo">
          <img src="/imgs/logo1.webp" alt="logo" class="logo" />
        </NuxtLink>
        <!--check for user -->
        <ul class="d-flex align-items-center gap-20 project-nav" v-if="isAuthenticated" :class="{ active: menuActive }"
          ref="menu">
          <li>
            <NuxtLink :to="path('/')" class="main_color navLink" @click="closeMenu">
              {{ $t("home_title") }}</NuxtLink>
          </li>
          <li>
            <NuxtLink :to="path('/profile')" class="main_color navLink" @click="closeMenu">{{ $t("personalFile") }}
            </NuxtLink>
          </li>
          <li>
            <lang-switcher class="navLink" @click="closeMenu"></lang-switcher>
          </li>
          <li>
            <NuxtLink :to="path('/notification')" class="notificationBox icon" @click="closeMenu">
              <font-awesome-icon icon="fa-solid fa-bell"></font-awesome-icon>
              <Badge :value="countNotify" severity="danger" class="icon_count"
                v-if="countNotify > 0 && IsNotify === true">
              </Badge>
            </NuxtLink>
          </li>
          <li>
            <div @click="signOut" mode=" btn main_btn sm">
              <font-awesome-icon :icon="['fas', 'right-from-bracket']" class="text-danger" />
            </div>
          </li>
        </ul>
        <!-- check if not -->
        <ul class="d-flex align-items-center gap-20 project-nav" v-else-if="!isAuthenticated"
          :class="{ active: menuActive }" ref="menu">
          <li>
            <NuxtLink :to="path('/')" class="main_color navLink" @click="closeMenu">
              {{ $t("home_title") }}</NuxtLink>
          </li>
          <li>
            <NuxtLink :to="path('/login')" class="main_color navLink" @click="closeMenu">
              {{ $t("login") }}</NuxtLink>
          </li>
          <li>
            <lang-switcher @click="closeMenu"></lang-switcher>
          </li>
        </ul>
        <h3 class="mainTitle2">{{ $t("passion") }}</h3>
      </div>
    </div>
  </header>
  <div class="notification_alert" ref="alert">
    <div v-for="item in alerts" :key="item" class="item_alert">
      <img src="../public/notification.png" alt="bell" />

      <div class="flex flex-column">
        <span class="d-block" v-if="lang === 'ar'">{{ item.title_ar }}</span>
        <span class="d-block" v-if="lang === 'en'">{{ item.title_en }}</span>

        <span class="text_body" v-if="lang === 'ar'">{{ item.body_ar }}</span>
        <span class="text_body" v-if="lang === 'en'">{{ item.body_en }}</span>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="back-button mt-2" @click="goToPrev()"
      v-if="route.path !== '/login' && route.path !== '/' && route.path !== '/login/email' && route.path !== '/login/otp' && route.path !== '/register' && route.path !== '/register/step2' && route.path !== '/login/passwordReset' && route.path !== '/register/otp'">
      <font-awesome-icon :icon="['fas', 'arrow-right']" />
      <span>
        رجوع
      </span>
    </div>
    <div class="s-space " :class="{ 'home_space': route.path === '/' }">
      <NuxtPage @click="closeMenu" />
    </div>
  </div>
  <!-- <h1 v-if="deviceID"> {{ deviceID }}
  </h1> -->
  <footer>
    <div class="footer-content py-5">
      <div class="container">
        <div class="row">
          <div class="col-md-4 col-12 my-2">
            <h4 class="mb-3">{{ $t("links") }}</h4>
            <ul>
              <li class="mb-2">
                <NuxtLink :to="path('/')" class="text-dark">{{
                  $t("home_title")
                }}</NuxtLink>
              </li>
              <li class="mb-2 class text-dark" @click="commission">
                {{ $t("commission") }}
              </li>
              <li class="mb-2">
                <NuxtLink :to="path('/contactUs')" class="text-dark">
                  {{ $t("contact_us") }}
                </NuxtLink>
              </li>
            </ul>
          </div>
          <div class="col-md-4 col-12 my-2">
            <h4 class="mb-3">{{ $t("links") }}</h4>
            <ul>
              <li class="mb-2">
                <NuxtLink :to="path('/aboutUs')" class="text-dark">
                  {{ $t("aboutWebsite") }}
                </NuxtLink>
              </li>
              <li class="mb-2">
                <NuxtLink :to="path('/fqs')" class="text-dark">
                  {{ $t("fqs") }}</NuxtLink>
              </li>
              <li class="mb-1">
                <NuxtLink :to="path('/termsAndConditions')" class="text-dark">
                  {{ $t("termsAndConditions") }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        <!--  <div class="col-md-3 col-12 my-2">
            <h4 class="mb-3">{{ $t("clintServ") }}</h4>
            <a :href="service.name" target="_blank" class="text-dark mb-3" v-for="service in customerServices"
              :key="service">
              <div class="mb-2">{{ service.name }}</div>
            </a>
          </div> -->
          <div class="col-md-4 col-12 my-2">
            <h4 class="mb-3">{{ $t("Follow_us_on") }}</h4>
            <ul class="d-flex align-items-center gap-10 flex-wrap">
              <li class="mb-2" v-for="link in socials" :key="link.name">
                <NuxtLink :to="link.link" class="footerCircleLink">
                  <img :src="link.icon" />
                </NuxtLink>
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
</template>
<script>
import { useAuthStore } from "@/store/authStore";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useLangStore } from "@/store/langStore";

definePageMeta({
  middleware: "check-language",
});
export default {
  data() {
    return {
      path: useLocalePath(),
      menuActive: false,
      loading: false,
      axios: useNuxtApp().$axios,
      nuxtApp: useNuxtApp(),
      head: useLocaleHead({
        addDirAttribute: true,
        identifierAttribute: "id",
        addSeoAttributes: true,
        lang: "",
      }),
      socials: [],
      testUTH: null,
      count: "",
      tokenAuth: "",
      msg: "",
      customerServices: [],
      notify: "",
      logo: "logo1.png",
      customerService: [],
      alerts: []
    };
  },
  computed: {
    token() {
      return useAuthStore().token ? useAuthStore().token : "";
    },
    route() {
      return useRoute();
    },
    selectedLanguage() {
      return useLangStore().selectedLanguage;
    },
    htmlAttrs() {
      // console.log(this.$nuxt.context.head.htmlAttrs)
      return this.$nuxt.context.head.htmlAttrs;
    },
    isAuthenticated() {
      if (process.client) {
        return useAuthStore().isAuthenticated;
      }
      return false;
    },
    countNotify() {
      return useAuthStore().count;
    },
    IsNotify() {
      return useAuthStore().Notify;
    },
    deviceID() {
      if (process.client) {
        return useAuthStore().device_id;
      }
    },
  },
  watch: {
    "$i18n.locale": function (newLang) {
      document.documentElement.setAttribute("lang", newLang);
      document.documentElement.setAttribute(
        "dir",
        useLangStore().getLanguageDirection(newLang)
      );
    },
    $route(to, from) {
      if(this.isAuthenticated){
        useAuthStore().CountNotifecation();
        useAuthStore().getProfile();
      }
    },
  },

  mounted() {
    document.addEventListener('click', this.handleBodyClick);
    this.lang = useLangStore().selectedLanguage;
    this.user = useAuthStore().user;
    this.token = useAuthStore().token;
    document.documentElement.setAttribute("lang", this.head.htmlAttrs.lang);
    document.documentElement.setAttribute(
      "dir",
      useLangStore().getLanguageDirection(this.head.htmlAttrs.lang)
    );

    if (this.token) {
      useAuthStore().CountNotifecation();
      console.log(useAuthStore().count);
    }
    useAuthStore().getProfile();
    const firebaseConfig = {
      apiKey: "AIzaSyAOnoOWRfWyjikzmfLZAxZH6QnY-ntz-kY",
      authDomain: "iadeena.firebaseapp.com",
      projectId: "iadeena",
      storageBucket: "iadeena.appspot.com",
      messagingSenderId: "77497322474",
      appId: "1:77497322474:web:adf8b165e16da034aa0093",
      measurementId: "G-ELLVSKWMNL",
    };
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      // console.log("data. ", payload.data);
      console.log("payload: ", payload);
      this.alerts.unshift(payload.data);
      setTimeout(() => {
        const index = this.alerts.indexOf(payload.data);
        if (index !== -1) {
          this.alerts.splice(index, 1);
        }
      }, 3000);
    });
    getToken(messaging, {
      vapidKey:
        "BAaE3CbHQVzW52bDpNdPxuTeG75GaePou4EGD5-it-Pw4g6F5tp0x-22rXcDy_A-5aXfzMzuOgOTNe1AdVNITvs",
    })
      .then((currentToken) => {
        if (currentToken) {
          console.log(currentToken);
          useAuthStore().setDeviceId(currentToken);
          localStorage.setItem("device_id", currentToken);
        } else {
          console.log(
            "No registration token available. Request permission to generate one."
          );
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
      });
    this.$axios
      .get("/socials", {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((res) => {
        this.socials = res.data.data;
        console.log(this.socials);
      });

    //
    this.$axios
      .get("/customer-service", {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((res) => {
        this.customerServices = res.data.data;
      });
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleBodyClick);
  },
  methods: {
    goToPrev() {
      // Trigger animation
      this.backAnim();

      // Navigate back one step after animation completes
      setTimeout(() => {
        this.$router.go(-1);
      }, 1000); // Matches the duration of your animation (1 second)
    },

    backAnim() {
      const backButton = document.querySelector('.back-button');
      if (backButton.classList.contains('back')) {
        backButton.classList.remove('back');
      } else {
        backButton.classList.add('back');
        // Set a timeout to continue the animation if necessary
        setTimeout(this.backAnim, 1000);
      }
    },
    commission() {
      if (!this.token) {
        this.$toast.add({
          detail: this.$t("loginMessage"),
          life: 3000,
          severity: "error",
        });
      } else {
        const localePath = useLocalePath();
        const path = localePath("/commision");
        useRouter().push(path);

        useRouter().push("/commision");
      }
    },
    signOut() {
      useAuthStore().signOut();
    },
    // toggleActive(e) {
    //   let nav = document.querySelector(".project-nav");
    //   let burgerIcon = document.querySelector(".burger-icon");
    //   nav.classList.toggle("active");
    //   burgerIcon.classList.toggle("active");
    //   e.stopPropagation();
    // },
    stopPropagation(e) {
      e.stopPropagation();
    },
    // closeMenu() {
    //   this.stopPropagation();
    //   let nav = document.querySelector(".project-nav");
    //   let burgerIcon = document.querySelector(".burger-icon");
    //   nav.classList.remove("active");
    //   burgerIcon.classList.remove("active");
    // },

    toggleActive(e) {
      e.stopPropagation();
      this.menuActive = !this.menuActive; // Toggle menu active state
    },
    handleBodyClick(event) {
      const menu = this.$refs.menu;
      if (this.menuActive) {
        console.log('Clicked outside menu, closing it');
        this.closeMenu();
      }
    },

    closeMenu() {
      this.menuActive = false; // Close the menu
    },
  },
};
</script>
<style lang="scss">
.notification_alert {
  position: fixed;
  top: 100px;
  right: 15px;
  z-index: 999;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.notification_alert .item_alert {
  display: flex;
  align-items: flex-start;
  background-color: #12a7d8;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  width: 300px;
  gap: 10px;
  animation: comeDown 0.5s ease;
}

.notification_alert .item_alert .text_body {
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #fff;
}

.notification_alert .item_alert img {
  border-radius: 50%;
  background-color: #fff;
  padding: 5px;
  width: 30px;
  height: 30px;
}

.icon_count {
  width: 8px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  position: relative;

  .p-component {
    font-size: 11px !important;
    position: absolute;
    top: -13px;
    left: -11px;
  }
}

@media (min-width: 769px) and (max-width: 992px) {
  header {
    .mainTitle {
      font-size: 17px;
    }

    .logotext {
      width: 100px;
    }
  }
}

html[lang="en"] .mainTitle {
  @media (max-width: 1024px) {
    font-size: 13px;
  }

  font-size: 23px;
}

.containLogo {
  top: 30px;
    width: 130px;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    order: unset;
    height: 120px;
    text-align: center;
  @media (max-width: 768px) {
    top: 15px;
  }
}

.logo {
  background: transparent !important;
  height: 100%;
}

.mainTitle {
  font-weight: bold;
}

.mainTitle2 {
  display: none;

  @media (max-width: 300px) {
    display: none !important;

  }

  @media (max-width: 332px) {
    font-size: 10px !important;
    font-weight: bold;
  }
}

@media (max-width: 768px) {
  .mainTitle {
    display: none;
  }

  .mainTitle2 {
    display: block;
    font-size: 15px;
  }
}

.navLink {
  font-size: 18px;

  &.router-link-active {
    font-size: 22px;
  }
}

.gap-5.gn {
  @media screen and (max-width: 768px) {
    gap: 10px !important;
  }
}

@media (max-width: 768px) {
  .project-nav {
    .main_color {
      color: white !important;
    }
  }
}

.project-nav {
  @media (max-width: 768px) {
    transform: translateX(-100%) !important;
    right: unset;
    left: 0 !important;
  }

  &.active {
    transform: translateX(0) !important;
  }
}

html[lang="en"] .mainTitle2 {
  @media (max-width: 768px) {
    font-size: 12px;
  }
}

html[lang='en'] .containSearch .inputIcon {
  right: unit($number: 0);
  left: 10px;


}

html[lang="en"] .project-nav {
  @media (max-width: 768px) {
    transform: translateX(100%) !important;
    left: unset !important;
    right: 0 !important;
  }
}

html[lang="en"] .project-nav.active {
  transform: translateX(0) !important;
}

body {
  background: linear-gradient(140deg,
      rgb(20 167 216 / 22%),
      rgba(20, 167, 216, 0),
      rgb(231, 249, 255) 76%) !important;
}

@media (max-width: 768px) {
  .headerTitle {
    display: none;
  }

  .containLogo {
    width: 80px !important;
  }

  .logotext {
    width: 90px;
  }
}

header {
  position: relative;
  border-bottom: unset !important;

  &::after {
    content: "";
    position: absolute;
    right: 0;
    width: calc(50% - 60px);
    height: 1px;
    background-color: #14a7d8;
    bottom: 0;

    @media (max-width: 768px) {
      width: calc(50% - 40px);
    }
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
    width: calc(50% - 60px);
    height: 1px;
    background-color: #14a7d8;
    bottom: 0;

    @media (max-width: 768px) {
      width: calc(50% - 40px);
    }
  }
}
</style>
