<template>
    <div class="form-group" v-if="textarea">
        <label :for="id" class="form-label">
            <slot></slot>
            <span class="text-danger">*</span>
        </label>
        <!-- <Field as="textarea" :name="name" 
        :class="mode" :id="id" :placeholder="placeholder" rows="5" :value="modelValue"  @input="$emit('update:modelValue', $event.target.value)"/> -->
        <!-- <ErrorMessage :name="name" /> -->
        <textarea  :class="mode" :id="id" :placeholder="placeholder" rows="5" :value="modelValue"  @input="$emit('update:modelValue', $event.target.value)"></textarea>
    </div>
    <div class="form-group" v-else>
        <label :for="id" class="form-label">
            <slot></slot>
            <span class="text-danger">*</span>
        </label>
        <!-- <Field :name="name" :type="type" :rules="rules" :id="id" :class="mode" :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)" /> -->
        <!-- <ErrorMessage :name="name" /> -->
        <input :type="type" :class="mode" :id="id" ref="theInput" :value="modelValue"  @input="$emit('update:modelValue', $event.target.value)" >
    </div>
</template> 
<script>
// import { Field, ErrorMessage } from 'vee-validate';
export default {
    // components: { Field, ErrorMessage },
    emits: ['update:modelValue'],

    props: {
        modelValue: {
            type: String,
            required: true,
            default: null
        },
        type: {
            type: String,
            required: false,
            default: null
        },
        mode: {
            type: Array,
            required: false,
            default: 'form-control'
        },
        id: {
            type: String,
            required: true,
            default: null
        },
        textarea: {
            type: Boolean,
            required: false,
            default: false
        },

        placeholder: {
            type: String,
            required: false,
            default: null
        },
        name: {
            type: String,
            required: false,
            default: null
        },
        rules:{
            type: String,
            required: false,
            default: null
        }

    }
} 
</script>
