<template>
    <ui-base-container>
        <ui-breadCrumb to="/">
            <template v-slot:mainPage> محمد أحمد  </template>
            <template v-slot:currentPage>  الأعمال السابقة </template>
        </ui-breadCrumb>
        <div class="row">
            <div class="col-md-3 col-6" v-for="img in images" :key="img+1" >
                <img  :src="img" :alt="img+1" class="previousWorkImg mb-4">
            </div>
        </div>
    </ui-base-container>
</template>
<script>
export default {
    data(){
        return {
            images: [
            "../../src/assets/imgs/pw1.png",
            "../../src/assets/imgs/pw2.png",
            "../../src/assets/imgs/pw3.png",
            "../../src/assets/imgs/pw4.png",
            "../../src/assets/imgs/pw5.png",
            "../../src/assets/imgs/pw6.png",
            "../../src/assets/imgs/pw7.png",
            "../../src/assets/imgs/pw8.png",
            
            "../../src/assets/imgs/pw1.png",
            "../../src/assets/imgs/pw2.png",
            "../../src/assets/imgs/pw3.png",
            "../../src/assets/imgs/pw4.png",
            "../../src/assets/imgs/pw5.png",
            "../../src/assets/imgs/pw6.png",
            "../../src/assets/imgs/pw7.png",
            "../../src/assets/imgs/pw8.png",
          ]
        }
    }
}
</script>