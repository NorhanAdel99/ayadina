<template>
    <div class="row justify-content-center">
        <div class="col-md-5">
            <steps></steps>
            <!-- @submit="noRegister" -->
            <form @submit.prevent="registerForm">
                <inputs-form-control type="text" id="name" v-model.trim="name"> {{ $t('name') }}
                </inputs-form-control>
                <div class="form-group">
                    <label class="form-label" id="phone">
                        {{ $t('phoneNumber') }}
                        <span class="text-danger"> * </span>
                    </label>
                    <div class="with_cun_select">
                        <input type="number" id="phone" class="main_input form-control" v-model="phone">
                        <div class="card d-flex justify-content-center dropdown_card">
                            <Dropdown v-model="selectedCountry" :options="countries" optionLabel="name">
                                <template #value="slotProps">
                                    <div v-if="slotProps.value" class="flex-group-me">
                                        <img :alt="slotProps.value.label" :src="slotProps.value.image"
                                            style="width: 24px" />
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
                <inputs-form-control type="email" id="email" v-model.trim="email"> {{ $t('email') }}
                </inputs-form-control>
                <inputs-form-control type="password" id="password" v-model.trim="password">
                    {{ $t('password') }}

                </inputs-form-control>
                <inputs-form-control type="password" id="password2" v-model.trim="password_confirm">
                    {{ $t('confirm_password') }}

                </inputs-form-control>
                <label for="checkBox" class="d-flex gap-10 align-items-center mb-3">
                    <input type="checkbox" id="checkBox" class="check" hidden>
                    <div class="checkShape">
                        <i class="fa-solid fa-check"></i>
                    </div>
                    <span> {{ $t('I_agree_to_the_terms') }}
                    </span>
                </label>
                <div class="flex-center mb-3">
                    <ui-base-button mode="main_btn lg"> {{ $t('Create_account') }}
                    </ui-base-button>
                </div>
                <NuxtLink link to="/login" class="text-center d-block">
                    <span class="text-dark"> {{ $t('you_have_an_account') }}
                    </span>
                    <span class="main_color"> {{ $t('log_in') }}
                    </span>
                </NuxtLink>
                <toast />
            </form>
        </div>
    </div>
</template>
<script>
import Dropdown from 'primevue/dropdown';
import nuxtStorage from 'nuxt-storage';
import Toast from 'primevue/toast';
import { useAuthStore } from '~/store/authStore'

export default {
    components: {
        Toast,
        Dropdown,
        nuxtStorage
    },
    data() {
        return {
            axios: useNuxtApp().$axios,
            localePath: useLocalePath(),
            name: '',
            userMail: '',
            phone: '',
            email: '',
            password: '',
            password_confirm: '',
            countries: [],
            code: '',
            formData: '',
            selectedCountry: {
                code: "+966",
                // image: require("@/assets/images/Flag.webp"),
            },
        }
    },
    mounted() {
        this.axios.get('/country-code')
            .then((response) => {
                this.countries = response.data.data
            })
            .catch(function (error) {
                console.log(error);
            })

    },
    methods: {
        async registerForm() {
            localStorage.setItem("email", this.email);
            this.code = this.selectedCountry.code.replace(/\+/g, '');
            try {
                await useAuthStore().signUp({ name: this.name, email: this.email, phone: this.phone, country_code: this.code, password: this.password, password_confirm: this.password_confirm });

            } catch (error) {
                console.error('Login error:', error);
            }
        },
    }

}

</script>