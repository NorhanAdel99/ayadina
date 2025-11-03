<template>
  <h5 :class="['text-center mb-3 ' , auth ? 'login_title' : '']">
    <slot></slot>
  </h5>
</template>
<script setup>
const props = defineProps({
  auth: {
    type: Boolean,
    default: false,
  },
});
</script>
<style>
.login_title {
  margin-top: 70px !important;
}
</style>
