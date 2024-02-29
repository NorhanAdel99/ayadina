<template>
  <div class="auth">
    <ui-main-title> {{ $t("login") }} </ui-main-title>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <form @submit.prevent="login" ref="formData">
          <TabView class="mb-3">
            <TabPanel :header="$t('Login_with_mobile_number')">
              <div class="form-group">
                <label class="form-label" id="phone">
                  {{ $t("phoneNumber") }}
                  <span class="text-danger"> * </span>
                </label>
                <div class="with_cun_select">
                  <input type="number" id="phone" class="main_input form-control" v-model="phone" />
                  <div class="card d-flex justify-content-center dropdown_card">
                    <Dropdown v-model="selectedCountry" :options="countries" optionLabel="name">
                      <template #value="slotProps">
                        <div v-if="slotProps.value" class="flex-group-me">
                          <img :alt="slotProps.value.label" :src="slotProps.value.image" style="width: 24px" />
                          <div>{{ slotProps.value.code }}</div>
                        </div>
                        <span v-else>
                          {{ slotProps.placeholder }}
                        </span>
                      </template>
                      <template #option="slotProps">
                        <div class="flex-group-me">
                          <img :alt="slotProps.option.code" :src="slotProps.option.image" width="20rem" />
                          <div>{{ slotProps.option.code }}</div>
                        </div>
                      </template>
                    </Dropdown>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel :header="$t('Login_with_email')">
              <inputs-form-control mode="form-control" ref="mail" type="email" id="email" v-model.trim="email"
                @keypress="emptyPhone">
                {{ $t("email") }}
              </inputs-form-control>
            </TabPanel>
          </TabView>
          <inputs-form-control mode="form-control" type="password" id="password1" v-model.trim="password">
            {{ $t("password") }}
          </inputs-form-control>
          <NuxtLink :to="localePath('/login/email')" class="main_color text-start d-block forgetPassword">
            {{ $t("did_you_forget_your_password?") }}
          </NuxtLink>
          <div class="flex-center mb-3">
            <ui-base-button mode="main_btn lg sure_login my-2"> {{ $t("Confirm_entry") }} </ui-base-button>

            <Toast />
          </div>
          <div class="text-center">
            <NuxtLink :to="localePath('/register')" class="font-bolder">
              <span class="text-dark"> {{ $t("you_have_an_account?") }} </span>
              <span class="main_color"> {{ $t("log_in") }} </span>
            </NuxtLink>
          </div>
        </form>
      </div>
    </div>
    <Toast />
  </div>
</template>

<script>
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Dropdown from "primevue/dropdown";
import Toast from "primevue/toast";
import { useAuthStore } from "@/store/authStore";

export default {
  components: {
    TabView,
    TabPanel,
    Dropdown,
    Toast,
    userId: "",
  },
  data() {
    return {
      localePath: useLocalePath(),
      axios: useNuxtApp().$axios,
      phone: "",
      email: "",
      password: "",
      form: "",
      countries: [],
      code: "",
      userMail: "",
      selectedCountry: {
        code: "+966",
      },
    };
  },

  mounted() {
    this.axios.get('/country-code')
      .then((response) => {
        console.log('response: ', response.data.data)
        this.countries = response.data.data
      })
      .catch(function (error) {
        console.log(error);
      })

  },
  methods: {
    async login() {
      this.code = this.selectedCountry.code.replace(/\+/g, '')
      try {
        if (this.phone) {
          await useAuthStore().signIn({
            phone: this.phone,
            password: this.password,
            country_code: this.code,
            device_id: 1111111,
            device_type: web
          });
        } else if (this.email) {
          await useAuthStore().signIn({
            email: this.email,
            password: this.password,
            device_id: 1111111,
            device_type: 'web'
          });
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    },
  },
};
</script>
<style lang="scss" >
.p-tabview-nav {
  flex-wrap: wrap;
}

@media (max-width:768px) {
  .auth {
    font-size: 14px;

    .p-tabview-nav {
      flex-wrap: wrap;
    }

    .p-tabview-header {
      width: 100%;
    }

    .p-tabview-header a {
      font-size: 14px;
    }

    .sure_login {
      font-size: 14px;
    }
  }
}</style>
