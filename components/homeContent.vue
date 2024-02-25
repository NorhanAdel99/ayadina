<template>
        <div class="row">
            <div class="col-lg-2  col-4 " v-for="category in categories" :key="category.id">
                <NuxtLink :to="'/'+category.id" class="mainCard text-dark mb-4" >
                    <img :src="category.image" alt="" class="rounded-50">
                    <h5 class="title"> {{ category.name }}</h5>
                </NuxtLink>
            </div>
        </div>
</template>
<!-- <script>
export default {
    data() {
        return {
            // contents: [
            //     {
            //         img: new URL('../assets/imgs/sport.png', import.meta.url),
            //         title: 'name 1 ',
            //         id: 'one'
            //     },
            //     {
            //         img: new URL('../assets/imgs/sport.png', import.meta.url),

            //         title: 'name  2 ',
            //         id: 'two'
            //     },
            //     {
            //         img: new URL('../assets/imgs/sport.png', import.meta.url),
            //         title: 'name 3 ',
            //         id: 'three'
            //     },
            //     {
            //         img: new URL('../assets/imgs/sport.png', import.meta.url),
            //         title: 'name 3 ',
            //         id: 'four'
            //     },
            //     {
            //         img: new URL('../assets/imgs/sport.png', import.meta.url),

            //         title: 'name 3 ',
            //         id: 'five'
            //     },
            //     {
            //         img: new URL('../assets/imgs/sport.png', import.meta.url),

            //         title: 'name 3 ',
            //         id: 'six'

            //     },
            //     {
            //         img: new URL('../assets/imgs/sport.png', import.meta.url),

            //         title: 'name 3 ',
            //         id: 'seven'

            //     },
            //     {
            //         img: new URL('../assets/imgs/sport.png', import.meta.url),

            //         title: 'name 3 ',
            //         id: 'eight'

            //     },
            //     {
            //         img: new URL('../assets/imgs/sport.png', import.meta.url),
            //         title: 'name 3 ',
            //         id: 'nine'

            //     },
            //     {
            //         img: new URL('../assets/imgs/sport.png', import.meta.url),

            //         title: 'name 3 ',
            //         id: 'ten'

            //     },
            //     {
            //         img: new URL('../assets/imgs/sport.png', import.meta.url),

            //         title: 'name 3 ',
            //         id: 'eleven'

            //     },

            // ]
        }
    },


}
</script> -->
<script>
export default {
    data() {
        return {
            axios: useNuxtApp().$axios,
            categories: [],

        }
    },
    mounted() {
        this.axios.get('/categories')
            .then((response) => {
                console.log('response: ', response.data.data)
                this.categories = response.data.data.categories
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    
}
</script>


