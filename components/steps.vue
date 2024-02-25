<template>
    <div>
        <ui-main-title>
            إنشاء حساب
        </ui-main-title>
        <div class="contain-progress mb-3">
            <div class="progress-wrap ">
                <div class="progress" id="progress"></div>
                <NuxtLink to="/register" class="containStep text-center text-muted ">
                    <span class=" step ">
                    </span>
                    <div>1</div>
                </NuxtLink>

                <NuxtLink to='/register/step2' class="containStep text-center text-muted">
                    <div class="step">
                    </div>
                    <div>2</div>
                </NuxtLink>
            </div>
        </div>
        <!-- <button class="btn" id="next" @click="steps">Next</button> -->

    </div>
</template>
<script>

export default {
    data() {
        return {
            array: []
        }
    },
    mounted() {

        // console.log(document.querySelectorAll('.containStep').length)
        // // if(containStep.)
        // document.querySelectorAll('.containStep').forEach((el) => {
        //     this.array.push(el)
        //     console.log(this.array)
        //     console.log(this.array.children[1].classList.contains('router-link-active'))
        //     if (el.classList.contains('router-link-active')) {
                
        //     } else {
        //         return
        //     }
        // })
    }
}
</script>

