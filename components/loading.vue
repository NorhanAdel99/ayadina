<template>
    <div v-if="loading" class="loading">
      <!-- Add your loader HTML or component here -->
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
    mounted() {
      this.$nuxt.$loading.on("start", () => {
        this.loading = true;
      });
  
      this.$nuxt.$loading.on("finish", () => {
        this.loading = false;
      });
    },
  };
  </script>
  
  <style scoped>
  .loading {
    /* Add your loader styles here */
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    color: white;
    font-size: 24px;
  }
  </style>