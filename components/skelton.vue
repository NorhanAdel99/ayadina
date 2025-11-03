<template>
     <Skeleton :width="width"  class="mb-2"></Skeleton>
</template>
<script>
import Skeleton from 'primevue/skeleton';
export default {
    components:{Skeleton},
    props:{
        width:{
            type: String,
            required: true,
            default: '100%'
        },
    }
}
</script>