<template>
  <div :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
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

          <ul class="d-flex align-items-center gap-20 project-nav" v-if="isAuthenticated">
            <li>
              <NuxtLink :to="localePath('/')" class="main_color">
                {{ $t("home_title") }}</NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('/profile')" class="main_color">{{
                $t("personalFile")
              }}</NuxtLink>
            </li>
            <li>
              <!-- <lang-switcher></lang-switcher> -->
            </li>
            <li>
              <NuxtLink :to="localePath('/notification')" class="notificationBox">
                <font-awesome-icon icon="fa-solid fa-bell"></font-awesome-icon>
                <Badge :value="count" severity="danger" v-if="count > 0">
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
          <ul class="d-flex align-items-center gap-20 project-nav" v-else-if="!isAuthenticated">
            <li>
              <NuxtLink :to="localePath('/')" class="main_color">
                {{ $t("home_title") }}</NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('/login')" class="main_color">
                {{ $t("login") }}</NuxtLink>
            </li>
            <li>
              <!-- <lang-switcher></lang-switcher> -->
            </li>
          </ul>
        </div>
      </div>
    </header>
    <div class="container">
      <div class="s-space">
        <NuxtPage />
      </div>
    </div>

    <footer>
      <div class="footer-content py-5">
        <div class="container">
          <div class="row">
            <div class="col-md-3 col-6 my-2">
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
            <div class="col-md-3 col-6 my-2">
              <h4 class="mb-3">{{ $t("links") }}</h4>
              <ul>
                <li class="mb-2">
                  <NuxtLink :to="localePath('/aboutUs')" class="text-dark">
                    {{ $t("aboutWebsite") }}
                  </NuxtLink>
                </li>
                <li class="mb-2">
                  <NuxtLink :to="localePath('/fqs')" class="text-dark">
                    {{ $t("fqs") }}</NuxtLink>
                </li>
                <li class="mb-1">
                  <NuxtLink :to="localePath('/termsAndConditions')" class="text-dark">
                    {{ $t("termsAndConditions") }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
            <div class="col-md-3 col-6 my-2">
              <h4 class="mb-3">{{ $t("clintServ") }}</h4>
              <a href="mailto:norhanadel@gmail.com" class="text-dark mb-3">
                <font-awesome-icon icon="fa-regular fa-envelope" class="m-end-10" />
                <span>norhanadel@gmail.com </span>
              </a>
            </div>
            <div class="col-md-3 col-6 my-2">
              <h4 class="mb-3"> {{ $t("Follow_us_on") }} </h4>
              <ul class="d-flex align-items-center gap-10">
                <li class="mb-2">
                  <a href="https://twitter.com/intent/tweet" class="footerCircleLink" target="_blank">
                    <font-awesome-icon icon="fa-brands fa-twitter" />
                  </a>
                </li>
                <li class="mb-2">
                  <a href="https://tiktok.com/" class="footerCircleLink" target="_blank">
                    <font-awesome-icon icon="fa-brands fa-tiktok" />
                  </a>
                </li>
                <li class="mb-2">
                  <a href="https://facebook.com" class="footerCircleLink" target="_blank">
                    <font-awesome-icon icon="fa-brands fa-facebook-f" />
                  </a>
                </li>
                <li class="mb-2">
                  <a href="/https://instagram.com" class="footerCircleLink" target="_blank">
                    <font-awesome-icon icon="fa-brands fa-instagram" />
                  </a>
                </li>
                <li class="mb-2">
                  <a href="https://snapchat.com" class="footerCircleLink" target="_blank">
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
  </div>
</template>

<script>
import { useAuthStore } from "@/store/authStore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

export default {
  data() {
    return {
      localePath: useLocalePath(),
      // nuxtApp : useNuxtApp(),
      loading: false,
      axios: useNuxtApp().$axios,
      nuxtApp: useNuxtApp(),
      head: useLocaleHead({
        addDirAttribute: true,
        identifierAttribute: "id",
        addSeoAttributes: true,
        lang: "",
        testUTH: null,
        token: "",
        count: "",
        tokenAuth: "",
        msg: "",
      }),
    };
  },
  computed: {
    isAuthenticated() {
      if (process.client) {
        return useAuthStore().isAuthenticated;
      }
      return false;
    },
  },
  mounted() {
    this.user = useAuthStore().user;
    this.token = useAuthStore().token;
    this.CountNotifecation();
    const firebaseConfig = {
      apiKey: "AIzaSyAOnoOWRfWyjikzmfLZAxZH6QnY-ntz-kY",
      authDomain: "iadeena.firebaseapp.com",
      projectId: "iadeena",
      storageBucket: "iadeena.appspot.com",
      messagingSenderId: "77497322474",
      appId: "1:77497322474:web:adf8b165e16da034aa0093",
      measurementId: "G-ELLVSKWMNL"
    };
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
    });
    getToken(messaging, {
      vapidKey:
        "BAaE3CbHQVzW52bDpNdPxuTeG75GaePou4EGD5-it-Pw4g6F5tp0x-22rXcDy_A-5aXfzMzuOgOTNe1AdVNITvs",
    })
      .then((currentToken) => {
        if (currentToken) {
          console.log("token", currentToken);
        } else {
          console.log(
            "No registration token available. Request permission to generate one."
          );
        }
      })

      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
      });
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
        });
    },
    signOut() {
      useAuthStore().signOut();
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
};

</script>
<style lang="scss" >
@media (max-width:768px) {
  .headerTitle {
    display: none;
  }

  .logo {
    width: 59px;
  }

  .logotext {
    width: 50px;
  }
};


@media (min-width:769px) and (max-width:992px) {
  header {
    .headerTitle {
      font-size: 17px;
    }

    .logo {
      width: 65px;
    }

    .logotext {
      width: 60px;
    }
  }
}
</style>