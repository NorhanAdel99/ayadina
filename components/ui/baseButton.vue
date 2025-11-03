<template>
    <button v-if="!link" :class="mode">
    <slot></slot>
    </button>
    <NuxtLink :class="mode" :to="to" v-else>
        <slot></slot>
    </NuxtLink>
</template>
<script>
export default {
    props:{
        mode:{
            type: Array,
            required: false,
            default: ''
        },
        to:{
            type: String,
            require: true,
            default: '/'
        },
        link:{
            type: Boolean,
            required: false,
            default: false
        }
    }
}
</script>
