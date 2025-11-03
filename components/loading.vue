<!-- Loading.vue -->

<template>
  <div v-if="loading" class="loader">
    Loading...
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    showLoader() {
      this.loading = true;
    },
    hideLoader() {
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
}
</style>
