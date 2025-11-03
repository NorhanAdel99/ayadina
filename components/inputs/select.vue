<template>
        <Dropdown :id="id" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :options="options"
            :placeholder="placeholder" class="w-100 form-control d-flex justify-content-between " />
</template>

<script>
import Dropdown from 'primevue/dropdown';
export default {
    emits: ['update:modelValue'],

    data() {
        return {
            Dropdown
        };
    },
    props: {
        options: {
            type: Array,
            required: true,
            default: null
        },
        placeholder:{
            type: String,
            required: false,
            default: null
        },
        id: {
            type: String,
            required: true,
            default: null
        },
    }
};
</script>