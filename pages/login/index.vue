<template>
  <div>
    <ui-main-title> تسجيل الدخول </ui-main-title>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <form @submit.prevent="login" ref="formData">
          <TabView class="mb-3">
            <TabPanel header="دخول برقم الجوال ">
              <div class="form-group">
                <label class="form-label" id="phone">
                  رقم الجوال
                  <span class="text-danger"> * </span>
                </label>
                <div class="with_cun_select">
                  <input
                    type="number"
                    id="phone"
                    class="main_input form-control"
                    v-model="phone"
                  />
                  <div class="card d-flex justify-content-center dropdown_card">
                    <Dropdown
                      v-model="selectedCountry"
                      :options="countries"
                      optionLabel="name"
                    >
                      <template #value="slotProps">
                        <div v-if="slotProps.value" class="flex-group-me">
                          <img
                            :alt="slotProps.value.label"
                            :src="slotProps.value.image"
                            style="width: 24px"
                          />
                          <div>{{ slotProps.value.code }}</div>
                        </div>
                        <span v-else>
                          {{ slotProps.placeholder }}
                        </span>
                      </template>
                      <template #option="slotProps">
                        <div class="flex-group-me">
                          <img
                            :alt="slotProps.option.code"
                            :src="slotProps.option.image"
                            width="20rem"
                          />
                          <div>{{ slotProps.option.code }}</div>
                        </div>
                      </template>
                    </Dropdown>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel header="دخول بالبريد الالكتروني">
              <inputs-form-control
                mode="form-control"
                ref="mail"
                type="email"
                id="email"
                v-model.trim="email"
                @keypress="emptyPhone"
              >
                البريد الالكتروني
              </inputs-form-control>
            </TabPanel>
          </TabView>
          <inputs-form-control
            mode="form-control"
            type="password"
            id="password1"
            v-model.trim="password"
          >
            كلمة المرور
          </inputs-form-control>
          <NuxtLink
            :to="localePath('/login/email')"
            class="main_color text-start d-block"
          >
            هل نسيت كلمة المرور ؟
          </NuxtLink>
          <div class="flex-center mb-3">
            <ui-base-button mode="main_btn lg"> تأكيد الدخول </ui-base-button>

            <Toast />
          </div>
          <div class="text-center">
            <NuxtLink :to="localePath('/register')" class="font-bolder">
              <span class="text-dark"> لديك حساب ؟</span>
              <span class="main_color"> قم بتسجيل الدخول </span>
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
            device_id : 1111111,
            device_type: web 
          });
        } else if (this.email) {
          await useAuthStore().signIn({
            email: this.email,
            password: this.password,
            device_id : 1111111,
            device_type: 'web' 
          });
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    },
    // showToast(toastConfig) {
    //     this.$toast.add(toastConfig);
    // },
  },
};
</script>
