<template>
        <ui-breadCrumb to="/profile">
            <template v-slot:mainPage>  {{ $t('personalFile') }} </template>
            <template v-slot:currentPage>  {{ $t('Skill_details') }}</template>
        </ui-breadCrumb>
        <div>
            <ui-base-card class="mb-3">
                <div>
                    <span class="font-bold text-muted-d">{{ showSkill.title }}</span>
                </div>

            </ui-base-card>
            <ui-base-card class="mb-3">
                <div>
                    <span class="text-muted ">  {{ $t("Main_section") }}: </span>
                    <span class="font-bold text-muted-d">{{ showSkill.category }}</span>
                </div>
            </ui-base-card>
            <ui-base-card class="mb-3">
                <div>
                    <span class="text-muted">  {{ $t("Subsection") }}: </span>
                    <span class="font-bold text-muted-d">{{ showSkill.sub_category }}</span>
                </div>
            </ui-base-card>
            <ui-base-card class="mb-3">
                <div>
                    <span class="text-muted">  {{ $t("Governorates_in_which_the_skill_is_provided") }}: </span>
                    <span class="font-bold text-muted-d">
                        {{ showSkill.regions }}
                    </span>

                </div>
            </ui-base-card>
            <ui-base-card class="mb-3">
                <div>
                    <div class="text-muted-d font-bold mb-2">  {{  $t('Description_of_the_request')}} : </div>
                    <p class="text-muted ">
                        {{ showSkill.description }}
                    </p>

                </div>
            
            </ui-base-card>
        </div>
        <div class="flex-between border-bottom mb-3 pb-3">
            <h6 class="title-border font-bolder"> {{$t("previous_works")  }} </h6>
            <!-- :to="localePath('/profile/skills/previousWorks' + ` ${useRoute().params.id}`)" -->
            <NuxtLink :to="localePath('/profile/skills/previousWorks/' + `${id}`)" class="main_color">  {{ $t("all") }} </NuxtLink>
        </div>
        <div class="d-flex gap-10 align-items-center flex-wrap">
            <img v-for="img in showSkill.images" :key="img" :src="img" class="skillImg" />
        </div>


</template>
<script>
import { useAuthStore } from '@/store/authStore';
definePageMeta({
  middleware: "check-auth",
})
export default {
    async fetch({ route }) {
    const id = route.params.id
    console.log(id) // Output: ID value from the URL
  },
    props: ['id'],
    data() {
        return {
            selectedSkill: '',
            selectedSkillId: '',
            visible: false,
            visible2: false,
            visible3: false,
            visible4: false,
            showSkill:'',
            axios: useNuxtApp().$axios,
            localePath: useLocalePath(),
            skills: [],

        }
    },
    computed: {
    id() {
      return this.$route.params.id
    }
  },
    mounted() {
        this.token = useAuthStore().token
        this.axios.get(`show-skill/${useRoute().params.id}`, {
            headers: {
                Authorization: `Bearer ${this.token}`,
            }
        })
            .then((response) => {
                this.showSkill = response.data.data
                console.log(response.data.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    
    },
}
</script>