<template>
    <div class="form-group">
        <div class="form-label">
            <slot></slot>
            <span class="text-danger"></span>
            <Password v-model="value" toggleMask  inputId="id" />
        </div>
    </div>
</template>
<script>
import Password from 'primevue/password';

export default {
    components:{
        Password
    },
    data() {
        return {
            value: null
        }
    },
    // props:{
    //     id: {
    //         type: String,
    //         required: true,
    //         default: null
    //     },
    
    // }
   
}
</script>
