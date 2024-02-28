<template>
    <ui-main-title>
        {{ $t("personalFile") }}
    </ui-main-title>
    <profile-tabs></profile-tabs>
    <div class="row justify-content-center">
        <div class="col-md-10">
            <ui-base-card class="mb-3">
                <NuxtLink :to="localePath('/profile/settings/notification')" class=" flex-between  text-dark f-13">
                    <h6>{{ $t("Notification_settings") }}</h6>
                    <font-awesome-icon icon="fa-solid fa-chevron-left " />
                </NuxtLink>
            </ui-base-card>
            <ui-base-card class="mb-3">
                <NuxtLink :to="localePath('/profile/settings/editProfile')" class=" flex-between  text-dark f-13">
                    <h6>{{ $t("edit_personal_profile") }}</h6>
                    <font-awesome-icon icon="fa-solid fa-chevron-left " />
                </NuxtLink>
            </ui-base-card>
            <ui-base-card class="mb-3">
                <NuxtLink :to="localePath('/profile/settings/phoneNumber')" class=" flex-between  text-dark f-13">
                    <h6>{{ $t("edit_phone") }}</h6>
                    <font-awesome-icon icon="fa-solid fa-chevron-left " />
                </NuxtLink>
            </ui-base-card>
            <ui-base-card class="mb-3">
                <NuxtLink :to="localePath('/profile/settings/email')" class=" flex-between  text-dark f-13">
                    <h6>{{ $t("edit_email") }}</h6>
                    <font-awesome-icon icon="fa-solid fa-chevron-left " />
                </NuxtLink>
            </ui-base-card>
            <ui-base-card class="mb-3">
                <NuxtLink :to="localePath('/profile/settings/password')" class=" flex-between  text-dark f-13">
                    <h6>{{ $t("edit_password") }}</h6>
                    <font-awesome-icon icon="fa-solid fa-chevron-left " />
                </NuxtLink>
            </ui-base-card>
            <ui-base-card class="mb-3 border-danger">
                <div class=" flex-between  text-danger f-13 cursor_poninter" @click="visible3 = true">
                    <h6>{{ $t("logout") }}</h6>
                    <font-awesome-icon icon="fa-solid fa-chevron-left " />
                </div>
            </ui-base-card>
            <ui-base-card class="mb-3 border-danger">
                <div class=" flex-between   f-13 text-danger cursor_poninter" @click="visible = true">
                    <h6>{{ $t("deletAccount") }}</h6>
                    <font-awesome-icon icon="fa-solid fa-chevron-left " />
                </div>
            </ui-base-card>
        </div>
    </div>

    <!-- // delete - account  -->
    <Dialog v-model:visible="visible" :header="$t('Do_you_really_want_to_delete_the_account')" modal
        :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <font-awesome-icon icon="fa-solid fa-triangle-exclamation" class="modal-exclam-mark mb-3" />

        <div class="flex-center gap-10">
            <button type="button" class="   main_btn  btn-danger" label="Show" @click="deleteAcc">نعم</button>
            <button type="button" class="  main_btn btn-primary" label="Show"> لا </button>
        </div>
    </Dialog>
    <Dialog v-model:visible="visible2" modal :header="$t('The_account_has_been_successfully_deleted')"
        :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <font-awesome-icon icon="fa-solid fa-triangle-exclamation" class="modal-exclam-mark" />
    </Dialog>
    <!-- sign-out -->
    <Dialog v-model:visible="visible3" header=" هل بالفعل تريد تسجيل الخروج " modal :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <font-awesome-icon icon="fa-solid fa-triangle-exclamation" class="modal-exclam-mark mb-3" />

        <div class="flex-center gap-10">
            <button type="button" class="   main_btn  btn-danger" label="Show" @click="signOut">نعم</button>
            <button type="button" class="  main_btn btn-primary" label="Show"> لا </button>
        </div>
    </Dialog>
    <Dialog v-model:visible="visible4" header="تم تسجيل الخروج بنجاح " modal :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <font-awesome-icon icon="fa-solid fa-triangle-exclamation" class="modal-exclam-mark" />
    </Dialog>
</template>
<script>
import { useAuthStore } from '~/store/authStore';

import Dialog from 'primevue/dialog';
definePageMeta({
    middleware: "check-auth",
})
export default {
    components: {
        Dialog
    },
    data() {
        return {
            localePath: useLocalePath(),
            visible: false,
            visible2: false,
            visible3: false,
            visible4: false
        }
    },
    methods: {
        signOut() {

            this.visible4 = true
            this.visible3 = false
            setTimeout(function () {
                useRouter().push({ path: '/' })
                useAuthStore().signOut()
            }, 1000)
        },
        deleteAccount() {
            this.visible2 = true
            this.visible = false
            setTimeout(function () {
                useRouter().push({ path: '/' })
                useAuthStore().deleteAccount()
            }, 1000)
        }
    }
}
</script>