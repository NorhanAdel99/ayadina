<template>
        <MultiSelect :id="id" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :options="options"
        optionLabel="name" :maxSelectedLabels="3" :placeholder="placeholder"
        class="form-control  p-0 d-flex align-items-center  w-full md:w-20rem mb-3" />
</template>
<script>

import MultiSelect from 'primevue/multiselect';
export default {
    components: {
        MultiSelect
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
}
</script>