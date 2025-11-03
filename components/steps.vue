<template>
    <div>
        <ui-main-title>
            {{ $t("Create_account") }}
        </ui-main-title>
        <div class="contain-progress mb-3">
            <div class="progress-wrap ">
                <div class="progress" id="progress"></div>
                <div class="containStep  text-center text-muted ">
                    <span class=" step"  :class="{ activeStep: isStepActive('/register') }">
                    </span>
                    <div>1</div>
                </div>

                <div class="containStep text-center text-muted">
                    <div class="step"  :class="{ activeStep: isStepActive('/register/step2') }">
                    </div>
                    <div>2</div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>

export default {
    data() {
        return {
            array: []
        }
    },
    methods:{
    isStepActive(route) {
      const currentRoutePath = this.$route.path.replace(/^\/[a-z]{2}\b/, '');
      const sanitizedRoute = route.replace(/^\/[a-z]{2}\b/, '');
      return currentRoutePath === sanitizedRoute;
    }
    }
 
}
</script>
<style scoped>
/* .active {
 border: 1px dashed $main_color;
background-color: $main_color;
} */
</style>

