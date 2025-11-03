<template>
  <div id="previewContainer" class="d-flex align=items-center gap-10 my-2 flex-wrap">
    <label for="imageUpload" class="base-image-input">
      <input
        type="file"
        id="imageUpload"
        ref="imageInput"
        :name="name"
        multiple
        accept="image/*"
        @change="handleImageUpload"
        hidden
        
        
      />
      <span class="select">
        <font-awesome-icon icon="fa-solid fa-upload" />
      </span>
    </label>
    <div
      v-for="(image, index) in imagesArray"
      :key="index"
      class="base-image-input"
    >
      <img :src="image.image" class="preview-image"  loading="lazy" alt="image" />

      <div class="removeSrc text-danger" @click="removeImage(index)">
        <font-awesome-icon icon="fa-solid fa-xmark" />
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/store/authStore";

export default {
  props: {
    images: Array,
    edit: Boolean,
    name: {
      type: String,
    },
  },
  data() {
    return {
      axios: useNuxtApp().$axios,
      token: "",
      imagesArray: [], // Initialize with a copy of the prop
    };
  },
  mounted() {
    this.imagesArray = this.images;
    this.token = useAuthStore().token;
  },
  methods: {
    handleImageUpload() {
      const input = this.$refs.imageInput;
      const files = input.files;

      if (files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          if (this.validateImageFile(file)) {
            const reader = new FileReader();
            reader.onload = (e) => {
              this.imagesArray.push({
                image: e.target.result,
                file: file,
                name: `Image ${this.imagesArray.length + 1}`,
              });
            };
            reader.readAsDataURL(file);
          } else {
            this.$toast.add({ detail: this.$t("uploadImageError"), life: 3000, severity: "error" });
          }
        }
        this.$emit("updateMyImgs", this.imagesArray);
      }
    },
    validateImageFile(file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      return allowedTypes.includes(file.type);
    },
    async removeImage(index) {
      // const removedImage = this.imagesArray[index];
      if(this.edit){
        await this.axios
        .post(`delete-image/${this.imagesArray[index].id}`, "", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          if (res.data.key === "success") {
            this.imagesArray.splice(index, 1);
            this.$emit("updateMyImgs", this.imagesArray);
            this.$toast.add({
              detail: `${res.data.msg}`,
              life: 3000,
              severity: "success",
            });
          }
        });
      }else{
        this.imagesArray.splice(index, 1);
        this.$emit("updateMyImgs", this.imagesArray);
      }
    
  
      },
  },
};
</script>



<style scoped>
.base-image-input img {
  border-radius: 20px;
  object-fit: cover;
}
</style>
