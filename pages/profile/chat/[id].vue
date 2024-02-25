<template>
    <base-container>
        <ui-breadCrumb  :to="localePath('/profile/chat')">
            <template v-slot:mainPage>المحادثه </template>
            <template v-slot:currentPage> تفاصيل المحادثه </template>
        </ui-breadCrumb>
        <div class="row justify-content-center">
            <div class="col-md-10">
                <base-card>
                    <!-- <p> {{ $rout}}</p> -->
                    <p> this id is {{ id }} </p>
                </base-card>
            </div>
        </div>
    </base-container>
</template>
<script >
export default {

    data() {
        return {
          localePath:  useLocalePath()
        }

    },


}
</script>